"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowRight, DollarSign, HelpCircle, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container, SectionHeader } from "@/components/ui/layout-primitives";
import { Badge } from "@/components/ui/badge";
import { formatCurrency, formatCompactNumber } from "@/lib/utils";

export function CreatorEconomicsSection() {
  const [estimatedViews, setEstimatedViews] = React.useState<number>(100000);
  const [cpmRate, setCpmRate] = React.useState<number>(1.75);

  const monthlyEarnings = (estimatedViews / 1000) * cpmRate;
  const annualEarnings = monthlyEarnings * 12;

  const viewPresets = [50000, 100000, 250000, 500000, 1000000];

  return (
    <section id="calculator" className="py-24 sm:py-32 border-t border-brand-border/60 bg-transparent relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[350px] bg-amber-500/8 blur-[130px] rounded-full pointer-events-none -z-10 animate-float-slow" />
      <Container className="max-w-4xl mx-auto">
        <SectionHeader
          badge={<Badge variant="premium">Earnings Calculator</Badge>}
          title="Know what your content can earn."
          description="See what your audience is worth. Adjust your monthly views and CPM rate to estimate potential creator earnings."
        />

        <div className="rounded-2xl p-1.5 bg-gradient-to-br from-amber-500/15 via-brand-border/60 to-transparent border border-brand-border shadow-2xl">
          <div className="p-6 sm:p-9 bg-brand-surface rounded-xl border border-brand-border">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
              {/* Left Controls */}
              <div className="space-y-6 text-left">
                {/* Views Slider */}
                <div>
                  <div className="flex justify-between items-center text-sm font-semibold mb-2">
                    <label htmlFor="views-slider-calc" className="text-brand-text cursor-pointer">
                      Monthly Video Views
                    </label>
                    <span className="text-brand-primary font-mono font-bold">
                      {formatCompactNumber(estimatedViews)} views
                    </span>
                  </div>
                  <input
                    id="views-slider-calc"
                    aria-label="Estimated monthly video views"
                    type="range"
                    min="10000"
                    max="2000000"
                    step="10000"
                    value={estimatedViews}
                    onChange={(e) => setEstimatedViews(Number(e.target.value))}
                    className="w-full accent-brand-primary h-2 bg-brand-bg-soft rounded-lg cursor-pointer"
                  />
                  {/* Preset Chips */}
                  <div className="flex flex-wrap gap-1.5 mt-2.5">
                    {viewPresets.map((val) => (
                      <button
                        key={val}
                        type="button"
                        onClick={() => setEstimatedViews(val)}
                        className={`text-xs px-2.5 py-0.5 rounded-full border transition-all ${
                          estimatedViews === val
                            ? "bg-brand-primary text-white border-brand-primary font-semibold"
                            : "bg-brand-bg-soft text-brand-muted border-brand-border hover:text-brand-text"
                        }`}
                      >
                        {formatCompactNumber(val)}
                      </button>
                    ))}
                  </div>
                </div>

                {/* CPM Slider */}
                <div>
                  <div className="flex justify-between items-center text-sm font-semibold mb-2">
                    <label htmlFor="cpm-slider-calc" className="text-brand-text cursor-pointer">
                      Platform CPM Rate
                    </label>
                    <span className="text-amber-900 dark:text-amber-400 font-mono font-bold">
                      ${cpmRate.toFixed(2)} / 1K views
                    </span>
                  </div>
                  <input
                    id="cpm-slider-calc"
                    aria-label="Platform CPM rate per 1,000 views"
                    type="range"
                    min="1.0"
                    max="4.0"
                    step="0.25"
                    value={cpmRate}
                    onChange={(e) => setCpmRate(Number(e.target.value))}
                    className="w-full accent-amber-500 h-2 bg-brand-bg-soft rounded-lg cursor-pointer"
                  />
                  <div className="flex justify-between text-xs text-brand-muted mt-1 font-mono">
                    <span>$1.00</span>
                    <span>$2.50</span>
                    <span>$4.00</span>
                  </div>
                </div>

                {/* Notice */}
                <div className="p-3.5 rounded-xl bg-brand-bg-soft/70 border border-brand-border text-xs text-brand-muted leading-relaxed">
                  💡 Earnings come from real video views. No follower minimums and no hidden fees.
                </div>
              </div>

              {/* Right Output Card */}
              <div className="p-8 rounded-2xl bg-gradient-to-br from-brand-bg-soft to-brand-surface border border-amber-500/30 flex flex-col items-center justify-center text-center shadow-inner">
                <span className="text-xs uppercase tracking-wider font-semibold text-brand-muted">
                  Estimated Creator Earnings
                </span>
                <span className="text-4xl sm:text-5xl md:text-6xl font-display font-extrabold text-amber-900 dark:text-amber-400 font-mono mt-3 mb-1">
                  {formatCurrency(monthlyEarnings)}
                </span>
                <span className="text-xs text-brand-muted font-mono">per month</span>

                <div className="mt-4 pt-3 border-t border-brand-border/60 w-full flex items-center justify-between text-xs font-mono text-brand-muted">
                  <span>Annual Projection:</span>
                  <span className="text-amber-900 dark:text-amber-400 font-bold">
                    {formatCurrency(annualEarnings)} / yr
                  </span>
                </div>

                <div className="mt-6 w-full">
                  <Link href="/auth/sign-up" className="w-full">
                    <Button variant="primary" size="lg" className="w-full justify-center rounded-full shadow-md font-semibold">
                      <span>Start Earning with Playxim</span>
                      <ArrowRight className="h-4 w-4 ml-1.5" />
                    </Button>
                  </Link>
                </div>

                <p className="text-[11px] text-brand-muted mt-4 leading-normal">
                  Actual earnings depend on eligible views, platform monetization, ad delivery and applicable policies.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
