import type { Metadata } from "next";
import { MarketingNavbar } from "@/components/marketing/navbar";
import { MarketingFooter } from "@/components/marketing/footer";
import { Container } from "@/components/ui/layout-primitives";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: "Privacy Policy — Playxim",
  description: "Playxim Privacy Policy explaining how we collect, store, and protect creator and audience data.",
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen flex flex-col bg-brand-bg transition-colors duration-200">
      <MarketingNavbar />

      <main className="flex-1 py-16">
        <Container className="max-w-4xl mx-auto space-y-8">
          <div className="space-y-3 pb-6 border-b border-brand-border">
            <Badge variant="secondary">Privacy & Data Governance</Badge>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-brand-text">
              Privacy Policy
            </h1>
            <p className="text-xs text-brand-muted">
              Effective Date: October 8, 2026 • Domain: playxim.com
            </p>
          </div>

          <article className="prose dark:prose-invert max-w-none text-sm text-brand-muted leading-relaxed space-y-6">
            <section className="space-y-2">
              <h2 className="text-lg font-bold text-brand-text">1. Overview & Principles</h2>
              <p>
                At Playxim, we believe creator platforms should be transparent and respectful of privacy. We do not sell your personal
                data or audience activity to third-party ad brokers or data aggregators.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-lg font-bold text-brand-text">2. Information We Collect</h2>
              <ul className="list-disc pl-5 space-y-1">
                <li><strong className="text-brand-text">Account Information:</strong> Email address, creator username, avatar, and hashed authentication tokens.</li>
                <li><strong className="text-brand-text">Content Metadata:</strong> File names, file sizes, MIME types, duration, and folder hierarchies.</li>
                <li><strong className="text-brand-text">Analytical Signals:</strong> View events, watch completion timestamps, and privacy-hashed IP tokens used exclusively to verify qualified views.</li>
              </ul>
            </section>

            <section className="space-y-2">
              <h2 className="text-lg font-bold text-brand-text">3. Audience Privacy on Share Links</h2>
              <p>
                When an audience member accesses a Playxim share link, they are not forced to register an account or accept third-party advertising cookies.
                Download and stream operations are logged with privacy-safe truncated network hashes to prevent abuse and calculate creator reach.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-lg font-bold text-brand-text">4. Data Storage & Security</h2>
              <p>
                Database records are maintained with strict user-isolation security policies in Cloud Firestore. File payloads are stored in encrypted
                Cloudflare R2 buckets, accessible only via signed short-lived presigned tokens.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-lg font-bold text-brand-text">5. Your Data Rights</h2>
              <p>
                You may request account deletion, data export, or content purging at any time through your account settings or by contacting privacy@playxim.com.
              </p>
            </section>
          </article>
        </Container>
      </main>

      <MarketingFooter />
    </div>
  );
}
