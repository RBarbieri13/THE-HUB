import type { Metadata } from "next";
import Link from "next/link";
import {
  ClipboardList,
  Search,
  GitCompareArrows,
  Wrench,
  CalendarCheck,
  CheckCircle,
  ArrowRight,
  Info,
} from "lucide-react";
import { SectionWrapper } from "@/components/layout/section-wrapper";
import { PageHeader } from "@/components/shared/page-header";
import { Button } from "@/components/ui/button";
import { ScrollReveal } from "@/components/shared/scroll-reveal";

export const metadata: Metadata = {
  title: "How It Works",
};

const STEPS = [
  {
    number: 1,
    title: "Submit a Request or Donation",
    description:
      "Fill out our simple online form to request equipment or offer a donation. Include as much detail as possible about the equipment you need or have available.",
    icon: ClipboardList,
  },
  {
    number: 2,
    title: "Our Team Reviews",
    description:
      "Our staff reviews submissions and checks current inventory. We will reach out if we need additional information to process your request or donation.",
    icon: Search,
  },
  {
    number: 3,
    title: "Equipment Matching",
    description:
      "For requests, we look for suitable matches in our inventory. For donations, we assess condition and determine where the equipment is needed most.",
    icon: GitCompareArrows,
  },
  {
    number: 4,
    title: "Preparation & Refurbishment",
    description:
      "Donated items are cleaned, inspected, and refurbished as needed to ensure safety and functionality before they go to a new owner.",
    icon: Wrench,
  },
  {
    number: 5,
    title: "Coordination & Scheduling",
    description:
      "We contact you to arrange pickup or delivery. Our Nashville location has regular hours for in-person visits, and we coordinate shipping for those further away.",
    icon: CalendarCheck,
  },
  {
    number: 6,
    title: "Equipment Delivered",
    description:
      "You receive the equipment at no cost. We follow up to make sure everything meets your needs and that you are satisfied with the match.",
    icon: CheckCircle,
  },
] as const;

export default function HowItWorksPage() {
  return (
    <>
      <PageHeader
        title="How It Works"
        subtitle="From request to delivery in six straightforward steps"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "How It Works" },
        ]}
      />

      {STEPS.map((step) => {
        const isEven = step.number % 2 === 0;
        const bg = isEven ? "off-white" : "white";
        const animation = isEven ? "fade-right" : "fade-left";

        return (
          <SectionWrapper key={step.number} bg={bg}>
            <ScrollReveal animation={animation}>
              <div
                className={`flex flex-col md:flex-row items-center gap-8 md:gap-12 ${
                  isEven ? "md:flex-row-reverse" : ""
                }`}
              >
                {/* Step number + icon column */}
                <div className="flex-shrink-0 flex flex-col items-center gap-4">
                  {/* Large accent step number circle */}
                  <div className="w-16 h-16 rounded-full bg-accent text-white flex items-center justify-center text-2xl font-heading font-bold shadow-lg shadow-accent/20">
                    {step.number}
                  </div>
                  {/* Icon in a subtle circle background */}
                  <div className="w-11 h-11 rounded-full bg-primary/10 flex items-center justify-center">
                    <step.icon
                      className="w-6 h-6 text-primary transition-transform duration-300 hover:scale-110"
                      aria-hidden="true"
                    />
                  </div>
                </div>

                {/* Content */}
                <div className={isEven ? "md:text-right" : ""}>
                  <p className="text-xs font-semibold uppercase tracking-widest text-accent mb-1">
                    Step {step.number}
                  </p>
                  <h3 className="font-heading text-xl md:text-2xl font-bold text-text-primary mb-3">
                    {step.title}
                  </h3>
                  <p className="text-text-body max-w-xl">{step.description}</p>
                </div>
              </div>
            </ScrollReveal>
          </SectionWrapper>
        );
      })}

      {/* Typical Timeline — prominent info card */}
      <SectionWrapper bg="white">
        <ScrollReveal animation="fade-up">
          <div className="max-w-2xl mx-auto bg-primary/5 border border-primary/20 rounded-sm p-6">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <Info className="w-5 h-5 text-primary" aria-hidden="true" />
              </div>
              <div>
                <h3 className="font-heading text-xl font-bold text-text-primary mb-2">
                  Typical Timeline
                </h3>
                <p className="text-text-body">
                  Most equipment requests are matched and ready within{" "}
                  <strong className="text-text-primary">2–4 weeks</strong> of
                  submission, depending on inventory availability and equipment
                  condition. Urgent medical needs are prioritized.
                </p>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </SectionWrapper>

      {/* CTA section */}
      <SectionWrapper bg="dark">
        <ScrollReveal animation="fade-up">
          <div className="max-w-2xl mx-auto text-center">
            <div className="section-divider mx-auto mb-5" />
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-white mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-white/80 mb-8">
              Have questions about the process? We are here to help every step of the way.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/get-equipment">
                <Button variant="primary" size="lg" className="group shadow-lg shadow-accent/20 hover:shadow-xl hover:shadow-accent/30 transition-all duration-300">
                  Request Equipment
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true" />
                </Button>
              </Link>
              <Link href="/donate-equipment">
                <Button variant="outline" size="lg" className="group border-white text-white hover:bg-white/10">
                  Donate Equipment
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true" />
                </Button>
              </Link>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-8 text-white/60 text-sm">
              <a
                href="tel:+16156691307"
                className="font-semibold text-white/80 hover:text-white transition-colors"
              >
                (615) 669-1307
              </a>
              <span className="hidden sm:inline">•</span>
              <a
                href="mailto:usatnthehub@gmail.com"
                className="font-semibold text-white/80 hover:text-white transition-colors"
              >
                usatnthehub@gmail.com
              </a>
            </div>
          </div>
        </ScrollReveal>
      </SectionWrapper>
    </>
  );
}