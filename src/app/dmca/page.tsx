import type { Metadata } from "next";
import { MarketingNavbar } from "@/components/marketing/navbar";
import { MarketingFooter } from "@/components/marketing/footer";
import { Container } from "@/components/ui/layout-primitives";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: "DMCA & Copyright Policy — Playxim",
  description: "Digital Millennium Copyright Act (DMCA) notice procedure and copyright infringement reporting for Playxim.",
};

export default function DmcaPage() {
  return (
    <div className="min-h-screen flex flex-col bg-brand-bg transition-colors duration-200">
      <MarketingNavbar />

      <main className="flex-1 py-16">
        <Container className="max-w-4xl mx-auto space-y-8">
          <div className="space-y-3 pb-6 border-b border-brand-border">
            <Badge variant="secondary">Copyright Protection</Badge>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-brand-text">
              DMCA & Copyright Notice
            </h1>
            <p className="text-xs text-brand-muted">
              Effective Date: October 8, 2026 • Domain: playxim.com
            </p>
          </div>

          <article className="prose dark:prose-invert max-w-none text-sm text-brand-muted leading-relaxed space-y-6">
            <section className="space-y-2">
              <h2 className="text-lg font-bold text-brand-text">1. Copyright Policy Overview</h2>
              <p>
                Playxim respects the intellectual property rights of creators and copyright holders. In accordance with the Digital Millennium
                Copyright Act (DMCA), 17 U.S.C. § 512, we respond promptly to notices of alleged copyright infringement.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-lg font-bold text-brand-text">2. Submitting an Infringement Notice</h2>
              <p>
                To file a copyright infringement notice, please send a written communication containing the following details to dmca@playxim.com:
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Identification of the copyrighted work claimed to have been infringed.</li>
                <li>The specific URL or share link (e.g. playxim.com/watch/:code) where the infringing material is located.</li>
                <li>Your contact information, including full name, address, telephone number, and email address.</li>
                <li>A statement of good faith belief that the use is not authorized by the copyright owner, agent, or the law.</li>
                <li>A physical or electronic signature of the authorized copyright owner or legal representative.</li>
              </ul>
            </section>

            <section className="space-y-2">
              <h2 className="text-lg font-bold text-brand-text">3. Counter-Notification Procedure</h2>
              <p>
                If you believe your content was disabled or removed by mistake or misidentification, you may submit a formal counter-notification
                under 17 U.S.C. § 512(g).
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-lg font-bold text-brand-text">4. Repeat Infringer Policy</h2>
              <p>
                Playxim maintains a strict repeat infringer policy. Accounts determined to repeatedly violate copyright ownership will be permanently terminated.
              </p>
            </section>
          </article>
        </Container>
      </main>

      <MarketingFooter />
    </div>
  );
}
