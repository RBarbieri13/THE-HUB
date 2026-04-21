import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SectionWrapper } from "@/components/layout/section-wrapper";
import { PageHeader } from "@/components/shared/page-header";
import { ScrollReveal } from "@/components/shared/scroll-reveal";
import { FAQAccordion } from "./faq-accordion";

export const metadata: Metadata = {
  title: "Frequently Asked Questions",
};

export default function FAQPage() {
  return (
    <>
      <PageHeader
        eyebrow="FAQ"
        title="Frequently asked questions."
        subtitle="Eligibility, process, and everything else — answered. If you don't see your question here, reach out and we'll get back within 1–2 business days."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "FAQ" }]}
      />

      <SectionWrapper bg="white">
        <div className="max-w-3xl mx-auto">
          <ScrollReveal animation="fade-up">
            <FAQAccordion />
          </ScrollReveal>
        </div>
      </SectionWrapper>

      <SectionWrapper bg="cream">
        <ScrollReveal animation="fade-up">
          <div className="max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-[1fr_auto] gap-8 items-center p-8 md:p-12 bg-ink-950 rounded-[16px] text-white">
            <div>
              <span className="inline-flex items-center gap-2.5 font-[family-name:var(--font-mono)] text-[11px] font-bold uppercase tracking-[0.14em] text-orange-400 mb-4">
                <span className="w-7 h-[2px] bg-orange-400" />
                Still stuck?
              </span>
              <h2 className="font-[family-name:var(--font-display)] text-[30px] md:text-[36px] font-medium leading-[1.1] tracking-[-0.015em] text-white">
                Didn&apos;t find your answer?
              </h2>
              <p className="mt-4 text-white/80 text-[16px] leading-[1.6]">
                Our team is happy to help. Reach out and we&apos;ll get back to
                you within 1–2 business days.
              </p>
            </div>
            <Link
              href="/contact"
              className="group inline-flex items-center gap-2 px-6 py-3.5 bg-orange-600 hover:bg-orange-700 text-white font-semibold text-[15px] rounded-[6px] transition-colors self-center shrink-0"
            >
              Contact Us
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
        </ScrollReveal>
      </SectionWrapper>
    </>
  );
}
