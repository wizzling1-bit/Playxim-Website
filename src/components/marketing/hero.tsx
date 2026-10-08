"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  Sparkles,
  CheckCircle2,
  TrendingUp,
  Share2,
  Download,
  Star,
  ShieldCheck,
  Zap,
  HardDrive,
  DollarSign,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/layout-primitives";
import { AnimatedTextRotator } from "@/components/ui/animated-text-rotator";

export function MarketingHero() {
  return (
    <section className="relative overflow-hidden pt-10 sm:pt-16 pb-16 sm:pb-24 bg-gradient-to-b from-transparent via-brand-bg/40 to-transparent">
      {/* Subtle background ambient mesh glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] sm:w-[850px] h-[380px] sm:h-[480px] bg-gradient-to-tr from-brand-primary/20 via-brand-glow/15 to-purple-500/10 blur-[130px] rounded-full pointer-events-none -z-10 animate-float-slow" />
      <div className="absolute top-1/3 left-1/4 w-[340px] h-[340px] bg-brand-primary/12 blur-[100px] rounded-full pointer-events-none -z-10 animate-float-slow [animation-delay:3s]" />

      <Container className="relative z-10 text-center max-w-5xl mx-auto space-y-7">
        {/* Eyebrow Pill */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold bg-brand-surface/90 border border-brand-border shadow-xs backdrop-blur-md text-brand-primary">
          <Sparkles className="h-3.5 w-3.5 animate-pulse text-brand-primary shrink-0" />
          <span className="tracking-wide uppercase font-mono text-[11px] font-bold">
            The #1 Creator Cloud Storage & Video Platform
          </span>
        </div>

        {/* Main Headline */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-[80px] font-display font-extrabold tracking-tight text-brand-text leading-[1.05] max-w-4xl mx-auto">
          Upload, Share &{" "}
          <span className="bg-gradient-to-r from-brand-primary via-brand-glow to-blue-600 bg-clip-text text-transparent">
            Monetize
          </span>{" "}
          Your Content
        </h1>

        {/* Supporting Copy */}
        <p className="text-base sm:text-lg md:text-xl text-brand-muted max-w-2xl mx-auto leading-relaxed font-normal">
          High-speed unlimited cloud storage for creators, publishers, and communities. Earn daily payouts on every view with lightning-fast global CDN delivery.
        </p>

        {/* Dual Primary Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3.5 pt-2">
          <Link href="/auth/sign-up">
            <Button
              size="lg"
              variant="primary"
              className="h-12 sm:h-13 px-8 text-sm sm:text-base font-semibold rounded-full group shadow-lg shadow-brand-primary/25 hover:shadow-brand-glow/35 transition-all duration-200"
            >
              <span>Start Uploading Free</span>
              <ArrowRight className="h-4 w-4 ml-2 transition-transform duration-200 group-hover:translate-x-1" />
            </Button>
          </Link>
          <a href="#how-it-works">
            <Button
              size="lg"
              variant="secondary"
              className="h-12 sm:h-13 px-7 text-sm sm:text-base font-semibold rounded-full border border-brand-border hover:bg-brand-bg-soft transition-all duration-200"
            >
              See How It Works
            </Button>
          </a>
        </div>

        {/* Checkpoint Assurance Strip */}
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 pt-2 text-xs sm:text-sm text-brand-muted font-medium">
          <div className="inline-flex items-center gap-1.5">
            <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
            <span>Unlimited Cloud Storage</span>
          </div>
          <div className="inline-flex items-center gap-1.5">
            <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
            <span>Up to $4.00+ CPM Payouts</span>
          </div>
          <div className="inline-flex items-center gap-1.5">
            <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
            <span>High-Speed Global CDN</span>
          </div>
          <div className="inline-flex items-center gap-1.5">
            <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
            <span>Zero File Expiration</span>
          </div>
        </div>

        {/* Store Badges & Trust Metrics */}
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 pt-3">
          {/* Google Play Badge Button */}
          <a
            href="#download-app"
            className="inline-flex items-center gap-2.5 px-4 py-2 rounded-xl bg-brand-surface/90 border border-brand-border/80 shadow-xs hover:border-brand-primary/40 hover:bg-brand-bg-soft transition-all group"
          >
            <div className="h-6 w-6 text-brand-primary flex items-center justify-center">
              <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current">
                <path d="M3.609 1.814L13.793 12 3.61 22.186c-.378-.344-.61-.83-.61-1.378V3.192c0-.547.232-1.034.61-1.378zm11.254 11.255L17.47 15.68l-12.01 6.843 9.403-9.454zm0-2.138L4.85 1.478l12.62 7.19-2.607 2.263zm1.484 1.291l4.02-2.292c.67-.382.67-1.008 0-1.39l-4.02-2.292-1.848 1.848 1.848 2.126z" />
              </svg>
            </div>
            <div className="text-left">
              <div className="text-[10px] uppercase font-bold text-brand-muted leading-tight">GET IT ON</div>
              <div className="text-xs font-bold text-brand-text leading-tight">Google Play</div>
            </div>
          </a>

          {/* App Store Badge Button */}
          <a
            href="#download-app"
            className="inline-flex items-center gap-2.5 px-4 py-2 rounded-xl bg-brand-surface/90 border border-brand-border/80 shadow-xs hover:border-brand-primary/40 hover:bg-brand-bg-soft transition-all group"
          >
            <div className="h-6 w-6 text-brand-primary flex items-center justify-center">
              <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.37c.56-.71.97-1.71.86-2.72-.88.04-1.92.59-2.51 1.28-.52.59-.97 1.57-.85 2.54 1 .08 1.98-.47 2.5-1.1" />
              </svg>
            </div>
            <div className="text-left">
              <div className="text-[10px] uppercase font-bold text-brand-muted leading-tight">DOWNLOAD ON THE</div>
              <div className="text-xs font-bold text-brand-text leading-tight">App Store</div>
            </div>
          </a>

          {/* Trust Rating Strip */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-brand-surface/70 border border-brand-border/60 text-xs">
            <div className="flex items-center text-amber-500">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-3.5 w-3.5 fill-current" />
              ))}
            </div>
            <span className="font-bold text-brand-text">4.9 / 5</span>
            <span className="text-brand-muted hidden sm:inline">• 500,000+ Creators</span>
          </div>
        </div>

        {/* Central Device Mockup: Laptop & Phone Composition */}
        <div className="pt-8 sm:pt-12 relative max-w-5xl mx-auto">
          {/* Ambient rim light under mockup */}
          <div className="absolute inset-x-12 bottom-6 h-48 bg-gradient-to-t from-brand-primary/20 via-brand-glow/15 to-transparent blur-[90px] rounded-full pointer-events-none -z-10" />

          {/* Floating Live Badge 1: High-Speed Upload */}
          <div className="hidden lg:flex absolute top-6 -left-4 z-20 items-center gap-2.5 px-3.5 py-2 rounded-xl bg-brand-surface/95 border border-brand-border/80 shadow-xl backdrop-blur-xl animate-float-slow">
            <div className="h-7 w-7 rounded-lg bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
              <CheckCircle2 className="h-4 w-4" />
            </div>
            <div className="text-left">
              <div className="text-xs font-semibold text-brand-text">Upload Complete ✓</div>
              <div className="text-[11px] text-brand-muted font-mono">Project_Alpha_4K.mp4 (14.2 GB)</div>
            </div>
          </div>

          {/* Floating Live Badge 2: Stream Views Spike */}
          <div className="hidden lg:flex absolute top-10 -right-4 z-20 items-center gap-2.5 px-3.5 py-2 rounded-xl bg-brand-surface/95 border border-brand-border/80 shadow-xl backdrop-blur-xl animate-float-slow [animation-delay:1.5s]">
            <div className="h-7 w-7 rounded-lg bg-blue-500/15 border border-blue-500/30 flex items-center justify-center text-brand-primary">
              <TrendingUp className="h-4 w-4" />
            </div>
            <div className="text-left">
              <div className="text-xs font-semibold text-brand-text">+48,920 Views</div>
              <div className="text-[11px] text-brand-muted">Buffer-Free 1080p 60fps</div>
            </div>
          </div>

          {/* Floating Live Badge 3: Daily Creator Earnings */}
          <div className="hidden lg:flex absolute -bottom-3 left-8 z-20 items-center gap-2.5 px-3.5 py-2 rounded-xl bg-brand-surface/95 border border-amber-500/30 shadow-xl backdrop-blur-xl animate-float-slow [animation-delay:2.5s]">
            <div className="h-7 w-7 rounded-lg bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-600 dark:text-amber-400 font-bold">
              $
            </div>
            <div className="text-left">
              <div className="text-xs font-semibold text-amber-600 dark:text-amber-400">+$320.50 Today</div>
              <div className="text-[11px] text-brand-muted">Direct CPM Accrual</div>
            </div>
          </div>

          {/* Device Showcase Frame */}
          <div className="relative rounded-2xl sm:rounded-3xl p-2 sm:p-3 bg-gradient-to-b from-brand-border/80 via-brand-border/30 to-brand-border/10 border border-brand-border shadow-2xl backdrop-blur-sm overflow-hidden group">
            <div className="relative w-full aspect-[16/9] sm:aspect-[16/9] rounded-xl sm:rounded-2xl overflow-hidden bg-brand-bg-soft">
              <Image
                src="/images/hero-devices.jpg"
                alt="Playxim Cloud Storage Web Dashboard on MacBook and Mobile Streaming App on iPhone"
                fill
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1100px"
                className="object-cover object-center transition-transform duration-700 group-hover:scale-[1.01]"
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
