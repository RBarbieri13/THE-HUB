"use server";

import { forgotPasswordSchema } from "@/lib/validations/auth";
import type { ActionResult } from "@/lib/types";

export async function forgotPassword(data: unknown): Promise<ActionResult> {
  const parsed = forgotPasswordSchema.safeParse(data);

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
  // const { error } = await supabase.auth.resetPasswordForEmail(
  //   parsed.data.email,
  //   { redirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/auth/callback?next=/reset-password` }
  // );
  // if (error) return { success: false, error: error.message };

  return { success: true };
}
