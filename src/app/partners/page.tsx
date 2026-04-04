import type { Metadata } from "next";
import Link from "next/link";
import {
  Hospital,
  Activity,
  UserCheck,
  Home,
  Briefcase,
  HeartHandshake,
  Building2,
  Package,
} from "lucide-react";
import { SectionWrapper } from "@/components/layout/section-wrapper";
import { PageHeader } from "@/components/shared/page-header";
import { Button } from "@/components/ui/button";
import { ScrollReveal } from "@/components/shared/scroll-reveal";

export const metadata: Metadata = {
  title: "Partners & Referrals",
};

const REFERRAL_SOURCES = [
  { label: "Hospitals", icon: Hospital },
  { label: "Rehabilitation centers", icon: Activity },
  { label: "Physical and occupational therapists", icon: UserCheck },
  { label: "Independent living centers", icon: Home },
  { label: "Case managers", icon: Briefcase },
  { label: "Social workers", icon: HeartHandshake },
  { label: "Community organizations", icon: Building2 },
  { label: "DME vendors", icon: Package },
] as const;

const REFERRAL_STEPS = [
  {
    number: 1,
    title: "Review Program Scope",
    description:
      "Familiarize yourself with our eligibility criteria and the types of equipment we provide. We serve Tennesseans with spinal cord injuries and related mobility disabilities.",
  },
  {
    number: 2,
    title: "Submit a Referral",
    description:
      "Use our Get Equipment form to submit a referral on behalf of your client. Include as much detail as possible about their equipment needs.",
  },
  {
    number: 3,
    title: "We Follow Up",
    description:
      "Our team will review the referral and reach out directly to the referred individual to discuss available options and next steps.",
  },
] as const;


