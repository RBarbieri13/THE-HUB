import type { Metadata } from "next";
import { PageHeader } from "@/components/shared/page-header";
import { SectionWrapper } from "@/components/layout/section-wrapper";
import { InventoryTable } from "@/components/inventory/inventory-table";
import { DisclaimerNotice } from "@/components/shared/disclaimer-notice";
import { MOCK_INVENTORY } from "@/data/mock-inventory";

export const metadata: Metadata = { title: "Inventory Portal" };

export default function PortalPage() {
  // In production, this would fetch from Supabase with auth check
  const items = MOCK_INVENTORY.map((item) => ({
    ...item,
    synced_at: item.last_updated,
  }));

  return (
    <>
      <PageHeader
        title="Inventory Portal"
        subtitle="Browse and search available equipment"
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Inventory Portal" }]}
      />
      <SectionWrapper bg="white">
        <InventoryTable items={items} />
      </SectionWrapper>
      <SectionWrapper bg="off-white">
        <DisclaimerNotice variant="info" title="Inventory Accuracy">
          <p>
            Inventory is updated regularly, but availability may change quickly.
            Submitting interest in an item does not guarantee that it is currently
            available or appropriate for your needs. Please contact us to confirm.
          </p>
        </DisclaimerNotice>
      </SectionWrapper>
    </>
  );
}
