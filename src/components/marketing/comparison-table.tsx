"use client";

import * as React from "react";
import { Check, X, Sparkles } from "lucide-react";
import { Container, SectionHeader } from "@/components/ui/layout-primitives";
import { Badge } from "@/components/ui/badge";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

export function ComparisonTableSection() {
  const comparisonData = [
    {
      feature: "Cloud Storage Space",
      playxim: "Unlimited (No Caps)",
      gdrive: "15 GB Free",
      terabox: "1 TB (Ad-heavy)",
      mega: "20 GB Free",
      playximCheck: true,
    },
    {
      feature: "Creator Monetization ($/views)",
      playxim: "Yes ($1.00 per 1,000 Views)",
      gdrive: "No Monetization",
      terabox: "No Monetization",
      mega: "No Monetization",
      playximCheck: true,
      othersCross: true,
    },
    {
      feature: "Maximum File Upload Size",
      playxim: "50 GB+ per file",
      gdrive: "15 GB limit",
      terabox: "4 GB limit",
      mega: "5 GB limit",
      playximCheck: true,
    },
    {
      feature: "4K Video Streaming Speed",
      playxim: "Instant 60fps (Adaptive)",
      gdrive: "Buffering & Processing Delay",
      terabox: "Aggressive Ads & Slow Buffering",
      mega: "Slow Browser Player",
      playximCheck: true,
    },
    {
      feature: "Download Bandwidth Limits",
      playxim: "Unlimited (Zero Throttling)",
      gdrive: "Strict 24h Quota Caps",
      terabox: "Severely Throttled (50 KB/s)",
      mega: "5 GB per 6 hours cap",
      playximCheck: true,
    },
    {
      feature: "Telegram & API Ingestion",
      playxim: "Instant Bot & Free API",
      gdrive: "Complex Paid Cloud Console",
      terabox: "Not Supported",
      mega: "Restricted",
      playximCheck: true,
      othersCross: false,
    },
    {
      feature: "Automated Daily Payouts",
      playxim: "Bank, PayPal, UPI, USDT",
      gdrive: "N/A",
      terabox: "N/A",
      mega: "N/A",
      playximCheck: true,
      othersCross: true,
    },
  ];

  return (
    <section id="comparison" className="py-20 sm:py-28 border-t border-brand-border/60 bg-brand-surface/30 backdrop-blur-xs relative">
      <Container className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
        <ScrollReveal duration={600}>
          <SectionHeader
            badge={<Badge variant="secondary">Direct Comparison</Badge>}
            title="Why Playxim is the Better Choice"
            description="See how Playxim outclasses conventional cloud storage and file sharing platforms designed in the pre-creator era."
          />

          <div className="rounded-2xl border border-brand-border bg-brand-surface/95 dark:bg-[#111728]/95 shadow-xl overflow-hidden text-left mt-8">
            <div className="overflow-x-auto">
              <table className="w-full text-xs sm:text-sm">
                <thead>
                  <tr className="border-b border-brand-border bg-brand-bg-soft/70 dark:bg-[#0D121F]/80">
                    <th className="py-4.5 px-4 sm:px-6 font-bold text-brand-text">Key Features</th>
                    <th className="py-4.5 px-4 sm:px-6 font-extrabold text-brand-primary bg-brand-primary/10 border-x border-brand-primary/25 min-w-[220px]">
                      <div className="flex items-center gap-1.5">
                        <Sparkles className="h-4 w-4" />
                        <span>Playxim</span>
                        <span className="text-[10px] font-mono uppercase bg-brand-primary text-white px-2 py-0.5 rounded-full ml-auto">
                          Best Choice
                        </span>
                      </div>
                    </th>
                    <th className="py-4.5 px-4 sm:px-6 font-semibold text-brand-muted min-w-[150px]">Google Drive</th>
                    <th className="py-4.5 px-4 sm:px-6 font-semibold text-brand-muted min-w-[150px]">Terabox</th>
                    <th className="py-4.5 px-4 sm:px-6 font-semibold text-brand-muted min-w-[150px]">Mega</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-brand-border/60 font-medium">
                  {comparisonData.map((row, idx) => (
                    <tr key={idx} className="hover:bg-brand-bg-soft/50 dark:hover:bg-[#161F36]/50 transition-colors">
                      {/* Feature Title */}
                      <td className="py-4.5 px-4 sm:px-6 font-semibold text-brand-text">
                        {row.feature}
                      </td>

                      {/* Playxim (Winner Column) */}
                      <td className="py-4.5 px-4 sm:px-6 bg-brand-primary/5 dark:bg-brand-primary/10 border-x border-brand-primary/20 text-brand-text font-bold">
                        <div className="flex items-center gap-2">
                          <div className="h-5 w-5 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                            <Check className="h-3.5 w-3.5 stroke-[3]" />
                          </div>
                          <span className="text-brand-primary font-bold">{row.playxim}</span>
                        </div>
                      </td>

                      {/* Google Drive */}
                      <td className="py-4.5 px-4 sm:px-6 text-brand-muted">
                        <div className="flex items-center gap-2">
                          {row.othersCross ? (
                            <X className="h-4 w-4 text-red-400 shrink-0" />
                          ) : null}
                          <span>{row.gdrive}</span>
                        </div>
                      </td>

                      {/* Terabox */}
                      <td className="py-4.5 px-4 sm:px-6 text-brand-muted">
                        <div className="flex items-center gap-2">
                          {row.othersCross ? (
                            <X className="h-4 w-4 text-red-400 shrink-0" />
                          ) : null}
                          <span>{row.terabox}</span>
                        </div>
                      </td>

                      {/* Mega */}
                      <td className="py-4.5 px-4 sm:px-6 text-brand-muted">
                        <div className="flex items-center gap-2">
                          {row.othersCross ? (
                            <X className="h-4 w-4 text-red-400 shrink-0" />
                          ) : null}
                          <span>{row.mega}</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </ScrollReveal>
      </Container>
    </section>
  );
}
