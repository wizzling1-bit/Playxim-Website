"use client";

import * as React from "react";
import { Smartphone, Download, Star, Play, HardDrive, DollarSign } from "lucide-react";
import { Container } from "@/components/ui/layout-primitives";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

export function MobileAppBannerSection() {
  return (
    <section id="download-app" className="py-20 sm:py-28 border-t border-brand-border/60 bg-transparent relative">
      <Container className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
        <ScrollReveal duration={800}>
          <div className="relative rounded-3xl p-8 sm:p-12 lg:p-16 bg-gradient-to-br from-brand-surface via-brand-surface/95 to-brand-primary/10 dark:from-[#111728] dark:via-[#111728]/95 dark:to-brand-primary/15 border border-brand-border shadow-2xl overflow-hidden text-center group">
            {/* Ambient Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-brand-primary/15 blur-[130px] rounded-full pointer-events-none -z-10" />

            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-semibold bg-brand-primary/10 text-brand-primary border border-brand-primary/20 mb-4">
              <Smartphone className="h-3.5 w-3.5" />
              <span>Mobile & Web App Ecosystem</span>
            </div>

            {/* Heading */}
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-brand-text tracking-tight max-w-3xl mx-auto">
              View & Download Any Link with the Playxim App
            </h2>

            <p className="text-sm sm:text-base text-brand-muted max-w-2xl mx-auto mt-3 leading-relaxed">
              Your audience can open your shared links to stream buffer-free 4K videos or download full files at maximum speed on Android, iOS, and Web.
            </p>

            {/* Feature Highlights Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-4xl mx-auto mt-8 text-left">
              <div className="p-4.5 rounded-2xl bg-brand-bg-soft/80 dark:bg-[#0D121F]/80 border border-brand-border/70">
                <Play className="h-5 w-5 text-brand-primary mb-2 fill-current" />
                <div className="text-xs font-bold text-brand-text">4K Video Player</div>
                <div className="text-[11px] text-brand-muted mt-0.5">Buffer-free mobile streaming</div>
              </div>
              <div className="p-4.5 rounded-2xl bg-brand-bg-soft/80 dark:bg-[#0D121F]/80 border border-brand-border/70">
                <Download className="h-5 w-5 text-brand-glow mb-2" />
                <div className="text-xs font-bold text-brand-text">Fast Downloader</div>
                <div className="text-[11px] text-brand-muted mt-0.5">Direct high-speed downloads</div>
              </div>
              <div className="p-4.5 rounded-2xl bg-brand-bg-soft/80 dark:bg-[#0D121F]/80 border border-brand-border/70">
                <HardDrive className="h-5 w-5 text-emerald-500 mb-2" />
                <div className="text-xs font-bold text-brand-text">Mobile Uploads</div>
                <div className="text-[11px] text-brand-muted mt-0.5">Upload straight from gallery</div>
              </div>
              <div className="p-4.5 rounded-2xl bg-brand-bg-soft/80 dark:bg-[#0D121F]/80 border border-brand-border/70">
                <DollarSign className="h-5 w-5 text-amber-500 mb-2" />
                <div className="text-xs font-bold text-brand-text">$1 / 1K Wallet</div>
                <div className="text-[11px] text-brand-muted mt-0.5">Live view tracker & payouts</div>
              </div>
            </div>

            {/* App Store Buttons & Ratings */}
            <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 mt-10">
              {/* Google Play (Live Link) */}
              <a
                href="https://play.google.com/store/apps/details?id=com.playxim.app&pcampaignid=web_share"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-6 py-3 rounded-2xl bg-brand-surface dark:bg-[#161F36] border border-brand-border shadow-sm hover:border-brand-primary/50 hover:bg-brand-bg-soft dark:hover:bg-[#1C2744] hover:-translate-y-0.5 transition-all text-left group"
              >
                <div className="h-7 w-7 text-brand-primary flex items-center justify-center">
                  <svg viewBox="0 0 24 24" className="h-6 w-6 fill-current">
                    <path d="M3.609 1.814L13.793 12 3.61 22.186c-.378-.344-.61-.83-.61-1.378V3.192c0-.547.232-1.034.61-1.378zm11.254 11.255L17.47 15.68l-12.01 6.843 9.403-9.454zm0-2.138L4.85 1.478l12.62 7.19-2.607 2.263zm1.484 1.291l4.02-2.292c.67-.382.67-1.008 0-1.39l-4.02-2.292-1.848 1.848 1.848 2.126z" />
                  </svg>
                </div>
                <div>
                  <div className="text-[10px] uppercase font-bold text-brand-muted leading-tight">GET IT ON</div>
                  <div className="text-sm font-bold text-brand-text leading-tight">Google Play</div>
                </div>
              </a>

              {/* App Store */}
              <a
                href="#download-app"
                className="inline-flex items-center gap-3 px-6 py-3 rounded-2xl bg-brand-surface dark:bg-[#161F36] border border-brand-border shadow-sm hover:border-brand-primary/50 hover:bg-brand-bg-soft dark:hover:bg-[#1C2744] hover:-translate-y-0.5 transition-all text-left group"
              >
                <div className="h-7 w-7 text-brand-primary flex items-center justify-center">
                  <svg viewBox="0 0 24 24" className="h-6 w-6 fill-current">
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.37c.56-.71.97-1.71.86-2.72-.88.04-1.92.59-2.51 1.28-.52.59-.97 1.57-.85 2.54 1 .08 1.98-.47 2.5-1.1" />
                  </svg>
                </div>
                <div>
                  <div className="text-[10px] uppercase font-bold text-brand-muted leading-tight">DOWNLOAD ON THE</div>
                  <div className="text-sm font-bold text-brand-text leading-tight">App Store</div>
                </div>
              </a>
            </div>

            <div className="mt-6 flex items-center justify-center gap-2 text-xs text-brand-muted">
              <div className="flex text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-3.5 w-3.5 fill-current" />
                ))}
              </div>
              <span className="font-bold text-brand-text">4.9 / 5</span>
              <span>• 500,000+ Downloads Worldwide</span>
            </div>
          </div>
        </ScrollReveal>
      </Container>
    </section>
  );
}
