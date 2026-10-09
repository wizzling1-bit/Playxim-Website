"use client";

import * as React from "react";
import Link from "next/link";
import {
  DollarSign,
  TrendingUp,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Clock,
  CreditCard,
  Building2,
  CheckCircle2,
  Coins,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container, SectionHeader } from "@/components/ui/layout-primitives";
import { Badge } from "@/components/ui/badge";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

export function EarningsCalculatorSection() {
  const [dailyViews, setDailyViews] = React.useState<number>(20000);

  // Rate: $1.00 per 1,000 views
  const ratePer1k = 1.0;
  const dailyEarnings = (dailyViews / 1000) * ratePer1k;
  const monthlyEarnings = dailyEarnings * 30;
  const yearlyEarnings = monthlyEarnings * 12;

  const presets = [
    { label: "5,000", value: 5000 },
    { label: "15,000", value: 15000 },
    { label: "30,000", value: 30000 },
    { label: "50,000", value: 50000 },
    { label: "100,000", value: 100000 },
  ];

  const payoutMethods = [
    {
      name: "UPI / QR",
      desc: "GPay, PhonePe, Paytm",
      badge: "Instant Payout",
      icon: <Coins className="h-5 w-5 text-emerald-500" />,
    },
    {
      name: "Bank Transfer",
      desc: "IMPS, NEFT & Direct Wire",
      badge: "Direct Deposit",
      icon: <Building2 className="h-5 w-5 text-blue-500" />,
    },
    {
      name: "PayPal",
      desc: "Worldwide USD Transfers",
      badge: "Global",
      icon: <CreditCard className="h-5 w-5 text-indigo-500" />,
    },
    {
      name: "Crypto (USDT)",
      desc: "Binance TRC-20 & BEP-20",
      badge: "0% Fees",
      icon: <Coins className="h-5 w-5 text-amber-500" />,
    },
  ];

  return (
    <section id="earnings-calculator" className="py-20 sm:py-28 border-t border-slate-200/80 dark:border-brand-border/60 bg-gradient-to-b from-transparent via-blue-50/30 dark:via-brand-primary/5 to-transparent relative">
      <Container className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
        <ScrollReveal duration={600}>
          <SectionHeader
            badge={<Badge variant="default">Earnings Calculator</Badge>}
            title="Calculate Your Daily & Monthly Income"
            description="Slide to estimate your earnings. We pay a flat $1.00 for every 1,000 views. No watch-hour locks, no deductions, and cash out starting at just $5."
          />
        </ScrollReveal>

        <div className="max-w-5xl mx-auto mt-12 sm:mt-16">
          <ScrollReveal delay={100} duration={700}>
            <div className="rounded-3xl p-6 sm:p-10 lg:p-12 border border-slate-200/80 dark:border-brand-border bg-white dark:bg-[#111728]/95 shadow-xl shadow-slate-900/5 dark:shadow-black/40 text-left">
              {/* Slider Control Header */}
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <label htmlFor="views-slider" className="text-sm sm:text-base font-bold text-slate-900 dark:text-brand-text">
                    Select Your Expected Daily Views:
                  </label>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-primary/10 text-brand-primary border border-brand-primary/20 text-sm font-mono font-bold self-start sm:self-auto">
                    <TrendingUp className="h-4 w-4" />
                    <span>{dailyViews.toLocaleString()} views / day</span>
                  </div>
                </div>

                {/* Range Slider */}
                <div className="py-4">
                  <input
                    id="views-slider"
                    type="range"
                    min={1000}
                    max={150000}
                    step={1000}
                    value={dailyViews}
                    onChange={(e) => setDailyViews(Number(e.target.value))}
                    className="w-full h-2.5 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-brand-primary"
                    aria-label="Daily views range"
                  />
                  <div className="flex justify-between text-xs text-slate-500 dark:text-brand-muted mt-2 font-mono">
                    <span>1,000 views</span>
                    <span>50,000 views</span>
                    <span>100,000 views</span>
                    <span>150,000+ views</span>
                  </div>
                </div>

                {/* Quick Presets */}
                <div className="flex flex-wrap items-center gap-2 pt-1">
                  <span className="text-xs font-semibold text-slate-500 dark:text-brand-muted mr-1">
                    Quick Presets:
                  </span>
                  {presets.map((preset) => (
                    <button
                      key={preset.value}
                      type="button"
                      onClick={() => setDailyViews(preset.value)}
                      className={`px-3 py-1 rounded-lg text-xs font-mono font-semibold transition-all ${
                        dailyViews === preset.value
                          ? "bg-brand-primary text-white shadow-xs"
                          : "bg-slate-100 dark:bg-[#161F36] text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800"
                      }`}
                    >
                      {preset.label} views
                    </button>
                  ))}
                </div>
              </div>

              {/* Earnings Result Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8 pt-8 border-t border-slate-200/80 dark:border-brand-border/60">
                {/* Daily Income */}
                <div className="p-5 rounded-2xl bg-slate-50/80 dark:bg-[#0D121F]/80 border border-slate-200/80 dark:border-brand-border/70 text-left">
                  <div className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-brand-muted">
                    Daily Earnings
                  </div>
                  <div className="text-3xl sm:text-4xl font-display font-extrabold text-slate-900 dark:text-brand-text mt-2">
                    ${dailyEarnings.toFixed(2)}
                  </div>
                  <div className="text-[11px] text-slate-500 dark:text-brand-muted mt-1">
                    Based on $1.00 / 1K views
                  </div>
                </div>

                {/* Monthly Income (Highlighted) */}
                <div className="p-5 rounded-2xl bg-gradient-to-br from-blue-500/10 via-brand-primary/5 to-transparent dark:from-brand-primary/20 dark:via-[#161F36] dark:to-[#0D121F] border-2 border-brand-primary/40 text-left relative overflow-hidden">
                  <div className="absolute top-2.5 right-2.5">
                    <span className="text-[10px] font-mono font-bold uppercase bg-brand-primary text-white px-2 py-0.5 rounded-full">
                      Estimated
                    </span>
                  </div>
                  <div className="text-xs font-bold uppercase tracking-wider text-brand-primary">
                    Monthly Earnings
                  </div>
                  <div className="text-3xl sm:text-4xl font-display font-extrabold text-brand-primary dark:text-brand-glow mt-2">
                    ${monthlyEarnings.toFixed(2)}
                  </div>
                  <div className="text-[11px] text-slate-600 dark:text-brand-muted mt-1">
                    30 days of consistent views
                  </div>
                </div>

                {/* Yearly Income */}
                <div className="p-5 rounded-2xl bg-slate-50/80 dark:bg-[#0D121F]/80 border border-slate-200/80 dark:border-brand-border/70 text-left">
                  <div className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-brand-muted">
                    Yearly Earnings
                  </div>
                  <div className="text-3xl sm:text-4xl font-display font-extrabold text-slate-900 dark:text-brand-text mt-2">
                    ${yearlyEarnings.toFixed(2)}
                  </div>
                  <div className="text-[11px] text-slate-500 dark:text-brand-muted mt-1">
                    Full 12-month projected total
                  </div>
                </div>
              </div>

              {/* Guarantees Strip */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5 mt-6 pt-6 border-t border-slate-200/80 dark:border-brand-border/60">
                <div className="flex items-center gap-2.5 text-xs text-slate-700 dark:text-slate-200 font-medium">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                  <span>Fixed $1.00 / 1K Views</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs text-slate-700 dark:text-slate-200 font-medium">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                  <span>Low $5.00 Min Withdrawal</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs text-slate-700 dark:text-slate-200 font-medium">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                  <span>Daily 24h Payouts</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs text-slate-700 dark:text-slate-200 font-medium">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                  <span>0% Withdrawal Fee</span>
                </div>
              </div>

              {/* Supported Payout Partners Grid */}
              <div className="mt-8 pt-6 border-t border-slate-200/80 dark:border-brand-border/60">
                <div className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-brand-muted mb-4">
                  Supported Payout Methods:
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {payoutMethods.map((method, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded-xl bg-slate-50/90 dark:bg-[#0D121F]/90 border border-slate-200/80 dark:border-brand-border/60 flex items-center gap-3"
                    >
                      <div className="h-9 w-9 rounded-lg bg-white dark:bg-[#161F36] border border-slate-200 dark:border-brand-border flex items-center justify-center shrink-0">
                        {method.icon}
                      </div>
                      <div className="min-w-0">
                        <div className="text-xs font-bold text-slate-900 dark:text-brand-text truncate">
                          {method.name}
                        </div>
                        <div className="text-[10px] text-slate-500 dark:text-brand-muted truncate">
                          {method.desc}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom CTA Bar */}
              <div className="mt-8 pt-6 border-t border-slate-200/80 dark:border-brand-border/60 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-xs text-slate-600 dark:text-brand-muted text-center sm:text-left">
                  Ready to turn your views into real money? Create your creator account in seconds.
                </div>
                <Link href="/auth/sign-up">
                  <Button variant="primary" size="md" className="rounded-full shadow-md shadow-brand-primary/20 shrink-0">
                    <span>Start Earning Free</span>
                    <ArrowRight className="h-4 w-4 ml-1.5" />
                  </Button>
                </Link>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </Container>
    </section>
  );
}
