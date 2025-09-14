/**
 * CodeRev4Minds - AI-Powered Code Review Automation Tool
 * 
 * PROPRIETARY SOFTWARE - AC MiNDS, LLC
 * Copyright (c) 2024 AC MiNDS, LLC. All rights reserved.
 * 
 * This software is proprietary and confidential. Unauthorized copying, 
 * distribution, or modification is strictly prohibited.
 * 
 * For licensing inquiries: legal@acminds.com
 * 
 * @file landing.tsx
 * @description Main landing page component
 * @author AC MiNDS, LLC
 * @version 1.0.0
 */

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
