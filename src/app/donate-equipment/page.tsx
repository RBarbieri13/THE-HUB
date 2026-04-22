import type { Metadata } from "next";
import { CheckCircle2, XCircle } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { SectionWrapper } from "@/components/layout/section-wrapper";
import { DonationForm } from "@/components/forms/donation-form";
import { ScrollReveal } from "@/components/shared/scroll-reveal";
import { EQUIPMENT_CATEGORIES } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Donate Equipment",
  description:
    "Donate adaptive equipment to help Tennesseans with mobility disabilities. Your donation can change a life.",
};

const ACCEPTED_ITEMS = [
  "Manual and power wheelchairs",
  "Wheelchair cushions and seating systems",
  "Walkers and rollators",
  "Bath and shower equipment",
  "Transfer aids and Hoyer lifts",
  "Portable ramps",
  "Scooters",
  "Standing frames",
  "Other adaptive equipment and supplies",
];

const NOT_ACCEPTED = [
  "Hospital beds (limited space)",
  "Heavily damaged or non-repairable items",
  "Items with biohazard contamination",
  "Non-mobility-related medical equipment",
];

const DONATION_STEPS = [
  {
    n: "01",
    title: "Tell us about your donation",
    description:
      "Fill out the form below with details about what you'd like to donate — type, condition, pickup availability.",
  },
  {
    n: "02",
    title: "We review and coordinate",
    description:
      "Our team follows up to confirm fit for our program and arranges drop-off or pickup in the Nashville area.",
  },
  {
    n: "03",
    title: "Equipment finds a new home",
    description:
      "Donated items are cleaned, refurbished, and matched with a Tennessean who needs them.",
  },
];

export default function DonateEquipmentPage() {
  return (
    <>
      <PageHeader
        eyebrow="Donate equipment"
        title="Your donation stocks our shelves."
        subtitle="We opened in February 2026 and are actively building out the closet. Gently-used adaptive equipment gathering dust? It could change a life next week."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Donate" },
        ]}
        image={{
          src: "/images/stock/wheelchair-room.jpg",
          alt: "Donated wheelchairs and adaptive equipment organized in The Hub's refurbishment bay",
        }}
      />

      {/* Accept / Not accept */}
      <SectionWrapper bg="white">
        <ScrollReveal animation="fade-up">
          <div className="max-w-3xl">
            <span className="eyebrow">What we accept</span>
            <h2 className="h2-editorial mt-5">
              A quick gut-check before you reach out.
            </h2>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-12">
          <ScrollReveal animation="fade-up" delay={80}>
            <div className="bg-cream-50 border border-ink-900/10 rounded-[12px] p-8 h-full">
              <h3 className="font-[family-name:var(--font-display)] text-[24px] font-medium text-ink-900 tracking-[-0.015em]">
                What we accept
              </h3>
              <p className="mt-2 text-ink-body text-[15px] leading-[1.6]">
                A wide range of adaptive and mobility equipment in usable
                condition. Clean and functional, or repairable.
              </p>
              <ul className="mt-6 space-y-3">
                {ACCEPTED_ITEMS.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-teal-700 shrink-0 mt-0.5" />
                    <span className="text-ink-body text-[15px]">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </ScrollReveal>

          <ScrollReveal animation="fade-up" delay={160}>
            <div className="bg-white border border-ink-900/15 rounded-[12px] p-8 h-full">
              <h3 className="font-[family-name:var(--font-display)] text-[24px] font-medium text-ink-900 tracking-[-0.015em]">
                What we may not accept
              </h3>
              <p className="mt-2 text-ink-body text-[15px] leading-[1.6]">
                Due to space and safety constraints, we can&apos;t always take
                everything offered. When in doubt, ask.
              </p>
              <ul className="mt-6 space-y-3">
                {NOT_ACCEPTED.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <XCircle className="h-5 w-5 text-orange-700 shrink-0 mt-0.5" />
                    <span className="text-ink-body text-[15px]">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </ScrollReveal>
        </div>
      </SectionWrapper>

      {/* Process */}
      <SectionWrapper bg="cream">
        <ScrollReveal animation="fade-up">
          <div className="max-w-3xl">
            <span className="eyebrow">Donation process</span>
            <h2 className="h2-editorial mt-5">
              Three steps from your garage to someone&apos;s home.
            </h2>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mt-12">
          {DONATION_STEPS.map((step, i) => (
            <ScrollReveal key={step.n} animation="fade-up" delay={i * 120}>
              <div className="pt-6 border-t-2 border-ink-900">
                <div className="font-[family-name:var(--font-display)] text-[40px] font-medium text-orange-600 leading-none tracking-[-0.03em]">
                  {step.n}
                </div>
                <h3 className="h3-editorial mt-3">{step.title}</h3>
                <p className="mt-3 text-ink-body text-[15px] leading-[1.6]">
                  {step.description}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </SectionWrapper>

      {/* Form */}
      <SectionWrapper bg="white">
        <ScrollReveal animation="fade-up">
          <div className="max-w-3xl mx-auto">
            <span className="eyebrow">Submit a donation</span>
            <h2 className="h2-editorial mt-5">Submit a donation inquiry</h2>
            <p className="lead-editorial mt-5">
              Let us know what you&apos;d like to donate. Our team will follow
              up to coordinate next steps, including pickup if needed.
            </p>
            <div className="mt-10 bg-white border border-ink-900/10 rounded-[12px] shadow-[0_4px_16px_rgba(12,57,64,0.05)] p-8 md:p-10">
              <DonationForm />
            </div>
          </div>
        </ScrollReveal>
      </SectionWrapper>

      {/* Category chips */}
      <SectionWrapper bg="cream">
        <ScrollReveal animation="fade-up">
          <div className="max-w-3xl">
            <span className="eyebrow">Categories served</span>
            <h2 className="h2-editorial mt-5">
              What lives in the closet.
            </h2>
          </div>
          <div className="flex flex-wrap gap-2.5 mt-10">
            {EQUIPMENT_CATEGORIES.map((cat) => (
              <span
                key={cat}
                className="inline-flex items-center px-4 py-2 rounded-full bg-white border border-ink-900/15 text-ink-800 text-[14px] font-medium hover:bg-ink-900 hover:text-white hover:border-ink-900 transition-colors cursor-default"
              >
                {cat}
              </span>
            ))}
          </div>
        </ScrollReveal>
      </SectionWrapper>
    </>
  );
}
