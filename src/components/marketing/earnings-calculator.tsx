"use client";

import * as React from "react";
import Link from "next/link";
import {
  DollarSign,
  TrendingUp,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CreditCard,
  Building2,
  CheckCircle2,
  Coins,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container, SectionHeader } from "@/components/ui/layout-primitives";
import { Badge } from "@/components/ui/badge";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

// Smooth number animation hook that interpolates from current value to new target (never counts from 0)
function useSmoothNumber(target: number, duration: number = 280): number {
  const [displayValue, setDisplayValue] = React.useState(target);
  const startValRef = React.useRef(target);
  const targetValRef = React.useRef(target);
  const startTimeRef = React.useRef(0);

  React.useEffect(() => {
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDisplayValue(target);
      return;
    }

    startValRef.current = displayValue;
    targetValRef.current = target;
    startTimeRef.current = performance.now();

    let frameId: number;
    const update = (now: number) => {
      const elapsed = now - startTimeRef.current;
      const progress = Math.min(1, elapsed / duration);
      // Quad ease-out for immediate responsiveness and gentle deceleration
      const eased = 1 - (1 - progress) * (1 - progress);
      const nextVal = startValRef.current + (targetValRef.current - startValRef.current) * eased;
      setDisplayValue(nextVal);

      if (progress < 1) {
        frameId = requestAnimationFrame(update);
      } else {
        setDisplayValue(targetValRef.current);
      }
    };

    frameId = requestAnimationFrame(update);
    return () => cancelAnimationFrame(frameId);
  }, [target, duration]);

  return displayValue;
}

