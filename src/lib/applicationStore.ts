import { appendFile, mkdir, readFile } from "node:fs/promises";
import path from "node:path";
import { isSupabaseConfigured, serviceRoleClient, StorageNotConfiguredError } from "./supabase/serviceRole";
import type { StoredApplication } from "./applications";

/**
 * STORAGE ADAPTER — the one file that knows where applications go.
 *
 * Supabase is the production driver, via the shared service-role client in
 * lib/supabase/serviceRole.ts (also used by the admin pages). Credentials
 * are only ever read on the server.
 *
 * If Supabase isn't configured:
 *   - in development, submissions fall back to a local JSONL file so the
 *     funnel is still testable, with a loud warning;
 *   - in production, saving throws. Silently dropping someone's application
 *     is worse than failing in front of them.
 */

const TABLE = process.env.SUPABASE_APPLICATIONS_TABLE ?? "applications";

export { isSupabaseConfigured, StorageNotConfiguredError };

/** Postgres unique-violation — the (instagram, journey) index did its job. */
const UNIQUE_VIOLATION = "23505";

export class DuplicateApplicationError extends Error {
  constructor() {
    super("An application already exists for this Instagram handle on this journey.");
    this.name = "DuplicateApplicationError";
  }
}

/* ------------------------------------------------------------------ */
/* dev fallback                                                        */
/* ------------------------------------------------------------------ */

const DATA_DIR = path.join(process.cwd(), ".data");
const FILE = path.join(DATA_DIR, "applications.jsonl");

let warned = false;

async function saveToFile(record: StoredApplication) {
  if (!warned) {
    warned = true;
    console.warn(
      "[plot] Supabase is not configured — writing applications to .data/applications.jsonl. " +
        "Set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY before going live."
    );
  }

  // Mirror the (instagram, journey) unique index so dev behaves like prod and
  // the duplicate path is actually exercisable. Read-then-write is racy, but
  // this is a single-developer fallback — Postgres does it properly in prod.
  await mkdir(DATA_DIR, { recursive: true });
  try {
    const raw = await readFile(FILE, "utf8");
    const clash = raw
      .split("\n")
      .filter(Boolean)
      .map((line) => JSON.parse(line) as StoredApplication)
      .some((r) => r.instagram.toLowerCase() === record.instagram.toLowerCase() && r.journey === record.journey);
    if (clash) throw new DuplicateApplicationError();
  } catch (err) {
    if (err instanceof DuplicateApplicationError) throw err;
    // No file yet, or unreadable — nothing to clash with.
  }

  await appendFile(FILE, `${JSON.stringify(record)}\n`, "utf8");
  return record;
}

/* ------------------------------------------------------------------ */
/* the interface the route handler uses                                */
/* ------------------------------------------------------------------ */

/**
 * Persists one application.
 *
 * @throws {DuplicateApplicationError} same handle, same journey
 * @throws {StorageNotConfiguredError} production without credentials
 */
export async function saveApplication(record: StoredApplication) {
  if (!isSupabaseConfigured) {
    // Allow-list, not deny-list: the local file is reachable ONLY in an
    // explicit development run. A staging deploy, a test runner, or an unset
    // NODE_ENV all fail loudly instead of quietly writing applications to a
    // disk nobody will ever read.
    if (process.env.NODE_ENV !== "development") throw new StorageNotConfiguredError();
    return saveToFile(record);
  }

  const { error } = await serviceRoleClient().from(TABLE).insert(record);

  if (error) {
    if (error.code === UNIQUE_VIOLATION) throw new DuplicateApplicationError();
    // Surfaced to the server log only — never returned to the client.
    console.error("[plot] application insert failed:", error.message);
    throw new Error(error.message);
  }

  return record;
}
