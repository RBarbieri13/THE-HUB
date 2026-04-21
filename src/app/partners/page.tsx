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
  ArrowRight,
} from "lucide-react";
import { SectionWrapper } from "@/components/layout/section-wrapper";
import { PageHeader } from "@/components/shared/page-header";
import { ScrollReveal } from "@/components/shared/scroll-reveal";

export const metadata: Metadata = {
  title: "Partners & Referrals",
};

const REFERRAL_SOURCES = [
  { label: "Hospitals", icon: Hospital },
  { label: "Rehabilitation centers", icon: Activity },
  { label: "Physical & occupational therapists", icon: UserCheck },
  { label: "Independent living centers", icon: Home },
  { label: "Case managers", icon: Briefcase },
  { label: "Social workers", icon: HeartHandshake },
  { label: "Community organizations", icon: Building2 },
  { label: "DME vendors", icon: Package },
] as const;

const REFERRAL_STEPS = [
  {
    n: "01",
    title: "Review program scope",
    description:
      "Familiarize yourself with our eligibility criteria and the types of equipment we carry.",
  },
  {
    n: "02",
    title: "Submit a referral",
    description:
      "Use our Request Equipment form to submit a referral on behalf of your client. Detail helps us match faster.",
  },
  {
    n: "03",
    title: "We follow up",
    description:
      "We reach out directly to the referred individual to discuss available options and next steps.",
  },
];

const SUPPORTERS = [
  {
    name: "Craig H. Neilsen Foundation",
    badge: "Grant Funder",
    description:
      "A national foundation dedicated to improving quality of life for people with spinal cord injuries through research and community programs.",
  },
  {
    name: "United Spinal Association",
    badge: "Affiliate",
    description:
      "The nation's leading nonprofit organization dedicated to enhancing the quality of life of people with spinal cord injuries and disorders.",
  },
  {
    name: "Vanderbilt Stallworth Rehabilitation Hospital",
    badge: "Referral Partner",
    description:
      "A leading inpatient rehabilitation facility in Nashville, regularly referring patients with new or chronic spinal cord injuries.",
  },
  {
    name: "Tennessee Department of Human Services",
    badge: "Community Partner",
    description:
      "State agency partners who connect eligible Tennesseans with Hub resources through their Vocational Rehabilitation programs.",
  },
];

export default function PartnersPage() {
  return (
    <>
      <PageHeader
        eyebrow="Partners & referrals"
        title="Working together to move equipment where it's needed."
        subtitle="If you work with people who face mobility barriers, we'd love to serve them together. The Hub accepts referrals from clinicians, case managers, community organizations, and more."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Partners" },
        ]}
      />

      {/* Referral sources */}
      <SectionWrapper bg="white">
        <ScrollReveal animation="fade-up">
          <div className="max-w-3xl">
            <span className="eyebrow">Who can refer</span>
            <h2 className="h2-editorial mt-5">
              If you&apos;re in the mobility-care ecosystem, you can refer.
            </h2>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 mt-10">
          {REFERRAL_SOURCES.map((source, index) => (
            <ScrollReveal key={source.label} animation="fade-up" delay={index * 50}>
              <div className="flex items-center gap-3 bg-cream-50 border border-ink-900/10 rounded-[10px] px-4 py-4 hover:border-ink-900/20 hover:shadow-sm transition-all">
                <div className="w-9 h-9 rounded-full bg-teal-700/10 flex items-center justify-center shrink-0">
                  <source.icon className="h-4 w-4 text-teal-800" />
                </div>
                <span className="text-[14px] font-medium text-ink-900">
                  {source.label}
                </span>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </SectionWrapper>

      {/* Referral process */}
      <SectionWrapper bg="cream">
        <ScrollReveal animation="fade-up">
          <div className="max-w-3xl">
            <span className="eyebrow">Referral process</span>
            <h2 className="h2-editorial mt-5">
              Three steps to send someone our way.
            </h2>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mt-12">
          {REFERRAL_STEPS.map((step, i) => (
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

        <ScrollReveal animation="fade-up" delay={400}>
          <div className="mt-12">
            <Link
              href="/get-equipment"
              className="group inline-flex items-center gap-2 px-6 py-3.5 bg-orange-600 hover:bg-orange-700 text-white font-semibold text-[15px] rounded-[6px] transition-colors"
            >
              Submit a referral
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
        </ScrollReveal>
      </SectionWrapper>

      {/* Supporters */}
      <SectionWrapper bg="white">
        <ScrollReveal animation="fade-up">
          <div className="max-w-3xl">
            <span className="eyebrow">Supporters</span>
            <h2 className="h2-editorial mt-5">
              Funding, referrals, and community — the network behind the
              closet.
            </h2>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-12">
          {SUPPORTERS.map((partner, index) => (
            <ScrollReveal key={partner.name} animation="fade-up" delay={index * 100}>
              <div className="bg-cream-50 border border-ink-900/10 rounded-[12px] p-7 h-full hover:shadow-md hover:border-ink-900/20 transition-all">
                <div className="flex items-start justify-between gap-4">
                  <h3 className="font-[family-name:var(--font-display)] text-[22px] font-medium text-ink-900 leading-[1.15] tracking-[-0.015em]">
                    {partner.name}
                  </h3>
                  <span className="shrink-0 font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[0.1em] text-orange-700 bg-orange-50 border border-orange-200 px-2.5 py-1 rounded-full">
                    {partner.badge}
                  </span>
                </div>
                <p className="mt-3 text-ink-body text-[15px] leading-[1.6]">
                  {partner.description}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </SectionWrapper>

      {/* Become a partner */}
      <SectionWrapper bg="primary-dark">
        <ScrollReveal animation="fade-up">
          <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-10 items-end">
            <div>
              <span className="inline-flex items-center gap-2.5 font-[family-name:var(--font-mono)] text-[12px] font-bold uppercase tracking-[0.14em] text-orange-300 mb-5">
                <span className="w-7 h-[2px] bg-orange-400" />
                Become a partner
              </span>
              <h2 className="font-[family-name:var(--font-display)] text-[40px] md:text-[48px] font-medium leading-[1.06] tracking-[-0.02em] text-white">
                Want to work together?
              </h2>
              <p className="lead-editorial mt-5 text-white/80 max-w-[54ch]">
                Healthcare facility, community organization, or equipment
                vendor — we&apos;d love to hear from you. Let&apos;s find the
                people in your network who need what we have.
              </p>
            </div>
            <div>
              <Link
                href="/contact"
                className="group inline-flex items-center gap-2 px-6 py-3.5 bg-white hover:bg-cream-100 text-ink-900 font-semibold text-[15px] rounded-[6px] transition-colors"
              >
                Contact Us
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>
          </div>
        </ScrollReveal>
      </SectionWrapper>
    </>
  );
}
