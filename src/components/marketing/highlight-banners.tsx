"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  HardDrive,
  DollarSign,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/layout-primitives";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

export function HighlightBannersSection() {
  return (
    <section id="monetization" className="py-16 sm:py-24 border-t border-brand-border/60 bg-transparent relative space-y-10">
      <Container className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 space-y-10">
        {/* Banner 1: Unlimited Storage for Every Creator */}
        <ScrollReveal duration={750}>
          <div className="relative rounded-3xl p-6 sm:p-10 lg:p-12 border border-brand-border bg-gradient-to-br from-brand-surface via-brand-surface/90 to-brand-primary/5 dark:from-[#111728] dark:via-[#111728]/90 dark:to-brand-primary/10 shadow-xl overflow-hidden group">
            {/* Subtle glow background */}
            <div className="absolute top-0 right-0 w-[500px] h-[350px] bg-brand-primary/12 blur-[100px] rounded-full pointer-events-none -z-10" />

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
                  Never worry about disk quotas or running out of space. Upload all your raw videos, master archives, and documents safely with multi-region redundancy and permanent link preservation.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs font-medium text-brand-text">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                    <span>50 GB+ single file limit</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                    <span>Instant share link on upload</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                    <span>Zero bandwidth caps</span>
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
                <div className="w-full max-w-sm p-6 rounded-2xl bg-brand-bg-soft/90 dark:bg-[#0D121F]/90 border border-brand-border/80 shadow-lg text-left space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-brand-muted uppercase font-mono">
                      Storage Capacity
                    </span>
                    <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full">
                      Active
                    </span>
                  </div>
                  <div>
                    <div className="text-3xl sm:text-4xl font-display font-extrabold text-brand-text">
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
                    No artificial caps • Free for all creators
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* Banner 2: $1.00 per 1,000 Views Program */}
        <ScrollReveal delay={150} duration={750}>
          <div className="relative rounded-3xl p-6 sm:p-10 lg:p-12 border border-brand-border bg-gradient-to-br from-brand-surface via-brand-surface/90 to-amber-500/5 dark:from-[#111728] dark:via-[#111728]/90 dark:to-amber-500/10 shadow-xl overflow-hidden group">
            {/* Subtle glow background */}
            <div className="absolute top-0 left-0 w-[500px] h-[350px] bg-amber-500/10 blur-[100px] rounded-full pointer-events-none -z-10" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Visual: Isolated 3D Monetization Graphic */}
              <div className="lg:col-span-5 relative order-2 lg:order-1 flex flex-col items-center justify-center">
                <div className="relative w-full max-w-md aspect-[16/9] select-none filter drop-shadow-[0_20px_30px_rgba(0,0,0,0.18)] dark:drop-shadow-[0_20px_35px_rgba(245,158,11,0.25)] transition-transform duration-500 hover:scale-[1.03]">
                  <Image
                    src="/images/creator-3d-monetization.png"
                    alt="Playxim $1.00 per 1000 Views 3D Digital Wallet & Growth"
                    fill
                    sizes="(max-width: 768px) 100vw, 480px"
                    className="object-contain"
                  />
                </div>
                {/* 3D Contact Shadow */}
                <div className="w-2/3 h-5 bg-black/15 dark:bg-black/50 blur-xl rounded-full -mt-2 pointer-events-none" />
              </div>

              {/* Copy on Right */}
              <div className="lg:col-span-7 space-y-4 text-left order-1 lg:order-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
                  <DollarSign className="h-3.5 w-3.5" />
                  <span>Transparent Creator Monetization</span>
                </div>

                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-display font-extrabold text-brand-text tracking-tight">
                  Earn $1.00 for Every 1,000 Views
                </h3>

                <p className="text-sm sm:text-base text-brand-muted leading-relaxed">
                  Upload your files and videos, share your link, and get paid a flat <strong className="text-brand-text font-semibold">$1.00 for every 1,000 views</strong>. Your audience enjoys instant 4K playback and high-speed downloads via web or mobile app, and you get dependable daily payouts.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs font-medium text-brand-text">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                    <span>$1.00 flat per 1K views</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                    <span>Daily automated payouts</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                    <span>Bank, UPI, PayPal, USDT</span>
                  </div>
                </div>

                <div className="pt-2">
                  <Link href="/auth/sign-up">
                    <Button variant="primary" size="md" className="rounded-full shadow-md shadow-brand-primary/20">
                      <span>Start Earning $1 / 1K Views</span>
                      <ArrowRight className="h-4 w-4 ml-1.5" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </Container>
    </section>
  );
}
