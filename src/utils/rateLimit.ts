/**
 * Simple in-memory, per-IP rate limiter.
 *
 * State lives in the process, so it resets on restart and is not shared across
 * multiple instances. Enough to stop casual abuse of the API routes on a
 * single-server deployment.
 */

type Bucket = {
  limit: number;
  windowMs: number;
  hits: Map<string, number[]>;
};

export function createRateLimit(limit: number, windowMs: number) {
  const bucket: Bucket = { limit, windowMs, hits: new Map() };

  const recent = (ip: string) => {
    const now = Date.now();
    const times = (bucket.hits.get(ip) ?? []).filter((time) => now - time < bucket.windowMs);
    bucket.hits.set(ip, times);
    return times;
  };

  return {
    isLimited: (ip: string) => recent(ip).length >= bucket.limit,
    /** Call only once a request has actually been served, so failed input doesn't burn the quota. */
    record: (ip: string) => {
      recent(ip).push(Date.now());
    },
  };
}

export function getClientIP(request: Request) {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0].trim() ??
    request.headers.get("x-real-ip") ??
    "unknown"
  );
}
