// Airtable record type mapping — update field names when base is set up

export interface AirtableInventoryFields {
  "Item ID"?: string;
  Category?: string;
  "Item Type"?: string;
  Brand?: string;
  Model?: string;
  Size?: string;
  "Power Type"?: string;
  Condition?: string;
  Status?: string;
  Notes?: string;
  "Image"?: Array<{ url: string; thumbnails?: { small?: { url: string } } }>;
  "Last Updated"?: string;
}
