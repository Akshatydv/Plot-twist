import { notFound } from "next/navigation";
import { requireAdmin } from "@/lib/admin";
import { getApplication } from "@/lib/adminApplications";
import { APPLICATION_STATUSES, type ApplicationStatus } from "@/lib/applications";
import { application as applicationCopy } from "@/content/site";
import { rewardById } from "@/content/rewards";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { setNotesAction, setStatusAction } from "./actions";

export const dynamic = "force-dynamic";

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline justify-between gap-4 border-b border-sand/10 py-2">
      <dt className="shrink-0 text-xs tracked text-sand/50">{label}</dt>
      <dd className="text-right text-sand">{value}</dd>
    </div>
  );
}

/** The three answers, in the order and wording the applicant actually saw — see content/site.ts. */
const ANSWER_KEYS = ["answer_1", "answer_2", "answer_3"] as const;

export default async function ApplicationDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await requireAdmin();
  const { id } = await params;

  const app = await getApplication(id);
  if (!app) notFound();

  return (
    <main className="min-h-screen bg-[#150711] px-5 py-8 text-sand sm:px-8">
      <div className="mx-auto max-w-[1000px]">
        <AdminHeader title={app.name} backHref="/admin/applications" />

        <div className="mt-6 grid gap-10 lg:grid-cols-[1fr_1.2fr]">
          {/* ---- who they are ---- */}
          <section>
            <dl>
              <Row label="INSTAGRAM" value={app.instagram} />
              <Row label="MOBILE" value={app.mobile} />
              <Row label="AGE" value={String(app.age)} />
              <Row label="CITY" value={app.city} />
              <Row label="APPLICATION DATE" value={new Date(app.submitted_at).toLocaleString()} />
              <Row label="JOURNEY" value={app.journey} />
              <Row label="CLUE PROGRESS" value={`${app.clue_progress} / 5`} />
              <Row label="DESTINATION GUESS" value={app.destination_guess ?? "—"} />
              {/* Resolved to its title so the pool id isn't the only thing on screen. */}
              <Row label="PLOT TWIST REWARD" value={rewardById(app.reward_id)?.title ?? "—"} />
            </dl>

            {/* Where they came from. Anonymous campaign labels, never a fingerprint. */}
            <h2 className="mt-8 text-xs tracked text-sand/50">ACQUISITION</h2>
            <dl className="mt-1">
              <Row label="SOURCE" value={app.source ?? "—"} />
              <Row label="MEDIUM" value={app.medium ?? "—"} />
              <Row label="CAMPAIGN" value={app.campaign ?? "—"} />
              <Row label="CONTENT" value={app.content ?? "—"} />
            </dl>

            {/* ---- status ---- */}
            <div className="mt-8">
              <h2 className="text-xs tracked text-sand/50">STATUS</h2>
              <form action={setStatusAction} className="mt-2 flex flex-wrap gap-2">
                <input type="hidden" name="id" value={app.id} />
                {APPLICATION_STATUSES.map((s) => (
                  <StatusButton key={s} status={s} current={app.status} />
                ))}
              </form>
            </div>

            {/* ---- notes: private, manual-casting scratchpad ---- */}
            <div className="mt-8">
              <h2 className="text-xs tracked text-sand/50">NOTES — private, admin-only</h2>
              <form action={setNotesAction} className="mt-2">
                <input type="hidden" name="id" value={app.id} />
                <textarea
                  name="notes"
                  defaultValue={app.notes ?? ""}
                  rows={4}
                  placeholder="Great profile. Strong energy. Call."
                  className="w-full resize-none border border-sand/20 bg-transparent px-3 py-2 text-sm outline-none focus:border-sand/50"
                />
                <button type="submit" className="mt-2 border border-sand/30 px-4 py-1.5 text-xs hover:border-sand/60">
                  Save note
                </button>
              </form>
            </div>
          </section>

          {/* ---- the answers — the actual casting material ---- */}
          <section className="space-y-7">
            {applicationCopy.questions.map((q, i) => (
              <div key={q.name}>
                <div className="text-xs tracked text-sand/50">QUESTION {q.n}</div>
                <p className="mt-1 font-serif italic leading-snug text-sand/75">{q.label}</p>
                <p className="mt-2 whitespace-pre-wrap leading-relaxed text-sand">
                  {app[ANSWER_KEYS[i]]}
                </p>
              </div>
            ))}
          </section>
        </div>
      </div>
    </main>
  );
}

function StatusButton({ status, current }: { status: ApplicationStatus; current: ApplicationStatus }) {
  const active = status === current;
  return (
    <button
      type="submit"
      name="status"
      value={status}
      disabled={active}
      className={
        active
          ? "border-2 border-sand bg-sand px-4 py-2 text-xs font-semibold text-ink"
          : "border border-sand/25 px-4 py-2 text-xs text-sand/70 hover:border-sand/50 hover:text-sand"
      }
    >
      {status}
    </button>
  );
}
