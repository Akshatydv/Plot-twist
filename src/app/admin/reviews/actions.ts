"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/admin";
import { isUuid } from "@/lib/guestRegistration";
import { deleteReview, setReviewReply } from "@/lib/reviewsStore";

/**
 * Reviews are published the moment they are posted — there is deliberately no
 * approve / reject / feature step, so the team cannot pick and choose. The only
 * two things an admin can do are reply publicly and remove a review (spam,
 * abuse, something unlawful, or a guest asking for theirs to come down).
 * Every action re-checks requireAdmin() — middleware is not the only gate.
 */
function refresh() {
  revalidatePath("/admin/reviews");
  revalidatePath("/reviews");
  revalidatePath("/");
}

/** Save (or, when empty, remove) the team's public reply. */
export async function replyReviewAction(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  if (!isUuid(id)) return;
  await setReviewReply(id, String(formData.get("reply") ?? ""));
  refresh();
}

export async function removeReviewAction(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  if (!isUuid(id)) return;
  await deleteReview(id);
  refresh();
}
