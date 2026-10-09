"use client";

import * as React from "react";
import { Check, X, Sparkles } from "lucide-react";
import { Container, SectionHeader } from "@/components/ui/layout-primitives";
import { Badge } from "@/components/ui/badge";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

export function ComparisonTableSection() {
  const comparisonData = [
    {
      feature: "Free Cloud Storage",
      playxim: "Unlimited (100% Free)",
      gdrive: "15 GB Free limit",
      terabox: "1 TB (Ad-heavy)",
      mega: "20 GB Free limit",
      playximCheck: true,
    },
    {
      feature: "Creator Monetization",
      playxim: "Earn $1.00 / 1,000 Views",
      gdrive: "No ($0)",
      terabox: "No ($0)",
      mega: "No ($0)",
      playximCheck: true,
      othersCross: true,
    },
    {
      feature: "Viewer Sign-Up Needed",
      playxim: "No (Watch & download directly)",
      gdrive: "Requires Google login",
      terabox: "Forces account & app install",
      mega: "Account required",
      playximCheck: true,
      othersCross: false,
    },
    {
      feature: "Telegram Upload Bot",
      playxim: "Yes (@PlayximBot uploader)",
      gdrive: "No",
      terabox: "No",
      mega: "No",
      playximCheck: true,
      othersCross: true,
    },
    {
      feature: "Download Speed Limits",
      playxim: "Super Fast (No speed caps)",
      gdrive: "24-hour quota limits",
      terabox: "Throttled to 50 KB/s",
      mega: "Daily bandwidth caps",
      playximCheck: true,
    },
    {
      feature: "Daily Payout Methods",
      playxim: "UPI, Bank, PayPal & Crypto",
      gdrive: "None",
      terabox: "None",
      mega: "None",
      playximCheck: true,
      othersCross: true,
    },
    {
      feature: "Minimum Withdrawal",
      playxim: "Only $5.00 (Daily cashout)",
      gdrive: "N/A",
      terabox: "N/A",
      mega: "N/A",
      playximCheck: true,
      othersCross: true,
    },
  ];

  return (
    <section id="comparison" className="py-20 sm:py-28 border-t border-slate-200/80 dark:border-brand-border/60 bg-slate-50/70 dark:bg-brand-surface/30 backdrop-blur-xs relative">
      <Container className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
        <ScrollReveal duration={600}>
          <SectionHeader
            badge={<Badge variant="secondary">Platform Comparison</Badge>}
            title="Why Playxim is the Better Choice"
            description="See how Playxim gives you unlimited free storage and daily creator earnings, while conventional platforms limit your space and pay you nothing."
          />

          <div className="rounded-2xl border border-slate-200/80 dark:border-brand-border bg-white dark:bg-[#111728]/95 shadow-xl shadow-slate-900/5 dark:shadow-black/40 overflow-hidden text-left mt-8">
            <div className="overflow-x-auto">
              <table className="w-full text-xs sm:text-sm">
                <thead>
                  <tr className="border-b border-slate-200/80 dark:border-brand-border bg-slate-50/90 dark:bg-[#0D121F]/80">
                    <th className="py-4.5 px-4 sm:px-6 font-bold text-slate-900 dark:text-brand-text">Key Features</th>
                    <th className="py-4.5 px-4 sm:px-6 font-extrabold text-brand-primary bg-blue-50/80 dark:bg-brand-primary/10 border-x border-blue-200/80 dark:border-brand-primary/25 min-w-[220px]">
                      <div className="flex items-center gap-1.5">
                        <Sparkles className="h-4 w-4" />
                        <span>Playxim</span>
                        <span className="text-[10px] font-mono uppercase bg-brand-primary text-white px-2 py-0.5 rounded-full ml-auto">
                          Best Choice
                        </span>
                      </div>
                    </th>
                    <th className="py-4.5 px-4 sm:px-6 font-semibold text-slate-600 dark:text-brand-muted min-w-[150px]">Google Drive</th>
                    <th className="py-4.5 px-4 sm:px-6 font-semibold text-slate-600 dark:text-brand-muted min-w-[150px]">Terabox</th>
                    <th className="py-4.5 px-4 sm:px-6 font-semibold text-slate-600 dark:text-brand-muted min-w-[150px]">Mega</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200/70 dark:divide-brand-border/60 font-medium">
                  {comparisonData.map((row, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/70 dark:hover:bg-[#161F36]/50 transition-colors">
                      {/* Feature Title */}
                      <td className="py-4.5 px-4 sm:px-6 font-semibold text-slate-900 dark:text-brand-text">
                        {row.feature}
                      </td>

                      {/* Playxim (Winner Column) */}
                      <td className="py-4.5 px-4 sm:px-6 bg-blue-50/40 dark:bg-brand-primary/10 border-x border-blue-200/60 dark:border-brand-primary/20 text-slate-900 dark:text-brand-text font-bold">
                        <div className="flex items-center gap-2">
                          <div className="h-5 w-5 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                            <Check className="h-3.5 w-3.5 stroke-[3]" />
                          </div>
                          <span className="text-brand-primary font-bold">{row.playxim}</span>
                        </div>
                      </td>

                      {/* Google Drive */}
                      <td className="py-4.5 px-4 sm:px-6 text-slate-500 dark:text-brand-muted">
                        <div className="flex items-center gap-2">
                          {row.othersCross ? (
                            <X className="h-4 w-4 text-red-500/80 shrink-0" />
                          ) : null}
                          <span>{row.gdrive}</span>
                        </div>
                      </td>

                      {/* Terabox */}
                      <td className="py-4.5 px-4 sm:px-6 text-slate-500 dark:text-brand-muted">
                        <div className="flex items-center gap-2">
                          {row.othersCross ? (
                            <X className="h-4 w-4 text-red-500/80 shrink-0" />
                          ) : null}
                          <span>{row.terabox}</span>
                        </div>
                      </td>

                      {/* Mega */}
                      <td className="py-4.5 px-4 sm:px-6 text-slate-500 dark:text-brand-muted">
                        <div className="flex items-center gap-2">
                          {row.othersCross ? (
                            <X className="h-4 w-4 text-red-500/80 shrink-0" />
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
