import { z } from "zod";

export const donationInquirySchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  org_name: z.string().optional(),
  email: z.string().email("Please enter a valid email address"),
  phone: z
    .string()
    .min(10, "Please enter a valid phone number")
    .regex(/^[\d\s\-\(\)\+]+$/, "Please enter a valid phone number"),
  item_type: z.string().min(1, "Please select an item type"),
  condition: z.string().min(1, "Please select item condition"),
  brand_model: z.string().optional(),
  pickup_needed: z.boolean().default(false),
  notes: z.string().optional(),
  honeypot: z.string().max(0).optional(),
});

export type DonationInquiryInput = z.input<typeof donationInquirySchema>;
