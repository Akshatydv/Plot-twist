import { NextResponse } from "next/server";
import { toStoredApplication, validateApplication, type ApplicationInput } from "@/lib/applications";
import {
  DuplicateApplicationError,
  StorageNotConfiguredError,
  saveApplication,
} from "@/lib/applicationStore";
import { clientIp, rateLimit } from "@/lib/rateLimit";

/** Submissions hit external storage, so this can't be statically rendered. */
export const dynamic = "force-dynamic";

/** 20kb is generous for three answers plus contact fields — anything past that isn't a real submission. */
const MAX_BODY_BYTES = 20_000;

/** 5 submissions per 10 minutes per IP. Applying once takes under 5 minutes; nobody legitimate hits this. */
const LIMIT = 5;
const WINDOW_MS = 10 * 60 * 1000;

/**
 * The only public surface of the application system, and it is write-only.
 * There is no GET: applicant records never travel to a browser. Responses
 * carry a result and validation errors — nothing else.
 */
export async function POST(request: Request) {
  const contentLength = Number(request.headers.get("content-length") ?? 0);
  if (contentLength > MAX_BODY_BYTES) {
    return NextResponse.json({ ok: false, error: "That request is too large." }, { status: 413 });
  }

  const ip = clientIp(request);
  const { limited } = rateLimit(`apply:${ip}`, LIMIT, WINDOW_MS);
  if (limited) {
    return NextResponse.json(
      { ok: false, error: "Slow down there — try again in a few minutes." },
      { status: 429 }
    );
  }

  let body: Partial<ApplicationInput>;

  try {
    body = (await request.json()) as Partial<ApplicationInput>;
  } catch {
    return NextResponse.json({ ok: false, error: "Malformed request." }, { status: 400 });
  }

  // Honeypot: a real visitor never sees this field. Pretend it worked —
  // telling a bot it was caught only teaches it to stop filling that field.
  if (typeof body._hp === "string" && body._hp.trim().length > 0) {
    return NextResponse.json({ ok: true, id: crypto.randomUUID() }, { status: 201 });
  }

  // Re-validated server-side: the client's checks are UX, not a guarantee.
  const errors = validateApplication(body);
  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ ok: false, errors }, { status: 422 });
  }

  try {
    const record = await saveApplication(toStoredApplication(body as ApplicationInput));
    return NextResponse.json({ ok: true, id: record.id }, { status: 201 });
  } catch (err) {
    if (err instanceof DuplicateApplicationError) {
      return NextResponse.json(
        { ok: false, duplicate: true, error: "Plot twist — you're already on the casting list." },
        { status: 409 }
      );
    }

    if (err instanceof StorageNotConfiguredError) {
      // Loud on the server, vague to the visitor — they can't fix our config.
      console.error("[plot] refusing to accept applications: storage is not configured.");
      return NextResponse.json(
        { ok: false, error: "Applications aren't open just yet. Try again shortly." },
        { status: 503 }
      );
    }

    // Never leak the underlying error (Supabase message, stack, etc.) to the client.
    console.error("[plot] application insert failed:", err);
    return NextResponse.json(
      { ok: false, error: "Plot twist — something went sideways. Your application wasn't submitted. Try again." },
      { status: 500 }
    );
  }
}
