-- Enable RLS on all tables
ALTER TABLE equipment_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE donation_inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE inventory_items ENABLE ROW LEVEL SECURITY;

-- Form submissions: anyone can insert (anon or authenticated)
CREATE POLICY "Anyone can submit equipment requests"
  ON equipment_requests FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Anyone can submit donation inquiries"
  ON donation_inquiries FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Anyone can submit contact forms"
  ON contact_submissions FOR INSERT
  WITH CHECK (true);

-- Inventory: only authenticated users can view individual items
CREATE POLICY "Authenticated users can view inventory"
  ON inventory_items FOR SELECT
  TO authenticated
  USING (true);

-- Public function for category counts (no auth required)
CREATE OR REPLACE FUNCTION public.get_inventory_category_counts()
RETURNS TABLE(category TEXT, count BIGINT)
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT category, COUNT(*)
  FROM inventory_items
  WHERE status = 'Available'
  GROUP BY category
  ORDER BY category;
$$;
