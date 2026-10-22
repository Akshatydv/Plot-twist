import Link from "next/link";
import { requireAdmin } from "@/lib/admin";
import { consentOf, listGuests } from "@/lib/adminGuests";
import { CONSENT_IDS, GUEST_TRIP } from "@/lib/guestRegistration";
import { AdminHeader } from "@/components/admin/AdminHeader";

export const dynamic = "force-dynamic";

function formatDate(iso: string) {
  return new Date(iso).toLocaleString("en-GB", { day: "2-digit", month: "short", hour: "2-digit", minute: "2-digit" });
}

/**
 * Guest registrations for the current trip. Deliberately small: search, the
 * consent picture at a glance, and the full record on expand. Every request
 * re-checks requireAdmin() — middleware is the first gate, not the only one.
 *
 * There is no "incomplete" state to show: the form keeps nothing server-side
 * until the guest submits, so a registration either exists in full or not at
 * all. Guests who haven't registered are found by comparing against the
 * confirmed-guest list, not this page.
 */
export default async function GuestsPage({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  await requireAdmin();
  const { q = "" } = await searchParams;
  const rows = await listGuests({ q });

  return (
    <main className="min-h-screen bg-[#150711] px-5 py-8 text-sand sm:px-8">
      <div className="mx-auto max-w-[1100px]">
        <AdminHeader title={`Guest registrations — ${GUEST_TRIP.name}`} />

        <div className="mt-6 flex flex-wrap items-end justify-between gap-4">
          <span className="text-lg font-semibold">{rows.length} REGISTERED{q ? " (matching)" : ""}</span>
          <a href="/admin/guests/export" className="border border-sand/30 px-4 py-2 text-sm hover:border-sand/60">
            Download CSV (trip operations fields)
          </a>
        </div>

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
              placeholder="Name, email or reference"
              className="mt-1 border border-sand/20 bg-transparent px-3 py-2 text-sm outline-none focus:border-sand/50"
            />
          </div>
          <button type="submit" className="border border-sand/30 px-4 py-2 text-sm hover:border-sand/60">
            Search
          </button>
          {q && (
            <Link href="/admin/guests" className="text-xs text-sand/50 hover:text-sand">
              Clear
            </Link>
          )}
        </form>

        <div className="mt-6 overflow-x-auto">
          <table className="w-full min-w-[760px] text-left text-sm">
            <thead>
              <tr className="border-b border-sand/15 text-xs tracked text-sand/50">
                <th className="py-2 pr-4 font-normal">Guest</th>
                <th className="py-2 pr-4 font-normal">Reference</th>
                <th className="py-2 pr-4 font-normal">Registered</th>
                <th className="py-2 pr-4 font-normal">Status</th>
                <th className="py-2 pr-4 font-normal">Consents</th>
                <th className="py-2 pr-4 font-normal">ID</th>
              </tr>
            </thead>
            {rows.map((r) => {
              const allConsents = CONSENT_IDS.every((id) => consentOf(r, id)?.granted);
              return (
                <tbody key={r.id} className="border-b border-sand/10">
                  <tr className="hover:bg-white/[0.03]">
                    <td className="py-2.5 pr-4">
                      <details>
                        <summary className="cursor-pointer underline-offset-2 hover:underline">{r.full_name}</summary>
                        <dl className="mt-3 grid max-w-[640px] grid-cols-[10rem_1fr] gap-x-4 gap-y-1.5 pb-3 text-xs text-sand/75">
                          <dt className="text-sand/45">Email</dt>
                          <dd>{r.email}</dd>
                          <dt className="text-sand/45">Phone</dt>
                          <dd>{r.phone}</dd>
                          <dt className="text-sand/45">Date of birth</dt>
                          <dd>{r.date_of_birth}</dd>
                          <dt className="text-sand/45">City</dt>
                          <dd>{r.city}</dd>
                          <dt className="text-sand/45">Emergency contact</dt>
                          <dd>
                            {r.emergency_name} ({r.emergency_relationship}) · {r.emergency_phone}
                          </dd>
                          <dt className="text-sand/45">Safety note</dt>
                          <dd className="whitespace-pre-wrap">{r.safety_note ?? "—"}</dd>
                          <dt className="text-sand/45">Consent records</dt>
                          <dd>
                            <ul className="space-y-0.5">
                              {CONSENT_IDS.map((id) => {
                                const c = consentOf(r, id);
                                return (
                                  <li key={id}>
                                    {id}: <b>{c ? (c.granted ? "yes" : "no") : "missing"}</b>
                                    {c && <span className="text-sand/45"> · {c.policy_version} · {formatDate(c.recorded_at)}</span>}
                                  </li>
                                );
                              })}
                            </ul>
                          </dd>
                        </dl>
                      </details>
                    </td>
                    <td className="py-2.5 pr-4 font-mono text-xs text-sand/70">{r.reference}</td>
                    <td className="py-2.5 pr-4 text-sand/60">{formatDate(r.created_at)}</td>
                    <td className="py-2.5 pr-4">
                      <span className="border border-sand/20 px-2 py-0.5 text-xs">{r.status}</span>
                    </td>
                    <td className="py-2.5 pr-4">{allConsents ? "✓ all 6" : <span className="text-[#ff8aa8]">incomplete</span>}</td>
                    <td className="py-2.5 pr-4">
                      {r.id_document_path ? (
                        <a href={`/admin/guests/${r.id}/id`} target="_blank" rel="noopener noreferrer" className="underline-offset-2 hover:underline">
                          View
                        </a>
                      ) : (
                        <span className="text-[#ff8aa8]">missing</span>
                      )}
                    </td>
                  </tr>
                </tbody>
              );
            })}
            {rows.length === 0 && (
              <tbody>
                <tr>
                  <td colSpan={7} className="py-10 text-center text-sand/40">
                    No registrations {q ? "match" : "yet"}.
                  </td>
                </tr>
              </tbody>
            )}
          </table>
        </div>
      </div>
    </main>
  );
}
