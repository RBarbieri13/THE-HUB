import type { Metadata } from "next";
import { SectionWrapper } from "@/components/layout/section-wrapper";
import { PageHeader } from "@/components/shared/page-header";
import { ScrollReveal } from "@/components/shared/scroll-reveal";
import { CONTACT, ORG_NAME } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Privacy Policy",
};

export default function PrivacyPage() {
  return (
    <>
      <PageHeader
        title="Privacy Policy"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Privacy Policy" },
        ]}
      />

      <SectionWrapper bg="white">
        <ScrollReveal animation="fade-up">
          <div className="max-w-3xl mx-auto prose prose-lg prose-headings:font-heading prose-headings:text-text-primary prose-p:text-text-body prose-li:text-text-body">
            <div className="inline-flex items-center gap-2 bg-off-white border border-border rounded-sm px-4 py-2 mb-8">
              <span className="text-xs font-semibold uppercase tracking-wider text-text-light">Effective Date</span>
              <span className="text-sm text-text-body font-medium">March 9, 2026</span>
            </div>

            <h2>Introduction</h2>
            <p>
              {ORG_NAME} (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;)
              operates the Hub website. This Privacy Policy explains
              how we collect, use, and protect your personal information when you
              use our website and services.
            </p>

            <h2>Information We Collect</h2>
            <p>We may collect the following types of information:</p>
            <ul>
              <li>
                <strong>Contact information:</strong> Name, email address, and
                phone number provided through forms or account registration.
              </li>
              <li>
                <strong>Account credentials:</strong> Username and password when
                you create an account to access the inventory portal.
              </li>
              <li>
                <strong>Equipment request details:</strong> Information about your
                equipment needs, disability type, and related medical or
                functional details you choose to share.
              </li>
              <li>
                <strong>Usage data:</strong> General website usage information
                such as pages visited, time spent, and browser type, collected
                through standard analytics tools.
              </li>
            </ul>

            <h2>How We Use Your Information</h2>
            <p>We use the information we collect to:</p>
            <ul>
              <li>
                Fulfill equipment requests and coordinate donations.
              </li>
              <li>
                Communicate with you about your requests, donations, or inquiries.
              </li>
              <li>
                Improve our website, services, and user experience.
              </li>
              <li>
                Send occasional updates about the Hub, if you opt in.
              </li>
            </ul>

            <h2>Information Sharing</h2>
            <p>
              We do not sell, trade, or rent your personal information to third
              parties. We may share information with trusted partners only as
              necessary to fulfill equipment requests or coordinate referrals.
              These partners are required to maintain the confidentiality of your
              information.
            </p>

            <h2>Data Security</h2>
            <p>
              We implement reasonable administrative, technical, and physical
              safeguards to protect your personal information from unauthorized
              access, use, or disclosure. However, no method of transmission over
              the Internet is 100% secure, and we cannot guarantee absolute
              security.
            </p>

            <h2>Your Rights</h2>
            <p>You have the right to:</p>
            <ul>
              <li>Access the personal information we hold about you.</li>
              <li>Request correction of inaccurate information.</li>
              <li>Request deletion of your personal information.</li>
              <li>Opt out of non-essential communications.</li>
            </ul>
            <p>
              To exercise any of these rights, please contact us using the
              information below.
            </p>

            <h2>Contact Information</h2>
            <p>
              If you have questions or concerns about this Privacy Policy, please
              contact us:
            </p>
            <ul>
              <li>
                Email:{" "}
                <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
              </li>
              <li>
                Phone:{" "}
                <a href={`tel:${CONTACT.phone.replace(/[^+\d]/g, "")}`}>
                  {CONTACT.phone}
                </a>
              </li>
              <li>
                Mail: {CONTACT.address.street}, {CONTACT.address.city},{" "}
                {CONTACT.address.state} {CONTACT.address.zip}
              </li>
            </ul>
          </div>
        </ScrollReveal>
      </SectionWrapper>
    </>
  );
}
