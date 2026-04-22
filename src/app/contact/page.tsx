import type { Metadata } from "next";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { SectionWrapper } from "@/components/layout/section-wrapper";
import { ContactForm } from "@/components/forms/contact-form";
import { ScrollReveal } from "@/components/shared/scroll-reveal";
import { CONTACT } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Contact Us",
};

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Get in touch with The Hub."
        subtitle="Questions about donating, requesting, or referring? Reach us by phone or email — we typically respond within one to two business days."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Contact" },
        ]}
        image={{
          src: "/images/stock/community-event.jpg",
          alt: "United Spinal Association of Tennessee community members at a Hub event",
        }}
      />

      <SectionWrapper bg="white">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-12">
          {/* Left column — contact info */}
          <ScrollReveal animation="fade-right" delay={100}>
            <div>
              <span className="eyebrow">Reach us</span>
              <h2 className="h2-editorial mt-5">
                Three ways to start a conversation.
              </h2>
              <div className="mt-8 space-y-4">
                {[
                  {
                    Icon: Phone,
                    label: "Phone",
                    value: CONTACT.phone,
                    href: `tel:${CONTACT.phone}`,
                    sub: "Voicemail is read daily",
                  },
                  {
                    Icon: Mail,
                    label: "Email",
                    value: CONTACT.email,
                    href: `mailto:${CONTACT.email}`,
                    sub: "Best for detailed requests",
                  },
                  {
                    Icon: MapPin,
                    label: "Location",
                    value: CONTACT.locationLabel,
                    sub: CONTACT.serviceArea,
                  },
                  {
                    Icon: Clock,
                    label: "Hours",
                    value: CONTACT.hours.weekdays,
                    sub: `${CONTACT.hours.saturday} · ${CONTACT.hours.sunday}`,
                  },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="flex items-start gap-4 p-5 bg-cream-50 border border-ink-900/10 rounded-[10px]"
                  >
                    <div className="w-10 h-10 rounded-full bg-teal-700/10 flex items-center justify-center shrink-0">
                      <item.Icon className="h-4 w-4 text-teal-800" />
                    </div>
                    <div>
                      <div className="font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.1em] text-ink-muted">
                        {item.label}
                      </div>
                      {item.href ? (
                        <a
                          href={item.href}
                          className="block text-[16px] font-medium text-ink-900 hover:text-orange-600 transition-colors mt-0.5"
                        >
                          {item.value}
                        </a>
                      ) : (
                        <div className="text-[16px] font-medium text-ink-900 mt-0.5">
                          {item.value}
                        </div>
                      )}
                      <div className="text-[13px] text-ink-muted mt-0.5">
                        {item.sub}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <p className="mt-8 text-[13px] text-ink-muted max-w-[40ch] leading-[1.55]">
                For the safety of our recipients and volunteers, the closet&apos;s
                physical address is confirmed directly when scheduling a pickup
                or drop-off.
              </p>
            </div>
          </ScrollReveal>

          {/* Right column — contact form */}
          <ScrollReveal animation="fade-left" delay={200}>
            <div className="bg-white border border-ink-900/10 rounded-[12px] shadow-[0_4px_16px_rgba(12,57,64,0.05)] p-8 md:p-10">
              <span className="eyebrow">Message</span>
              <h2 className="h2-editorial mt-5">Send us a message.</h2>
              <p className="lead-editorial mt-4 text-[16px]">
                Fill out the form and we&apos;ll get back to you within 1–2
                business days.
              </p>
              <div className="mt-8">
                <ContactForm />
              </div>
            </div>
          </ScrollReveal>
        </div>
      </SectionWrapper>
    </>
  );
}
