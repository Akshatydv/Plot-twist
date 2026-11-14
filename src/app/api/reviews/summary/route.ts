import { NextResponse } from "next/server";
import { statsOf } from "@/lib/reviews";
import { listApprovedReviews } from "@/lib/reviewsStore";

/**
 * Just the headline numbers — count and average, nothing about any individual
 * review — for the trust strip in every page footer. Deliberately no "best
 * quote": the strip shows the whole picture, not a selection. Cacheable at the
 * edge so footers on every page don't each hit the database.
 */
export async function GET() {
  const { count, average } = statsOf(await listApprovedReviews(500));
  return NextResponse.json(
    { count, average },
    { headers: { "Cache-Control": "public, max-age=60, s-maxage=300, stale-while-revalidate=600" } }
  );
}
