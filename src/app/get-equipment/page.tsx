import type { Metadata } from "next";
import { CheckCircle2 } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { SectionWrapper } from "@/components/layout/section-wrapper";
import { EquipmentRequestForm } from "@/components/forms/equipment-request-form";
import { ScrollReveal } from "@/components/shared/scroll-reveal";

export const metadata: Metadata = {
  title: "Request Equipment",
  description:
    "Request donated adaptive equipment at no cost. The Hub serves Tennesseans with spinal cord injuries and related mobility disabilities.",
};

const ELIGIBILITY_ITEMS = [
  "Tennessee residents with spinal cord injuries or related mobility disabilities",
  "Family members or caregivers requesting on behalf of someone in need",
  "Therapists, case managers, or social workers making referrals",
];

const PROCESS_STEPS = [
  {
    n: "01",
    title: "Submit your request",
    description:
      "Fill out the form below. About four minutes. The more detail you share, the better we can match.",
  },
  {
    n: "02",
    title: "We review and match",
    description:
      "Our team checks inventory, refurbishes as needed, and follows up with you directly — usually within 3–5 business days.",
  },
  {
    n: "03",
    title: "You receive equipment",
    description:
      "Pick up in Nashville, or coordinate delivery anywhere in Tennessee. No cost, no strings.",
  },
];

export default function GetEquipmentPage() {
  return (
    <>
      <PageHeader
        eyebrow="Request equipment"
        title="Adaptive equipment, at no cost."
        subtitle="The Hub serves Tennesseans who need mobility-related equipment but face barriers — insurance delays, out-of-pocket costs, or lack of availability in their region."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Request" },
        ]}
      />

      {/* Who this is for */}
      <SectionWrapper bg="white">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-14 lg:gap-20 items-start">
          <ScrollReveal animation="fade-right">
            <div>
              <span className="eyebrow">Who this is for</span>
              <h2 className="h2-editorial mt-5">
                Open to anyone facing a barrier to equipment in Tennessee.
              </h2>
              <p className="lead-editorial mt-5 max-w-[54ch]">
                You don&apos;t need to have a finalized diagnosis or finished
                insurance appeals to request. If you or someone you support
                needs equipment to move through the day, start here.
              </p>
            </div>
          </ScrollReveal>
          <ScrollReveal animation="fade-left" delay={120}>
            <ul className="space-y-3">
              {ELIGIBILITY_ITEMS.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-4 p-5 bg-cream-50 border border-ink-900/10 rounded-[10px]"
                >
                  <CheckCircle2 className="h-5 w-5 text-teal-700 shrink-0 mt-0.5" />
                  <span className="text-ink-body text-[16px] leading-[1.55]">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </ScrollReveal>
        </div>
      </SectionWrapper>

      {/* Process */}
      <SectionWrapper bg="cream">
        <ScrollReveal animation="fade-up">
          <div className="max-w-3xl">
            <span className="eyebrow">Process</span>
            <h2 className="h2-editorial mt-5">
              Three steps between a request and a wheelchair.
            </h2>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mt-12">
          {PROCESS_STEPS.map((step, i) => (
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
            <span className="eyebrow">Submit</span>
            <h2 className="h2-editorial mt-5">Submit a request</h2>
            <p className="lead-editorial mt-5">
              Please provide as much detail as possible so we can best assist
              you. Submitting a request does not guarantee equipment
              availability — our team reviews every submission and follows up.
            </p>
            <div className="mt-6 p-5 bg-teal-50 border border-teal-700/15 rounded-[10px] text-[15px] text-ink-body leading-[1.55]">
              <strong className="text-teal-800">
                Typical review: 3–5 business days.
              </strong>{" "}
              All equipment is provided free of charge.
            </div>
            <div className="mt-10 bg-white border border-ink-900/10 rounded-[12px] shadow-[0_4px_16px_rgba(12,57,64,0.05)] p-8 md:p-10">
              <EquipmentRequestForm />
            </div>
          </div>
        </ScrollReveal>
      </SectionWrapper>
    </>
  );
}
