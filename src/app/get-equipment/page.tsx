import type { Metadata } from "next";
import Image from "next/image";
import { PageHeader } from "@/components/shared/page-header";
import { SectionWrapper } from "@/components/layout/section-wrapper";
import { EquipmentRequestForm } from "@/components/forms/equipment-request-form";
import { ScrollReveal } from "@/components/shared/scroll-reveal";
import { CheckCircle, Users, Truck } from "lucide-react";

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
    icon: CheckCircle,
    title: "Submit Your Request",
    description:
      "Fill out the form below with details about the equipment you need. The more information you provide, the better we can help.",
  },
  {
    icon: Users,
    title: "We Review & Match",
    description:
      "Our team reviews your request and checks current inventory for suitable matches. We may reach out for additional information.",
  },
  {
    icon: Truck,
    title: "Receive Equipment",
    description:
      "Once matched, arrange pickup from our Nashville location or coordinate delivery. All equipment is provided at no cost.",
  },
];

export default function GetEquipmentPage() {
  return (
    <>
      <PageHeader
        title="Request Equipment"
        subtitle="Access donated adaptive equipment at no cost"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Request Equipment" },
        ]}
      />

      <SectionWrapper bg="white">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <ScrollReveal animation="fade-right" delay={100}>
            <div>
              <div className="section-divider mb-5" />
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-text-primary mb-4 tracking-tight">
                Who This Is For
              </h2>
              <p className="text-text-body text-base md:text-lg leading-relaxed mb-8">
                The Hub serves Tennesseans who need mobility-related equipment but
                face barriers to access — whether due to insurance delays, cost,
                or lack of availability.
              </p>
              <div className="flex flex-col gap-4">
                {ELIGIBILITY_ITEMS.map((item) => (
                  <div
                    key={item}
                    className="rounded-xl p-5 bg-white shadow-[0_4px_24px_rgba(0,0,0,0.06)] flex items-start gap-4 hover:shadow-[0_6px_28px_rgba(0,0,0,0.09)] hover:-translate-y-0.5 transition-all duration-300"
                  >
                    <CheckCircle className="h-6 w-6 text-success shrink-0 mt-0.5" />
                    <span className="text-text-body text-base leading-relaxed">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>
          <ScrollReveal animation="fade-left" delay={200}>
            <div className="relative aspect-[4/3] rounded-xl overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.1)]">
              <Image
                src="/images/stock/wheelchair-walker.jpg"
                alt="Person using adaptive equipment outdoors"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark/20 to-transparent" />
            </div>
          </ScrollReveal>
        </div>
      </SectionWrapper>

      <SectionWrapper bg="off-white">
        <ScrollReveal animation="fade-up" delay={100}>
          <div className="section-divider mx-auto mb-5" />
          <h2 className="text-center mb-12 font-heading text-3xl md:text-4xl font-bold text-text-primary tracking-tight">
            How Requests Work
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 relative">
            {/* Connecting line between steps on desktop */}
            <div className="hidden md:block absolute top-10 left-[calc(16.666%+1rem)] right-[calc(16.666%+1rem)] h-px bg-gradient-to-r from-accent/20 via-accent/50 to-accent/20" />
            {PROCESS_STEPS.map((step, i) => (
              <ScrollReveal
                key={step.title}
                animation="fade-up"
                delay={100 + i * 100}
              >
                <div className="text-center relative">
                  <p className="text-sm font-bold tracking-widest text-accent uppercase mb-3">
                    Step {i + 1}
                  </p>
                  <div className="mx-auto w-16 h-16 rounded-full bg-accent text-white text-2xl font-bold flex items-center justify-center shadow-lg shadow-primary-dark/15 relative z-10">
                    {i + 1}
                  </div>
                  <h3 className="font-heading text-xl md:text-2xl font-bold text-text-primary mt-5 mb-3">
                    {step.title}
                  </h3>
                  <p className="text-text-body text-base leading-relaxed">{step.description}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </ScrollReveal>
      </SectionWrapper>

      <SectionWrapper bg="white">
        <ScrollReveal animation="fade-up" delay={100}>
          <div className="max-w-3xl mx-auto">
            <div className="section-divider mb-5" />
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-text-primary mb-3 tracking-tight">
              Submit a Request
            </h2>
            <p className="text-text-body text-base md:text-lg leading-relaxed mb-8">
              Please provide as much detail as possible so we can best assist
              you. Submitting a request does not guarantee equipment
              availability, but our team will review every submission and follow
              up.
            </p>
            <div className="bg-primary/10 rounded-xl p-6 mb-10">
              <p className="text-base font-semibold text-primary-dark leading-relaxed">
                Requests are typically reviewed within 3&ndash;5 business days.
                All equipment is provided free of charge.
              </p>
            </div>
            <div className="bg-white rounded-xl shadow-[0_4px_24px_rgba(0,0,0,0.06)] p-8 md:p-10">
              <EquipmentRequestForm />
            </div>
          </div>
        </ScrollReveal>
      </SectionWrapper>
    </>
  );
}
