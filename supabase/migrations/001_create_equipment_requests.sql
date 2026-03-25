CREATE TABLE IF NOT EXISTS equipment_requests (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  city TEXT NOT NULL,
  county TEXT NOT NULL,
  tn_resident BOOLEAN NOT NULL DEFAULT true,
  role TEXT NOT NULL,
  equipment_needed TEXT NOT NULL,
  urgency TEXT NOT NULL,
  notes TEXT,
  status TEXT NOT NULL DEFAULT 'new',
  honeypot TEXT
);
