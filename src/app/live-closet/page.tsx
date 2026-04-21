import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SectionWrapper } from "@/components/layout/section-wrapper";
import { PageHeader } from "@/components/shared/page-header";
import { WebcamViewer } from "@/components/shared/webcam-viewer";
import { DisclaimerNotice } from "@/components/shared/disclaimer-notice";
import { ScrollReveal } from "@/components/shared/scroll-reveal";
import { EQUIPMENT_CATEGORIES } from "@/lib/constants";
import { getEquipmentIcon } from "@/lib/equipment-icons";

export const metadata: Metadata = {
  title: "Live Closet View",
};

export default function LiveClosetPage() {
  return (
    <>
      <PageHeader
        eyebrow="Live closet"
        title="See inside the closet in real time."
        subtitle="A transparent look at The Hub — live from our refurbishment bay. Inventory changes daily, and this view helps donors, recipients, and partners see what's coming through."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Live Closet" },
        ]}
      />

      {/* Video + category sidebar */}
      <SectionWrapper bg="white">
        <div className="grid grid-cols-1 lg:grid-cols-[1.6fr_1fr] gap-8">
          <ScrollReveal animation="fade-up">
            <div className="bg-white border border-ink-900/10 rounded-[12px] overflow-hidden shadow-[0_4px_16px_rgba(12,57,64,0.05)]">
              <WebcamViewer />
            </div>
          </ScrollReveal>

          <ScrollReveal animation="fade-up" delay={120}>
            <div className="bg-cream-50 border border-ink-900/10 rounded-[12px] p-7">
              <span className="eyebrow">What we carry</span>
              <h3 className="font-[family-name:var(--font-display)] text-[24px] font-medium text-ink-900 mt-4 leading-[1.15]">
                Categories in the closet
              </h3>
              <p className="mt-2 text-ink-body text-[14px] leading-[1.55]">
                We don&apos;t publish live counts — but here&apos;s what lives
                on our shelves.
              </p>

              <ul className="mt-5 divide-y divide-ink-900/10">
                {EQUIPMENT_CATEGORIES.map((category) => {
                  const Icon = getEquipmentIcon(category);
                  return (
                    <li
                      key={category}
                      className="flex items-center gap-3 py-3 text-[14px]"
                    >
                      <Icon className="h-4 w-4 text-teal-700 shrink-0" />
                      <span className="text-ink-body flex-1">{category}</span>
                    </li>
                  );
                })}
              </ul>

              <Link
                href="/inventory"
                className="group mt-6 inline-flex items-center gap-2 text-teal-700 hover:text-orange-600 font-semibold border-b-2 border-current pb-0.5 transition-colors"
              >
                View full inventory
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </SectionWrapper>

      {/* Note */}
      <SectionWrapper bg="cream">
        <ScrollReveal animation="fade-up">
          <DisclaimerNotice variant="info" title="About this view">
            <p>
              This live view is provided to increase transparency and awareness
              of available equipment.
            </p>
            <p className="mt-2">
              Inventory shown in the camera may not reflect all items currently
              available — stock changes daily. Items in the view are not
              reservable directly.
            </p>
            <p className="mt-2">
              For the most accurate information, contact us directly or submit
              a request.
            </p>
          </DisclaimerNotice>
        </ScrollReveal>
      </SectionWrapper>
    </>
  );
}
