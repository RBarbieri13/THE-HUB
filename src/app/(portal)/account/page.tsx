import type { Metadata } from "next";
import { PageHeader } from "@/components/shared/page-header";
import { SectionWrapper } from "@/components/layout/section-wrapper";
import { Card, CardContent } from "@/components/ui/card";

export const metadata: Metadata = { title: "My Account" };

export default function AccountPage() {
  return (
    <>
      <PageHeader
        title="My Account"
        subtitle="Manage your profile and preferences"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Inventory Portal", href: "/portal" },
          { label: "My Account" },
        ]}
      />
      <SectionWrapper bg="white">
        <Card>
          <CardContent className="p-8">
            <h3 className="font-heading text-xl font-semibold mb-4">
              Account Information
            </h3>
            <p className="text-text-secondary mb-6">
              Account management features will be available once authentication
              is connected.
            </p>
            <div>
              <h4 className="font-heading font-semibold text-sm mb-3">
                Coming Soon
              </h4>
              <ul className="list-disc list-inside space-y-2 text-sm text-text-secondary">
                <li>View and edit your profile information</li>
                <li>Update notification preferences</li>
                <li>View your equipment request history</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </SectionWrapper>
    </>
  );
}
