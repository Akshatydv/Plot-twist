import Link from "next/link";
import { requireAdmin } from "@/lib/admin";
import { listReviewsForAdmin } from "@/lib/reviewsStore";
import { tripLabel } from "@/lib/reviews";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { moderateReviewAction } from "./actions";

export const dynamic = "force-dynamic";

const TABS = ["PENDING", "APPROVED", "REJECTED", "ALL"] as const;

function Btn({ id, act, label, danger }: { id: string; act: string; label: string; danger?: boolean }) {
  return (
    <form action={moderateReviewAction}>
      <input type="hidden" name="id" value={id} />
      <input type="hidden" name="act" value={act} />
      <button
        type="submit"
        className={`border px-3 py-1.5 text-xs ${danger ? "border-[#ff8aa8]/50 text-[#ff8aa8] hover:border-[#ff8aa8]" : "border-sand/30 hover:border-sand/60"}`}
      >
        {label}
      </button>
    </form>
  );
}

/**
 * Review moderation. Nothing reaches the public site until "Approve" is pressed
 * here. Text is rendered as plain text (React escapes it), photos link to the
 * full-size file. Pending is the default tab: it is the inbox.
 */
export default async function AdminReviewsPage({ searchParams }: { searchParams: Promise<{ s?: string }> }) {
  await requireAdmin();
  const { s } = await searchParams;
  const tab = (TABS as readonly string[]).includes(s ?? "") ? (s as (typeof TABS)[number]) : "PENDING";
  const reviews = await listReviewsForAdmin(tab === "ALL" ? undefined : tab);

  return (
    <main className="min-h-screen bg-[#150711] px-5 py-8 text-sand sm:px-8">
      <div className="mx-auto max-w-[1000px]">
        <AdminHeader title="Reviews" />

        <nav aria-label="Review status" className="mt-6 flex flex-wrap gap-2 border-b border-sand/15 pb-5">
          {TABS.map((t) => (
            <Link
              key={t}
              href={`/admin/reviews?s=${t}`}
              aria-current={tab === t ? "page" : undefined}
              className={`border px-3 py-1.5 text-xs ${tab === t ? "border-sand bg-sand text-ink" : "border-sand/25 text-sand/70 hover:border-sand/50"}`}
            >
              {t === "ALL" ? "All" : t[0] + t.slice(1).toLowerCase()}
            </Link>
          ))}
        </nav>

        <ul className="mt-6 space-y-5">
          {reviews.map((r) => (
            <li key={r.id} className="border border-sand/15 p-5">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="text-lg font-semibold">
                    {r.name}
                    {r.verified && <span className="ml-3 border border-[#36c96f]/60 px-1.5 py-0.5 text-[10px] uppercase tracking-wider text-[#7be8a6]">verified guest</span>}
                    {r.featured && <span className="ml-2 border border-[#FFD75E]/60 px-1.5 py-0.5 text-[10px] uppercase tracking-wider text-[#FFD75E]">featured</span>}
                  </p>
                  <p className="mt-0.5 text-xs text-sand/55">
                    {[r.city, tripLabel(r.tripId)].filter(Boolean).join(" · ")} · {new Date(r.createdAt).toLocaleString("en-GB", { day: "2-digit", month: "short", hour: "2-digit", minute: "2-digit" })}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-[#ff8aa8]" aria-label={`${r.rating} out of 5`}>
                    {"★".repeat(r.rating)}
                    <span className="text-sand/25">{"★".repeat(5 - r.rating)}</span>
                  </p>
                  <p className="mt-0.5 text-xs text-sand/50">{r.status}</p>
                </div>
              </div>

              <p className="mt-4 whitespace-pre-wrap font-serif text-[1.05rem] leading-relaxed text-sand/90">{r.body}</p>

              {r.photos.length > 0 && (
                <ul className="mt-4 flex flex-wrap gap-3">
                  {r.photos.map((src, i) => (
                    <li key={src}>
                      <a href={src} target="_blank" rel="noopener noreferrer">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={src} alt={`Photo ${i + 1} from ${r.name}`} className="h-28 w-28 object-cover" loading="lazy" />
                      </a>
                    </li>
                  ))}
                </ul>
              )}

              <div className="mt-5 flex flex-wrap gap-2">
                {r.status !== "APPROVED" && <Btn id={r.id} act="approve" label="Approve" />}
                {r.status !== "REJECTED" && <Btn id={r.id} act="reject" label="Reject" />}
                {r.status === "APPROVED" && (r.featured ? <Btn id={r.id} act="unfeature" label="Unfeature" /> : <Btn id={r.id} act="feature" label="Feature" />)}
                {r.status !== "PENDING" && <Btn id={r.id} act="pending" label="Back to pending" />}
                <Btn id={r.id} act="delete" label="Delete forever" danger />
              </div>
            </li>
          ))}
          {reviews.length === 0 && <li className="py-12 text-center text-sand/40">Nothing here.</li>}
        </ul>
      </div>
    </main>
  );
}
