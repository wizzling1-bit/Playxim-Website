import type { Metadata } from "next";
import { MarketingNavbar } from "@/components/marketing/navbar";
import { MarketingFooter } from "@/components/marketing/footer";
import { Container } from "@/components/ui/layout-primitives";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: "Terms of Service — Playxim",
  description: "Terms of Service governing the use of Playxim cloud storage, file sharing, and video streaming services.",
};

export default function TermsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-transparent transition-colors duration-200">
      <MarketingNavbar />

      <main className="flex-1 py-16">
        <Container className="max-w-4xl mx-auto space-y-8">
          <div className="space-y-3 pb-6 border-b border-brand-border">
            <Badge variant="secondary">Legal Documentation</Badge>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-brand-text">
              Terms of Service
            </h1>
            <p className="text-xs text-brand-muted">
              Effective Date: October 8, 2026 • Domain: playxim.com
            </p>
          </div>

          <article className="prose dark:prose-invert max-w-none text-sm text-brand-muted leading-relaxed space-y-6">
            <section className="space-y-2">
              <h2 className="text-lg font-bold text-brand-text">1. Agreement to Terms</h2>
              <p>
                By creating an account, uploading files, generating share links, or accessing Playxim
                (&ldquo;Playxim&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;, or &ldquo;our&rdquo;), you agree to be bound by these Terms of Service.
                If you do not agree, you must discontinue use of the platform immediately.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-lg font-bold text-brand-text">2. Creator Accounts & Eligibility</h2>
              <p>
                To utilize creator features—including unlimited-by-policy uploads, folder hierarchies, and creator monetization—you
                must be at least 18 years old or the age of majority in your jurisdiction. You are responsible for safeguarding your login credentials.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-lg font-bold text-brand-text">3. Acceptable Use & Fair Storage Policy</h2>
              <p>
                Playxim provides generous, unlimited-by-policy storage for authentic content creators. However, you strictly agree NOT to upload:
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Viruses, worms, malware, trojans, ransomware, or malicious code.</li>
                <li>Content that infringes upon third-party intellectual property, copyrights, or trademarks.</li>
                <li>Unlawful, non-consensual, exploitative, or harassing material.</li>
                <li>Automated botnet storage buffers or illicit server mirrors disconnected from creator media distribution.</li>
              </ul>
              <p>
                Violation of acceptable use policies results in immediate content deletion and permanent termination of account access.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-lg font-bold text-brand-text">4. Content Ownership & Licenses</h2>
              <p>
                You retain complete, uncompromised intellectual ownership of all files and videos you upload. Playxim does not claim ownership
                over your creative assets. By uploading, you grant Playxim a limited, non-exclusive license solely to store, transcode (for video streaming),
                cache at global edge networks, and deliver your content in accordance with your chosen sharing settings.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-lg font-bold text-brand-text">5. Limitation of Liability</h2>
              <p>
                Playxim is provided &ldquo;as is&rdquo; without warranties of any kind. While our infrastructure utilizes enterprise multi-region replication
                via Cloudflare R2 and PostgreSQL backups, you are advised to maintain independent backups of critical master assets.
              </p>
            </section>
          </article>
        </Container>
      </main>

      <MarketingFooter />
    </div>
  );
}
