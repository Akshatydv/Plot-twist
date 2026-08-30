import Link from "next/link";
import { requireAdmin } from "@/lib/admin";
import { getApplicationCounts, listApplications } from "@/lib/adminApplications";
import { APPLICATION_STATUSES, JOURNEYS, type ApplicationStatus } from "@/lib/applications";
import { AdminHeader } from "@/components/admin/AdminHeader";

export const dynamic = "force-dynamic";

/**
 * "JOURNEY 00" → "00". The column header already says Journey; repeating the
 * word in every row would cost the width the table doesn't have.
 */
function journeyShort(journey: string) {
  return journey.replace(/^JOURNEYs+/i, "");
}

type SearchParams = {
  status?: string;
  journey?: string;
  q?: string;
  sort?: string;
};

function isStatus(value: string | undefined): value is ApplicationStatus {
  return APPLICATION_STATUSES.includes(value as ApplicationStatus);
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-GB", { day: "2-digit", month: "short" });
}

export default async function ApplicationsPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  await requireAdmin();
  const sp = await searchParams;

  const status: ApplicationStatus | "ALL" = isStatus(sp.status) ? sp.status : "ALL";
  const journey = sp.journey || undefined;
  const q = sp.q ?? "";
  const sort = sp.sort === "oldest" ? "oldest" : "newest";

  const [rows, counts] = await Promise.all([
    listApplications({ status, journey, q, sort }),
    getApplicationCounts(journey),
  ]);

  return (
    <main className="min-h-screen bg-[#150711] px-5 py-8 text-sand sm:px-8">
      <div className="mx-auto max-w-[1100px]">
        <AdminHeader title="Applications" />

        {/* Real counts from the database — see getApplicationCounts. */}
        <div className="mt-6 flex flex-wrap items-baseline gap-x-6 gap-y-2">
          <span className="text-lg font-semibold">{counts.total} APPLICATIONS</span>
          {APPLICATION_STATUSES.map((s) => (
            <span key={s} className="text-sm text-sand/60">
              {counts.byStatus[s]} {s}
            </span>
          ))}
        </div>

        {/* Plain GET form — reloads the page with new query params, no client JS needed. */}
        <form method="get" className="mt-6 flex flex-wrap items-end gap-3 border-b border-sand/15 pb-6">
          <div>
            <label htmlFor="q" className="block text-xs text-sand/50">
              Search
            </label>
            <input
              id="q"
              name="q"
              type="search"
              defaultValue={q}
              placeholder="Name or Instagram"
              className="mt-1 border border-sand/20 bg-transparent px-3 py-2 text-sm outline-none focus:border-sand/50"
            />
          </div>

          <div>
            <label htmlFor="status" className="block text-xs text-sand/50">
              Status
            </label>
            <select
              id="status"
              name="status"
              defaultValue={status}
              className="mt-1 border border-sand/20 bg-[#150711] px-3 py-2 text-sm outline-none focus:border-sand/50"
            >
              <option value="ALL">All</option>
              {APPLICATION_STATUSES.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="journey" className="block text-xs text-sand/50">
              Journey
            </label>
            <select
              id="journey"
              name="journey"
              defaultValue={journey ?? ""}
              className="mt-1 border border-sand/20 bg-[#150711] px-3 py-2 text-sm outline-none focus:border-sand/50"
            >
              <option value="">All</option>
              {JOURNEYS.map((j) => (
                <option key={j.id} value={j.id}>
                  {j.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="sort" className="block text-xs text-sand/50">
              Sort
            </label>
            <select
              id="sort"
              name="sort"
              defaultValue={sort}
              className="mt-1 border border-sand/20 bg-[#150711] px-3 py-2 text-sm outline-none focus:border-sand/50"
            >
              <option value="newest">Newest first</option>
              <option value="oldest">Oldest first</option>
            </select>
          </div>

          <button type="submit" className="border border-sand/30 px-4 py-2 text-sm hover:border-sand/60">
            Filter
          </button>
          {(q || status !== "ALL" || journey || sort !== "newest") && (
            <Link href="/admin/applications" className="text-xs text-sand/50 hover:text-sand">
              Clear
            </Link>
          )}
        </form>

        <div className="mt-6 overflow-x-auto">
          <table className="w-full min-w-[680px] text-left text-sm">
            <thead>
              <tr className="border-b border-sand/15 text-xs tracked text-sand/50">
                <th className="py-2 pr-4 font-normal">Name</th>
                {/* Second column on purpose: with more than one journey live, this
                    is the field that stops two applicants being confused. */}
                <th className="py-2 pr-4 font-normal">Journey</th>
                <th className="py-2 pr-4 font-normal">Instagram</th>
                <th className="py-2 pr-4 font-normal">Age</th>
                <th className="py-2 pr-4 font-normal">City</th>
                <th className="py-2 pr-4 font-normal">Applied</th>
                <th className="py-2 pr-4 font-normal">Status</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.id} className="border-b border-sand/10 hover:bg-white/[0.03]">
                  <td className="py-2.5 pr-4">
                    <Link href={`/admin/applications/${r.id}`} className="underline-offset-2 hover:underline">
                      {r.name}
                    </Link>
                  </td>
                  <td className="py-2.5 pr-4">
                    <span className="border border-sand/20 px-1.5 py-0.5 text-xs tabular-nums text-sand/70">
                      {journeyShort(r.journey)}
                    </span>
                  </td>
                  <td className="py-2.5 pr-4 text-sand/80">{r.instagram}</td>
                  <td className="py-2.5 pr-4 text-sand/80">{r.age}</td>
                  <td className="py-2.5 pr-4 text-sand/80">{r.city}</td>
                  <td className="py-2.5 pr-4 text-sand/60">{formatDate(r.submitted_at)}</td>
                  <td className="py-2.5 pr-4">
                    <span className="border border-sand/20 px-2 py-0.5 text-xs">{r.status}</span>
                  </td>
                </tr>
              ))}
              {rows.length === 0 && (
                <tr>
                  <td colSpan={7} className="py-10 text-center text-sand/40">
                    No applications match.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
