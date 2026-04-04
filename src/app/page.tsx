import { Hero } from "@/components/home/hero";
import { ImpactStats } from "@/components/home/impact-stats";
import { AddressHoursBlock } from "@/components/home/address-hours-block";
import { ProblemSection } from "@/components/home/problem-section";
import { CTATrio } from "@/components/home/cta-trio";
import { HowItWorksPreview } from "@/components/home/how-it-works-preview";
import { Testimonials } from "@/components/home/testimonials";
import { CredibilityBand } from "@/components/home/credibility-band";
import { PhotoSection } from "@/components/home/photo-section";
import { SectionWrapper } from "@/components/layout/section-wrapper";

export default function HomePage() {
  return (
    <>
      <Hero />
      <ImpactStats />
      <AddressHoursBlock />
      <ProblemSection />
      <SectionWrapper bg="off-white">
        <CTATrio />
      </SectionWrapper>
      <SectionWrapper bg="white">
        <HowItWorksPreview />
      </SectionWrapper>
      <Testimonials />
      <CredibilityBand />
      <SectionWrapper bg="off-white">
        <PhotoSection />
      </SectionWrapper>
    </>
  );
}
