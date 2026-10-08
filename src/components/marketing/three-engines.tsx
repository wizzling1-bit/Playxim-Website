"use client";

import * as React from "react";
import { HardDrive, Video, DollarSign, ArrowRight, ShieldCheck, Zap, TrendingUp } from "lucide-react";
import { Container, SectionHeader } from "@/components/ui/layout-primitives";
import { Badge } from "@/components/ui/badge";

export function ThreeEnginesSection() {
  const pipeline = ["UPLOAD", "STORE", "SHARE", "REACH", "EARN"];

  return (
    <section className="py-24 sm:py-32 border-t border-brand-border/60 bg-brand-surface/30 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-brand-primary/10 blur-[130px] rounded-full pointer-events-none -z-10 animate-float-slow" />
      <Container>
        <SectionHeader
          badge={<Badge variant="secondary">Architecture</Badge>}
          title="One platform. Three powerful engines."
          description="We separate arbitrary storage from video streaming to deliver maximum performance, zero bandwidth fees, and genuine creator economics."
        />

        {/* Visual Pipeline Flow Strip */}
        <div className="max-w-3xl mx-auto mb-16 p-3 rounded-2xl bg-brand-surface border border-brand-border shadow-xs">
          <div className="flex items-center justify-between text-xs font-mono font-bold text-brand-muted tracking-wider overflow-x-auto py-1 px-2">
            {pipeline.map((step, idx) => (
              <React.Fragment key={step}>
                <span
                  className={
                    idx === pipeline.length - 1
                      ? "text-amber-900 dark:text-amber-400 font-extrabold"
                      : "text-brand-text"
                  }
                >
                  {step}
                </span>
                {idx < pipeline.length - 1 && (
                  <ArrowRight className="h-3.5 w-3.5 text-brand-primary shrink-0 mx-2 opacity-60" />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* 3 Large Horizontally Connected Engines */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto relative">
          {/* Engine 01 */}
          <div className="p-8 rounded-2xl bg-brand-surface border border-brand-border shadow-sm hover:border-brand-primary/40 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-mono text-2xl font-extrabold text-brand-primary/80">01</span>
                <div className="h-10 w-10 rounded-xl bg-brand-primary/10 text-brand-primary border border-brand-primary/20 flex items-center justify-center">
                  <HardDrive className="h-5 w-5" />
                </div>
              </div>
              <h3 className="text-xl font-display font-bold text-brand-text">Storage Engine</h3>
              <p className="text-xs sm:text-sm text-brand-muted leading-relaxed">
                Powered by Cloudflare R2 object cloud. Upload zip files, master RAW footage, and archives with zero egress fees when your audience downloads.
              </p>
            </div>

            {/* Mini Visual */}
            <div className="p-3.5 rounded-xl bg-brand-bg-soft/70 border border-brand-border/60 text-xs space-y-1.5 font-mono">
              <div className="flex justify-between text-brand-text font-semibold">
                <span>S3 Chunked Multipart</span>
                <span className="text-emerald-800 dark:text-emerald-400 font-bold">200 GB Max</span>
              </div>
              <div className="text-[11px] text-brand-muted">Zero bandwidth egress penalties</div>
            </div>
          </div>

          {/* Engine 02 */}
          <div className="p-8 rounded-2xl bg-brand-surface border border-brand-border shadow-sm hover:border-brand-glow/40 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-mono text-2xl font-extrabold text-brand-glow/80">02</span>
                <div className="h-10 w-10 rounded-xl bg-brand-glow/10 text-brand-glow border border-brand-glow/20 flex items-center justify-center">
                  <Video className="h-5 w-5" />
                </div>
              </div>
              <h3 className="text-xl font-display font-bold text-brand-text">Delivery Engine</h3>
              <p className="text-xs sm:text-sm text-brand-muted leading-relaxed">
                Videos are converted into adaptive bitrate HLS/DASH streams, cached across 300+ global edge locations for instant buffer-free playback.
              </p>
            </div>

            {/* Mini Visual */}
            <div className="p-3.5 rounded-xl bg-brand-bg-soft/70 border border-brand-border/60 text-xs space-y-1.5 font-mono">
              <div className="flex justify-between text-brand-text font-semibold">
                <span>Adaptive 4K / 1080p</span>
                <span className="text-blue-800 dark:text-brand-glow font-bold">300+ PoPs</span>
              </div>
              <div className="text-[11px] text-brand-muted">Sub-second stream time-to-first-frame</div>
            </div>
          </div>

          {/* Engine 03 */}
          <div className="p-8 rounded-2xl bg-brand-surface border border-brand-border shadow-sm hover:border-amber-500/40 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-mono text-2xl font-extrabold text-amber-600 dark:text-amber-400">03</span>
                <div className="h-10 w-10 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 flex items-center justify-center">
                  <DollarSign className="h-5 w-5" />
                </div>
              </div>
              <h3 className="text-xl font-display font-bold text-brand-text">Monetization Engine</h3>
              <p className="text-xs sm:text-sm text-brand-muted leading-relaxed">
                Earn transparent revenue whenever eligible viewers watch your streams in future apps. Track view completion rates and balances in real time.
              </p>
            </div>

            {/* Mini Visual */}
            <div className="p-3.5 rounded-xl bg-brand-bg-soft/70 border border-brand-border/60 text-xs space-y-1.5 font-mono">
              <div className="flex justify-between text-brand-text font-semibold">
                <span>Audited Ledger</span>
                <span className="text-amber-900 dark:text-amber-400 font-bold">$1.00–$4.00 CPM</span>
              </div>
              <div className="text-[11px] text-brand-muted">Daily payout accrual accounting</div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