export function EarningsCalculatorSection() {
  const [dailyViews, setDailyViews] = React.useState<number>(20000);

  // Rate: $1.00 per 1,000 views
  const ratePer1k = 1.0;
  const targetDailyEarnings = (dailyViews / 1000) * ratePer1k;
  const targetMonthlyEarnings = targetDailyEarnings * 30;
  const targetYearlyEarnings = targetMonthlyEarnings * 12;

  // Smoothly interpolated values for physical, continuous response
  const animDaily = useSmoothNumber(targetDailyEarnings);
  const animMonthly = useSmoothNumber(targetMonthlyEarnings);
  const animYearly = useSmoothNumber(targetYearlyEarnings);

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
      icon: <Building2 className="h-5 w-5 text-brand-primary" />,
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

  const sliderPercent = ((dailyViews - 1000) / (150000 - 1000)) * 100;
  const cardRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let rafId: number;
    let ticking = false;

    const updateTilt = () => {
      const el = cardRef.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const totalDist = windowHeight + rect.height;
      const currentDist = windowHeight - rect.top;
      const p = Math.min(1, Math.max(0, currentDist / totalDist));
      // Settle between p = 0.2 and p = 0.65
      const settleProgress = Math.min(1, Math.max(0, (p - 0.2) / 0.45));

      const rotX = (1 - settleProgress) * 2.8;
      const ty = (1 - settleProgress) * 16;
      const scale = 0.985 + settleProgress * 0.015;

      el.style.transform = `perspective(1200px) rotateX(${rotX.toFixed(2)}deg) translate3d(0, ${ty.toFixed(1)}px, 0) scale(${scale.toFixed(3)})`;
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        rafId = requestAnimationFrame(() => {
          updateTilt();
          ticking = false;
        });
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    const lenis = (window as any).lenis;
    if (lenis && typeof lenis.on === "function") {
      lenis.on("scroll", onScroll);
    }
    updateTilt();

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (lenis && typeof lenis.off === "function") {
        lenis.off("scroll", onScroll);
      }
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <section id="earnings-calculator" className="py-20 sm:py-28 border-t border-brand-border bg-gradient-to-b from-transparent via-brand-bg-soft/20 to-transparent relative">
      <Container className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
        <ScrollReveal duration={600} variant="subtle">
          <SectionHeader
            badge={<Badge variant="default">Earnings Calculator</Badge>}
            title="Calculate Your Daily & Monthly Income"
            description="Slide to estimate your earnings. We pay a flat $1.00 for every 1,000 views. No watch-hour locks, no deductions, and cash out starting at just $5."
          />
        </ScrollReveal>

        <div className="max-w-5xl mx-auto mt-12 sm:mt-16 relative">
          {/* Subtle Ambient Backlight Aura */}
          <div className="absolute inset-6 bg-gradient-to-r from-brand-primary/10 via-amber-500/10 to-brand-secondary/10 blur-3xl rounded-3xl pointer-events-none -z-10" />

          <ScrollReveal delay={100} duration={700} variant="scale">
            <div
              ref={cardRef}
              className="rounded-3xl p-6 sm:p-10 lg:p-12 border border-brand-border bg-brand-surface shadow-xl text-left transition-[background-color,border-color] duration-300 will-change-transform"
            >
              {/* Slider Control Header */}
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <label htmlFor="views-slider" className="text-sm sm:text-base font-bold text-brand-text">
                    Select Your Expected Daily Views:
                  </label>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-primary/10 text-brand-primary border border-brand-primary/20 text-sm font-mono font-bold self-start sm:self-auto">
                    <TrendingUp className="h-4 w-4" />
                    <span>{dailyViews.toLocaleString()} views / day</span>
                  </div>
                </div>

                {/* Range Slider with Active Fill Track */}
                <div className="py-4">
                  <div className="relative flex items-center">
                    <input
                      id="views-slider"
                      type="range"
                      min={1000}
                      max={150000}
                      step={1000}
                      value={dailyViews}
                      onChange={(e) => setDailyViews(Number(e.target.value))}
                      className="w-full h-2.5 rounded-lg appearance-none cursor-pointer bg-slate-200 dark:bg-slate-800 accent-brand-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary/50"
                      style={{
                        background: `linear-gradient(to right, #1E6BFF 0%, #1E6BFF ${sliderPercent}%, var(--border) ${sliderPercent}%, var(--border) 100%)`,
                      }}
                      aria-label="Daily views range"
                    />
                  </div>
                  <div className="flex justify-between text-xs text-brand-muted mt-2 font-mono">
                    <span>1,000 views</span>
                    <span>50,000 views</span>
                    <span>100,000 views</span>
                    <span>150,000+ views</span>
                  </div>
                </div>

                {/* Quick Presets */}
                <div className="flex flex-wrap items-center gap-2 pt-1">
                  <span className="text-xs font-semibold text-brand-muted mr-1">
                    Quick Presets:
                  </span>
                  {presets.map((preset) => (
                    <button
                      key={preset.value}
                      type="button"
                      onClick={() => setDailyViews(preset.value)}
                      className={`px-3 py-1 rounded-lg text-xs font-mono font-semibold transition-all active:scale-95 cursor-pointer ${
                        dailyViews === preset.value
                          ? "bg-brand-primary text-white shadow-xs"
                          : "bg-brand-bg-soft text-brand-text hover:bg-brand-border/60"
                      }`}
                    >
                      {preset.label} views
                    </button>
                  ))}
                </div>
              </div>

              {/* Earnings Result Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8 pt-8 border-t border-brand-border">
                {/* Daily Income */}
                <div className="p-5 rounded-2xl bg-brand-bg-soft/60 border border-brand-border text-left transition-colors">
                  <div className="text-xs font-bold uppercase tracking-wider text-brand-muted">
                    Daily Earnings
                  </div>
                  <div className="text-3xl sm:text-4xl font-display font-extrabold text-brand-text mt-2 font-mono">
                    ${animDaily.toFixed(2)}
                  </div>
                  <div className="text-[11px] text-brand-muted mt-1 font-mono">
                    Based on $1.00 / 1K views
                  </div>
                </div>

                {/* Monthly Income (Highlighted with Gold Accent) */}
                <div className="p-5 rounded-2xl bg-gradient-to-br from-brand-primary/10 via-brand-surface to-brand-primary/5 dark:from-brand-surface-2 dark:to-brand-surface border-2 border-brand-primary/40 text-left relative overflow-hidden shadow-md shadow-brand-primary/5">
                  <div className="absolute top-2.5 right-2.5">
                    <span className="text-[10px] font-mono font-bold uppercase bg-brand-primary text-white px-2 py-0.5 rounded-full">
                      Estimated
                    </span>
                  </div>
                  <div className="text-xs font-bold uppercase tracking-wider text-brand-primary">
                    Monthly Earnings
                  </div>
                  <div className="text-3xl sm:text-4xl font-display font-extrabold text-brand-primary dark:text-brand-secondary mt-2 font-mono">
                    ${animMonthly.toFixed(2)}
                  </div>
                  <div className="text-[11px] text-brand-muted mt-1">
                    30 days of consistent views
                  </div>
                </div>

                {/* Yearly Income (Gold Accent Emphasis) */}
                <div className="p-5 rounded-2xl bg-brand-bg-soft/60 border border-brand-border text-left transition-colors">
                  <div className="text-xs font-bold uppercase tracking-wider text-brand-muted">
                    Yearly Earnings
                  </div>
                  <div className="text-3xl sm:text-4xl font-display font-extrabold text-amber-600 dark:text-brand-accent mt-2 font-mono">
                    ${animYearly.toFixed(2)}
                  </div>
                  <div className="text-[11px] text-brand-muted mt-1">
                    Full 12-month projected total
                  </div>
                </div>
              </div>

              {/* Guarantees Strip */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5 mt-6 pt-6 border-t border-brand-border">
                <div className="flex items-center gap-2.5 text-xs text-brand-text font-medium">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                  <span>Fixed $1.00 / 1K Views</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs text-brand-text font-medium">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                  <span>Low $5.00 Min Withdrawal</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs text-brand-text font-medium">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                  <span>Daily 24h Payouts</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs text-brand-text font-medium">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                  <span>0% Withdrawal Fee</span>
                </div>
              </div>

              {/* Supported Payout Partners Grid */}
              <div className="mt-8 pt-6 border-t border-brand-border">
                <div className="text-xs font-bold uppercase tracking-wider text-brand-muted mb-4">
                  Supported Payout Methods:
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {payoutMethods.map((method, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded-xl bg-brand-bg-soft border border-brand-border flex items-center gap-3 transition-colors hover:border-brand-primary/40 group"
                    >
                      <div className="h-9 w-9 rounded-lg bg-brand-surface border border-brand-border flex items-center justify-center shrink-0 transition-transform group-hover:scale-105">
                        {method.icon}
                      </div>
                      <div className="min-w-0">
                        <div className="text-xs font-bold text-brand-text truncate">
                          {method.name}
                        </div>
                        <div className="text-[10px] text-brand-muted truncate font-mono">
                          {method.desc}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom CTA Bar */}
              <div className="mt-8 pt-6 border-t border-brand-border flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-xs text-brand-muted text-center sm:text-left">
                  Ready to turn your views into real money? Create your creator account in seconds.
                </div>
                <Link href="/auth/sign-up">
                  <Button variant="primary" size="md" className="rounded-full shadow-md shadow-brand-primary/20 shrink-0 hover:scale-[1.02] active:scale-[0.98] transition-all">
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

export default EarningsCalculatorSection;
