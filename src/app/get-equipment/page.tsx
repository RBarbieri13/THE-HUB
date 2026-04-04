import type { Metadata } from "next";
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
        <ScrollReveal animation="fade-up" delay={100}>
          <div className="max-w-3xl">
            <div className="section-divider mb-5" />
            <h2>Who This Is For</h2>
            <p className="mt-2 mb-6">
              The Hub serves Tennesseans who need mobility-related equipment but
              face barriers to access — whether due to insurance delays, cost,
              or lack of availability.
            </p>
            <div className="flex flex-col gap-3">
              {ELIGIBILITY_ITEMS.map((item) => (
                <div
                  key={item}
                  className="border border-border rounded-sm p-4 bg-white flex items-start gap-3 hover:shadow-md hover:-translate-y-1 transition-all duration-300"
                >
                  <CheckCircle className="h-5 w-5 text-success shrink-0 mt-0.5" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </SectionWrapper>

      <SectionWrapper bg="off-white">
        <ScrollReveal animation="fade-up" delay={100}>
          <div className="section-divider mx-auto mb-5" />
          <h2 className="text-center mb-10">How Requests Work</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {/* Connecting line between steps on desktop */}
            <div className="hidden md:block absolute top-8 left-[calc(16.666%+1rem)] right-[calc(16.666%+1rem)] h-px bg-gradient-to-r from-accent/20 via-accent/50 to-accent/20" />
            {PROCESS_STEPS.map((step, i) => (
              <ScrollReveal
                key={step.title}
                animation="fade-up"
                delay={100 + i * 100}
              >
                <div className="text-center relative">
                  <p className="text-xs font-bold tracking-widest text-accent uppercase mb-3">
                    Step {i + 1}
                  </p>
                  <div className="mx-auto w-16 h-16 rounded-full bg-accent text-white text-2xl font-bold flex items-center justify-center shadow-lg shadow-primary-dark/15 hover:scale-105 transition-transform duration-300 relative z-10">
                    {i + 1}
                  </div>
                  <h4 className="mt-4">{step.title}</h4>
                  <p className="mt-2 text-sm">{step.description}</p>
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
            <h2 className="mb-2">Submit a Request</h2>
            <p className="mb-6">
              Please provide as much detail as possible so we can best assist
              you. Submitting a request does not guarantee equipment
              availability, but our team will review every submission and follow
              up.
            </p>
            <div className="bg-primary/5 border-l-4 border-primary-dark rounded-sm p-5 mb-8">
              <p className="text-sm font-semibold text-primary-dark">
                Requests are typically reviewed within 3&ndash;5 business days.
                All equipment is provided free of charge.
              </p>
            </div>
            <div className="bg-white rounded-sm shadow-lg p-8 md:p-10">
              <EquipmentRequestForm />
            </div>
          </div>
        </ScrollReveal>
      </SectionWrapper>
    </>
  );
}
