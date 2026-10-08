import type { Metadata } from "next";
import Link from "next/link";
import { Check, ArrowRight, ShieldCheck } from "lucide-react";
import { MarketingNavbar } from "@/components/marketing/navbar";
import { MarketingFooter } from "@/components/marketing/footer";
import { CtaBanner } from "@/components/marketing/cta-banner";
import { Container } from "@/components/ui/layout-primitives";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Pricing & Fair Storage Policy — Playxim",
  description:
    "Playxim's transparent creator pricing: $0 to start with unlimited-by-policy storage, full video stream ingestion, analytics, and creator monetization.",
};

const PLAN_FEATURES = [
  "Unlimited-by-policy file & video storage",
  "High-speed S3-compatible multipart uploads",
  "Cloudflare Stream 1080p / 4K video transcoding",
  "Clean instant share links with 0 ads",
  "Password-protected & expiring link controls",
  "Full creator dashboard & folder management",
  "First-party audience views & analytics",
  "Qualified view monetization & daily balance ledger",
  "Fast CDN downloads with zero egress costs for fans",
  "Cross-platform app integration support",
];

export default function PricingPage() {
  return (
    <div className="min-h-screen flex flex-col bg-brand-bg transition-colors duration-200">
      <MarketingNavbar />

      <main className="flex-1">
        {/* Header */}
        <section className="py-20 border-b border-brand-border bg-gradient-to-b from-brand-bg to-brand-bg-soft/40">
          <Container className="text-center max-w-3xl mx-auto space-y-4">
            <Badge variant="default">100% Creator-Centric</Badge>
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-brand-text">
              Simple, transparent, zero upfront cost
            </h1>
            <p className="text-lg text-brand-muted leading-relaxed">
              We believe creators should never be taxed for producing great content.
              Our core infrastructure is completely free to use—we only succeed when your content thrives.
            </p>
          </Container>
        </section>

        {/* Pricing Card Section */}
        <section className="py-20 border-b border-brand-border">
          <Container className="max-w-xl mx-auto">
            <Card className="p-8 sm:p-10 border-2 border-brand-primary/40 bg-brand-surface shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-brand-primary text-white text-[11px] font-bold uppercase tracking-wider px-4 py-1 rounded-bl-xl shadow-sm">
                Active MVP Tier
              </div>

              <div className="space-y-4">
                <Badge variant="glow">Creator Plan</Badge>
                <div className="flex items-baseline gap-2">
                  <span className="text-5xl sm:text-6xl font-extrabold text-brand-text font-mono">
                    $0
                  </span>
                  <span className="text-brand-muted text-sm font-medium">/ forever</span>
                </div>
                <p className="text-sm text-brand-muted leading-relaxed">
                  Full creator access with unlimited-by-policy content storage, instant shortlinks,
                  video streaming ingestion, and real-time revenue earnings.
                </p>
              </div>

              <div className="mt-8 pt-6 border-t border-brand-border space-y-3">
                <div className="text-xs font-semibold text-brand-text uppercase tracking-wider mb-2">
                  What is included:
                </div>
                {PLAN_FEATURES.map((feat) => (
                  <div key={feat} className="flex items-start gap-2.5 text-sm text-brand-text">
                    <Check className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>

              <div className="mt-8 pt-6">
                <Link href="/auth/sign-up">
                  <Button size="lg" variant="primary" className="w-full justify-center shadow-lg shadow-brand-primary/25">
                    <span>Create Free Creator Account</span>
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
                <p className="text-center text-xs text-brand-muted mt-3">
                  No credit card required • Instant access
                </p>
              </div>
            </Card>

            {/* Fair Use Policy Clarification */}
            <div className="mt-12 p-6 rounded-[var(--radius-xl)] bg-brand-bg-soft/60 border border-brand-border space-y-3 text-xs text-brand-muted leading-relaxed">
              <div className="flex items-center gap-2 font-semibold text-brand-text text-sm">
                <ShieldCheck className="h-4 w-4 text-brand-primary" />
                <span>Fair Storage & Usage Policy</span>
              </div>
              <p>
                Our policy is designed for genuine content creators distributing media, tutorials, software archives,
                art assets, and video series. We do not place arbitrary 15 GB artificial caps.
              </p>
              <p>
                However, automated system abuse (such as botnet scrapers, copyrighted pirated cinema dumps, or illicit malware hosting)
                is strictly prohibited and subject to immediate account termination per our Terms of Service.
              </p>
            </div>
          </Container>
        </section>

        {/* CTA */}
        <CtaBanner
          title="Stop paying monthly subscriptions for disk space"
          subtitle="Get unlimited creator storage with direct video streaming payouts on Playxim."
        />
      </main>

      <MarketingFooter />
    </div>
  );
}
