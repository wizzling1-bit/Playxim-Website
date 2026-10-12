import type { Metadata } from "next";
import { Check, ShieldCheck, Sparkles, Zap, Lock, ArrowRight } from "lucide-react";
import Link from "next/link";
import { MarketingNavbar } from "@/components/marketing/navbar";
import { MarketingFooter } from "@/components/marketing/footer";
import { FinalCtaSection } from "@/components/marketing/final-cta";
import { Container, SectionHeader } from "@/components/ui/layout-primitives";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

export const metadata: Metadata = {
  title: "Why Playxim — Built for Creators, Not Corporate Bureaucracy",
  description:
    "See how Playxim differs from generic cloud storage and ad-cluttered file hosts: unlimited creator storage policy, zero compression, and native video monetization.",
};

const COMPARISON_ROWS = [
  {
    feature: "Storage Policy for Creators",
    playxim: "Unlimited by policy (No 15GB paywall)",
    genericDrives: "Hard caps (15GB–2TB paid tiers)",
    fileHosts: "Time-expiring / link purge",
  },
  {
    feature: "Video Streaming Delivery",
    playxim: "Adaptive HLS/DASH (Cloudflare Stream)",
    genericDrives: "Basic HTTP download / throttled",
    fileHosts: "Terrible 480p recompression",
  },
  {
    feature: "Audience Download Experience",
    playxim: "Clean, direct, instant, 0 ads",
    genericDrives: "Requires viewer Google/Dropbox login",
    fileHosts: "Aggressive ads, countdowns, captcha",
  },
  {
    feature: "Creator Monetization",
    playxim: "Flat $1.00 per 1,000 views daily payouts",
    genericDrives: "None ($0 for creator)",
    fileHosts: "Shady CPMs, blocked payouts",
  },
  {
    feature: "Minimum Cashout Threshold",
    playxim: "$5.00 via UPI, Bank, PayPal, Crypto",
    genericDrives: "N/A",
    fileHosts: "$50–$100 high threshold",
  },
  {
    feature: "Egress / Bandwidth Fees",
    playxim: "Zero bandwidth cost to creator",
    genericDrives: "Daily bandwidth rate limits",
    fileHosts: "Artificially capped download speeds",
  },
  {
    feature: "Cross-Platform App Native Handoff",
    playxim: "Deep links into native Flutter apps",
    genericDrives: "Generic web view",
    fileHosts: "Cluttered ad web wrappers",
  },
];

