CREATE TABLE IF NOT EXISTS donation_inquiries (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  name TEXT NOT NULL,
  org_name TEXT,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  item_type TEXT NOT NULL,
  condition TEXT NOT NULL,
  brand_model TEXT,
  pickup_needed BOOLEAN NOT NULL DEFAULT false,
  notes TEXT,
  status TEXT NOT NULL DEFAULT 'new',
  honeypot TEXT
);
