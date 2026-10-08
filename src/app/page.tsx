"use client";

import * as React from "react";
import { MarketingNavbar } from "@/components/marketing/navbar";
import { MarketingHero } from "@/components/marketing/hero";
import { SupportedFormatsStrip } from "@/components/marketing/supported-formats";
import { CreatorWorkflowsSection } from "@/components/marketing/creator-workflows";
import { ComparisonTableSection } from "@/components/marketing/comparison-table";
import { HighlightBannersSection } from "@/components/marketing/highlight-banners";
import { HowItWorksSection } from "@/components/marketing/how-it-works";
import { FaqSection } from "@/components/marketing/faq-section";
import { MobileAppBannerSection } from "@/components/marketing/mobile-app-banner";
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
    <div className="min-h-screen flex flex-col bg-transparent text-brand-text selection:bg-brand-primary selection:text-white transition-colors duration-300">
      {/* 1. Floating Capsule Navigation */}
      <MarketingNavbar />

      <main className="flex-1">
        {/* 2. Hero Section: 3D Floating Mockup, badges, and $1 per 1K views */}
        <MarketingHero />

        {/* 3. Supported Formats Ribbon */}
        <SupportedFormatsStrip />

        {/* 4. Core Features: 3 Alternating rows with Laptop and Phone mockups */}
        <CreatorWorkflowsSection />

        {/* 5. Direct Product Comparison Matrix: Playxim vs Google Drive, Terabox, Mega */}
        <ComparisonTableSection />

        {/* 6. Two Highlight Value Banners: Unlimited Storage & $1.00 per 1K Views Monetization */}
        <HighlightBannersSection />

        {/* 7. How Playxim Works: 4 Connected circular step nodes */}
        <HowItWorksSection />

        {/* 8. Frequently Asked Questions: Clean interactive accordion */}
        <FaqSection />

        {/* 9. Download Playxim Mobile App Banner */}
        <MobileAppBannerSection />

        {/* 10. Final Conversion CTA Banner */}
        <FinalCtaSection />
      </main>

      {/* 11. Structured Marketing Footer */}
      <MarketingFooter />
    </div>
  );
}
