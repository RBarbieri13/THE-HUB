import type { Metadata } from "next";
import { PageHeader } from "@/components/shared/page-header";
import { SectionWrapper } from "@/components/layout/section-wrapper";
import { DonationForm } from "@/components/forms/donation-form";
import { ScrollReveal } from "@/components/shared/scroll-reveal";
import { EQUIPMENT_CATEGORIES } from "@/lib/constants";
import {
  CheckCircle,
  XCircle,
  Package,
  ClipboardCheck,
  Truck,
} from "lucide-react";

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
    icon: ClipboardCheck,
    title: "Tell Us About Your Donation",
    description:
      "Fill out the form below with details about the equipment you'd like to donate.",
  },
  {
    icon: Package,
    title: "We Review & Coordinate",
    description:
      "Our team reviews your submission and coordinates next steps, including pickup if needed.",
  },
  {
    icon: Truck,
    title: "Equipment Finds a New Home",
    description:
      "Donated items are cleaned, refurbished, and matched with Tennesseans who need them.",
  },
];

export default function DonateEquipmentPage() {
  return (
    <>
      <PageHeader
        title="Donate Equipment"
        subtitle="Your donation can help someone regain independence and mobility"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Donate Equipment" },
        ]}
      />

      <SectionWrapper bg="white">
        <ScrollReveal animation="fade-up" delay={100}>
          <div className="section-divider mb-5" />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Accepted column */}
            <div className="bg-success/5 border border-success/20 rounded-sm p-6">
              <h2 className="mb-2">What We Accept</h2>
              <p className="mt-2 mb-6 text-sm">
                We accept a wide range of adaptive and mobility equipment in
                usable condition. Items should be clean and functional, or
                repairable.
              </p>
              <ul className="space-y-3">
                {ACCEPTED_ITEMS.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-success shrink-0 mt-0.5" />
                    <span className="text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Not accepted column */}
            <div className="bg-error/5 border border-error/20 rounded-sm p-6">
              <h2 className="mb-2">What We May Not Accept</h2>
              <p className="mt-2 mb-6 text-sm">
                Due to space and safety constraints, we may not be able to
                accept all donations. Not all items offered will be accepted.
              </p>
              <ul className="space-y-3">
                {NOT_ACCEPTED.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <XCircle className="h-5 w-5 text-error shrink-0 mt-0.5" />
                    <span className="text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </ScrollReveal>
      </SectionWrapper>

      <SectionWrapper bg="off-white">
        <ScrollReveal animation="fade-up" delay={100}>
          <div className="section-divider mx-auto mb-5" />
          <h2 className="text-center mb-10">Donation Process</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {/* Connecting line between steps */}
            <div className="hidden md:block absolute top-[3.25rem] left-[calc(16.666%+1rem)] right-[calc(16.666%+1rem)] h-px bg-gradient-to-r from-accent/20 via-accent/50 to-accent/20" />
            {DONATION_STEPS.map((step, i) => (
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
            <h2 className="mb-2">Submit a Donation Inquiry</h2>
            <p className="mb-8">
              Let us know about the equipment you&apos;d like to donate. Our
              team will follow up to coordinate next steps.
            </p>
            <div className="bg-white rounded-sm shadow-lg p-8 md:p-10">
              <DonationForm />
            </div>
          </div>
        </ScrollReveal>
      </SectionWrapper>

      <SectionWrapper bg="off-white">
        <ScrollReveal animation="fade-up" delay={100}>
          <div className="text-center">
            <h3>Equipment Categories We Serve</h3>
            <div className="flex flex-wrap justify-center gap-3 mt-6">
              {EQUIPMENT_CATEGORIES.map((cat) => (
                <span
                  key={cat}
                  className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 text-primary-dark text-sm font-semibold border border-primary/20 hover:bg-primary/20 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 cursor-default"
                >
                  {cat}
                </span>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </SectionWrapper>
    </>
  );
}
