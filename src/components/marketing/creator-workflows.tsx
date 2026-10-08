"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  UploadCloud,
  CheckCircle2,
  ArrowRight,
  DollarSign,
  Play,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container, SectionHeader } from "@/components/ui/layout-primitives";
import { Badge } from "@/components/ui/badge";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

export function CreatorWorkflowsSection() {
  return (
    <section id="features" className="py-20 sm:py-28 border-t border-brand-border/60 bg-transparent relative space-y-24 sm:space-y-36">
      <Container className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
        <ScrollReveal duration={600}>
          <SectionHeader
            badge={<Badge variant="default">Core Features</Badge>}
            title="Engineered to Power Your Digital Content"
            description="A comprehensive creator ecosystem combining high-speed cloud ingestion, native mobile playback, and daily automated monetization."
          />
        </ScrollReveal>

        {/* ============================================================
            ROW 1: Web Creator Dashboard (3D Laptop Left | Copy Right)
           ============================================================ */}
        <ScrollReveal delay={100} duration={800}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
            {/* Visual: Isolated 3D Laptop */}
            <div className="lg:col-span-7 relative group flex flex-col items-center justify-center">
              {/* Ambient Glow */}
              <div className="absolute inset-4 bg-gradient-to-r from-brand-primary/25 via-brand-glow/15 to-transparent blur-3xl rounded-full -z-10 opacity-70 group-hover:opacity-100 transition-opacity" />

              <div className="relative w-full max-w-xl aspect-[16/9] select-none filter drop-shadow-[0_20px_30px_rgba(0,0,0,0.18)] dark:drop-shadow-[0_20px_40px_rgba(30,107,255,0.2)] transition-transform duration-500 hover:scale-[1.02]">
                <Image
                  src="/images/dashboard-3d-laptop.png"
                  alt="Playxim Web Creator Dashboard on 3D MacBook Pro"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 60vw, 700px"
                  className="object-contain"
                />
              </div>

              {/* Realistic 3D Soft Shadow */}
              <div className="w-3/4 h-6 bg-black/15 dark:bg-black/50 blur-xl rounded-full -mt-4 pointer-events-none" />

              {/* Floating Mini Overlay Badge */}
              <div className="absolute bottom-4 left-4 hidden sm:flex items-center gap-2.5 px-3.5 py-2 rounded-xl bg-brand-surface/90 dark:bg-[#111728]/90 border border-brand-border/80 shadow-lg backdrop-blur-md">
                <div className="h-6 w-6 rounded-md bg-brand-primary/10 text-brand-primary flex items-center justify-center">
                  <UploadCloud className="h-3.5 w-3.5" />
                </div>
                <div className="text-left">
                  <div className="text-xs font-bold text-brand-text">Multi-Threaded Uploads</div>
                  <div className="text-[11px] text-brand-muted font-mono">1.2 Gbps Transfer Rate</div>
                </div>
              </div>
            </div>

            {/* Copy: Web Dashboard */}
            <div className="lg:col-span-5 space-y-5 text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-brand-primary/10 text-brand-primary border border-brand-primary/20">
                <Zap className="h-3.5 w-3.5" />
                <span>Web Creator Control Center</span>
              </div>

              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-display font-extrabold text-brand-text tracking-tight leading-tight">
                Manage Your Digital Assets with Zero Friction
              </h3>

              <p className="text-sm sm:text-base text-brand-muted leading-relaxed font-normal">
                Upload multi-gigabyte 4K master videos, software archives, and creative assets directly from your browser. Enjoy resilient chunked uploads with automatic resume and zero storage limits.
              </p>

              <ul className="space-y-3 pt-1 text-xs sm:text-sm text-brand-text font-medium">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>Drag-and-drop web uploader with parallel multi-part streams</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>Remote URL upload & instant Telegram bot synchronization</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>Hierarchical folder organization with instant one-click link generation</span>
                </li>
              </ul>

              <div className="pt-2">
                <Link href="/auth/sign-up">
                  <Button variant="primary" size="md" className="rounded-full shadow-md shadow-brand-primary/20">
                    <span>Start Uploading Now</span>
                    <ArrowRight className="h-4 w-4 ml-1.5" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* ============================================================
            ROW 2: Mobile Video Player (Copy Left | 3D Phone Right)
           ============================================================ */}
        <ScrollReveal delay={100} duration={800}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
            {/* Copy: Video Streaming */}
            <div className="lg:col-span-5 space-y-5 text-left order-2 lg:order-1">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/10 text-brand-glow border border-blue-500/20">
                <Play className="h-3.5 w-3.5 fill-current" />
                <span>Mobile-First Streaming</span>
              </div>

              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-display font-extrabold text-brand-text tracking-tight leading-tight">
                Buffer-Free 4K Streaming on Any Screen
              </h3>

              <p className="text-sm sm:text-base text-brand-muted leading-relaxed font-normal">
                Playxim automatically transcodes your videos into adaptive HLS streams (1080p, 720p, 480p). Your audience enjoys immediate, silky-smooth playback on smartphones and desktops without third-party app requirements.
              </p>

              <ul className="space-y-3 pt-1 text-xs sm:text-sm text-brand-text font-medium">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>Instant playback with zero buffering across 300+ edge CDN locations</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>Built-in speed controls, playback scrubber, and multi-track audio</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>Fast direct download option for offline viewing</span>
                </li>
              </ul>

              <div className="pt-2">
                <a href="#how-it-works">
                  <Button variant="secondary" size="md" className="rounded-full border border-brand-border">
                    <span>Explore Player Capabilities</span>
                    <ArrowRight className="h-4 w-4 ml-1.5" />
                  </Button>
                </a>
              </div>
            </div>

            {/* Visual: Isolated 3D Phone Video Player */}
            <div className="lg:col-span-7 relative group order-1 lg:order-2 flex flex-col items-center justify-center">
              {/* Ambient Glow */}
              <div className="absolute inset-8 bg-gradient-to-tr from-brand-glow/25 to-brand-primary/25 blur-3xl rounded-full -z-10 opacity-70 group-hover:opacity-100 transition-opacity" />

              <div className="relative w-full max-w-sm aspect-[4/3] select-none filter drop-shadow-[0_20px_30px_rgba(0,0,0,0.18)] dark:drop-shadow-[0_20px_40px_rgba(14,165,233,0.2)] transition-transform duration-500 hover:scale-[1.03]">
                <Image
                  src="/images/mobile-3d-player.png"
                  alt="Playxim 4K Video Player on 3D iPhone"
                  fill
                  sizes="(max-width: 768px) 100vw, 420px"
                  className="object-contain"
                />
              </div>

              {/* Realistic 3D Soft Shadow */}
              <div className="w-1/2 h-5 bg-black/15 dark:bg-black/50 blur-xl rounded-full -mt-2 pointer-events-none" />

              {/* Floating Stream Tag */}
              <div className="absolute bottom-4 right-4 hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-brand-surface/90 dark:bg-[#111728]/90 border border-brand-border shadow-lg text-xs font-semibold text-brand-text">
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>1080p 60fps Active Stream</span>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* ============================================================
            ROW 3: Creator Monetization (3D Phone Left | Copy Right)
           ============================================================ */}
        <ScrollReveal delay={100} duration={800}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
            {/* Visual: Isolated 3D Phone Wallet */}
            <div className="lg:col-span-7 relative group flex flex-col items-center justify-center">
              {/* Ambient Glow */}
              <div className="absolute inset-8 bg-gradient-to-tr from-amber-500/20 to-emerald-500/20 blur-3xl rounded-full -z-10 opacity-70 group-hover:opacity-100 transition-opacity" />

              <div className="relative w-full max-w-sm aspect-[4/3] select-none filter drop-shadow-[0_20px_30px_rgba(0,0,0,0.18)] dark:drop-shadow-[0_20px_40px_rgba(245,158,11,0.2)] transition-transform duration-500 hover:scale-[1.03]">
                <Image
                  src="/images/mobile-3d-wallet.png"
                  alt="Playxim Creator Wallet on 3D iPhone"
                  fill
                  sizes="(max-width: 768px) 100vw, 420px"
                  className="object-contain"
                />
              </div>

              {/* Realistic 3D Soft Shadow */}
              <div className="w-1/2 h-5 bg-black/15 dark:bg-black/50 blur-xl rounded-full -mt-2 pointer-events-none" />

              {/* Floating Earnings Tag */}
              <div className="absolute top-4 left-4 hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-brand-surface/90 dark:bg-[#111728]/90 border border-amber-500/30 shadow-lg text-xs font-bold text-amber-600 dark:text-amber-400">
                <DollarSign className="h-4 w-4" />
                <span>$1.00 / 1K Views</span>
              </div>
            </div>

            {/* Copy: Monetization */}
            <div className="lg:col-span-5 space-y-5 text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
                <DollarSign className="h-3.5 w-3.5" />
                <span>Transparent Creator Monetization</span>
              </div>

              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-display font-extrabold text-brand-text tracking-tight leading-tight">
                Turn Your Audience Views into Real Income
              </h3>

              <p className="text-sm sm:text-base text-brand-muted leading-relaxed font-normal">
                Earn a flat <strong className="text-brand-text font-semibold">$1.00 for every 1,000 views</strong> on your files and videos. With automated daily payouts and zero withdrawal commission fees, your shared links generate steady, predictable revenue.
              </p>

              <ul className="space-y-3 pt-1 text-xs sm:text-sm text-brand-text font-medium">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>Flat $1.00 per 1,000 verified views on your shared links</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>Daily automated withdrawals to Bank Account, PayPal, UPI, or Crypto</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>Live real-time ledger tracking views, completion rates, and balance</span>
                </li>
              </ul>

              <div className="pt-2">
                <Link href="/auth/sign-up">
                  <Button variant="primary" size="md" className="rounded-full shadow-md shadow-brand-primary/20">
                    <span>Start Earning Today</span>
                    <ArrowRight className="h-4 w-4 ml-1.5" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </Container>
    </section>
  );
}
