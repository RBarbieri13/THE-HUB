import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ShieldCheck } from "lucide-react";
import { SectionWrapper } from "@/components/layout/section-wrapper";
import { PageHeader } from "@/components/shared/page-header";
import { DisclaimerNotice } from "@/components/shared/disclaimer-notice";
import { ScrollReveal } from "@/components/shared/scroll-reveal";
import { EquipmentMark } from "@/components/shared/equipment-mark";
import { getEquipmentIcon } from "@/lib/equipment-icons";

export const metadata: Metadata = {
  title: "Equipment Inventory",
};

const CATEGORY_TABLE = [
  {
    category: "Manual Wheelchair",
    kind: "wheelchair" as const,
    typicalSizes: "Pediatric · 16\" · 18\" · 20\"+",
    example: "Ultra-lightweight rigid & folding frames",
  },
  {
    category: "Power Wheelchair",
    kind: "power" as const,
    typicalSizes: "Mid-wheel · Rear-wheel drive",
    example: "Complex rehab & standard power bases",
  },
  {
    category: "Cushion / Seating",
    kind: "cushion" as const,
    typicalSizes: "14\" – 22\" widths",
    example: "ROHO, Jay, Varilite, foam inserts",
  },
  {
    category: "Walker / Rollator",
    kind: "walker" as const,
    typicalSizes: "Standard · Bariatric · Pediatric",
    example: "4-wheel rollators & 2-wheel walkers",
  },
  {
    category: "Bath / Shower Equipment",
    kind: "shower" as const,
    typicalSizes: "Multiple sizes",
    example: "Tub transfer benches, shower chairs, commodes",
  },
  {
    category: "Transfer Equipment",
    kind: "transfer" as const,
    typicalSizes: "Patient lifts & boards",
    example: "Hoyer lifts, slide boards, gait belts",
  },
  {
    category: "Ramp / Accessibility",
    kind: "ramp" as const,
    typicalSizes: "Portable & threshold",
    example: "Folding, single-fold, and threshold ramps",
  },
  {
    category: "Scooter",
    kind: "scooter" as const,
    typicalSizes: "3- and 4-wheel",
    example: "Travel and full-size mobility scooters",
  },
  {
    category: "Standing Frame",
    kind: "standing" as const,
    typicalSizes: "Pediatric & adult",
    example: "Static and dynamic standers",
  },
  {
    category: "Other Adaptive",
    kind: "other" as const,
    typicalSizes: "Varies",
    example: "Canes, crutches, grab bars, adaptive tools",
  },
];

const THANK_YOU_PHOTOS = [
  {
    src: "/images/stock/wheelchair-room.jpg",
    alt: "Donated equipment waiting for refurbishment",
  },
  {
    src: "/images/stock/wheelchair-home.jpg",
    alt: "A refurbished wheelchair in use at home",
  },
  {
    src: "/images/stock/wheelchair-walker.jpg",
    alt: "A rollator walker delivered to a recipient",
  },
];

