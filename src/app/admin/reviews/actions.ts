"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/admin";
import { isUuid } from "@/lib/guestRegistration";
import { deleteReview, setReviewFeatured, setReviewReply, setReviewStatus } from "@/lib/reviewsStore";

/** Every action re-checks requireAdmin() — middleware is not the only gate. */
function refresh() {
  revalidatePath("/admin/reviews");
  // Approvals must show on the public pages without waiting for the 5-minute cache.
  revalidatePath("/reviews");
  revalidatePath("/");
}

export async function moderateReviewAction(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  const act = String(formData.get("act") ?? "");
  if (!isUuid(id)) return;

  if (act === "approve") await setReviewStatus(id, "APPROVED");
  else if (act === "reject") await setReviewStatus(id, "REJECTED");
  else if (act === "pending") await setReviewStatus(id, "PENDING");
  else if (act === "feature") await setReviewFeatured(id, true);
  else if (act === "unfeature") await setReviewFeatured(id, false);
  else if (act === "delete") await deleteReview(id);
  else return;
  refresh();
}

/** Save (or, when empty, remove) the team's public reply. */
export async function replyReviewAction(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  if (!isUuid(id)) return;
  await setReviewReply(id, String(formData.get("reply") ?? ""));
  refresh();
}
