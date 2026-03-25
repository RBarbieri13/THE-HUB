"use server";

import { equipmentRequestSchema } from "@/lib/validations/equipment-request";
import type { ActionResult } from "@/lib/types";

export async function submitEquipmentRequest(
  data: unknown
): Promise<ActionResult> {
  const parsed = equipmentRequestSchema.safeParse(data);

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

  // Spam check: if honeypot is filled, silently succeed
  if (parsed.data.honeypot) {
    return { success: true };
  }

  // TODO: Insert into Supabase when connected
  // const supabase = await createClient();
  // const { error } = await supabase.from("equipment_requests").insert({...});

  return { success: true };
}
