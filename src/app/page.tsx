"use client";

import * as React from "react";
import { MarketingNavbar } from "@/components/marketing/navbar";
import { MarketingHero } from "@/components/marketing/hero";
import { ProductStorySection } from "@/components/marketing/product-story";
import { CreatorDashboardShowcase } from "@/components/marketing/creator-dashboard-showcase";
import { ThreeEnginesSection } from "@/components/marketing/three-engines";
import { CreatorWorkflowsSection } from "@/components/marketing/creator-workflows";
import { HowItWorksSection } from "@/components/marketing/how-it-works";
import { CreatorEconomicsSection } from "@/components/marketing/creator-economics";
import { ControlledSharingSection } from "@/components/marketing/controlled-sharing";
import { CreatorProfileShowcase } from "@/components/marketing/creator-profile-showcase";
import { ComparisonTableSection } from "@/components/marketing/comparison-table";
import { AnalyticsShowcaseSection } from "@/components/marketing/analytics-showcase";
import { InfrastructureTrustSection } from "@/components/marketing/infrastructure-trust";
import { FaqSection } from "@/components/marketing/faq-section";
import { FinalCtaSection } from "@/components/marketing/final-cta";
import { MarketingFooter } from "@/components/marketing/footer";

export default function MarketingHomePage() {
  // Smooth scroll initialization with Lenis
  React.useEffect(() => {
    // Respect user's reduced-motion preference
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    let lenisInstance: any = null;
    let animationFrameId: number;

    import("lenis").then((LenisModule) => {
      const Lenis = LenisModule.default;
      lenisInstance = new Lenis({
        duration: 1.1,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: "vertical",
        gestureOrientation: "vertical",
        smoothWheel: true,
      });

      function raf(time: number) {
        lenisInstance?.raf(time);
        animationFrameId = requestAnimationFrame(raf);
      }
      animationFrameId = requestAnimationFrame(raf);
    });

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
      lenisInstance?.destroy();
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-brand-bg text-brand-text selection:bg-brand-primary selection:text-white transition-colors duration-300">
      {/* 1. Floating Capsule Navigation */}
      <MarketingNavbar />

      <main className="flex-1">
        {/* 2. Hero Section + Interactive Product Visual + Value Strip */}
        <MarketingHero />

        {/* 3. Product Story: Creator Command Center Showcase */}
        <ProductStorySection />

        {/* 4. Creator Dashboard Showcase: Alternating Storytelling */}
        <CreatorDashboardShowcase />

        {/* 5. Three Core Engines: Storage, Delivery, Monetization */}
        <ThreeEnginesSection />

        {/* 6. Multiple Creator Workflows: Ingestion, Sharing, Revenue */}
        <CreatorWorkflowsSection />

        {/* 7. How Playxim Works: 4 Sequential Steps */}
        <HowItWorksSection />

        {/* 8. Creator Economics: Interactive Earnings Calculator */}
        <CreatorEconomicsSection />

        {/* 9. Controlled Sharing: Live Link Matrix & Security States */}
        <ControlledSharingSection />

        {/* 10. Creator Profile: Public Verified Creator Hub */}
        <CreatorProfileShowcase />

        {/* 11. Product Differentiation: Comparison Table */}
        <ComparisonTableSection />

        {/* 12. Intelligence & Analytics: Metric Cards & Activity Stream */}
        <AnalyticsShowcaseSection />

        {/* 13. Infrastructure & Reliability: Cloud Primitives */}
        <InfrastructureTrustSection />

        {/* 14. Frequently Asked Questions: Accordion */}
        <FaqSection />

        {/* 15. Final Immersive CTA */}
        <FinalCtaSection />
      </main>

      {/* 16. Marketing Footer */}
      <MarketingFooter />
    </div>
  );
}
