import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ExternalLink } from "lucide-react";
import { SectionWrapper } from "@/components/layout/section-wrapper";
import { PageHeader } from "@/components/shared/page-header";
import { ScrollReveal } from "@/components/shared/scroll-reveal";
import { ORG_URL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "About The Hub",
};

const OPERATION_STEPS = [
  {
    n: "01",
    title: "Intake",
    description:
      "We accept donated equipment from individuals, clinics, hospitals, and vendors across Tennessee.",
  },
  {
    n: "02",
    title: "Refurbishment",
    description:
      "Each item is cleaned, inspected, and tested by volunteers before going back out into the community.",
  },
  {
    n: "03",
    title: "Matching",
    description:
      "We match available equipment with requesters — prioritizing urgent medical and mobility needs.",
  },
  {
    n: "04",
    title: "Distribution",
    description:
      "Equipment is delivered at no cost through pickup in Nashville or coordinated delivery statewide.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About the hub"
        title="A program built by the community it serves."
        subtitle="The Hub is a program of the United Spinal Association of Tennessee. We collect, refurbish, and redistribute mobility equipment — at no cost — to Tennesseans with spinal cord injuries and related mobility disabilities."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "About" }]}
        image={{
          src: "/images/stock/community-event.jpg",
          alt: "USAT community members gathered at a Hub event",
        }}
      />

      {/* Mission — editorial two column */}
      <SectionWrapper bg="white">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-14 lg:gap-20 items-start">
          <ScrollReveal animation="fade-right">
            <div>
              <span className="eyebrow">Mission</span>
              <h2 className="h2-editorial mt-5">
                Insurance shouldn&apos;t decide who gets to move.
              </h2>
            </div>
          </ScrollReveal>
          <ScrollReveal animation="fade-left" delay={120}>
            <div className="space-y-5 text-ink-body text-[17px] leading-[1.65] max-w-[60ch]">
              <p>
                We started with a wheelchair left behind and the realization
                that nobody was connecting the dots between people who had
                equipment they no longer needed and people who couldn&apos;t
                afford or access the equipment they did need.
              </p>
              <p>
                Today we operate a full refurbishment and distribution closet
                from Nashville. Every piece we place is one fewer person stuck
                waiting on an insurance cycle that doesn&apos;t move at the
                speed of their life.
              </p>
              <blockquote className="mt-7 border-l-[3px] border-orange-600 pl-6 py-1 italic font-[family-name:var(--font-display)] text-[20px] leading-[1.45] text-ink-900">
                &ldquo;No one should have to wait years for a wheelchair. The
                equipment already exists — we just need to get it to the people
                who need it most.&rdquo;
              </blockquote>
            </div>
          </ScrollReveal>
        </div>
      </SectionWrapper>

      {/* Context image */}
      <SectionWrapper bg="cream">
        <ScrollReveal animation="scale-in">
          <div className="relative aspect-[16/7] rounded-[12px] overflow-hidden shadow-[0_8px_20px_rgba(12,57,64,0.08)]">
            <Image
              src="/images/stock/wheelchair-room.jpg"
              alt="Equipment room at The Hub filled with wheelchairs ready for distribution"
              fill
              className="object-cover"
              sizes="100vw"
            />
          </div>
        </ScrollReveal>
      </SectionWrapper>

      {/* How we operate — 4-step editorial */}
      <SectionWrapper bg="white">
        <ScrollReveal animation="fade-up">
          <div className="max-w-3xl">
            <span className="eyebrow">How we operate</span>
            <h2 className="h2-editorial mt-5">
              Four stages from donation to delivery.
            </h2>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 mt-12">
          {OPERATION_STEPS.map((step, i) => (
            <ScrollReveal key={step.n} animation="fade-up" delay={i * 100}>
              <div className="pt-6 border-t-2 border-ink-900">
                <div className="font-[family-name:var(--font-display)] text-[36px] font-medium text-orange-600 leading-none tracking-[-0.03em]">
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

      {/* Built on trust — teal editorial band */}
      <SectionWrapper bg="primary-dark">
        <ScrollReveal animation="fade-up">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.3fr] gap-12 items-start">
            <div>
              <span className="inline-flex items-center gap-2.5 font-[family-name:var(--font-mono)] text-[12px] font-bold uppercase tracking-[0.14em] text-orange-300 mb-5">
                <span className="w-7 h-[2px] bg-orange-400" />
                Built on trust
              </span>
              <h2 className="font-[family-name:var(--font-display)] text-[40px] md:text-[48px] font-medium leading-[1.06] tracking-[-0.02em] text-white">
                A 501(c)(3) nonprofit, backed by a national foundation.
              </h2>
            </div>
            <div className="space-y-5 text-white/85 text-[17px] leading-[1.65] max-w-[60ch]">
              <p>
                The Hub is a program of the{" "}
                <a
                  href={ORG_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-baseline gap-1 text-white underline decoration-orange-500/60 underline-offset-4 decoration-2 hover:decoration-orange-400 transition-colors focus-visible:outline-2 focus-visible:outline-orange-400 focus-visible:outline-offset-2 rounded-sm"
                >
                  United Spinal Association of Tennessee (USAT)
                  <ExternalLink className="h-3 w-3 opacity-70 self-center" aria-hidden="true" />
                  <span className="sr-only">(opens in new tab)</span>
                </a>{" "}
                — a 501(c)(3) nonprofit dedicated to improving the quality of
                life for people with spinal cord injuries and related
                disabilities.
              </p>
              <p>
                This program is made possible through the generous support of
                the Craig H. Neilsen Foundation, whose commitment to the SCI
                community helps ensure essential equipment reaches the people
                who need it most.
              </p>
              <div className="pt-2">
                <a
                  href={ORG_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 h-12 px-5 bg-white hover:bg-cream-100 text-ink-900 font-bold text-[15px] rounded-md transition-all focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2"
                >
                  Visit USAT
                  <ExternalLink className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                  <span className="sr-only">(opens in new tab)</span>
                </a>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </SectionWrapper>

      {/* CTA */}
      <SectionWrapper bg="cream">
        <ScrollReveal animation="fade-up">
          <div className="max-w-3xl">
            <span className="eyebrow">Get involved</span>
            <h2 className="h2-editorial mt-5">
              Ready to help stock the closet, or need something from it?
            </h2>
            <p className="lead-editorial mt-5 max-w-[58ch]">
              We&apos;re newly opened and actively building out our inventory.
              Your donation or request goes directly to work.
            </p>
            <div className="flex flex-wrap gap-3 mt-8">
              <Link
                href="/get-equipment"
                className="group inline-flex items-center gap-2 px-6 py-3.5 bg-orange-600 hover:bg-orange-700 text-white font-semibold text-[15px] rounded-[6px] transition-colors"
              >
                Request Equipment
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
              <Link
                href="/donate-equipment"
                className="inline-flex items-center px-6 py-3.5 bg-teal-700 hover:bg-teal-800 text-white font-semibold text-[15px] rounded-[6px] transition-colors"
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
