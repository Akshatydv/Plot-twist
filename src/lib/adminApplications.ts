import "server-only";
import { serviceRoleClient } from "./supabase/serviceRole";
import { APPLICATION_STATUSES, type ApplicationStatus, type StoredApplication } from "./applications";

/**
 * ADMIN DATA ACCESS — the only place in the app that reads applicant
 * records. Every export here assumes the caller has ALREADY authorised
 * itself; nothing in this file checks auth. Today that means either
 * requireAdmin() in a Server Component/Action, or the shared-secret check in
 * /api/internal/notifications/application, which reads one record by id to
 * build the casting email.
 */

const TABLE = process.env.SUPABASE_APPLICATIONS_TABLE ?? "applications";

export type ApplicationListRow = Pick<
  StoredApplication,
  "id" | "name" | "instagram" | "age" | "city" | "submitted_at" | "status" | "journey"
>;

export type ApplicationFilters = {
  status?: ApplicationStatus | "ALL";
  journey?: string;
  /** Matched against name and Instagram handle only — see point 11 of the brief. */
  q?: string;
  sort?: "newest" | "oldest";
};

/** Strip characters that would break PostgREST's or-filter syntax rather than reject the search. */
function sanitiseSearchTerm(raw: string) {
  return raw.trim().replace(/[,()%_]/g, "").slice(0, 60);
}

export async function listApplications(filters: ApplicationFilters): Promise<ApplicationListRow[]> {
  const client = serviceRoleClient();
  let query = client.from(TABLE).select("id,name,instagram,age,city,submitted_at,status,journey");

  if (filters.status && filters.status !== "ALL") query = query.eq("status", filters.status);
  if (filters.journey) query = query.eq("journey", filters.journey);

  const term = sanitiseSearchTerm(filters.q ?? "");
  if (term) query = query.or(`name.ilike.%${term}%,instagram.ilike.%${term}%`);

  query = query.order("submitted_at", { ascending: filters.sort === "oldest" });

  const { data, error } = await query;
  if (error) throw error;
  return (data ?? []) as ApplicationListRow[];
}

export type ApplicationCounts = { total: number; byStatus: Record<ApplicationStatus, number> };

async function countWhere(status?: ApplicationStatus, journey?: string) {
  const client = serviceRoleClient();
  let q = client.from(TABLE).select("id", { count: "exact", head: true });
  if (status) q = q.eq("status", status);
  if (journey) q = q.eq("journey", journey);
  const { count, error } = await q;
  if (error) throw error;
  return count ?? 0;
}

/** Real numbers from the database — never fabricated, per the brief. */
export async function getApplicationCounts(journey?: string): Promise<ApplicationCounts> {
  const [total, ...statusCounts] = await Promise.all([
    countWhere(undefined, journey),
    ...APPLICATION_STATUSES.map((status) => countWhere(status, journey)),
  ]);

  const byStatus = Object.fromEntries(
    APPLICATION_STATUSES.map((status, i) => [status, statusCounts[i]])
  ) as Record<ApplicationStatus, number>;

  return { total, byStatus };
}

export async function getApplication(id: string): Promise<StoredApplication | null> {
  const client = serviceRoleClient();
  const { data, error } = await client.from(TABLE).select("*").eq("id", id).maybeSingle();
  if (error) throw error;
  return data as StoredApplication | null;
}

export async function updateApplicationStatus(id: string, status: ApplicationStatus) {
  const { error } = await serviceRoleClient().from(TABLE).update({ status }).eq("id", id);
  if (error) throw error;
}

export async function updateApplicationNotes(id: string, notes: string) {
  const { error } = await serviceRoleClient()
    .from(TABLE)
    .update({ notes: notes.trim() || null })
    .eq("id", id);
  if (error) throw error;
}
