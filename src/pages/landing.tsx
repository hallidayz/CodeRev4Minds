import { HeroSection } from "@/components/hero-section";
import { StatsSection } from "@/components/stats-section";
import { FeaturesSection } from "@/components/features-section";
import { IntegrationSection } from "@/components/integration-section";
import { PricingSection } from "@/components/pricing-section";
import { TestimonialsSection } from "@/components/testimonials-section";
import { CtaSection } from "@/components/cta-section";

export function Landing() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <HeroSection />

      {/* Statistics & Market Opportunity */}
      <StatsSection />

      {/* Features & AI Capabilities */}
      <div id="features">
        <FeaturesSection />
      </div>

      {/* Integration & DevOps Compatibility */}
      <div id="integrations">
        <IntegrationSection />
      </div>

      {/* Pricing Plans */}
      <div id="pricing">
        <PricingSection />
      </div>

      {/* Customer Testimonials & Social Proof */}
      <div id="testimonials">
        <TestimonialsSection />
      </div>

      {/* Final Call-to-Action */}
      <CtaSection />
    </div>
  );
}
