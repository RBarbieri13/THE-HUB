import type { Metadata } from "next";
import Link from "next/link";
import { SectionWrapper } from "@/components/layout/section-wrapper";
import { PageHeader } from "@/components/shared/page-header";
import { WebcamViewer } from "@/components/shared/webcam-viewer";
import { DisclaimerNotice } from "@/components/shared/disclaimer-notice";
import { Card } from "@/components/ui/card";
import { ScrollReveal } from "@/components/shared/scroll-reveal";
import { EQUIPMENT_CATEGORIES } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Live Closet View",
};

export default function LiveClosetPage() {
  return (
    <>
      <PageHeader
        title="Live Closet View"
        subtitle="See inside our equipment closet in real time"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Live Closet View" },
        ]}
      />

      <SectionWrapper bg="white">
        <div className="section-divider mx-auto mb-5" />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <ScrollReveal animation="fade-left" className="lg:col-span-2">
            <Card>
              <WebcamViewer />
            </Card>
          </ScrollReveal>

          <ScrollReveal animation="fade-right">
            <div className="bg-white border border-[#E5E5E5] rounded-[3px] shadow-md p-6">
              <h3 className="font-heading text-xl font-bold text-text-heading">
                What&apos;s Available
              </h3>
              <p className="mt-1 text-sm text-text-light">
                Quick counts by category:
              </p>

              <div className="mt-4">
                {EQUIPMENT_CATEGORIES.map((category) => (
                  <div
                    key={category}
                    className="flex justify-between py-2 border-b border-[#E5E5E5] text-sm"
                  >
                    <span>{category}</span>
                    <span className="text-text-light">&mdash;</span>
                  </div>
                ))}
              </div>

              <Link
                href="/inventory"
                className="inline-block mt-6 text-sm font-semibold text-primary-dark hover:underline"
              >
                View full inventory &rarr;
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </SectionWrapper>

      <SectionWrapper bg="off-white">
        <ScrollReveal animation="fade-up">
          <DisclaimerNotice variant="info" title="About This View">
            <p>
              This live view is provided to increase transparency and awareness of
              available equipment.
            </p>
            <p className="mt-2">
              Inventory shown in the camera view may not reflect all items
              currently available. Inventory changes quickly.
            </p>
            <p className="mt-2">
              For the most accurate information, check the inventory portal or
              contact us directly.
            </p>
          </DisclaimerNotice>
        </ScrollReveal>
      </SectionWrapper>
    </>
  );
}
