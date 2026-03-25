import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const authHeader = request.headers.get("Authorization");
  const expectedToken = process.env.SYNC_SECRET;

  if (!expectedToken || authHeader !== `Bearer ${expectedToken}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // TODO: Wire Airtable sync when base is ready
  // 1. Fetch all records from Airtable via fetchAllRecords()
  // 2. Map to InventoryItem shape
  // 3. Upsert into Supabase inventory_items table
  // 4. Soft-delete items in Supabase that are no longer in Airtable

  return NextResponse.json({
    message: "Inventory sync not yet configured. Set up Airtable credentials to enable.",
    synced: 0,
    removed: 0,
  });
}
