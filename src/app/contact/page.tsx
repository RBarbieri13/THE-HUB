import type { Metadata } from "next";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { SectionWrapper } from "@/components/layout/section-wrapper";
import { Card, CardContent } from "@/components/ui/card";
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
        title="Contact Us"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Contact Us" },
        ]}
      />

      <SectionWrapper bg="white">
        <div className="section-divider mb-5" />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left column — contact info */}
          <ScrollReveal animation="fade-right" delay={100}>
            <div>
              <h3 className="font-heading text-2xl font-bold text-text-heading">
                Get in Touch
              </h3>
              <p className="mt-2 text-text-light">
                Have questions about The Hub? We&apos;re here to help.
              </p>

              <div className="flex flex-col gap-4 mt-8">
                {/* Address */}
                <div className="p-5 rounded-sm bg-off-white border border-border flex items-start gap-4 hover:border-primary-dark/30 transition-all duration-300">
                  <div className="bg-primary-dark/10 rounded-full p-3 shrink-0">
                    <MapPin className="h-5 w-5 text-primary-dark" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm text-text-heading mb-0.5">
                      Address
                    </p>
                    <p className="text-sm">{CONTACT.address.street}</p>
                    <p className="text-sm">
                      {CONTACT.address.city}, {CONTACT.address.state}{" "}
                      {CONTACT.address.zip}
                    </p>
                  </div>
                </div>

                {/* Phone */}
                <div className="p-5 rounded-sm bg-off-white border border-border flex items-start gap-4 hover:border-primary-dark/30 transition-all duration-300">
                  <div className="bg-primary-dark/10 rounded-full p-3 shrink-0">
                    <Phone className="h-5 w-5 text-primary-dark" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm text-text-heading mb-0.5">
                      Phone
                    </p>
                    <a
                      href={`tel:${CONTACT.phone}`}
                      className="text-sm hover:text-primary-dark transition-colors"
                    >
                      {CONTACT.phone}
                    </a>
                  </div>
                </div>

                {/* Email */}
                <div className="p-5 rounded-sm bg-off-white border border-border flex items-start gap-4 hover:border-primary-dark/30 transition-all duration-300">
                  <div className="bg-primary-dark/10 rounded-full p-3 shrink-0">
                    <Mail className="h-5 w-5 text-primary-dark" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm text-text-heading mb-0.5">
                      Email
                    </p>
                    <a
                      href={`mailto:${CONTACT.email}`}
                      className="text-sm hover:text-primary-dark transition-colors"
                    >
                      {CONTACT.email}
                    </a>
                  </div>
                </div>

                {/* Divider */}
                <div className="border-t border-border my-2" />

                {/* Hours of Operation */}
                <div className="p-5 rounded-sm bg-off-white border border-border flex items-start gap-4 hover:border-primary-dark/30 transition-all duration-300">
                  <div className="bg-primary-dark/10 rounded-full p-3 shrink-0">
                    <Clock className="h-5 w-5 text-primary-dark" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm text-text-heading mb-1">
                      Hours of Operation
                    </p>
                    <p className="text-sm">{CONTACT.hours.weekdays}</p>
                    <p className="text-sm">{CONTACT.hours.saturday}</p>
                    <p className="text-sm">{CONTACT.hours.sunday}</p>
                  </div>
                </div>

                {/* Embedded map */}
                <div className="rounded-sm overflow-hidden border border-border mt-2">
                  <iframe
                    title="The Hub — 955 Woodland St, Nashville, TN 37206"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3221.8!2d-86.7555!3d36.1745!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8864669e1a4b0e45%3A0x0!2s955+Woodland+St%2C+Nashville%2C+TN+37206!5e0!3m2!1sen!2sus!4v1"
                    width="100%"
                    height="0"
                    style={{ aspectRatio: "16/9" }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="border-0"
                  />
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Right column — contact form */}
          <ScrollReveal animation="fade-left" delay={200}>
            <Card className="shadow-[var(--shadow-card)] overflow-hidden border-t-4 border-t-accent">
              <CardContent className="p-8">
                <h3 className="font-heading text-2xl font-bold text-text-heading">
                  Send Us a Message
                </h3>
                <p className="mt-2 text-text-light">
                  Fill out the form below and we&apos;ll get back to you.
                </p>
                <div className="mt-6">
                  <ContactForm />
                </div>
              </CardContent>
            </Card>
          </ScrollReveal>
        </div>
      </SectionWrapper>
    </>
  );
}
