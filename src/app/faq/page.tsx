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
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "FAQ" }]}
      />

      <SectionWrapper bg="white">
        <div className="max-w-3xl mx-auto">
          {/* Intro text */}
          <ScrollReveal animation="fade-up">
            <p className="text-center text-text-body text-lg mb-6">
              Find answers to common questions about our equipment program,
              eligibility, and how we can help.
            </p>
            <div className="section-divider mx-auto mb-8" />
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
          <div className="bg-primary-dark text-white p-8 rounded-[3px] text-center max-w-xl mx-auto shadow-lg">
            <h3 className="font-heading text-xl font-bold mb-3">
              Still Have Questions?
            </h3>
            <p className="text-white/80 mb-6">
              Our team is happy to help. Reach out and we will get back to you
              within 1–2 business days.
            </p>
            <Link href="/contact">
              <Button
                variant="primary"
                size="lg"
                className="shadow-lg shadow-accent/30 hover:shadow-xl hover:shadow-accent/40 transition-all duration-300"
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