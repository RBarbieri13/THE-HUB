export interface InventoryItem {
  id: string;
  airtable_record_id: string;
  category: string;
  item_type: string;
  brand: string | null;
  model: string | null;
  size: string | null;
  power_type: "manual" | "power" | "n/a" | null;
  condition: string;
  status: string;
  notes: string | null;
  image_url: string | null;
  last_updated: string;
  synced_at: string;
}

export interface EquipmentRequest {
  id: string;
  created_at: string;
  name: string;
  email: string;
  phone: string;
  city: string;
  county: string;
  tn_resident: boolean;
  role: string;
  equipment_needed: string;
  urgency: string;
  notes: string | null;
  status: string;
}

export interface DonationInquiry {
  id: string;
  created_at: string;
  name: string;
  org_name: string | null;
  email: string;
  phone: string;
  item_type: string;
  condition: string;
  brand_model: string | null;
  pickup_needed: boolean;
  notes: string | null;
  status: string;
}

export interface ContactSubmission {
  id: string;
  created_at: string;
  name: string;
  email: string;
  category: string;
  message: string;
}

export interface CategoryCount {
  category: string;
  count: number;
}

export type ActionResult = {
  success: boolean;
  error?: string;
  fieldErrors?: Record<string, string[]>;
};