export default function WhyPlayximPage() {
  return (
    <div className="min-h-screen flex flex-col bg-brand-bg transition-colors duration-200">
      <MarketingNavbar />

      <main className="flex-1">
        {/* Header Hero */}
        <section className="py-20 sm:py-28 border-b border-brand-border bg-gradient-to-b from-brand-bg to-brand-bg-soft/40 relative overflow-hidden">
          <div className="absolute inset-0 bg-grid-pattern opacity-30 pointer-events-none" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[320px] bg-brand-primary/10 blur-[130px] rounded-full pointer-events-none -z-10" />
          
          <Container className="text-center max-w-3xl mx-auto space-y-5 relative z-10 px-4">
            <ScrollReveal duration={600} variant="subtle">
              <Badge variant="default" className="shadow-xs">The Creator Alternative</Badge>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-extrabold tracking-tight text-brand-text mt-3">
                Why creators are choosing Playxim
              </h1>
              <p className="text-base sm:text-lg text-brand-muted leading-relaxed max-w-2xl mx-auto mt-3">
                Traditional cloud storage was designed for corporate document archiving.
                Ad-heavy file hosts treat your audience like commodities. Playxim was engineered specifically to solve both.
              </p>
            </ScrollReveal>
          </Container>
        </section>

        {/* Feature Comparison Table */}
        <section className="py-20 sm:py-24 border-b border-brand-border">
          <Container className="max-w-5xl mx-auto px-4 sm:px-6">
            <ScrollReveal duration={700} variant="subtle">
              <SectionHeader
                badge={<Badge variant="secondary">Side-by-Side Analysis</Badge>}
                title="How Playxim compares"
                description="A clear breakdown of why Playxim is the superior choice for publishing and monetizing your media catalog."
              />

              <div className="double-bezel shadow-2xl p-1.5 sm:p-2 rounded-[2rem] bg-brand-surface/40 border border-brand-border mt-8">
                <div className="overflow-x-auto rounded-[calc(2rem-6px)] border border-brand-border bg-brand-surface">
                  <table className="w-full text-left text-xs sm:text-sm">
                    <thead>
                      <tr className="border-b border-brand-border bg-brand-bg-soft/70">
                        <th className="p-4 sm:p-5 font-display font-semibold text-brand-text">Core Capability</th>
                        <th className="p-4 sm:p-5 font-display font-bold text-brand-primary bg-brand-primary/5">
                          Playxim
                        </th>
                        <th className="p-4 sm:p-5 font-display font-semibold text-brand-muted">
                          Standard Cloud Drives
                        </th>
                        <th className="p-4 sm:p-5 font-display font-semibold text-brand-muted">
                          Generic File Hosts
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-brand-border/60">
                      {COMPARISON_ROWS.map((row) => (
                        <tr key={row.feature} className="hover:bg-brand-bg-soft/30 transition-colors">
                          <td className="p-4 sm:p-5 font-medium text-brand-text">
                            {row.feature}
                          </td>
                          <td className="p-4 sm:p-5 font-semibold text-brand-primary bg-brand-primary/5 flex items-center gap-1.5">
                            <Check className="h-4 w-4 text-emerald-500 shrink-0" />
                            <span>{row.playxim}</span>
                          </td>
                          <td className="p-4 sm:p-5 text-brand-muted">
                            {row.genericDrives}
                          </td>
                          <td className="p-4 sm:p-5 text-brand-muted">
                            {row.fileHosts}
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

        {/* 3 Core Philosophical Tenets */}
        <section className="py-20 sm:py-24 border-b border-brand-border bg-brand-bg-soft/30">
          <Container className="px-4 sm:px-6">
            <ScrollReveal duration={700} variant="subtle">
              <SectionHeader
                badge={<Badge variant="premium">Our Philosophy</Badge>}
                title="Three principles we never compromise on"
                description="The architectural guarantees that guide every product decision at Playxim."
              />

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mt-10">
                {/* Tenet 1 */}
                <div className="double-bezel p-1.5 rounded-2xl bg-brand-surface/40 border border-brand-border hover:border-brand-primary/40 transition-all duration-300">
                  <Card className="p-7 space-y-4 rounded-[calc(1rem-4px)] border-0 shadow-none bg-brand-surface h-full flex flex-col justify-between">
                    <div className="space-y-4">
                      <div className="h-10 w-10 rounded-xl bg-brand-primary/10 text-brand-primary flex items-center justify-center font-bold font-mono">
                        01
                      </div>
                      <h3 className="text-lg font-display font-bold text-brand-text">No Dark Patterns for Audiences</h3>
                      <p className="text-sm text-brand-muted leading-relaxed">
                        When you share a Playxim link, your community receives the file immediately.
                        We never subject your followers to deceptive countdown timers, captcha walls, or popunder ads.
                      </p>
                    </div>
                    <div className="pt-4 border-t border-brand-border/40 flex items-center gap-2 text-xs font-semibold text-emerald-500">
                      <ShieldCheck className="h-4 w-4" />
                      <span>Zero Ad Clutter Guarantee</span>
                    </div>
                  </Card>
                </div>

                {/* Tenet 2 */}
                <div className="double-bezel p-1.5 rounded-2xl bg-brand-surface/40 border border-brand-border hover:border-brand-glow/40 transition-all duration-300">
                  <Card className="p-7 space-y-4 rounded-[calc(1rem-4px)] border-0 shadow-none bg-brand-surface h-full flex flex-col justify-between">
                    <div className="space-y-4">
                      <div className="h-10 w-10 rounded-xl bg-brand-glow/10 text-brand-glow flex items-center justify-center font-bold font-mono">
                        02
                      </div>
                      <h3 className="text-lg font-display font-bold text-brand-text">Original Quality Preservation</h3>
                      <p className="text-sm text-brand-muted leading-relaxed">
                        We never recompress your uploaded zip files, project folders, or master video archives.
                        What you upload is bit-for-bit what your viewers download directly from Cloudflare R2 edge servers.
                      </p>
                    </div>
                    <div className="pt-4 border-t border-brand-border/40 flex items-center gap-2 text-xs font-semibold text-brand-primary">
                      <Zap className="h-4 w-4" />
                      <span>Bit-for-Bit Fidelity</span>
                    </div>
                  </Card>
                </div>

                {/* Tenet 3 */}
                <div className="double-bezel p-1.5 rounded-2xl bg-brand-surface/40 border border-brand-border hover:border-amber-500/40 transition-all duration-300">
                  <Card className="p-7 space-y-4 rounded-[calc(1rem-4px)] border-0 shadow-none bg-brand-surface h-full flex flex-col justify-between">
                    <div className="space-y-4">
                      <div className="h-10 w-10 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center font-bold font-mono">
                        03
                      </div>
                      <h3 className="text-lg font-display font-bold text-brand-text">Sovereign Creator Revenue</h3>
                      <p className="text-sm text-brand-muted leading-relaxed">
                        You bring the audience, you share in the upside. Every qualified view in our
                        streaming network is credited directly to your creator balance at flat $1.00 per 1,000 views.
                      </p>
                    </div>
                    <div className="pt-4 border-t border-brand-border/40 flex items-center gap-2 text-xs font-semibold text-amber-500">
                      <Sparkles className="h-4 w-4" />
                      <span>$5.00 Instant Cashout</span>
                    </div>
                  </Card>
                </div>
              </div>
            </ScrollReveal>
          </Container>
        </section>

        {/* Final CTA */}
        <FinalCtaSection />
      </main>

      <MarketingFooter />
    </div>
  );
}
