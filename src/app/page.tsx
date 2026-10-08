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

import Lenis from "lenis";

export default function MarketingHomePage() {
  // Enhanced smooth scroll initialization with Lenis
  React.useEffect(() => {
    // Respect user's reduced-motion preference
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const lenis = new Lenis({
      duration: 1.25,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1.05,
      touchMultiplier: 1.6,
      infinite: false,
    });

    (window as any).lenis = lenis;

    let animationFrameId: number;
    function raf(time: number) {
      lenis.raf(time);
      animationFrameId = requestAnimationFrame(raf);
    }
    animationFrameId = requestAnimationFrame(raf);

    // Smooth anchor scroll interception for silky navigation jumps
    const handleAnchorClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement)?.closest("a");
      if (!target) return;
      const href = target.getAttribute("href");
      if (href && href.startsWith("#") && href.length > 1) {
        const targetElement = document.querySelector(href);
        if (targetElement) {
          e.preventDefault();
          lenis.scrollTo(targetElement as HTMLElement, {
            offset: -80,
            duration: 1.2,
          });
        }
      }
    };

    document.addEventListener("click", handleAnchorClick);

    return () => {
      document.removeEventListener("click", handleAnchorClick);
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
      lenis.destroy();
      delete (window as any).lenis;
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-transparent text-brand-text selection:bg-brand-primary selection:text-white transition-colors duration-300">
      {/* 1. Header: Wide at top, animated floating capsule when scrolling */}
      <MarketingNavbar />

      <main className="flex-1">
        {/* 2. Hero Section: 3D Floating Hardware with background removed, store badges, and $1 per 1K views */}
        <MarketingHero />

        {/* 3. Supported Formats Ribbon */}
        <SupportedFormatsStrip />

        {/* 4. Core Features: 3 Alternating rows with isolated 3D hardware elements */}
        <CreatorWorkflowsSection />

        {/* 5. Direct Product Comparison Matrix: Playxim vs Google Drive, Terabox, Mega */}
        <ComparisonTableSection />

        {/* 6. Two Highlight Value Banners: Unlimited Storage & $1.00 per 1K Views Monetization */}
        <HighlightBannersSection />

        {/* 7. How Playxim Works: 4 Connected circular step nodes */}
        <HowItWorksSection />

        {/* 8. Frequently Asked Questions: Clean interactive accordion */}
        <FaqSection />

        {/* 9. Download Playxim Mobile App Banner (Live Play Store Link) */}
        <MobileAppBannerSection />

        {/* 10. Final Conversion CTA Banner */}
        <FinalCtaSection />
      </main>

      {/* 11. Structured Marketing Footer */}
      <MarketingFooter />
    </div>
  );
}
