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
  Users,
  Smartphone,
  Eye,
  Wallet,
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
    <section id="for-who" className="py-20 sm:py-28 border-t border-slate-200/80 dark:border-brand-border/60 bg-transparent relative">
      <Container className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
        <ScrollReveal duration={600}>
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
          <ScrollReveal delay={100} duration={700}>
            <div className="relative rounded-3xl p-7 sm:p-10 border-2 border-brand-primary/30 dark:border-brand-primary/40 bg-gradient-to-b from-blue-50/60 via-white to-white dark:from-brand-primary/10 dark:via-[#111728] dark:to-[#111728] shadow-xl shadow-brand-primary/5 dark:shadow-black/50 flex flex-col justify-between h-full group hover:border-brand-primary/60 transition-all duration-300">
              {/* Corner Badge */}
              <div className="flex items-center justify-between gap-3 mb-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-brand-primary text-white shadow-xs">
                  <DollarSign className="h-3.5 w-3.5" />
                  <span>FOR CREATORS & PUBLISHERS</span>
                </div>
                <span className="text-xs font-mono font-semibold text-brand-primary bg-brand-primary/10 px-2.5 py-0.5 rounded-full border border-brand-primary/20">
                  $1.00 / 1K Views
                </span>
              </div>

              {/* Title & Tagline */}
              <div className="space-y-2 mb-6">
                <h3 className="text-2xl sm:text-3xl font-display font-extrabold text-slate-900 dark:text-brand-text tracking-tight">
                  Upload, Share & Monetize
                </h3>
                <p className="text-sm text-slate-600 dark:text-brand-muted leading-relaxed">
                  Turn your audience into daily income. Upload files, share direct links on Telegram, WhatsApp, or YouTube, and get paid for every single view.
                </p>
              </div>

              {/* Checklist */}
              <ul className="space-y-3 mb-8 flex-1">
                {creatorPerks.map((perk, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-slate-700 dark:text-slate-200">
                    <CheckCircle2 className="h-4 w-4 text-brand-primary shrink-0 mt-0.5" />
                    <span className="leading-snug">{perk}</span>
                  </li>
                ))}
              </ul>

              {/* Creator CTAs */}
              <div className="pt-4 border-t border-slate-200/80 dark:border-brand-border/60 space-y-3">
                <Link href="/auth/sign-up" className="block w-full">
                  <Button
                    size="lg"
                    variant="primary"
                    className="w-full rounded-2xl h-12 font-semibold shadow-lg shadow-brand-primary/20 group-hover:shadow-brand-glow/30"
                  >
                    <span>Start Uploading — 100% Free</span>
                    <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <div className="flex items-center justify-center gap-4 text-xs text-slate-500 dark:text-brand-muted font-medium">
                  <span>✓ No credit card needed</span>
                  <span>•</span>
                  <span>✓ 30-second sign up</span>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* =========================================================
              CARD 2: FOR VIEWERS & AUDIENCE (Consumers)
             ========================================================= */}
          <ScrollReveal delay={200} duration={700}>
            <div className="relative rounded-3xl p-7 sm:p-10 border border-slate-200/80 dark:border-brand-border bg-gradient-to-b from-slate-50/70 via-white to-white dark:from-[#131A2E] dark:via-[#111728] dark:to-[#111728] shadow-xl shadow-slate-900/5 dark:shadow-black/50 flex flex-col justify-between h-full group hover:border-slate-300 dark:hover:border-slate-700 transition-all duration-300">
              {/* Corner Badge */}
              <div className="flex items-center justify-between gap-3 mb-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-slate-800 dark:bg-slate-700 text-white shadow-xs">
                  <Users className="h-3.5 w-3.5" />
                  <span>FOR VIEWERS & AUDIENCE</span>
                </div>
                <span className="text-xs font-mono font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
                  Zero Sign-Up Required
                </span>
              </div>

              {/* Title & Tagline */}
              <div className="space-y-2 mb-6">
                <h3 className="text-2xl sm:text-3xl font-display font-extrabold text-slate-900 dark:text-brand-text tracking-tight">
                  Watch & Download with Ease
                </h3>
                <p className="text-sm text-slate-600 dark:text-brand-muted leading-relaxed">
                  Your viewers don&apos;t need an account or subscription. Just click the link to stream 1080p videos or download files at full speed.
                </p>
              </div>

              {/* Checklist */}
              <ul className="space-y-3 mb-8 flex-1">
                {viewerPerks.map((perk, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-slate-700 dark:text-slate-200">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span className="leading-snug">{perk}</span>
                  </li>
                ))}
              </ul>

              {/* Viewer CTAs */}
              <div className="pt-4 border-t border-slate-200/80 dark:border-brand-border/60 space-y-3">
                <a
                  href="https://play.google.com/store/apps/details?id=com.playxim.app&pcampaignid=web_share"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full"
                >
                  <Button
                    size="lg"
                    variant="secondary"
                    className="w-full rounded-2xl h-12 font-semibold bg-white dark:bg-transparent border border-slate-300 dark:border-brand-border text-slate-900 dark:text-brand-text hover:bg-slate-50 dark:hover:bg-brand-bg-soft"
                  >
                    <Smartphone className="h-4 w-4 mr-2 text-emerald-500" />
                    <span>Get Free Playxim Android App</span>
                  </Button>
                </a>
                <div className="flex items-center justify-center gap-4 text-xs text-slate-500 dark:text-brand-muted font-medium">
                  <span>✓ 100% Free on Google Play</span>
                  <span>•</span>
                  <span>✓ Safe & Verified</span>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </Container>
    </section>
  );
}
