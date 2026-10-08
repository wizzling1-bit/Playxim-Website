"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  UploadCloud,
  CheckCircle2,
  ArrowRight,
  Share2,
  DollarSign,
  TrendingUp,
  Play,
  ShieldCheck,
  Zap,
  HardDrive,
  Smartphone,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container, SectionHeader } from "@/components/ui/layout-primitives";
import { Badge } from "@/components/ui/badge";

export function CreatorWorkflowsSection() {
  return (
    <section id="features" className="py-20 sm:py-28 border-t border-brand-border/60 bg-transparent relative space-y-24 sm:space-y-32">
      <Container className="max-w-6xl mx-auto">
        <SectionHeader
          badge={<Badge variant="default">Core Features</Badge>}
          title="Engineered to Power Your Digital Content"
          description="A comprehensive creator ecosystem combining high-speed cloud ingestion, native mobile playback, and daily automated monetization."
        />

        {/* ============================================================
            ROW 1: Web Creator Dashboard (Laptop on Left | Copy on Right)
           ============================================================ */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Visual: Laptop Mockup */}
          <div className="lg:col-span-7 relative group">
            {/* Ambient Back Glow */}
            <div className="absolute -inset-4 bg-gradient-to-r from-brand-primary/20 via-brand-glow/15 to-transparent blur-2xl rounded-3xl -z-10 opacity-70 group-hover:opacity-100 transition-opacity" />

            <div className="relative rounded-2xl p-2 bg-brand-surface/80 border border-brand-border shadow-xl backdrop-blur-sm overflow-hidden">
              <div className="relative aspect-[16/9] w-full rounded-xl overflow-hidden bg-brand-bg-soft">
                <Image
                  src="/images/dashboard-laptop.jpg"
                  alt="Playxim Web Creator Dashboard on MacBook Pro"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 60vw, 650px"
                  className="object-cover transition-transform duration-500 group-hover:scale-102"
                />
              </div>

              {/* Floating Mini Overlay Badge */}
              <div className="absolute bottom-5 left-5 hidden sm:flex items-center gap-2.5 px-3.5 py-2 rounded-xl bg-brand-surface/95 border border-brand-border/80 shadow-lg backdrop-blur-md">
                <div className="h-6 w-6 rounded-md bg-brand-primary/10 text-brand-primary flex items-center justify-center">
                  <UploadCloud className="h-3.5 w-3.5" />
                </div>
                <div className="text-left">
                  <div className="text-xs font-bold text-brand-text">Multi-Threaded Uploads</div>
                  <div className="text-[11px] text-brand-muted font-mono">1.2 Gbps Transfer Rate</div>
                </div>
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

        {/* ============================================================
            ROW 2: Mobile Video Player (Copy on Left | Phone on Right)
           ============================================================ */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
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
                <span>Responsive embed codes ready for Discord, blogs, and creator communities</span>
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

          {/* Visual: Phone Video Player Mockup */}
          <div className="lg:col-span-7 relative group order-1 lg:order-2 flex justify-center">
            {/* Ambient Glow */}
            <div className="absolute inset-8 bg-gradient-to-tr from-brand-glow/20 to-brand-primary/20 blur-3xl rounded-full -z-10 opacity-70 group-hover:opacity-100 transition-opacity" />

            <div className="relative w-full max-w-md rounded-2xl p-2 bg-brand-surface/80 border border-brand-border shadow-xl backdrop-blur-sm overflow-hidden">
              <div className="relative aspect-[4/3] w-full rounded-xl overflow-hidden bg-brand-bg-soft">
                <Image
                  src="/images/mobile-player.jpg"
                  alt="Playxim 4K Video Player on iPhone"
                  fill
                  sizes="(max-width: 768px) 100vw, 450px"
                  className="object-cover transition-transform duration-500 group-hover:scale-102"
                />
              </div>

              {/* Floating Stream Tag */}
              <div className="absolute bottom-5 right-5 hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-brand-surface/95 border border-brand-border shadow-lg text-xs font-semibold text-brand-text">
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>1080p 60fps Active Stream</span>
              </div>
            </div>
          </div>
        </div>

        {/* ============================================================
            ROW 3: Creator Monetization (Phone on Left | Copy on Right)
           ============================================================ */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Visual: Phone Wallet Mockup */}
          <div className="lg:col-span-7 relative group flex justify-center">
            {/* Ambient Glow */}
            <div className="absolute inset-8 bg-gradient-to-tr from-amber-500/20 to-emerald-500/20 blur-3xl rounded-full -z-10 opacity-70 group-hover:opacity-100 transition-opacity" />

            <div className="relative w-full max-w-md rounded-2xl p-2 bg-brand-surface/80 border border-brand-border shadow-xl backdrop-blur-sm overflow-hidden">
              <div className="relative aspect-[4/3] w-full rounded-xl overflow-hidden bg-brand-bg-soft">
                <Image
                  src="/images/mobile-wallet.jpg"
                  alt="Playxim Creator Wallet & Monetization on iPhone"
                  fill
                  sizes="(max-width: 768px) 100vw, 450px"
                  className="object-cover transition-transform duration-500 group-hover:scale-102"
                />
              </div>

              {/* Floating Earnings Tag */}
              <div className="absolute top-5 left-5 hidden sm:flex items-center gap-2.5 px-3.5 py-2 rounded-xl bg-brand-surface/95 border border-amber-500/30 shadow-lg text-xs font-bold text-amber-600 dark:text-amber-400">
                <DollarSign className="h-4 w-4" />
                <span>$4.20 Effective CPM</span>
              </div>
            </div>
          </div>

          {/* Copy: Monetization */}
          <div className="lg:col-span-5 space-y-5 text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
              <DollarSign className="h-3.5 w-3.5" />
              <span>Transparent Creator Economics</span>
            </div>

            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-display font-extrabold text-brand-text tracking-tight leading-tight">
              Turn Your Audience Views into Real Income
            </h3>

            <p className="text-sm sm:text-base text-brand-muted leading-relaxed font-normal">
              Earn competitive CPM rates on every file view and stream. With automated daily payouts and zero withdrawal commission fees, your creative work generates steady, predictable revenue.
            </p>

            <ul className="space-y-3 pt-1 text-xs sm:text-sm text-brand-text font-medium">
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                <span>Up to $4.00+ CPM rates tailored to your traffic geography</span>
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
      </Container>
    </section>
  );
}