export default function InventoryPage() {
  return (
    <>
      <PageHeader
        eyebrow="Inventory"
        title="Adaptive equipment, available now."
        subtitle="A high-level view of what moves through our closet. Because inventory changes daily — and to protect the privacy of our recipients — we don't publish item-by-item listings."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Inventory" },
        ]}
      />

      {/* Category table */}
      <SectionWrapper bg="white">
        <ScrollReveal animation="fade-up">
          <div className="max-w-3xl">
            <span className="eyebrow">What we carry</span>
            <h2 className="h2-editorial mt-5">
              Ten categories of mobility & daily-living equipment.
            </h2>
            <p className="lead-editorial mt-5 max-w-[62ch]">
              Looking for something specific? Submit a request and we&apos;ll
              confirm current availability within a few business days.
            </p>
          </div>
        </ScrollReveal>

        {/* Mobile: stacked cards. Desktop: table */}
        <ScrollReveal animation="fade-up" delay={100}>
          <div className="mt-12 border border-ink-900/10 rounded-[10px] overflow-hidden bg-white">
            {/* Header row (desktop only) */}
            <div className="hidden md:grid grid-cols-[180px_1.1fr_1fr_1.2fr] gap-4 px-6 py-4 bg-cream-100 border-b border-ink-900/10 font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.1em] text-ink-muted">
              <div>&nbsp;</div>
              <div>Category</div>
              <div>Typical sizes</div>
              <div>Example items</div>
            </div>

            {CATEGORY_TABLE.map((row, i) => {
              const Icon = getEquipmentIcon(row.category.replace("Other Adaptive", "Other Adaptive Equipment"));
              return (
                <div
                  key={row.category}
                  className={`
                    grid grid-cols-1 md:grid-cols-[180px_1.1fr_1fr_1.2fr] gap-4 px-6 py-6 items-center
                    ${i < CATEGORY_TABLE.length - 1 ? "border-b border-ink-900/10" : ""}
                    hover:bg-cream-50 transition-colors
                  `}
                >
                  <div className="ph-stripe aspect-[4/3] md:aspect-square rounded-[8px] flex items-center justify-center overflow-hidden">
                    <EquipmentMark kind={row.kind} tone="teal" className="w-[60%] max-w-[80px]" />
                  </div>
                  <div>
                    <div className="font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.1em] text-ink-muted md:hidden">
                      Category
                    </div>
                    <div className="flex items-center gap-2 mt-1 md:mt-0">
                      <Icon className="h-4 w-4 text-teal-700 shrink-0" />
                      <div className="font-[family-name:var(--font-display)] text-[20px] font-medium text-ink-900 leading-[1.15]">
                        {row.category}
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.1em] text-ink-muted md:hidden">
                      Typical sizes
                    </div>
                    <div className="text-ink-body text-[15px] mt-1 md:mt-0">
                      {row.typicalSizes}
                    </div>
                  </div>
                  <div>
                    <div className="font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.1em] text-ink-muted md:hidden">
                      Example items
                    </div>
                    <div className="text-ink-body text-[15px] mt-1 md:mt-0 leading-[1.5]">
                      {row.example}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </ScrollReveal>

        {/* Privacy note */}
        <ScrollReveal animation="fade-up" delay={200}>
          <div className="mt-8 flex items-start gap-3 p-5 bg-teal-50 border border-teal-700/15 rounded-[10px] max-w-3xl">
            <ShieldCheck className="h-5 w-5 text-teal-700 shrink-0 mt-0.5" />
            <div>
              <div className="font-semibold text-ink-900 text-[15px]">
                Why we don&apos;t list individual items
              </div>
              <p className="text-ink-body text-[14px] leading-[1.55] mt-1">
                To protect donor and recipient privacy and to reduce the risk
                of targeted theft, we don&apos;t publish serial numbers,
                photos, or counts of specific items. Submit a request — our
                team will confirm what&apos;s available and appropriate.
              </p>
            </div>
          </div>
        </ScrollReveal>
      </SectionWrapper>

      {/* Thank-you photo strip */}
      <SectionWrapper bg="cream">
        <ScrollReveal animation="fade-up">
          <div className="max-w-3xl">
            <span className="eyebrow">From the closet</span>
            <h2 className="h2-editorial mt-5">
              A few pieces already on our shelves.
            </h2>
            <p className="lead-editorial mt-5 max-w-[58ch]">
              Thank you to the donors who got us started. These are a few of
              the items we&apos;ve refurbished and photographed since opening.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-10">
          {THANK_YOU_PHOTOS.map((photo, i) => (
            <ScrollReveal key={photo.src} animation="fade-up" delay={i * 120}>
              <div className="relative aspect-[4/3] rounded-[10px] overflow-hidden group">
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
            </ScrollReveal>
          ))}
        </div>
      </SectionWrapper>

      {/* CTA */}
      <SectionWrapper bg="white">
        <ScrollReveal animation="fade-up">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
            <div>
              <span className="eyebrow">Request</span>
              <h2 className="h2-editorial mt-5">
                Looking for something specific?
              </h2>
              <p className="lead-editorial mt-5 max-w-[54ch]">
                Tell us what would help — size, setup, urgency — and we&apos;ll
                confirm availability or coordinate a match.
              </p>
              <Link
                href="/get-equipment"
                className="group mt-7 inline-flex items-center gap-2 px-6 py-3.5 bg-orange-600 hover:bg-orange-700 text-white font-semibold text-[15px] rounded-[6px] transition-colors"
              >
                Start a request
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>
            <div>
              <DisclaimerNotice variant="info" title="Inventory availability">
                <p>
                  Availability changes daily as items arrive and get placed.
                  Submitting a request does not reserve an item — our team
                  confirms fit and condition before placement.
                </p>
              </DisclaimerNotice>
            </div>
          </div>
        </ScrollReveal>
      </SectionWrapper>
    </>
  );
}
