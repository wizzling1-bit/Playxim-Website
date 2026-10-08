"use client";

import * as React from "react";
import { TrendingUp, Users, ArrowDownToLine, Clock, Eye, BarChart2, DollarSign } from "lucide-react";
import { Container, SectionHeader } from "@/components/ui/layout-primitives";
import { Badge } from "@/components/ui/badge";

export function AnalyticsShowcaseSection() {
  const weeklyData = [
    { day: "Mon", views: 34, height: "42%" },
    { day: "Tue", views: 48, height: "58%" },
    { day: "Wed", views: 62, height: "74%" },
    { day: "Thu", views: 54, height: "65%" },
    { day: "Fri", views: 82, height: "92%" },
    { day: "Sat", views: 96, height: "100%" },
    { day: "Sun", views: 72, height: "82%" },
  ];

  return (
    <section className="py-24 sm:py-32 border-t border-brand-border/60 bg-brand-bg relative">
      <Container>
        <SectionHeader
          badge={<Badge variant="default">Intelligence</Badge>}
          title="See how your content performs."
          description="Real-time analytics across stream playback, audience retention, file downloads, and accrued creator payouts."
        />

        <div className="max-w-5xl mx-auto rounded-2xl p-1.5 bg-gradient-to-br from-brand-border/80 to-transparent border border-brand-border shadow-2xl">
          <div className="rounded-xl border border-brand-border bg-brand-surface p-6 sm:p-9 space-y-7 text-left">
            {/* Top 4 KPI Metric Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-4 rounded-xl bg-brand-bg-soft/70 border border-brand-border">
                <div className="flex items-center justify-between text-brand-muted text-xs">
                  <span>Total Video Views</span>
                  <Eye className="h-4 w-4 text-brand-primary" />
                </div>
                <div className="text-2xl font-display font-extrabold text-brand-text mt-1.5">
                  394,200
                </div>
                <div className="text-xs text-emerald-800 dark:text-emerald-400 font-mono mt-1 flex items-center gap-1">
                  <TrendingUp className="h-3 w-3" />
                  <span>+24.8% vs last month</span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-brand-bg-soft/70 border border-brand-border">
                <div className="flex items-center justify-between text-brand-muted text-xs">
                  <span>Unique Viewers</span>
                  <Users className="h-4 w-4 text-brand-glow" />
                </div>
                <div className="text-2xl font-display font-extrabold text-brand-text mt-1.5">
                  182,450
                </div>
                <div className="text-xs text-brand-muted font-mono mt-1">
                  Global reach in 48 countries
                </div>
              </div>

              <div className="p-4 rounded-xl bg-brand-bg-soft/70 border border-brand-border">
                <div className="flex items-center justify-between text-brand-muted text-xs">
                  <span>File Downloads</span>
                  <ArrowDownToLine className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                </div>
                <div className="text-2xl font-display font-extrabold text-brand-text mt-1.5">
                  48,120
                </div>
                <div className="text-xs text-brand-muted font-mono mt-1">
                  Zero egress fees billed
                </div>
              </div>

              <div className="p-4 rounded-xl bg-brand-bg-soft/70 border border-amber-500/30">
                <div className="flex items-center justify-between text-brand-muted text-xs">
                  <span>Accrued Earnings</span>
                  <DollarSign className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                </div>
                <div className="text-2xl font-display font-extrabold text-amber-900 dark:text-amber-400 mt-1.5">
                  $689.85 USD
                </div>
                <div className="text-xs text-amber-900 dark:text-amber-400 font-mono mt-1">
                  Daily verified payout ledger
                </div>
              </div>
            </div>

            {/* Chart Simulation & Top Content Leaderboard */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-2">
              {/* Left Bar Chart */}
              <div className="lg:col-span-7 p-5 rounded-xl bg-brand-bg-soft/50 border border-brand-border space-y-4">
                <div className="flex items-center justify-between text-xs font-semibold text-brand-text">
                  <span>Weekly Stream Activity</span>
                  <span className="text-brand-muted font-mono">Last 7 Days</span>
                </div>
                {/* Visual Bars */}
                <div className="h-40 flex items-end justify-between gap-3 pt-4 px-2 border-b border-brand-border/60">
                  {weeklyData.map((d) => (
                    <div key={d.day} className="flex-1 flex flex-col items-center gap-2 h-full justify-end group">
                      <div
                        className="w-full rounded-t-md bg-brand-primary/80 group-hover:bg-brand-primary transition-all duration-300"
                        style={{ height: d.height }}
                      />
                      <span className="text-[11px] font-mono text-brand-muted">{d.day}</span>
                    </div>
                  ))}
                </div>
                <div className="flex items-center justify-between text-[11px] text-brand-muted font-mono">
                  <span>Peak: Saturday (96.4K streams)</span>
                  <span className="text-emerald-800 dark:text-emerald-400 font-semibold">94.2% avg completion rate</span>
                </div>
              </div>

              {/* Right Top Content */}
              <div className="lg:col-span-5 p-5 rounded-xl bg-brand-bg-soft/50 border border-brand-border space-y-3">
                <div className="text-xs font-semibold text-brand-text">Top Performing Content</div>
                <div className="space-y-2 text-xs">
                  <div className="p-2.5 rounded-lg bg-brand-surface border border-brand-border/60 flex items-center justify-between">
                    <div className="truncate min-w-0 pr-2">
                      <div className="font-semibold text-brand-text truncate">Tokyo_Nightlife_4K.mp4</div>
                      <div className="text-[11px] text-brand-muted">74.2K views · 98% complete</div>
                    </div>
                    <span className="text-amber-900 dark:text-amber-400 font-mono font-bold shrink-0">+$129.85</span>
                  </div>

                  <div className="p-2.5 rounded-lg bg-brand-surface border border-brand-border/60 flex items-center justify-between">
                    <div className="truncate min-w-0 pr-2">
                      <div className="font-semibold text-brand-text truncate">Iceland_Volcano_RAW.mp4</div>
                      <div className="text-[11px] text-brand-muted">52.8K views · 91% complete</div>
                    </div>
                    <span className="text-amber-900 dark:text-amber-400 font-mono font-bold shrink-0">+$92.40</span>
                  </div>

                  <div className="p-2.5 rounded-lg bg-brand-surface border border-brand-border/60 flex items-center justify-between">
                    <div className="truncate min-w-0 pr-2">
                      <div className="font-semibold text-brand-text truncate">Cinematic_SFX_Vol2.zip</div>
                      <div className="text-[11px] text-brand-muted">18.4K downloads · 0 egress</div>
                    </div>
                    <span className="text-emerald-800 dark:text-emerald-400 font-mono font-bold shrink-0">Free</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
