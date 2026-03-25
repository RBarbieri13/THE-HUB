import { z } from "zod";

export const equipmentRequestSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z
    .string()
    .min(10, "Please enter a valid phone number")
    .regex(/^[\d\s\-\(\)\+]+$/, "Please enter a valid phone number"),
  city: z.string().min(2, "City is required"),
  county: z.string().min(2, "County is required"),
  tn_resident: z.literal(true, {
    errorMap: () => ({
      message: "You must be a Tennessee resident to request equipment",
    }),
  }),
  role: z.string().min(1, "Please select your role"),
  equipment_needed: z
    .string()
    .min(10, "Please describe the equipment you need (at least 10 characters)"),
  urgency: z.string().min(1, "Please select urgency level"),
  notes: z.string().optional(),
  honeypot: z.string().max(0).optional(),
});

export type EquipmentRequestInput = z.infer<typeof equipmentRequestSchema>;
