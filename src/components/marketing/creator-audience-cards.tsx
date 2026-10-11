"use client";

import * as React from "react";
import Link from "next/link";
import {
  CheckCircle2,
  ArrowRight,
  UploadCloud,
  Play,
  DollarSign,
  Download,
  ShieldCheck,
  Zap,
  Smartphone,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container, SectionHeader } from "@/components/ui/layout-primitives";
import { Badge } from "@/components/ui/badge";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

export function CreatorAudienceCardsSection() {
  const creatorPerks = [
    "Monetize from the 1st view — no waiting or subscriber requirements",
    "Earn a flat $1.00 for every 1,000 views and downloads",
    "Low $5.00 minimum withdrawal threshold",
    "Unlimited free cloud storage — upload any file or video",
    "3 simple ways to upload: Web Dashboard, Telegram Bot, or Link Converter",
    "Live view counter & real-time earnings tracker",
    "Daily payouts via UPI, Bank Transfer, PayPal, or Crypto (USDT)",
    "24/7 dedicated creator support on our official Telegram",
  ];

  const viewerPerks = [
    "No sign-up or account required — watch and download instantly",
    "Fast 1080p HD video player with smooth buffer-free playback",
    "1-click high-speed downloads with zero throttling",
    "Clean, comfortable layout with minimal, non-intrusive ads",
    "Free Playxim Android app with background play and dark mode",
    "Zero suspicious permissions asked — safe and privacy-friendly",
    "Works seamlessly on any phone, tablet, laptop, or desktop",
    "Save files offline to watch anytime without internet",
  ];

  return (
    <section id="for-who" className="py-20 sm:py-28 border-t border-brand-border bg-transparent relative">
      <Container className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
        <ScrollReveal duration={600} variant="subtle">
          <SectionHeader
            badge={<Badge variant="default">Platform Benefits</Badge>}
            title="Built for Creators. Loved by Viewers."
            description="Whether you are uploading content to earn money or streaming videos as a viewer, Playxim gives you a fast, smooth, and hassle-free experience."
          />
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-12 sm:mt-16 text-left">
          {/* =========================================================
              CARD 1: FOR CREATORS (Publishers & Channel Owners)
             ========================================================= */}
          <ScrollReveal delay={100} duration={700} variant="slide">
            <div className="relative rounded-3xl p-7 sm:p-10 border-2 border-brand-primary/40 bg-gradient-to-b from-brand-primary/[0.08] via-brand-surface to-brand-surface shadow-xl flex flex-col justify-between h-full group hover:border-brand-primary/70 transition-all duration-300 hover:-translate-y-1">
              {/* Corner Badge */}
              <div className="flex items-center justify-between gap-3 mb-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-brand-primary text-white shadow-xs">
                  <DollarSign className="h-3.5 w-3.5" />
                  <span>FOR CREATORS & PUBLISHERS</span>
                </div>
                <span className="text-xs font-mono font-bold text-amber-600 dark:text-brand-accent bg-amber-500/10 px-2.5 py-0.5 rounded-full border border-amber-500/20">
                  $1.00 / 1K Views
                </span>
              </div>

              {/* Title & Tagline */}
              <div className="space-y-2 mb-6">
                <h3 className="text-2xl sm:text-3xl font-display font-extrabold text-brand-text tracking-tight">
                  Upload, Share & Monetize
                </h3>
                <p className="text-sm text-brand-muted leading-relaxed">
                  Turn your audience into daily income. Upload files, share direct links on Telegram, WhatsApp, or YouTube, and get paid for every single view.
                </p>
              </div>

              {/* Checklist */}
              <ul className="space-y-3 mb-8 flex-1">
                {creatorPerks.map((perk, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-brand-text">
                    <CheckCircle2 className="h-4 w-4 text-brand-primary shrink-0 mt-0.5" />
                    <span className="leading-snug">{perk}</span>
                  </li>
                ))}
              </ul>

              {/* Creator CTAs */}
              <div className="pt-4 border-t border-brand-border/60 space-y-3">
                <Link href="/auth/sign-up" className="block w-full">
                  <Button
                    size="lg"
                    variant="primary"
                    className="w-full h-12 rounded-xl text-sm font-semibold shadow-md shadow-brand-primary/20 hover:scale-[1.01] active:scale-[0.98] transition-all"
                  >
                    <span>Start Uploading Free</span>
                    <ArrowRight className="h-4 w-4 ml-1.5" />
                  </Button>
                </Link>
                <div className="flex items-center justify-center gap-2 text-xs text-brand-muted text-center">
                  <ShieldCheck className="h-3.5 w-3.5 text-emerald-500" />
                  <span>No credit card required • Instant account setup</span>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* =========================================================
              CARD 2: FOR VIEWERS & AUDIENCE (Fast Streaming & Downloads)
             ========================================================= */}
          <ScrollReveal delay={180} duration={700} variant="slide">
            <div className="relative rounded-3xl p-7 sm:p-10 border-2 border-brand-secondary/40 bg-gradient-to-b from-brand-secondary/[0.08] via-brand-surface to-brand-surface shadow-xl flex flex-col justify-between h-full group hover:border-brand-secondary/70 transition-all duration-300 hover:-translate-y-1">
              {/* Corner Badge */}
              <div className="flex items-center justify-between gap-3 mb-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-brand-secondary text-white shadow-xs">
                  <Play className="h-3.5 w-3.5 fill-current" />
                  <span>FOR VIEWERS & AUDIENCE</span>
                </div>
                <span className="text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
                  Buffer-Free 1080p
                </span>
              </div>

              {/* Title & Tagline */}
              <div className="space-y-2 mb-6">
                <h3 className="text-2xl sm:text-3xl font-display font-extrabold text-brand-text tracking-tight">
                  Watch & Download Seamlessly
                </h3>
                <p className="text-sm text-brand-muted leading-relaxed">
                  Enjoy a clean, fast experience with zero friction. Watch videos in full high definition or download full files at top speed with no registration needed.
                </p>
              </div>

              {/* Checklist */}
              <ul className="space-y-3 mb-8 flex-1">
                {viewerPerks.map((perk, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-brand-text">
                    <CheckCircle2 className="h-4 w-4 text-brand-secondary shrink-0 mt-0.5" />
                    <span className="leading-snug">{perk}</span>
                  </li>
                ))}
              </ul>

              {/* Viewer CTAs */}
              <div className="pt-4 border-t border-brand-border/60 space-y-3">
                <a
                  href="https://play.google.com/store/apps/details?id=com.playxim.app&pcampaignid=web_share"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full"
                >
                  <Button
                    size="lg"
                    variant="secondary"
                    className="w-full h-12 rounded-xl text-sm font-semibold bg-brand-bg-soft text-brand-text border border-brand-border hover:bg-brand-surface hover:scale-[1.01] active:scale-[0.98] transition-all"
                  >
                    <Smartphone className="h-4 w-4 mr-2 text-brand-secondary" />
                    <span>Get Playxim Android App</span>
                  </Button>
                </a>
                <div className="flex items-center justify-center gap-2 text-xs text-brand-muted text-center">
                  <Zap className="h-3.5 w-3.5 text-amber-500" />
                  <span>Free download on Google Play Store</span>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </Container>
    </section>
  );
}

export default CreatorAudienceCardsSection;
