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
    <section id="comparison" className="py-20 sm:py-28 border-t border-brand-border bg-brand-bg-soft/40 backdrop-blur-xs relative">
      <Container className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
        <ScrollReveal duration={600} variant="subtle">
          <SectionHeader
            badge={<Badge variant="secondary">Platform Comparison</Badge>}
            title="Why Playxim is the Better Choice"
            description="See how Playxim gives you unlimited free storage and daily creator earnings, while conventional platforms limit your space and pay you nothing."
          />
        </ScrollReveal>

        <ScrollReveal delay={120} duration={700} variant="scale">
          <div className="rounded-2xl border border-brand-border bg-brand-surface shadow-xl overflow-hidden text-left mt-10 transition-colors">
            <div className="overflow-x-auto">
              <table className="w-full text-xs sm:text-sm">
                <thead>
                  <tr className="border-b border-brand-border bg-brand-bg-soft">
                    <th className="py-4.5 px-4 sm:px-6 font-bold text-brand-text">Key Features</th>
                    <th className="py-4.5 px-4 sm:px-6 font-extrabold text-brand-primary bg-brand-primary/10 border-x border-brand-primary/30 min-w-[220px]">
                      <div className="flex items-center gap-1.5">
                        <Sparkles className="h-4 w-4 text-brand-primary" />
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
                <tbody className="divide-y divide-brand-border/60">
                  {comparisonData.map((row, idx) => (
                    <tr
                      key={idx}
                      className="hover:bg-brand-bg-soft/70 transition-colors duration-150 group"
                    >
                      {/* Feature Name */}
                      <td className="py-4 px-4 sm:px-6 font-bold text-brand-text">
                        {row.feature}
                      </td>

                      {/* Playxim (Highlight Column) */}
                      <td className="py-4 px-4 sm:px-6 bg-brand-primary/[0.08] border-x border-brand-primary/25 font-bold text-brand-primary dark:text-brand-secondary">
                        <div className="flex items-center gap-2">
                          <div className="h-5 w-5 rounded-full bg-brand-primary/15 flex items-center justify-center shrink-0">
                            <Check className="h-3.5 w-3.5 text-brand-primary" />
                          </div>
                          <span>{row.playxim}</span>
                        </div>
                      </td>

                      {/* Google Drive */}
                      <td className="py-4 px-4 sm:px-6 text-brand-muted">
                        <div className="flex items-center gap-1.5">
                          {row.othersCross ? (
                            <X className="h-4 w-4 text-rose-500/70 shrink-0" />
                          ) : null}
                          <span>{row.gdrive}</span>
                        </div>
                      </td>

                      {/* Terabox */}
                      <td className="py-4 px-4 sm:px-6 text-brand-muted">
                        <div className="flex items-center gap-1.5">
                          {row.othersCross ? (
                            <X className="h-4 w-4 text-rose-500/70 shrink-0" />
                          ) : null}
                          <span>{row.terabox}</span>
                        </div>
                      </td>

                      {/* Mega */}
                      <td className="py-4 px-4 sm:px-6 text-brand-muted">
                        <div className="flex items-center gap-1.5">
                          {row.othersCross ? (
                            <X className="h-4 w-4 text-rose-500/70 shrink-0" />
                          ) : null}
                          <span>{row.mega}</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Bottom Summary Bar */}
            <div className="p-4 sm:p-5 bg-brand-bg-soft border-t border-brand-border flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-brand-muted">
              <span>* Comparison data based on public free tiers and creator monetization features as of 2026.</span>
              <a href="#earnings-calculator" className="text-brand-primary font-bold hover:underline">
                Calculate your potential earnings →
              </a>
            </div>
          </div>
        </ScrollReveal>
      </Container>
    </section>
  );
}

export default ComparisonTableSection;
