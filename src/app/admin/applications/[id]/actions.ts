"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/admin";
import { updateApplicationNotes, updateApplicationStatus } from "@/lib/adminApplications";
import { APPLICATION_STATUSES, type ApplicationStatus } from "@/lib/applications";

function isStatus(value: FormDataEntryValue | null): value is ApplicationStatus {
  return typeof value === "string" && (APPLICATION_STATUSES as string[]).includes(value);
}

/** One form, four submit buttons sharing `name="status"` — see the page. */
export async function setStatusAction(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  const status = formData.get("status");
  if (!id || !isStatus(status)) return;

  await updateApplicationStatus(id, status);
  revalidatePath(`/admin/applications/${id}`);
  revalidatePath("/admin/applications");
}

export async function setNotesAction(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  if (!id) return;

  await updateApplicationNotes(id, String(formData.get("notes") ?? ""));
  revalidatePath(`/admin/applications/${id}`);
}
