import type { Metadata } from "next";
import Link from "next/link";
import { SectionWrapper } from "@/components/layout/section-wrapper";
import { PageHeader } from "@/components/shared/page-header";
import { DisclaimerNotice } from "@/components/shared/disclaimer-notice";
import { Card } from "@/components/ui/card";
import { ScrollReveal } from "@/components/shared/scroll-reveal";
import { EQUIPMENT_CATEGORIES } from "@/lib/constants";
import { getEquipmentIcon } from "@/lib/equipment-icons";

export const metadata: Metadata = {
  title: "Equipment Inventory",
};

const buttonBase =
  "inline-flex items-center justify-center gap-2 rounded-none font-heading font-semibold leading-none transition-all duration-200 px-[30px] py-[14px] text-base min-w-[150px]";

export default function InventoryPage() {
  return (
    <>
      <PageHeader
        title="Equipment Inventory"
        subtitle="Browse available adaptive equipment and supplies"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Equipment Inventory" },
        ]}
      />

      <SectionWrapper bg="white">
        <div className="section-divider mx-auto mb-5" />
        <ScrollReveal animation="fade-up">
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-text-heading">
            Available Categories
          </h2>
          <p className="mt-2 text-text-light">
            Browse equipment by category. Create a free account to see full
            details and availability.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mt-8">
          {EQUIPMENT_CATEGORIES.map((category, index) => {
            const Icon = getEquipmentIcon(category);
            return (
              <ScrollReveal key={category} animation="fade-up" delay={(index % 5) * 80}>
                <Card
                  hoverable
                  className="p-6 text-center border border-border hover:border-accent/30 hover:shadow-md hover:-translate-y-1 transition-all duration-300"
                >
                  {/* Icon in colored circle */}
                  <div className="w-12 h-12 rounded-full bg-primary-dark/10 flex items-center justify-center mx-auto mb-3">
                    <Icon className="h-6 w-6 text-primary-dark" aria-hidden="true" />
                  </div>
                  <p className="font-heading font-semibold text-sm text-text-primary leading-tight">
                    {category}
                  </p>
                </Card>
              </ScrollReveal>
            );
          })}
        </div>
      </SectionWrapper>

      {/* Login prompt — dark card with gradient overlay for depth */}
      <SectionWrapper bg="off-white">
        <ScrollReveal animation="fade-up">
          <div className="relative overflow-hidden rounded-sm shadow-xl border-t-4 border-t-accent">
            {/* Gradient overlay for depth */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(255,255,255,0.06),transparent_60%)]" aria-hidden="true" />
            <Card variant="dark" className="relative p-8 md:p-12 text-center border-0">
              <h2 className="font-heading text-2xl md:text-3xl font-bold text-white">
                See Full Inventory Details
              </h2>
              <p className="mt-3 text-white/80 max-w-2xl mx-auto">
                Create a free account to access our complete inventory portal with
                search, filters, and detailed item information.
              </p>
              <div className="flex flex-wrap justify-center gap-4 mt-8">
                <Link
                  href="/signup"
                  className={`${buttonBase} bg-accent text-white border-2 border-accent hover:bg-[#D45F1F] hover:border-[#D45F1F] shadow-lg shadow-accent/30 hover:shadow-xl hover:shadow-accent/40`}
                >
                  Create Account
                </Link>
                <Link
                  href="/login"
                  className={`${buttonBase} bg-transparent text-white border-2 border-white hover:bg-white/10`}
                >
                  Log In
                </Link>
              </div>
            </Card>
          </div>
        </ScrollReveal>
      </SectionWrapper>

      <SectionWrapper bg="white">
        <ScrollReveal animation="fade-up">
          <DisclaimerNotice variant="info" title="Inventory Availability">
            <p>
              Inventory is updated regularly, but availability may change quickly.
              Submitting interest in an item does not guarantee that it is
              currently available or appropriate for your needs. Please contact us
              to confirm availability.
            </p>
          </DisclaimerNotice>
        </ScrollReveal>
      </SectionWrapper>
    </>
  );
}