export default function PartnersPage() {
  return (
    <>
      <PageHeader
        title="Partners & Referrals"
        subtitle="Working together to connect equipment with those who need it"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Partners" },
        ]}
      />

      {/* Referral Partners */}
      <SectionWrapper bg="white">
        <div className="section-divider mx-auto mb-5" />
        <ScrollReveal animation="fade-left">
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-text-primary mb-6">
            Referral Partners
          </h2>
          <div className="max-w-3xl space-y-4 text-text-body mb-8">
            <p>
              If you work with individuals who have spinal cord injuries or
              related mobility disabilities, you can refer them to the Donation
              Closet. We welcome referrals from healthcare providers, community
              organizations, and anyone who connects with people in need of
              adaptive equipment.
            </p>
            <p className="font-semibold text-text-primary">
              Who can make referrals:
            </p>
          </div>
        </ScrollReveal>

        {/* Referral source cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl">
          {REFERRAL_SOURCES.map((source, index) => (
            <ScrollReveal key={source.label} animation="fade-up" delay={index * 60}>
              <div className="flex items-center gap-3 bg-off-white border border-border rounded-sm p-4 hover:border-accent/30 hover:shadow-sm hover:-translate-y-0.5 transition-all duration-300">
                <div className="flex-shrink-0 w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center">
                  <source.icon className="w-4 h-4 text-primary-dark" aria-hidden="true" />
                </div>
                <span className="text-sm font-medium text-text-primary leading-tight">
                  {source.label}
                </span>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </SectionWrapper>

      {/* How to Make a Referral — numbered steps */}
      <SectionWrapper bg="off-white">
        <div className="section-divider mx-auto mb-5" />
        <ScrollReveal animation="fade-up">
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-text-primary mb-10 text-center">
            How to Make a Referral
          </h2>
        </ScrollReveal>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto relative">
          {/* Connecting line between steps (desktop only) */}
          <div className="hidden md:block absolute top-6 left-[calc(16.67%+24px)] right-[calc(16.67%+24px)] h-px bg-accent/30" aria-hidden="true" />
          {REFERRAL_STEPS.map((step, index) => (
            <ScrollReveal key={step.number} animation="fade-up" delay={index * 100}>
              <div className="text-center relative">
                <div className="w-12 h-12 rounded-full bg-accent text-white flex items-center justify-center text-xl font-heading font-bold mx-auto mb-4 relative z-10 shadow-md shadow-accent/20">
                  {step.number}
                </div>
                <p className="text-xs font-semibold uppercase tracking-widest text-accent mb-2">
                  Step {step.number}
                </p>
                <h3 className="font-heading text-lg font-semibold text-text-primary mb-2">
                  {step.title}
                </h3>
                <p className="text-text-body text-sm">{step.description}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
        <ScrollReveal animation="fade-up" delay={300}>
          <div className="text-center mt-10">
            <Link href="/get-equipment">
              <Button variant="primary" size="lg" className="shadow-lg shadow-accent/20 hover:shadow-xl hover:shadow-accent/30 transition-all duration-300">
                Submit a Referral
              </Button>
            </Link>
          </div>
        </ScrollReveal>
      </SectionWrapper>

      {/* Our Supporters */}
      <SectionWrapper bg="white">
        <div className="section-divider mx-auto mb-5" />
        <ScrollReveal animation="fade-up">
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-text-primary mb-6 text-center">
            Our Supporters
          </h2>
          <p className="text-text-body text-center max-w-2xl mx-auto mb-10">
            The Hub is made possible through the generous support of
            the Craig H. Neilsen Foundation and our community partners. Their
            commitment helps us connect essential equipment with those who need
            it most.
          </p>
        </ScrollReveal>

        {/* Partner cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          {[
            {
              name: "Craig H. Neilsen Foundation",
              type: "Primary Funder",
              description: "A national foundation dedicated to improving quality of life for people with spinal cord injuries through research and community programs.",
              badge: "Grant Funder",
            },
            {
              name: "United Spinal Association",
              type: "National Affiliate",
              description: "The nation's leading nonprofit organization dedicated to enhancing the quality of life of people with spinal cord injuries and disorders.",
              badge: "Affiliate",
            },
            {
              name: "Vanderbilt Stallworth Rehabilitation Hospital",
              type: "Referral Partner",
              description: "A leading inpatient rehabilitation facility in Nashville, regularly referring patients with new or chronic spinal cord injuries.",
              badge: "Referral Partner",
            },
            {
              name: "Tennessee Department of Human Services",
              type: "Community Partner",
              description: "State agency partners who connect eligible Tennesseans with Hub resources through their Vocational Rehabilitation programs.",
              badge: "Community Partner",
            },
          ].map((partner, index) => (
            <ScrollReveal key={partner.name} animation="fade-up" delay={index * 100}>
              <div className="bg-white border border-border rounded-sm p-6 shadow-sm hover:shadow-md hover:border-accent/30 hover:-translate-y-0.5 transition-all duration-300">
                <div className="flex items-start justify-between gap-4 mb-3">
                  <h3 className="font-heading text-lg font-bold text-text-primary">
                    {partner.name}
                  </h3>
                  <span className="shrink-0 text-xs font-semibold uppercase tracking-wider bg-primary/15 text-primary-dark px-2 py-1 rounded-sm">
                    {partner.badge}
                  </span>
                </div>
                <p className="text-text-body text-sm leading-relaxed">{partner.description}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </SectionWrapper>

      {/* Become a Partner CTA — gradient background, high visual weight */}
      <SectionWrapper bg="primary-dark">
        <div className="relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.08),transparent_60%)]" aria-hidden="true" />
          <ScrollReveal animation="fade-up">
            <div className="relative max-w-2xl mx-auto text-center">
              <div className="section-divider mx-auto mb-5" />
              <h2 className="font-heading text-2xl md:text-3xl font-bold mb-4">
                Become a Partner
              </h2>
              <p className="text-white/90 text-lg mb-8 max-w-xl mx-auto">
                Interested in partnering with the Hub? Whether you
                are a healthcare facility, community organization, or equipment
                vendor, we would love to hear from you.
              </p>
              <Link href="/contact">
                <Button
                  variant="outline"
                  size="lg"
                  className="border-white text-white hover:bg-white hover:text-primary-dark shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  Contact Us
                </Button>
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </SectionWrapper>
    </>
  );
}