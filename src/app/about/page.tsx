import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { PackageOpen, Wrench, Users, Truck, ArrowRight } from "lucide-react";
import { SectionWrapper } from "@/components/layout/section-wrapper";
import { PageHeader } from "@/components/shared/page-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollReveal } from "@/components/shared/scroll-reveal";

export const metadata: Metadata = {
  title: "About The Hub",
};

const OPERATION_STEPS = [
  {
    icon: PackageOpen,
    title: "Intake",
    description:
      "We accept donated equipment from individuals, clinics, hospitals, and vendors across Tennessee.",
  },
  {
    icon: Wrench,
    title: "Refurbishment",
    description:
      "Items are thoroughly cleaned, inspected, and prepared for safe distribution to new owners.",
  },
  {
    icon: Users,
    title: "Matching",
    description:
      "We connect available equipment with people who need it, prioritizing urgent medical needs.",
  },
  {
    icon: Truck,
    title: "Distribution",
    description:
      "Equipment is provided at no cost with statewide reach through pickup or coordinated delivery.",
  },
] as const;

export default function AboutPage() {
  return (
    <>
      <PageHeader
        title="About The Hub"
        subtitle="Restoring access to essential equipment for Tennesseans with mobility disabilities"
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "About" }]}
      />

      {/* The Need — emotional storytelling section with image */}
      <SectionWrapper bg="white">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <ScrollReveal animation="fade-right">
            <div>
              <div className="section-divider mb-5" />
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-text-primary mb-6 tracking-tight">
                The Need
              </h2>
              <div className="space-y-5 text-text-body text-base md:text-lg leading-relaxed">
                <p>
                  People with spinal cord injuries in Tennessee face long waits —
                  often months to years — for wheelchairs and adaptive equipment
                  through insurance. Many cannot afford the out-of-pocket costs for
                  equipment that is essential to their independence.
                </p>
                <p>
                  Meanwhile, equipment that could change lives sits unused in
                  closets, garages, and clinics across the state. Perfectly
                  functional wheelchairs, cushions, and mobility aids go to waste
                  while the people who need them most continue to wait.
                </p>
              </div>
              <blockquote className="mt-8 bg-accent/5 border-l-4 border-accent p-6 rounded-sm italic text-lg text-text-primary leading-relaxed">
                &ldquo;No one should have to wait years for a wheelchair. The equipment
                exists — we just need to get it to the people who need it most.&rdquo;
              </blockquote>
            </div>
          </ScrollReveal>
          <ScrollReveal animation="fade-left" delay={150}>
            <div className="relative aspect-[4/3] rounded-xl overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.1)]">
              <Image
                src="/images/stock/wheelchair-senior.jpg"
                alt="Senior using a manual wheelchair, representing the people The Hub serves"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark/20 to-transparent" />
            </div>
          </ScrollReveal>
        </div>
      </SectionWrapper>

      {/* Our Mission — with image */}
      <SectionWrapper bg="off-white">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <ScrollReveal animation="fade-right">
            <div className="relative aspect-[4/3] rounded-xl overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.1)] order-2 lg:order-1">
              <Image
                src="/images/stock/wheelchair-room.jpg"
                alt="Equipment room at The Hub filled with wheelchairs ready for distribution"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark/20 to-transparent" />
            </div>
          </ScrollReveal>
          <ScrollReveal animation="fade-left" delay={150}>
            <div className="order-1 lg:order-2">
              <div className="section-divider mb-5" />
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-text-primary mb-6 tracking-tight">
                Our Mission
              </h2>
              <div className="space-y-5 text-text-body text-base md:text-lg leading-relaxed">
                <p>
                  The Hub bridges this gap. We collect, refurbish, and
                  distribute donated wheelchairs, adaptive equipment, and supplies
                  at no cost to eligible Tennesseans.
                </p>
                <p>
                  Our goal is to reduce the delays and barriers that stand between
                  people with mobility disabilities and the equipment they need to
                  live independently. No one should have to wait years for a
                  wheelchair.
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </SectionWrapper>

      {/* How We Operate — enhanced card grid */}
      <SectionWrapper bg="white">
        <div className="section-divider mx-auto mb-5" />
        <ScrollReveal animation="fade-up">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-text-primary mb-12 text-center tracking-tight">
            How We Operate
          </h2>
        </ScrollReveal>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {OPERATION_STEPS.map((step, index) => (
            <ScrollReveal key={step.title} animation="fade-up" delay={index * 100}>
              <Card className="shadow-[0_4px_32px_rgba(0,0,0,0.06)] rounded-xl hover:shadow-[0_8px_40px_rgba(0,0,0,0.1)] hover:-translate-y-1 transition-all duration-300 h-full">
                <CardContent className="flex items-start gap-5 py-8 px-7">
                  <div className="flex-shrink-0 w-14 h-14 bg-primary-dark/10 rounded-full flex items-center justify-center">
                    <step.icon className="w-7 h-7 text-primary-dark" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="font-heading text-xl font-semibold text-text-primary mb-2">
                      {step.title}
                    </h3>
                    <p className="text-text-body text-base leading-relaxed">{step.description}</p>
                  </div>
                </CardContent>
              </Card>
            </ScrollReveal>
          ))}
        </div>
      </SectionWrapper>

      {/* Built on Trust */}
      <SectionWrapper bg="primary">
        <div className="relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.08),transparent_60%)]" aria-hidden="true" />
          <ScrollReveal animation="fade-up">
            <div className="relative max-w-3xl mx-auto text-center">
              <div className="section-divider mx-auto mb-5" />
              <h2 className="font-heading text-3xl md:text-4xl font-bold mb-8 tracking-tight">
                Built on Trust
              </h2>
              <div className="space-y-5 text-white/90 text-base md:text-lg leading-relaxed">
                <p>
                  The Hub is a program of the United Spinal
                  Association of Tennessee (USAT), a 501(c)(3) nonprofit
                  organization dedicated to improving the quality of life for
                  people with spinal cord injuries and related disabilities.
                </p>
                <p>
                  This program is made possible through the generous support of
                  the Craig H. Neilsen Foundation, whose commitment to the SCI
                  community helps ensure that essential equipment reaches those
                  who need it most.
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </SectionWrapper>

      {/* Impact Metrics */}
      <SectionWrapper bg="off-white">
        <div className="section-divider mx-auto mb-5" />
        <ScrollReveal animation="fade-up">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-text-primary tracking-tight">
              Our Impact
            </h2>
          </div>
        </ScrollReveal>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          {[
            { number: "200+", label: "Items Distributed", desc: "Wheelchairs, walkers, cushions, and more placed with Tennesseans in need" },
            { number: "5+", label: "Years of Service", desc: "Serving the Tennessee SCI community with reliable, refurbished equipment" },
            { number: "10+", label: "Partner Organizations", desc: "Hospitals, rehab centers, and social service agencies across the state" },
          ].map((stat, index) => (
            <ScrollReveal key={stat.label} animation="scale-in" delay={index * 100}>
              <div className="bg-white rounded-xl p-10 shadow-[0_4px_32px_rgba(0,0,0,0.06)] hover:shadow-[0_8px_40px_rgba(0,0,0,0.1)] transition-shadow duration-300">
                <div className="text-5xl md:text-6xl font-bold text-accent mb-3 font-display tracking-tight">
                  {stat.number}
                </div>
                <div className="text-sm uppercase tracking-wider mb-4 text-text-secondary font-semibold">
                  {stat.label}
                </div>
                <p className="text-text-body text-base leading-relaxed">{stat.desc}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </SectionWrapper>

      {/* CTA */}
      <SectionWrapper bg="white">
        <ScrollReveal animation="fade-up">
          <div className="max-w-2xl mx-auto text-center">
            <div className="section-divider mx-auto mb-5" />
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-text-primary mb-5 tracking-tight">
              Ready to Get Involved?
            </h2>
            <p className="text-text-body text-lg mb-10 leading-relaxed">
              Whether you need equipment or have equipment to give, we are here
              to help.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/get-equipment">
                <Button variant="primary" size="lg" className="group shadow-lg shadow-accent/20 hover:shadow-xl hover:shadow-accent/30 transition-shadow duration-300">
                  Request Equipment
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true" />
                </Button>
              </Link>
              <Link href="/donate-equipment">
                <Button variant="secondary" size="lg" className="group shadow-sm hover:shadow-md transition-shadow duration-300">
                  Donate Equipment
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true" />
                </Button>
              </Link>
            </div>
          </div>
        </ScrollReveal>
      </SectionWrapper>
    </>
  );
}
