import { requireAdmin } from "@/lib/admin";
import { listReviewsForAdmin } from "@/lib/reviewsStore";
import { tripLabel } from "@/lib/reviews";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { removeReviewAction, replyReviewAction } from "./actions";

export const dynamic = "force-dynamic";

/**
 * Reviews are live the moment they are posted — nothing waits here for
 * approval, and there is no way to hide or feature one. This page exists to
 * reply publicly and to remove genuine problems (spam, abuse, unlawful content,
 * or a guest asking for their review to come down). Text is rendered as plain
 * text (React escapes it).
 */
export default async function AdminReviewsPage() {
  await requireAdmin();
  const reviews = await listReviewsForAdmin();

  return (
    <main className="min-h-screen bg-[#150711] px-5 py-8 text-sand sm:px-8">
      <div className="mx-auto max-w-[1000px]">
        <AdminHeader title="Reviews" />
        <p className="mt-5 max-w-[70ch] text-sm leading-relaxed text-sand/60">
          {reviews.length} review{reviews.length === 1 ? "" : "s"}, newest first. They publish instantly and every one stays up — remove one only for spam, abuse, unlawful content, or when the
          guest asks.
        </p>

        <ul className="mt-6 space-y-5">
          {reviews.map((r) => (
            <li key={r.id} className="border border-sand/15 p-5">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="text-lg font-semibold">
                    {r.name}
                    {r.verified && <span className="ml-3 border border-[#36c96f]/60 px-1.5 py-0.5 text-[10px] uppercase tracking-wider text-[#7be8a6]">verified guest</span>}
                  </p>
                  <p className="mt-0.5 text-xs text-sand/55">
                    {[r.city, tripLabel(r.tripId)].filter(Boolean).join(" · ")} ·{" "}
                    {new Date(r.createdAt).toLocaleString("en-GB", { day: "2-digit", month: "short", hour: "2-digit", minute: "2-digit" })}
                  </p>
                </div>
                <p className="text-[#ff8aa8]" aria-label={`${r.rating} out of 5`}>
                  {"★".repeat(r.rating)}
                  <span className="text-sand/25">{"★".repeat(5 - r.rating)}</span>
                </p>
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

              <form action={replyReviewAction} className="mt-5">
                <input type="hidden" name="id" value={r.id} />
                <label htmlFor={`reply-${r.id}`} className="block text-xs text-sand/50">
                  Public reply from Plot Twist (optional — shown under the review; leave empty to remove)
                </label>
                <textarea
                  id={`reply-${r.id}`}
                  name="reply"
                  rows={2}
                  maxLength={600}
                  defaultValue={r.reply ?? ""}
                  className="mt-1 w-full border border-sand/20 bg-transparent px-3 py-2 text-sm outline-none focus:border-sand/50"
                />
                <button type="submit" className="mt-2 border border-sand/30 px-3 py-1.5 text-xs hover:border-sand/60">
                  {r.reply ? "Update reply" : "Save reply"}
                </button>
              </form>

              <form action={removeReviewAction} className="mt-4 border-t border-sand/10 pt-4">
                <input type="hidden" name="id" value={r.id} />
                <button type="submit" className="border border-[#ff8aa8]/50 px-3 py-1.5 text-xs text-[#ff8aa8] hover:border-[#ff8aa8]">
                  Remove permanently
                </button>
                <span className="ml-3 text-xs text-sand/40">Deletes the review and its photos. Cannot be undone.</span>
              </form>
            </li>
          ))}
          {reviews.length === 0 && <li className="py-12 text-center text-sand/40">No reviews yet.</li>}
        </ul>
      </div>
    </main>
  );
}
