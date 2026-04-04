import type { Metadata } from "next";
import Link from "next/link";
import { SectionWrapper } from "@/components/layout/section-wrapper";
import { PageHeader } from "@/components/shared/page-header";
import { Button } from "@/components/ui/button";
import { ScrollReveal } from "@/components/shared/scroll-reveal";
import { FAQAccordion } from "./faq-accordion";

export const metadata: Metadata = {
  title: "Frequently Asked Questions",
};

export default function FAQPage() {
  return (
    <>
      <PageHeader
        title="Frequently Asked Questions"
        subtitle="Find answers to common questions about our equipment program"
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "FAQ" }]}
      />

      <SectionWrapper bg="white">
        <div className="max-w-3xl mx-auto">
          {/* Intro text */}
          <ScrollReveal animation="fade-up">
            <p className="text-center text-text-body text-lg md:text-xl mb-8 leading-relaxed">
              Find answers to common questions about our equipment program,
              eligibility, and how we can help.
            </p>
            <div className="section-divider mx-auto mb-10" />
          </ScrollReveal>

          {/* Accordion */}
          <ScrollReveal animation="fade-up" delay={100}>
            <FAQAccordion />
          </ScrollReveal>
        </div>
      </SectionWrapper>

      {/* Still have questions — styled as dark CTA card */}
      <SectionWrapper bg="off-white">
        <ScrollReveal animation="fade-up" delay={100}>
          <div className="bg-primary-dark text-white p-10 md:p-12 rounded-xl text-center max-w-xl mx-auto shadow-[0_4px_24px_rgba(0,0,0,0.06)]">
            <h2 className="font-heading text-2xl md:text-3xl font-bold mb-4 tracking-tight">
              Still Have Questions?
            </h2>
            <p className="text-white/85 text-lg leading-relaxed mb-8">
              Our team is happy to help. Reach out and we will get back to you
              within 1–2 business days.
            </p>
            <Link href="/contact">
              <Button
                variant="primary"
                size="lg"
                className="shadow-lg shadow-accent/30 hover:shadow-xl hover:shadow-accent/40 transition-shadow duration-300"
              >
                Contact Us
              </Button>
            </Link>
          </div>
        </ScrollReveal>
      </SectionWrapper>
    </>
  );
}
