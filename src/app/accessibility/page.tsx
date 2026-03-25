import type { Metadata } from "next";
import { SectionWrapper } from "@/components/layout/section-wrapper";
import { PageHeader } from "@/components/shared/page-header";
import { CONTACT, ORG_NAME } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Accessibility Statement",
};

export default function AccessibilityPage() {
  return (
    <>
      <PageHeader
        title="Accessibility Statement"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Accessibility" },
        ]}
      />

      <SectionWrapper bg="white">
        <div className="max-w-3xl mx-auto prose prose-headings:font-heading prose-headings:text-text-heading prose-p:text-text-body prose-li:text-text-body">
          <h2>Our Commitment to Accessibility</h2>
          <p>
            {ORG_NAME} is committed to ensuring digital accessibility for people
            with disabilities. We continually improve the user experience for
            everyone and apply relevant accessibility standards.
          </p>

          <h3>Standards</h3>
          <p>
            We aim to conform to WCAG 2.1 Level AA standards. These guidelines
            explain how to make web content more accessible to people with a
            wide range of disabilities, including visual, auditory, physical,
            speech, cognitive, and neurological disabilities.
          </p>

          <h3>Features</h3>
          <ul>
            <li>Semantic HTML for meaningful document structure</li>
            <li>Full keyboard navigation support</li>
            <li>Screen reader compatibility</li>
            <li>Sufficient color contrast ratios</li>
            <li>Text resizing support up to 200%</li>
            <li>Alternative text for all meaningful images</li>
            <li>Clear and visible focus indicators</li>
            <li>Skip navigation links</li>
          </ul>

          <h3>Feedback</h3>
          <p>
            We welcome your feedback on the accessibility of this website. If
            you encounter any barriers or have suggestions for improvement,
            please contact us at{" "}
            <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a> or call{" "}
            <a href={`tel:${CONTACT.phone.replace(/[^+\d]/g, "")}`}>
              {CONTACT.phone}
            </a>
            .
          </p>

          <h3>Third-Party Content</h3>
          <p>
            We aim to ensure accessibility of third-party content integrated
            into our site, though we may not have full control over all external
            content. If you encounter accessibility issues with third-party
            content, we encourage you to contact the respective provider
            directly, and we will do our best to assist.
          </p>
        </div>
      </SectionWrapper>
    </>
  );
}
