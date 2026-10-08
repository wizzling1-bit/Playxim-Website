import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  ShieldCheck,
  UserCheck,
  Palette,
  CheckCircle2,
} from "lucide-react";
import { MarketingNavbar } from "@/components/marketing/navbar";
import { MarketingFooter } from "@/components/marketing/footer";
import { CtaBanner } from "@/components/marketing/cta-banner";
import { Container, SectionHeader } from "@/components/ui/layout-primitives";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Creator Program & Monetization — Playxim",
  description:
    "Join the Playxim Creator Program. Learn how view qualification works, customize your creator brand, and monetize video views directly.",
};

export default function CreatorPage() {
  return (
    <div className="min-h-screen flex flex-col bg-brand-bg transition-colors duration-200">
      <MarketingNavbar />

      <main className="flex-1">
        {/* Header */}
        <section className="py-24 border-b border-brand-border bg-gradient-to-b from-brand-bg to-brand-bg-soft/40 relative overflow-hidden">
          <div className="absolute inset-0 bg-grid-pattern opacity-30 pointer-events-none" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-brand-primary/10 blur-[130px] rounded-full pointer-events-none -z-10" />
          <Container className="text-center max-w-3xl mx-auto space-y-5 relative z-10">
            <Badge variant="premium">Playxim Creator Program</Badge>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-extrabold tracking-tight text-brand-text">
              The platform that pays you for your reach
            </h1>
            <p className="text-lg text-brand-muted leading-relaxed">
              Stop uploading your master files to services that charge you for your audience.
              Playxim equips you with unlimited cloud storage and shares advertising revenue on every qualified video view.
            </p>
            <div className="pt-2">
              <Link href="/auth/sign-up">
                <Button size="pill-lg" variant="primary" className="group pl-7 pr-3 shadow-xl shadow-brand-primary/25 rounded-full">
                  <span>Create Your Creator Account</span>
                  <span className="h-8 w-8 rounded-full bg-white/20 dark:bg-white/10 flex items-center justify-center transition-transform duration-200 group-hover:translate-x-1">
                    <ArrowRight className="h-4 w-4" />
                  </span>
                </Button>
              </Link>
            </div>
          </Container>
        </section>

        {/* 4-Step Creator Loop */}
        <section className="py-24 border-b border-brand-border">
          <Container>
            <SectionHeader
              badge={<Badge variant="secondary">Step-by-Step</Badge>}
              title="How the creator workflow operates"
              description="A streamlined process designed to take minutes, not hours."
            />

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card className="p-6 space-y-3 relative hover:border-brand-primary/30 transition-all duration-300">
                <div className="h-9 w-9 rounded-full bg-brand-primary/10 text-brand-primary font-bold text-sm flex items-center justify-center font-mono">
                  1
                </div>
                <h3 className="text-base font-display font-bold text-brand-text">Upload Master Files</h3>
                <p className="text-xs text-brand-muted leading-relaxed">
                  Drop videos or archives into your dashboard. They are packaged into adaptive streams or chunked R2 storage.
                </p>
              </Card>

              <Card className="p-6 space-y-3 relative hover:border-brand-glow/30 transition-all duration-300">
                <div className="h-9 w-9 rounded-full bg-brand-glow/10 text-brand-glow font-bold text-sm flex items-center justify-center font-mono">
                  2
                </div>
                <h3 className="text-base font-display font-bold text-brand-text">Customize Links</h3>
                <p className="text-xs text-brand-muted leading-relaxed">
                  Add optional passwords, generate branded shortlinks, and arrange files into playlists.
                </p>
              </Card>

              <Card className="p-6 space-y-3 relative hover:border-amber-500/30 transition-all duration-300">
                <div className="h-9 w-9 rounded-full bg-amber-500/10 text-amber-500 font-bold text-sm flex items-center justify-center font-mono">
                  3
                </div>
                <h3 className="text-base font-display font-bold text-brand-text">Distribute to Fans</h3>
                <p className="text-xs text-brand-muted leading-relaxed">
                  Post links on your YouTube, Telegram, Discord, or X channels. Viewers stream with one tap.
                </p>
              </Card>

              <Card className="p-6 space-y-3 relative hover:border-emerald-500/30 transition-all duration-300">
                <div className="h-9 w-9 rounded-full bg-emerald-500/10 text-emerald-500 font-bold text-sm flex items-center justify-center font-mono">
                  4
                </div>
                <h3 className="text-base font-display font-bold text-brand-text">Earn & Withdraw</h3>
                <p className="text-xs text-brand-muted leading-relaxed">
                  Qualified views in consumer apps register on your ledger. Transfer earnings to your bank account or crypto wallet.
                </p>
              </Card>
            </div>
          </Container>
        </section>

        {/* View Qualification Model */}
        <section id="monetization" className="py-24 border-b border-brand-border bg-brand-bg-soft/30">
          <Container className="max-w-4xl mx-auto">
            <SectionHeader
              badge={<Badge variant="default">Transparency Baseline</Badge>}
              title="What counts as a qualified view?"
              description="To protect the integrity of creator payouts and prevent ad-fraud, Playxim uses a strict verification formula."
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="p-6 space-y-3 hover:border-emerald-500/30 transition-all">
                <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-semibold text-sm">
                  <CheckCircle2 className="h-4 w-4" />
                  <span>Eligible View Criteria</span>
                </div>
                <ul className="space-y-2 text-xs text-brand-muted">
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-500 font-bold">•</span>
                    <span>Continuous playback of at least 30 seconds or 50% of content.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-500 font-bold">•</span>
                    <span>Streamed through verified Playxim mobile or desktop player client.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-500 font-bold">•</span>
                    <span>Genuine viewer session with active audio/interaction state.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-500 font-bold">•</span>
                    <span>Unique IP/viewer token per 24-hour window per content item.</span>
                  </li>
                </ul>
              </Card>

              <Card className="p-6 space-y-3 hover:border-amber-500/30 transition-all">
                <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400 font-semibold text-sm">
                  <ShieldCheck className="h-4 w-4" />
                  <span>Fraud & Abuse Prevention</span>
                </div>
                <ul className="space-y-2 text-xs text-brand-muted">
                  <li className="flex items-start gap-2">
                    <span className="text-amber-500 font-bold">•</span>
                    <span>Automated bot-traffic filtering and datacenter IP stripping.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-500 font-bold">•</span>
                    <span>Duplicate loop detection: rapid sequential refreshing is excluded.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-500 font-bold">•</span>
                    <span>Audit ledger: every balance credit is tied to verifiable session hash.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-500 font-bold">•</span>
                    <span>Zero clawbacks on legitimate creator traffic.</span>
                  </li>
                </ul>
              </Card>
            </div>
          </Container>
        </section>

        {/* Creator Branding & Identity */}
        <section className="py-24 border-b border-brand-border">
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <Badge variant="secondary">Branding Sovereignty</Badge>
                <h2 className="text-3xl sm:text-4xl font-display font-bold tracking-tight text-brand-text">
                  Your identity, your domain
                </h2>
                <p className="text-base text-brand-muted leading-relaxed">
                  Every creator receives a personal profile handle like <code className="text-brand-primary font-mono">playxim.com/@yourname</code>.
                  Upload custom avatars, banner artwork, social links, and public video collections to turn your link drops into an owned destination.
                </p>

                <div className="grid grid-cols-2 gap-4 text-xs">
                  <div className="p-3.5 rounded-xl bg-brand-surface border border-brand-border shadow-sm">
                    <Palette className="h-4 w-4 text-brand-primary mb-1" />
                    <div className="font-semibold text-brand-text">Custom Themes</div>
                    <div className="text-brand-muted mt-0.5">Brand colors on public watch pages</div>
                  </div>
                  <div className="p-3.5 rounded-xl bg-brand-surface border border-brand-border shadow-sm">
                    <UserCheck className="h-4 w-4 text-emerald-500 mb-1" />
                    <div className="font-semibold text-brand-text">Verified Badges</div>
                    <div className="text-brand-muted mt-0.5">Trust indicators for your community</div>
                  </div>
                </div>
              </div>

              {/* Profile card preview */}
              <div className="double-bezel shadow-2xl">
                <div className="p-6 sm:p-7 rounded-[calc(var(--radius-2xl)-6px)] bg-brand-surface border border-brand-border space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="h-16 w-16 rounded-full bg-gradient-to-tr from-brand-primary to-brand-glow flex items-center justify-center text-white font-bold text-xl shadow-md font-mono">
                      PK
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <h4 className="font-display font-bold text-lg text-brand-text">PixelKraft Studio</h4>
                        <Badge variant="default" className="text-[10px]">Verified Creator</Badge>
                      </div>
                      <p className="text-xs text-brand-primary font-mono mt-0.5">@pixelkraft</p>
                      <p className="text-xs text-brand-muted mt-1">4K VFX Assets, Blender Presets & Color LUTs</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-2 pt-3 border-t border-brand-border text-center text-xs">
                    <div className="p-2.5 rounded-xl bg-brand-bg-soft">
                      <div className="font-bold text-brand-text font-mono">142</div>
                      <div className="text-brand-muted text-[11px]">Uploads</div>
                    </div>
                    <div className="p-2.5 rounded-xl bg-brand-bg-soft">
                      <div className="font-bold text-brand-text font-mono">1.2M</div>
                      <div className="text-brand-muted text-[11px]">Views</div>
                    </div>
                    <div className="p-2.5 rounded-xl bg-brand-bg-soft">
                      <div className="font-bold text-brand-text font-mono">38.4 GB</div>
                      <div className="text-brand-muted text-[11px]">Storage</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* CTA */}
        <CtaBanner
          title="Join the creator revolution on Playxim"
          subtitle="Unlimited storage. Clear monetization. No arbitrary account lockouts."
        />
      </main>

      <MarketingFooter />
    </div>
  );
}
