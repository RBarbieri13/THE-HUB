"use server";

import { loginSchema } from "@/lib/validations/auth";
import type { ActionResult } from "@/lib/types";

export async function login(data: unknown): Promise<ActionResult> {
  const parsed = loginSchema.safeParse(data);

  if (!parsed.success) {
    return {
      success: false,
      error: "Please fix the errors below.",
      fieldErrors: parsed.error.flatten().fieldErrors as Record<
        string,
        string[]
      >,
    };
  }

  // TODO: Wire to Supabase when connected
  // const supabase = await createClient();
  // const { error } = await supabase.auth.signInWithPassword({
  //   email: parsed.data.email,
  //   password: parsed.data.password,
  // });
  // if (error) return { success: false, error: error.message };

  return { success: true };
}
