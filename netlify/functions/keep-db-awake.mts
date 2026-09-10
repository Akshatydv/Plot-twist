/* ============================================================================
   keep-db-awake — a scheduled Netlify function that stops Supabase pausing.

   WHY THIS EXISTS
   Supabase pauses a free-tier project after roughly a week without database
   activity, and when it does it withdraws the project's DNS record entirely.
   The site then fails every application submit with "something went sideways",
   which is exactly what happened on 9 September 2026: the project sat at
   INACTIVE, odvsjkegzupbsmudzzti.supabase.co stopped resolving, and every
   application submitted during that window was refused and lost.

   Three applications is not enough traffic to keep a project awake on its own,
   so the project has to be woken deliberately. One request a day does it.

   WHY IT QUERIES THE DATABASE AND NOT THE WEBSITE
   Pinging plotwist.in proves nothing: the pages are static or server-rendered
   and most of them never touch Postgres. Only a real query counts as activity,
   so this reads one row out of the applications table. Cheap, and it exercises
   the exact path a submission depends on — URL, service-role key, table,
   PostgREST — so if any of those break, this notices a day later rather than a
   real applicant noticing first.

   IT ALSO DOUBLES AS A DAILY HEADCOUNT
   The row count goes into the log line, so the function history in Netlify is
   also a plain record of how the cast filled up over time. Free.

   ─── IF THIS EVER STARTS FAILING ───────────────────────────────────────────
   Netlify > Project > Logs > Functions > keep-db-awake. A non-2xx return here
   means submissions are broken too, because it is the same dependency chain.
   ========================================================================== */

export default async () => {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !key) {
    // Loud, because a missing key here means the live form is broken as well.
    console.error("[keep-db-awake] SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY is not set.");
    return new Response("not configured", { status: 500 });
  }

  const started = Date.now();

  try {
    /* HEAD + count: asks Postgres for the number of rows and transfers none of
       them. No applicant data leaves the database, which matters because this
       log is read casually and often. */
    const res = await fetch(`${url}/rest/v1/applications?select=id`, {
      method: "HEAD",
      headers: {
        apikey: key,
        Authorization: `Bearer ${key}`,
        Prefer: "count=exact",
        Range: "0-0",
      },
      signal: AbortSignal.timeout(20_000),
    });

    const ms = Date.now() - started;

    if (!res.ok && res.status !== 206) {
      console.error(`[keep-db-awake] query failed: HTTP ${res.status} in ${ms}ms`);
      return new Response(`supabase returned ${res.status}`, { status: 502 });
    }

    const total = (res.headers.get("content-range") ?? "").split("/")[1] ?? "?";
    console.log(`[keep-db-awake] ok in ${ms}ms — ${total} applications on file.`);
    return new Response("ok", { status: 200 });
  } catch (err) {
    /* A DNS failure lands here, and a DNS failure is the signature of the
       project having paused anyway — so say so in the log rather than leaving
       whoever reads it to work it out. */
    const msg = err instanceof Error ? err.message : String(err);
    console.error(
      `[keep-db-awake] could not reach Supabase (${msg}). ` +
        "If this is ENOTFOUND, the project has paused — restore it in the Supabase dashboard."
    );
    return new Response("unreachable", { status: 502 });
  }
};

/* 06:00 UTC daily — 11:30 IST, comfortably inside the roughly seven-day
   window, and at an hour where a failure gets noticed the same working day. */
export const config = {
  schedule: "0 6 * * *",
};
