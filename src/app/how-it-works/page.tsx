import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
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
      "Fill out our simple online form to request equipment or offer a donation. Include as much detail as possible about the equipment you need or have available. Our forms are designed to capture the right information so we can help you quickly.",
    icon: ClipboardList,
    image: "/images/stock/wheelchair-room.jpg",
    imageAlt: "Equipment room with wheelchairs and adaptive devices",
  },
  {
    number: 2,
    title: "Our Team Reviews",
    description:
      "Our staff reviews submissions and checks current inventory. We will reach out if we need additional information to process your request or donation. Every submission is carefully evaluated to ensure the best possible match.",
    icon: Search,
    image: "/images/stock/community-event.jpg",
    imageAlt: "Team members reviewing and organizing equipment",
  },
  {
    number: 3,
    title: "Equipment Matching",
    description:
      "For requests, we look for suitable matches in our inventory. For donations, we assess condition and determine where the equipment is needed most. Our goal is to connect the right equipment with the right person.",
    icon: GitCompareArrows,
    image: "/images/stock/wheelchair-home.jpg",
    imageAlt: "Power wheelchair matched to a recipient's needs",
  },
  {
    number: 4,
    title: "Preparation & Refurbishment",
    description:
      "Donated items are cleaned, inspected, and refurbished as needed to ensure safety and functionality before they go to a new owner. We take pride in delivering equipment that is reliable and ready to use.",
    icon: Wrench,
    image: "/images/stock/wheelchair-senior.jpg",
    imageAlt: "Senior using a refurbished manual wheelchair",
  },
  {
    number: 5,
    title: "Coordination & Scheduling",
    description:
      "We contact you to arrange pickup or delivery. Our Nashville location has regular hours for in-person visits, and we coordinate shipping for those further away. We work with your schedule to make the process as easy as possible.",
    icon: CalendarCheck,
    image: "/images/stock/wheelchair-walker.jpg",
    imageAlt: "Person with adaptive equipment outdoors",
  },
  {
    number: 6,
    title: "Equipment Delivered",
    description:
      "You receive the equipment at no cost. We follow up to make sure everything meets your needs and that you are satisfied with the match. Our support does not end at delivery — we are here to help.",
    icon: CheckCircle,
    image: "/images/stock/community-event.jpg",
    imageAlt: "Community members receiving adaptive equipment",
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
                className={`flex flex-col md:flex-row items-center gap-10 md:gap-16 ${
                  isEven ? "md:flex-row-reverse" : ""
                }`}
              >
                {/* Image column */}
                <div className="w-full md:w-1/2 flex-shrink-0">
                  <div className="relative aspect-[16/10] rounded-lg overflow-hidden shadow-lg">
                    <Image
                      src={step.image}
                      alt={step.imageAlt}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-dark/30 to-transparent" />
                    {/* Step badge on image */}
                    <div className="absolute top-5 left-5 w-14 h-14 rounded-full bg-accent text-white flex items-center justify-center text-xl font-bold shadow-lg shadow-accent/30">
                      {step.number}
                    </div>
                  </div>
                </div>

                {/* Content column */}
                <div className="w-full md:w-1/2">
                  <p className="text-sm font-bold uppercase tracking-widest text-accent mb-2">
                    Step {step.number}
                  </p>
                  <h3 className="font-heading text-2xl md:text-3xl font-bold text-text-primary mb-4 tracking-tight">
                    {step.title}
                  </h3>
                  <p className="text-text-body text-base md:text-lg leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            </ScrollReveal>
          </SectionWrapper>
        );
      })}

      {/* Typical Timeline — prominent info card */}
      <SectionWrapper bg="white">
        <ScrollReveal animation="fade-up">
          <div className="max-w-2xl mx-auto bg-primary/5 border border-primary/20 rounded-lg p-8">
            <div className="flex items-start gap-5">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Info className="w-6 h-6 text-primary" aria-hidden="true" />
              </div>
              <div>
                <h3 className="font-heading text-xl md:text-2xl font-bold text-text-primary mb-3">
                  Typical Timeline
                </h3>
                <p className="text-text-body text-base md:text-lg leading-relaxed">
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
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-white mb-5 tracking-tight">
              Ready to Get Started?
            </h2>
            <p className="text-white/85 text-lg mb-10 leading-relaxed">
              Have questions about the process? We are here to help every step of the way.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/get-equipment">
                <Button variant="primary" size="lg" className="group shadow-lg shadow-accent/20 hover:shadow-xl hover:shadow-accent/30 transition-shadow duration-300">
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
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-10 text-white/60 text-sm">
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
