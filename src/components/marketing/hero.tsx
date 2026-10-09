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
  Star,
  Check,
  Copy,
  Play,
  HardDrive,
  DollarSign,
  Smartphone,
  Send,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/layout-primitives";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

export function MarketingHero() {
  const [copied, setCopied] = React.useState(false);

  const handleCopyLink = () => {
    setCopied(true);
    navigator.clipboard?.writeText("https://playxim.com/watch/8XK92LM");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="relative overflow-hidden pt-8 sm:pt-14 pb-16 sm:pb-24 bg-gradient-to-b from-transparent via-brand-bg/40 to-transparent">
      {/* Background ambient mesh glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] sm:w-[1000px] h-[400px] sm:h-[550px] bg-gradient-to-tr from-brand-primary/20 via-brand-glow/15 to-purple-500/10 blur-[150px] rounded-full pointer-events-none -z-10 animate-float-slow" />
      <div className="absolute top-1/3 left-1/4 w-[400px] h-[400px] bg-brand-primary/12 blur-[120px] rounded-full pointer-events-none -z-10 animate-float-slow [animation-delay:3s]" />

      <Container className="relative z-10 text-center max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 space-y-7">
        {/* Eyebrow Pill */}
        <ScrollReveal direction="down" duration={600}>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold bg-brand-surface/90 border border-brand-border shadow-xs backdrop-blur-md text-brand-primary">
            <Sparkles className="h-3.5 w-3.5 animate-pulse text-brand-primary shrink-0" />
            <span className="tracking-wide uppercase font-mono text-[11px] font-bold">
              Unlimited File & Video Storage • $1.00 per 1,000 Views
            </span>
          </div>
        </ScrollReveal>

        {/* Main Headline */}
        <ScrollReveal delay={100} duration={700}>
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-[78px] font-display font-extrabold tracking-tight text-brand-text leading-[1.05] max-w-5xl mx-auto">
            Upload Files & Videos,{" "}
            <span className="bg-gradient-to-r from-brand-primary via-brand-glow to-blue-600 bg-clip-text text-transparent">
              Get Instant Links
            </span>{" "}
            to Share & Earn
          </h1>
        </ScrollReveal>

        {/* Supporting Copy */}
        <ScrollReveal delay={150} duration={700}>
          <p className="text-base sm:text-lg md:text-xl text-brand-muted max-w-3xl mx-auto leading-relaxed font-normal">
            Upload videos and any files with zero storage limits. Get an instant direct share link for your audience to stream in 4K or download via web and mobile app — while you earn a flat <strong className="text-brand-text font-semibold">$1.00 for every 1,000 views</strong>.
          </p>
        </ScrollReveal>

        {/* Primary Action Buttons */}
        <ScrollReveal delay={200} duration={700}>
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
            <a
              href="https://t.me/playxim"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                size="lg"
                variant="secondary"
                className="h-12 sm:h-13 px-6 text-sm sm:text-base font-semibold rounded-full bg-blue-50/80 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-900/50 shadow-xs hover:bg-blue-100/80 dark:hover:bg-blue-900/40 transition-all duration-200"
              >
                <Send className="h-4 w-4 mr-2" />
                <span>Upload via Telegram</span>
              </Button>
            </a>
            <a href="#how-it-works">
              <Button
                size="lg"
                variant="secondary"
                className="h-12 sm:h-13 px-6 text-sm sm:text-base font-semibold rounded-full bg-white dark:bg-transparent text-brand-text border border-slate-200 dark:border-brand-border shadow-xs hover:bg-slate-50 dark:hover:bg-brand-bg-soft transition-all duration-200"
              >
                See How It Works
              </Button>
            </a>
          </div>
        </ScrollReveal>

        {/* Checkpoint Assurance Strip */}
        <ScrollReveal delay={250} duration={700}>
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-2.5 pt-2 text-xs sm:text-sm text-brand-muted font-medium">
            <div className="inline-flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
              <span>Unlimited Cloud Storage</span>
            </div>
            <div className="inline-flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
              <span>Monetize from 1st View</span>
            </div>
            <div className="inline-flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
              <span>$1.00 per 1,000 Views</span>
            </div>
            <div className="inline-flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
              <span>Daily Payouts from $5</span>
            </div>
          </div>
        </ScrollReveal>

        {/* Store Badges & Trust Metrics */}
        <ScrollReveal delay={300} duration={700}>
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 pt-2">
            {/* Google Play (Live Play Store URL) */}
            <a
              href="https://play.google.com/store/apps/details?id=com.playxim.app&pcampaignid=web_share"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-4.5 py-2.5 rounded-xl bg-white dark:bg-brand-surface/90 border border-slate-200/80 dark:border-brand-border/80 shadow-xs hover:border-brand-primary/50 hover:bg-slate-50 dark:hover:bg-brand-bg-soft hover:-translate-y-0.5 transition-all group"
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

            {/* App Store */}
            <a
              href="#download-app"
              className="inline-flex items-center gap-2.5 px-4.5 py-2.5 rounded-xl bg-white dark:bg-brand-surface/90 border border-slate-200/80 dark:border-brand-border/80 shadow-xs hover:border-brand-primary/50 hover:bg-slate-50 dark:hover:bg-brand-bg-soft hover:-translate-y-0.5 transition-all group"
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

            {/* Rating */}
            <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white dark:bg-brand-surface/80 border border-slate-200/80 dark:border-brand-border/60 text-xs shadow-xs">
              <div className="flex items-center text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-3.5 w-3.5 fill-current" />
                ))}
              </div>
              <span className="font-bold text-brand-text">4.9 / 5</span>
              <span className="text-brand-muted hidden sm:inline">• 500,000+ Creators</span>
            </div>
          </div>
        </ScrollReveal>

        {/* ============================================================
            3D FLOATING HARDWARE STAGE (Background Removed & Premium 3D)
           ============================================================ */}
        <ScrollReveal delay={350} duration={850}>
          <div className="pt-8 sm:pt-14 relative w-full max-w-6xl mx-auto">
            {/* Multi-layered atmospheric radial glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-gradient-to-r from-brand-primary/20 via-brand-glow/15 to-purple-500/10 dark:from-brand-primary/25 dark:via-brand-glow/20 dark:to-purple-500/15 blur-[130px] rounded-full pointer-events-none -z-10" />

            {/* Floating 3D Device Container */}
            <div className="relative group flex flex-col items-center justify-center">
              {/* FLOATING GLASS CARD 1 (Top Left): Upload Complete */}
              <div className="hidden md:flex absolute top-4 -left-2 lg:-left-6 z-30 items-center gap-3 px-4 py-2.5 rounded-2xl bg-white/95 dark:bg-[#111728]/95 border border-slate-200/80 dark:border-white/10 shadow-xl shadow-slate-900/5 dark:shadow-black/50 backdrop-blur-xl animate-float-slow text-left">
                <div className="h-8 w-8 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-600 dark:text-emerald-400 shrink-0">
                  <CheckCircle2 className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-brand-text flex items-center gap-1.5">
                    <span>Upload Complete</span>
                    <span className="text-[10px] bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-mono px-1.5 py-0.2 rounded">100%</span>
                  </div>
                  <div className="text-[11px] text-brand-muted font-mono truncate max-w-[180px]">
                    Episode_04_4K.mp4 (4.2 GB)
                  </div>
                </div>
              </div>

              {/* FLOATING GLASS CARD 2 (Top Right): Get Instant Share Link */}
              <div className="hidden md:flex absolute top-6 -right-2 lg:-right-6 z-30 items-center gap-3 px-4 py-2.5 rounded-2xl bg-white/95 dark:bg-[#111728]/95 border border-slate-200/80 dark:border-white/10 shadow-xl shadow-slate-900/5 dark:shadow-black/50 backdrop-blur-xl animate-float-slow [animation-delay:1.5s] text-left">
                <div className="h-8 w-8 rounded-xl bg-brand-primary/15 border border-brand-primary/30 flex items-center justify-center text-brand-primary shrink-0">
                  <Share2 className="h-4 w-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-brand-text">Instant Share Link</div>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-[11px] font-mono text-brand-primary">playxim.com/watch/8XK92</span>
                    <button
                      onClick={handleCopyLink}
                      className="p-1 rounded hover:bg-slate-100 dark:hover:bg-brand-bg-soft text-brand-muted hover:text-brand-text transition-colors"
                      title="Copy Link"
                    >
                      {copied ? <Check className="h-3 w-3 text-emerald-500" /> : <Copy className="h-3 w-3" />}
                    </button>
                  </div>
                </div>
              </div>

              {/* FLOATING GLASS CARD 3 (Bottom Left): $1.00 per 1K Views Payout */}
              <div className="hidden md:flex absolute bottom-6 left-0 lg:-left-4 z-30 items-center gap-3 px-4 py-2.5 rounded-2xl bg-white/95 dark:bg-[#111728]/95 border border-amber-300/80 dark:border-amber-500/30 shadow-xl shadow-slate-900/5 dark:shadow-black/50 backdrop-blur-xl animate-float-slow [animation-delay:2.5s] text-left">
                <div className="h-8 w-8 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-600 dark:text-amber-400 font-bold shrink-0">
                  $
                </div>
                <div>
                  <div className="text-xs font-bold text-amber-600 dark:text-amber-400">
                    $1.00 / 1K Views
                  </div>
                  <div className="text-[11px] text-brand-muted">
                    +$48.92 Earned (48,920 Views)
                  </div>
                </div>
              </div>

              {/* FLOATING GLASS CARD 4 (Bottom Right): App Stream & Download */}
              <div className="hidden md:flex absolute bottom-8 right-0 lg:-right-4 z-30 items-center gap-3 px-4 py-2.5 rounded-2xl bg-white/95 dark:bg-[#111728]/95 border border-slate-200/80 dark:border-white/10 shadow-xl shadow-slate-900/5 dark:shadow-black/50 backdrop-blur-xl animate-float-slow [animation-delay:3.5s] text-left">
                <div className="h-8 w-8 rounded-xl bg-blue-500/15 border border-blue-500/30 flex items-center justify-center text-brand-primary dark:text-brand-glow shrink-0">
                  <Play className="h-4 w-4 fill-current" />
                </div>
                <div>
                  <div className="text-xs font-bold text-brand-text">
                    Stream & Fast Download
                  </div>
                  <div className="text-[11px] text-brand-muted">
                    Web & Mobile App · 1080p 60fps
                  </div>
                </div>
              </div>

              {/* The 3D Isolated Hardware Object */}
              <div className="relative w-full max-w-5xl aspect-[16/9] select-none filter drop-shadow-[0_25px_35px_rgba(0,0,0,0.18)] dark:drop-shadow-[0_25px_45px_rgba(14,165,233,0.18)] transition-transform duration-700 hover:scale-[1.015]">
                <Image
                  src="/images/hero-3d-devices.png"
                  alt="Playxim 3D Floating Hardware: MacBook Pro Cloud Dashboard and iPhone Pro Mobile Video Player"
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, (max-width: 1400px) 95vw, 1300px"
                  className="object-contain object-center"
                />
              </div>

              {/* Realistic 3D Soft Shadow underneath floating devices */}
              <div className="w-3/4 h-8 bg-black/15 dark:bg-black/50 blur-2xl rounded-full -mt-6 pointer-events-none" />
            </div>
          </div>
        </ScrollReveal>
      </Container>
    </section>
  );
}
