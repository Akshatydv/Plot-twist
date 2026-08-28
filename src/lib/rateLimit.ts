/**
 * A minimal in-memory sliding-window limiter — enough to blunt naive
 * scripted submission floods without adding infrastructure (Redis/Upstash)
 * for a single-route, launch-scale form.
 *
 * Known limitation: state is per server process. On a multi-instance
 * deployment each instance enforces its own window, so the effective global
 * limit is (limit × instance count). That's an acceptable trade at this
 * scale; move to a shared store (e.g. Upstash Ratelimit) if abuse actually
 * shows up in the logs.
 */

type Bucket = { count: number; resetAt: number };

const buckets = new Map<string, Bucket>();

// Sweep occasionally so the map doesn't grow unbounded over a long-running process.
let lastSweep = Date.now();
function sweep(now: number) {
  if (now - lastSweep < 60_000) return;
  lastSweep = now;
  for (const [key, bucket] of buckets) {
    if (bucket.resetAt <= now) buckets.delete(key);
  }
}

export function rateLimit(key: string, limit: number, windowMs: number) {
  const now = Date.now();
  sweep(now);

  const bucket = buckets.get(key);
  if (!bucket || bucket.resetAt <= now) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return { limited: false, remaining: limit - 1 };
  }

  bucket.count += 1;
  return { limited: bucket.count > limit, remaining: Math.max(0, limit - bucket.count) };
}

/** Best-effort client identifier from proxy headers — there's no reliable `request.ip` in route handlers. */
export function clientIp(request: Request) {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  return request.headers.get("x-real-ip") ?? "unknown";
}
