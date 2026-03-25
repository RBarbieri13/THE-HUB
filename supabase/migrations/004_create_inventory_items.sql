CREATE TABLE IF NOT EXISTS inventory_items (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  airtable_record_id TEXT UNIQUE NOT NULL,
  category TEXT NOT NULL,
  item_type TEXT NOT NULL,
  brand TEXT,
  model TEXT,
  size TEXT,
  power_type TEXT,
  condition TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'available',
  notes TEXT,
  image_url TEXT,
  last_updated TIMESTAMPTZ DEFAULT now() NOT NULL,
  synced_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

CREATE INDEX idx_inventory_category ON inventory_items(category);
CREATE INDEX idx_inventory_status ON inventory_items(status);
CREATE INDEX idx_inventory_airtable_id ON inventory_items(airtable_record_id);
