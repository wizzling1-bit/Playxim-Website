import type { Metadata } from "next";
import { MarketingNavbar } from "@/components/marketing/navbar";
import { MarketingFooter } from "@/components/marketing/footer";
import { Container } from "@/components/ui/layout-primitives";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: "Creator Agreement & Monetization Policy — Playxim",
  description: "Terms and rules governing Playxim Creator monetization, qualified view accounting, and payout schedules.",
};

export default function CreatorAgreementPage() {
  return (
    <div className="min-h-screen flex flex-col bg-transparent transition-colors duration-200">
      <MarketingNavbar />

      <main className="flex-1 py-16">
        <Container className="max-w-4xl mx-auto space-y-8">
          <div className="space-y-3 pb-6 border-b border-brand-border">
            <Badge variant="premium">Creator Earnings Terms</Badge>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-brand-text">
              Creator Agreement
            </h1>
            <p className="text-xs text-brand-muted">
              Effective Date: October 8, 2026 • Domain: playxim.com
            </p>
          </div>

          <article className="prose dark:prose-invert max-w-none text-sm text-brand-muted leading-relaxed space-y-6">
            <section className="space-y-2">
              <h2 className="text-lg font-bold text-brand-text">1. Scope of Agreement</h2>
              <p>
                This Creator Agreement supplements the standard Playxim Terms of Service and governs participation in the Playxim Creator Program,
                including view monetization, ad revenue sharing, and payout disbursements.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-lg font-bold text-brand-text">2. Qualified View Accounting</h2>
              <p>
                Revenue is attributed strictly to qualified video views. A view is defined as qualified when a verified consumer streams at least
                30 continuous seconds or 50% of content duration on supported Playxim client applications.
              </p>
              <p>
                The platform reserves the right to audit and invalidate views resulting from artificial automated bot traffic, rapid loop scripts,
                or proxy manipulation.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-lg font-bold text-brand-text">3. Rates & Ledger Attribution</h2>
              <p>
                Current effective CPM (cost per mille / thousand views) rates are displayed transparently inside the Creator Dashboard.
                All credits, pending balances, and confirmed payouts are recorded into an immutable double-entry ledger.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-lg font-bold text-brand-text">4. Payouts & Thresholds</h2>
              <p>
                Creators can request disbursements once their available balance reaches $25.00 USD. Payout processing takes 3–5 business days
                subject to compliance review and tax form verification.
              </p>
            </section>
          </article>
        </Container>
      </main>

      <MarketingFooter />
    </div>
  );
}
