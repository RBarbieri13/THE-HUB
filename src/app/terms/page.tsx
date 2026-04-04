import type { Metadata } from "next";
import { SectionWrapper } from "@/components/layout/section-wrapper";
import { PageHeader } from "@/components/shared/page-header";
import { ScrollReveal } from "@/components/shared/scroll-reveal";
import { CONTACT, ORG_NAME } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Terms & Disclaimer",
};

export default function TermsPage() {
  return (
    <>
      <PageHeader
        title="Terms & Disclaimer"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Terms & Disclaimer" },
        ]}
      />

      <SectionWrapper bg="white">
        <ScrollReveal animation="fade-up">
        <div className="max-w-3xl mx-auto prose prose-lg prose-headings:font-heading prose-headings:text-text-primary prose-p:text-text-body prose-li:text-text-body">
          <div className="inline-flex items-center gap-2 bg-off-white rounded-sm px-4 py-2 mb-8">
            <span className="text-xs font-semibold uppercase tracking-wider text-text-light">Last Updated</span>
            <span className="text-sm text-text-body font-medium">March 9, 2026</span>
          </div>

          <h2>Terms of Use</h2>
          <p>
            By accessing and using the Hub website operated by{" "}
            {ORG_NAME}, you agree to the following terms. If you do not agree,
            please do not use this website.
          </p>
          <p>
            We reserve the right to modify these terms at any time. Continued
            use of the website after changes constitutes acceptance of the
            updated terms.
          </p>

          <h2>Equipment Availability</h2>
          <p>
            Inventory listed on this website is provided for informational
            purposes only. Availability changes frequently, and listing an item
            does not guarantee its availability. Submitting a request does not
            reserve or guarantee any specific item. All equipment is provided on
            a first-come, first-served basis, subject to eligibility and
            appropriateness of fit.
          </p>

          <h2>Donation Disclaimer</h2>
          <p>
            Not all donated items may be accepted. We reserve the right to
            decline donations that do not meet our safety, condition, or
            operational standards. Donated items become the property of{" "}
            {ORG_NAME} and may be refurbished, redistributed, or responsibly
            disposed of at our discretion.
          </p>

          <h2>Webcam Disclaimer</h2>
          <p>
            The live closet view is provided for transparency and public
            awareness. Images displayed through the webcam may not accurately
            represent current inventory levels or specific items available. The
            webcam feed may experience interruptions or delays and should not be
            relied upon as a definitive inventory source.
          </p>

          <h2>Limitation of Liability</h2>
          <p>
            {ORG_NAME} provides this website and its services on an &quot;as
            is&quot; basis. We make no warranties, express or implied, regarding
            the accuracy, completeness, or reliability of information on this
            site. To the fullest extent permitted by law, {ORG_NAME} shall not
            be liable for any direct, indirect, incidental, or consequential
            damages arising from your use of this website or the equipment
            provided through our program.
          </p>
          <p>
            Equipment provided through the Hub is offered as-is,
            without warranty of any kind. Recipients are responsible for
            ensuring that any equipment received is appropriate for their needs,
            ideally with the guidance of a qualified healthcare professional.
          </p>

          <h2>Contact</h2>
          <p>
            If you have questions about these terms, please contact us:
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
