"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  HardDrive,
  DollarSign,
  ArrowRight,
  ShieldCheck,
  Zap,
  Globe2,
  TrendingUp,
  Sparkles,
  CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/layout-primitives";

export function HighlightBannersSection() {
  return (
    <section className="py-16 sm:py-24 border-t border-brand-border/60 bg-transparent relative space-y-10">
      <Container className="max-w-6xl mx-auto space-y-8">
        {/* Banner 1: Unlimited Storage for Every Creator */}
        <div className="relative rounded-3xl p-6 sm:p-10 lg:p-12 border border-brand-border bg-gradient-to-br from-brand-surface via-brand-surface/90 to-brand-primary/5 shadow-xl overflow-hidden group">
          {/* Subtle glow background */}
          <div className="absolute top-0 right-0 w-[450px] h-[350px] bg-brand-primary/10 blur-[100px] rounded-full pointer-events-none -z-10" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4 text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-brand-primary/10 text-brand-primary border border-brand-primary/20">
                <HardDrive className="h-3.5 w-3.5" />
                <span>Zero Storage Quotas</span>
              </div>

              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-display font-extrabold text-brand-text tracking-tight">
                Unlimited Cloud Storage for Every Creator
              </h3>

              <p className="text-sm sm:text-base text-brand-muted leading-relaxed max-w-2xl">
                Never worry about disk quotas or running out of hard drive space again. Store all your raw master files, episodic video series, and large software archives safely in Playxim cloud with multi-region redundancy and zero monthly storage bills.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs font-medium text-brand-text">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                  <span>50 GB+ single file limit</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                  <span>99.99% multi-region uptime</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                  <span>Permanent link preservation</span>
                </div>
              </div>

              <div className="pt-2">
                <Link href="/auth/sign-up">
                  <Button variant="primary" size="md" className="rounded-full shadow-md shadow-brand-primary/20">
                    <span>Claim Free Storage</span>
                    <ArrowRight className="h-4 w-4 ml-1.5" />
                  </Button>
                </Link>
              </div>
            </div>

            {/* Quick Stat Card on Right */}
            <div className="lg:col-span-4 flex justify-center lg:justify-end">
              <div className="w-full max-w-xs p-6 rounded-2xl bg-brand-bg-soft/90 border border-brand-border/80 shadow-lg text-left space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-brand-muted uppercase font-mono">
                    Storage Capacity
                  </span>
                  <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full">
                    Active
                  </span>
                </div>
                <div>
                  <div className="text-3xl font-display font-extrabold text-brand-text">
                    ∞ UNLIMITED
                  </div>
                  <div className="text-xs text-brand-muted mt-1 font-mono">
                    0 GB Used / Infinite Cloud Available
                  </div>
                </div>
                <div className="h-2 w-full rounded-full bg-brand-border/60 overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-brand-primary to-brand-glow w-1/4 rounded-full" />
                </div>
                <div className="text-[11px] text-brand-muted">
                  No billing tiers • No sudden account lockouts
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Banner 2: High-Yield Creator Monetization Program */}
        <div className="relative rounded-3xl p-6 sm:p-10 lg:p-12 border border-brand-border bg-gradient-to-br from-brand-surface via-brand-surface/90 to-amber-500/5 shadow-xl overflow-hidden group">
          {/* Subtle glow background */}
          <div className="absolute top-0 left-0 w-[450px] h-[350px] bg-amber-500/10 blur-[100px] rounded-full pointer-events-none -z-10" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Visual: 3D Monetization Graphic */}
            <div className="lg:col-span-5 relative order-2 lg:order-1">
              <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden border border-brand-border shadow-lg bg-brand-bg-soft">
                <Image
                  src="/images/creator-monetization-3d.jpg"
                  alt="Playxim High Yield Creator Monetization Program"
                  fill
                  sizes="(max-width: 768px) 100vw, 450px"
                  className="object-cover transition-transform duration-500 group-hover:scale-102"
                />
              </div>
            </div>

            {/* Copy on Right */}
            <div className="lg:col-span-7 space-y-4 text-left order-1 lg:order-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
                <DollarSign className="h-3.5 w-3.5" />
                <span>Creator Monetization Program</span>
              </div>

              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-display font-extrabold text-brand-text tracking-tight">
                Earn Up to $4.00 per 1,000 Views
              </h3>

              <p className="text-sm sm:text-base text-brand-muted leading-relaxed">
                Turn your content distribution into a reliable revenue stream. Whenever your audience watches videos or downloads files from your links, you earn leading CPM rates with daily payouts and zero hidden fees.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs font-medium text-brand-text">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                  <span>Daily automated payouts</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                  <span>$5.00 low withdrawal minimum</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                  <span>Bank, PayPal, UPI, Crypto</span>
                </div>
              </div>

              <div className="pt-2">
                <Link href="/auth/sign-up">
                  <Button variant="primary" size="md" className="rounded-full shadow-md shadow-brand-primary/20">
                    <span>Join Creator Program</span>
                    <ArrowRight className="h-4 w-4 ml-1.5" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
