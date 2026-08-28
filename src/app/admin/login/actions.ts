"use server";

import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { isAdminEmail } from "@/lib/adminAllowlist";

export type SignInState = { error?: string };

export async function signIn(_prev: SignInState, formData: FormData): Promise<SignInState> {
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");

  if (!email || !password) {
    return { error: "Enter your email and password." };
  }

  let supabase;
  try {
    supabase = await createSupabaseServerClient();
  } catch {
    return { error: "Auth isn't configured yet. Set SUPABASE_URL and SUPABASE_ANON_KEY." };
  }

  const { data, error } = await supabase.auth.signInWithPassword({ email, password });

  if (error || !data.user) {
    return { error: "That email or password isn't right." };
  }

  if (!isAdminEmail(data.user.email)) {
    await supabase.auth.signOut();
    return { error: "That account isn't on the casting team." };
  }

  redirect("/admin/applications");
}
