"use client";

import * as React from "react";
import Link from "next/link";
import {
  ArrowRight,
  Sparkles,
  HardDrive,
  Video,
  DollarSign,
  Share2,
  CheckCircle2,
  TrendingUp,
  Play,
  Layers,
  Zap,
  Shield,
  FileVideo,
  FileArchive,
  FileCode,
  Lock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Container } from "@/components/ui/layout-primitives";

export function MarketingHero() {
  return (
    <section className="relative overflow-hidden pt-12 sm:pt-20 pb-20 sm:pb-28">
      {/* Ambient background glow mesh */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] sm:w-[900px] h-[400px] sm:h-[500px] bg-gradient-to-tr from-brand-primary/15 via-brand-glow/12 to-purple-500/8 blur-[140px] rounded-full pointer-events-none -z-10" />

      <Container className="relative z-10 text-center max-w-5xl mx-auto space-y-8">
        {/* Eyebrow Pill */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-semibold bg-brand-surface border border-brand-border shadow-xs backdrop-blur-md text-brand-primary">
          <Sparkles className="h-3 w-3 animate-pulse text-brand-primary shrink-0" />
          <span className="tracking-wide uppercase font-mono text-[11px]">
            The Creator Content Infrastructure
          </span>
        </div>

        {/* Main Headline */}
        <h1 className="text-5xl sm:text-7xl md:text-[88px] lg:text-[98px] font-display font-extrabold tracking-tight text-brand-text leading-[0.98] max-w-4xl mx-auto">
          Everything you create,{" "}
          <span className="block mt-1 sm:mt-2 text-gradient-shimmer">
            ready for your audience.
          </span>
        </h1>

        {/* Supporting Copy */}
        <p className="text-base sm:text-xl text-brand-muted max-w-2xl mx-auto leading-relaxed font-normal">
          Store your files, publish your content, and create shareable links from one powerful creator platform.
        </p>

        {/* CTAs */}
        <div className="flex flex-wrap items-center justify-center gap-3.5 pt-1">
          <Link href="/auth/sign-up">
            <Button
              size="lg"
              variant="primary"
              className="h-12 px-7 text-sm font-semibold rounded-full group shadow-lg shadow-brand-primary/25 hover:shadow-brand-glow/30"
            >
              <span>Start Uploading — Free</span>
              <ArrowRight className="h-4 w-4 ml-1.5 transition-transform duration-200 group-hover:translate-x-1" />
            </Button>
          </Link>
          <a href="#how-it-works">
            <Button
              size="lg"
              variant="secondary"
              className="h-12 px-6 text-sm font-semibold rounded-full border border-brand-border hover:bg-brand-bg-soft"
            >
              See How Playxim Works
            </Button>
          </a>
        </div>

        {/* Large Product Visual & Floating Elements */}
        <div className="pt-10 sm:pt-16 relative max-w-5xl mx-auto">
          {/* Ambient rim light under mockup */}
          <div className="absolute inset-x-12 bottom-0 h-40 bg-brand-primary/10 blur-[80px] rounded-full pointer-events-none -z-10" />

          {/* Floating Badge 1: Upload Complete (Top Left) */}
          <div className="hidden lg:flex absolute -top-4 -left-6 z-20 items-center gap-2.5 px-3.5 py-2 rounded-xl bg-brand-surface/90 border border-brand-border/80 shadow-xl backdrop-blur-xl animate-float-slow">
            <div className="h-7 w-7 rounded-lg bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-800 dark:text-emerald-400">
              <CheckCircle2 className="h-4 w-4" />
            </div>
            <div className="text-left">
              <div className="text-xs font-semibold text-brand-text">Upload Complete ✓</div>
              <div className="text-[11px] text-brand-muted font-mono">Tokyo_Nightlife_4K.mp4</div>
            </div>
          </div>

          {/* Floating Badge 2: Views Spike (Top Right) */}
          <div className="hidden lg:flex absolute -top-3 -right-6 z-20 items-center gap-2.5 px-3.5 py-2 rounded-xl bg-brand-surface/90 border border-brand-border/80 shadow-xl backdrop-blur-xl animate-float-slow [animation-delay:1.2s]">
            <div className="h-7 w-7 rounded-lg bg-blue-500/15 border border-blue-500/30 flex items-center justify-center text-blue-800 dark:text-brand-glow">
              <TrendingUp className="h-4 w-4" />
            </div>
            <div className="text-left">
              <div className="text-xs font-semibold text-brand-text">+12,482 Views</div>
              <div className="text-[11px] text-brand-muted">Past 24 hours</div>
            </div>
          </div>

          {/* Floating Badge 3: Earnings (Bottom Left) */}
          <div className="hidden lg:flex absolute -bottom-5 -left-4 z-20 items-center gap-2.5 px-3.5 py-2 rounded-xl bg-brand-surface/95 border border-amber-500/30 shadow-xl backdrop-blur-xl animate-float-slow [animation-delay:2.4s]">
            <div className="h-7 w-7 rounded-lg bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-900 dark:text-amber-400 font-bold">
              $
            </div>
            <div className="text-left">
              <div className="text-xs font-semibold text-amber-900 dark:text-amber-400">+$24.96 Earned</div>
              <div className="text-[11px] text-brand-muted">Stream payout accrual</div>
            </div>
          </div>

          {/* Floating Badge 4: Share Link Created (Bottom Right) */}
          <div className="hidden lg:flex absolute -bottom-5 -right-4 z-20 items-center gap-2.5 px-3.5 py-2 rounded-xl bg-brand-surface/95 border border-brand-border/80 shadow-xl backdrop-blur-xl animate-float-slow [animation-delay:1.8s]">
            <div className="h-7 w-7 rounded-lg bg-brand-primary/10 border border-brand-primary/20 flex items-center justify-center text-brand-primary">
              <Share2 className="h-3.5 w-3.5" />
            </div>
            <div className="text-left">
              <div className="text-xs font-semibold text-brand-text">Share Link Created</div>
              <div className="text-[11px] font-mono text-brand-primary">playxim.com/watch/8XK92LM</div>
            </div>
          </div>

          {/* Main Dashboard Shell Mockup */}
          <div className="relative rounded-2xl p-1.5 sm:p-2 bg-gradient-to-b from-brand-border/60 to-brand-border/20 border border-brand-border shadow-2xl backdrop-blur-md">
            <div className="rounded-xl border border-brand-border bg-brand-surface overflow-hidden shadow-inner text-left">
              {/* Window Chrome Header */}
              <div className="h-10 sm:h-11 px-3 sm:px-4 border-b border-brand-border bg-brand-bg-soft/70 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1.5">
                    <span className="h-2.5 w-2.5 rounded-full bg-red-400/80" />
                    <span className="h-2.5 w-2.5 rounded-full bg-amber-400/80" />
                    <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/80" />
                  </div>
                  <div className="hidden sm:flex items-center gap-2 ml-3 px-3 py-0.5 rounded-md bg-brand-surface border border-brand-border/60 text-xs text-brand-muted font-mono">
                    <Lock className="h-3 w-3 text-brand-muted opacity-70" />
                    <span>playxim.com/dashboard/content</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200 dark:bg-emerald-500/15 dark:text-emerald-400 dark:border-emerald-500/20">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    Ready to Publish
                  </span>
                </div>
              </div>

              {/* Dashboard Internal Body */}
              <div className="p-4 sm:p-6 lg:p-8 space-y-5 bg-brand-surface">
                {/* Metric Strip */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <div className="p-3.5 rounded-xl bg-brand-bg-soft/60 border border-brand-border/80">
                    <div className="text-xs text-brand-muted font-medium">Total Content</div>
                    <div className="text-xl sm:text-2xl font-display font-bold text-brand-text mt-0.5">
                      1,482 items
                    </div>
                    <div className="text-xs text-emerald-800 dark:text-emerald-400 font-mono mt-0.5">
                      +48 this week
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-brand-bg-soft/60 border border-brand-border/80">
                    <div className="text-xs text-brand-muted font-medium">Video Streams</div>
                    <div className="text-xl sm:text-2xl font-display font-bold text-brand-text mt-0.5">
                      394,200
                    </div>
                    <div className="text-xs text-blue-800 dark:text-brand-glow font-mono mt-0.5">
                      94.2% completed
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-brand-bg-soft/60 border border-brand-border/80">
                    <div className="text-xs text-brand-muted font-medium">Accrued Balance</div>
                    <div className="text-xl sm:text-2xl font-display font-bold text-amber-900 dark:text-amber-400 mt-0.5">
                      $689.85 USD
                    </div>
                    <div className="text-xs text-amber-900 dark:text-amber-400 font-mono mt-0.5">
                      Available to payout
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-brand-bg-soft/60 border border-brand-border/80">
                    <div className="text-xs text-brand-muted font-medium">Storage Policy</div>
                    <div className="text-xl sm:text-2xl font-display font-bold text-brand-text mt-0.5">
                      1.2 TB Hosted
                    </div>
                    <div className="text-xs text-brand-primary font-mono mt-0.5">
                      No artificial caps
                    </div>
                  </div>
                </div>

                {/* File List Rows */}
                <div className="space-y-2 pt-2">
                  <div className="flex items-center justify-between text-xs font-semibold text-brand-muted uppercase tracking-wider px-1">
                    <span>Recent Master Content</span>
                    <span>Status & Direct Actions</span>
                  </div>

                  {/* Item 1 */}
                  <div className="p-3 rounded-xl bg-brand-surface border border-brand-border/70 hover:border-brand-primary/40 transition-colors flex items-center justify-between gap-3 shadow-xs">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="h-9 w-9 rounded-lg bg-blue-500/10 text-brand-primary border border-blue-500/20 flex items-center justify-center shrink-0">
                        <FileVideo className="h-4 w-4" />
                      </div>
                      <div className="min-w-0">
                        <div className="text-xs sm:text-sm font-semibold text-brand-text truncate">
                          Tokyo_Nightlife_4K_ProRes.mp4
                        </div>
                        <div className="text-xs text-brand-muted">Video · 2.25 GB · 74.2K views</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <span className="hidden sm:inline-flex px-2 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200 dark:bg-emerald-500/15 dark:text-emerald-400">
                        Active Stream
                      </span>
                      <Button variant="ghost" size="sm" className="h-7 px-2.5 text-xs rounded-lg">
                        Copy Link
                      </Button>
                    </div>
                  </div>

                  {/* Item 2 */}
                  <div className="p-3 rounded-xl bg-brand-surface border border-brand-border/70 hover:border-brand-primary/40 transition-colors flex items-center justify-between gap-3 shadow-xs">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="h-9 w-9 rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 flex items-center justify-center shrink-0">
                        <FileArchive className="h-4 w-4" />
                      </div>
                      <div className="min-w-0">
                        <div className="text-xs sm:text-sm font-semibold text-brand-text truncate">
                          Sound_Effects_Master_Library.zip
                        </div>
                        <div className="text-xs text-brand-muted">Archive · 850 MB · 18.4K downloads</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <span className="hidden sm:inline-flex px-2 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200 dark:bg-emerald-500/15 dark:text-emerald-400">
                        Zero Egress
                      </span>
                      <Button variant="ghost" size="sm" className="h-7 px-2.5 text-xs rounded-lg">
                        Copy Link
                      </Button>
                    </div>
                  </div>

                  {/* Item 3 */}
                  <div className="p-3 rounded-xl bg-brand-surface border border-brand-border/70 hover:border-brand-primary/40 transition-colors flex items-center justify-between gap-3 shadow-xs">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="h-9 w-9 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 flex items-center justify-center shrink-0">
                        <FileCode className="h-4 w-4" />
                      </div>
                      <div className="min-w-0">
                        <div className="text-xs sm:text-sm font-semibold text-brand-text truncate">
                          Blender_3D_Environment_Assets.blend
                        </div>
                        <div className="text-xs text-brand-muted">3D Scene · 1.36 GB · 8.9K downloads</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <span className="hidden sm:inline-flex px-2 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200 dark:bg-emerald-500/15 dark:text-emerald-400">
                        Protected
                      </span>
                      <Button variant="ghost" size="sm" className="h-7 px-2.5 text-xs rounded-lg">
                        Copy Link
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Hero Value Strip (Under Product Visual) */}
        <div className="pt-12 sm:pt-16">
          <div className="p-4 sm:p-5 rounded-2xl bg-brand-surface border border-brand-border shadow-xs max-w-4xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-brand-border/60 text-left">
              {/* Item 1 */}
              <div className="p-3 sm:px-4 first:pt-0 md:first:pt-3">
                <div className="flex items-center gap-2 text-brand-primary">
                  <HardDrive className="h-4 w-4 shrink-0" />
                  <span className="text-xs sm:text-sm font-bold text-brand-text">Unlimited Storage</span>
                </div>
                <p className="text-xs text-brand-muted mt-1 leading-snug">
                  No artificial caps or surprise limits for creators.
                </p>
              </div>

              {/* Item 2 */}
              <div className="p-3 sm:px-4">
                <div className="flex items-center gap-2 text-brand-glow">
                  <Zap className="h-4 w-4 shrink-0" />
                  <span className="text-xs sm:text-sm font-bold text-brand-text">Zero Compression</span>
                </div>
                <p className="text-xs text-brand-muted mt-1 leading-snug">
                  Original RAW files and master renders intact.
                </p>
              </div>

              {/* Item 3 */}
              <div className="p-3 sm:px-4">
                <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400">
                  <Shield className="h-4 w-4 shrink-0" />
                  <span className="text-xs sm:text-sm font-bold text-brand-text">Fast Distribution</span>
                </div>
                <p className="text-xs text-brand-muted mt-1 leading-snug">
                  Global edge delivery across 300+ city locations.
                </p>
              </div>

              {/* Item 4 */}
              <div className="p-3 sm:px-4">
                <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400">
                  <DollarSign className="h-4 w-4 shrink-0" />
                  <span className="text-xs sm:text-sm font-bold text-brand-text">Creator Earnings</span>
                </div>
                <p className="text-xs text-brand-muted mt-1 leading-snug">
                  Direct revenue accrual from eligible streams.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
