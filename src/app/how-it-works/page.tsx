import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Info } from "lucide-react";
import { SectionWrapper } from "@/components/layout/section-wrapper";
import { PageHeader } from "@/components/shared/page-header";
import { ScrollReveal } from "@/components/shared/scroll-reveal";

export const metadata: Metadata = {
  title: "How It Works",
};

const STEPS = [
  {
    n: "01",
    title: "Submit a request or donation",
    description:
      "Fill out the relevant form. Include as much detail as possible about the equipment you need or have available — type, size, condition, urgency.",
    image: "/images/stock/wheelchair-room.jpg",
    imageAlt: "Equipment room with wheelchairs and adaptive devices",
  },
  {
    n: "02",
    title: "Our team reviews",
    description:
      "We review submissions against current inventory. We may reach out for additional information. Every submission is read — nothing goes into a black hole.",
    image: "/images/stock/community-event.jpg",
    imageAlt: "Team members reviewing and organizing equipment",
  },
  {
    n: "03",
    title: "Matching",
    description:
      "For requests, we look for a fit in inventory. For donations, we assess condition and place it where it's most needed. We match people to equipment, not equipment to lists.",
    image: "/images/stock/wheelchair-home.jpg",
    imageAlt: "Power wheelchair matched to a recipient",
  },
  {
    n: "04",
    title: "Refurbishment",
    description:
      "Donated items are cleaned, inspected, and refurbished before placement. Safety and function come first — nothing goes out that we wouldn't use ourselves.",
    image: "/images/stock/wheelchair-senior.jpg",
    imageAlt: "Senior using a refurbished manual wheelchair",
  },
  {
    n: "05",
    title: "Coordination",
    description:
      "We schedule pickup, delivery, or drop-off around your availability. Nashville pickup or statewide coordination — whichever works better for you.",
    image: "/images/stock/wheelchair-walker.jpg",
    imageAlt: "Person with adaptive equipment outdoors",
  },
  {
    n: "06",
    title: "Equipment delivered",
    description:
      "You receive the equipment — always at no cost. We follow up after delivery to make sure the fit is right and the equipment is working for you.",
    image: "/images/stock/community-event.jpg",
    imageAlt: "Community members receiving adaptive equipment",
  },
];

export default function HowItWorksPage() {
  return (
    <>
      <PageHeader
        eyebrow="How it works"
        title="Six straightforward steps, from request to delivery."
        subtitle="Here's what happens between submitting a form and the equipment arriving at your door — whether you're donating, requesting, or both."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "How It Works" },
        ]}
        image={{
          src: "/images/stock/wheelchair-home.jpg",
          alt: "A recipient in their home with adaptive equipment delivered by The Hub",
        }}
      />

      {STEPS.map((step, i) => {
        const isEven = i % 2 === 1;
        const bg = isEven ? "cream" : "white";
        return (
          <SectionWrapper key={step.n} bg={bg}>
            <ScrollReveal animation={isEven ? "fade-right" : "fade-left"}>
              <div
                className={`grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center ${
                  isEven ? "md:[&>*:first-child]:order-2" : ""
                }`}
              >
                <div className="relative aspect-[16/10] rounded-[12px] overflow-hidden shadow-[0_8px_20px_rgba(12,57,64,0.08)]">
                  <Image
                    src={step.image}
                    alt={step.imageAlt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-[6px] font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.1em] text-ink-800">
                    Step {step.n}
                  </div>
                </div>
                <div>
                  <div className="font-[family-name:var(--font-display)] text-[56px] font-medium text-orange-600 leading-none tracking-[-0.03em]">
                    {step.n}
                  </div>
                  <h2 className="h2-editorial mt-5">{step.title}</h2>
                  <p className="lead-editorial mt-5 max-w-[54ch]">
                    {step.description}
                  </p>
                </div>
              </div>
            </ScrollReveal>
          </SectionWrapper>
        );
      })}

      {/* Timeline box */}
      <SectionWrapper bg="white">
        <ScrollReveal animation="fade-up">
          <div className="max-w-3xl mx-auto flex items-start gap-5 p-7 bg-teal-50 border border-teal-700/15 rounded-[12px]">
            <div className="w-11 h-11 rounded-full bg-teal-700/10 flex items-center justify-center shrink-0">
              <Info className="h-5 w-5 text-teal-800" />
            </div>
            <div>
              <h3 className="font-[family-name:var(--font-display)] text-[22px] font-medium text-ink-900 tracking-[-0.015em]">
                Typical timeline
              </h3>
              <p className="mt-2 text-ink-body text-[16px] leading-[1.6]">
                Most equipment requests are matched within{" "}
                <strong className="text-ink-900">2–4 weeks</strong> of
                submission, depending on availability and refurbishment needs.
                Urgent medical needs are prioritized.
              </p>
            </div>
          </div>
        </ScrollReveal>
      </SectionWrapper>

      {/* Closing CTA */}
      <SectionWrapper bg="dark">
        <ScrollReveal animation="fade-up">
          <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-10 items-end">
            <div>
              <span className="inline-flex items-center gap-2.5 font-[family-name:var(--font-mono)] text-[12px] font-bold uppercase tracking-[0.14em] text-orange-400 mb-5">
                <span className="w-7 h-[2px] bg-orange-400" />
                Next step
              </span>
              <h2 className="font-[family-name:var(--font-display)] text-[40px] md:text-[48px] font-medium leading-[1.06] tracking-[-0.02em] text-white">
                Ready to start?
              </h2>
              <p className="lead-editorial mt-5 text-white/80 max-w-[54ch]">
                Have questions about the process? We&apos;re here to walk
                through each step with you.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 justify-start lg:justify-end">
              <Link
                href="/get-equipment"
                className="group inline-flex items-center gap-2 px-6 py-3.5 bg-orange-600 hover:bg-orange-700 text-white font-semibold text-[15px] rounded-[6px] transition-colors"
              >
                Request Equipment
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
              <Link
                href="/donate-equipment"
                className="inline-flex items-center px-6 py-3.5 bg-transparent border-[1.5px] border-white/40 hover:border-white text-white font-semibold text-[15px] rounded-[6px] transition-colors"
              >
                Donate Equipment
              </Link>
            </div>
          </div>
        </ScrollReveal>
      </SectionWrapper>
    </>
  );
}
