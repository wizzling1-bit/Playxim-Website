import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  ShieldCheck,
  UserCheck,
  Palette,
  CheckCircle2,
  UploadCloud,
  Share2,
  Users,
  DollarSign,
  Sparkles,
} from "lucide-react";
import { MarketingNavbar } from "@/components/marketing/navbar";
import { MarketingFooter } from "@/components/marketing/footer";
import { FinalCtaSection } from "@/components/marketing/final-cta";
import { Container, SectionHeader } from "@/components/ui/layout-primitives";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

export const metadata: Metadata = {
  title: "Creator Program & Monetization — Playxim",
  description:
    "Join the Playxim Creator Program. Learn how view qualification works, customize your creator brand, and monetize video views directly.",
};

const STEPS = [
  {
    num: "01",
    icon: UploadCloud,
    title: "Upload Master Files",
    description: "Drop 4K videos or archives into your dashboard. They are packaged into adaptive streams or chunked R2 storage.",
  },
  {
    num: "02",
    icon: Share2,
    title: "Customize Links",
    description: "Add optional passwords, generate branded shortlinks, and arrange media files into sequential playlists.",
  },
  {
    num: "03",
    icon: Users,
    title: "Distribute to Fans",
    description: "Post links on YouTube, Telegram, Discord, or X. Viewers stream cleanly with zero dark patterns or popunder ads.",
  },
  {
    num: "04",
    icon: DollarSign,
    title: "Earn & Withdraw",
    description: "Qualified views credit your balance daily at $1.00/1K views. Instant cashout from just $5.00 via UPI, Bank, or Crypto.",
  },
];

export default function CreatorPage() {
  return (
    <div className="min-h-screen flex flex-col bg-brand-bg transition-colors duration-200">
      <MarketingNavbar />

      <main className="flex-1">
        {/* Header Hero */}
        <section className="py-20 sm:py-28 border-b border-brand-border bg-gradient-to-b from-brand-bg to-brand-bg-soft/40 relative overflow-hidden">
          <div className="absolute inset-0 bg-grid-pattern opacity-30 pointer-events-none" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[320px] bg-brand-primary/10 blur-[130px] rounded-full pointer-events-none -z-10" />
          
          <Container className="text-center max-w-3xl mx-auto space-y-6 relative z-10 px-4">
            <ScrollReveal duration={600} variant="subtle">
              <Badge variant="premium" className="shadow-xs">Playxim Creator Program</Badge>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-extrabold tracking-tight text-brand-text mt-3">
                The platform that pays you for your reach
              </h1>
              <p className="text-base sm:text-lg text-brand-muted leading-relaxed max-w-2xl mx-auto mt-3">
                Stop uploading master files to services that charge you for your audience.
                Playxim equips you with unlimited cloud storage and guarantees $1.00 per 1,000 qualified video views.
              </p>
              <div className="pt-4 flex justify-center">
                <Link href="/auth/sign-up">
                  <Button
                    size="lg"
                    variant="primary"
                    className="h-12 px-7 text-sm font-semibold rounded-full group shadow-xl shadow-brand-primary/25 hover:scale-[1.02] active:scale-[0.98] transition-all"
                  >
                    <span>Create Creator Account Free</span>
                    <ArrowRight className="h-4 w-4 ml-2 transition-transform duration-200 group-hover:translate-x-1" />
                  </Button>
                </Link>
              </div>
            </ScrollReveal>
          </Container>
        </section>

        {/* 4-Step Creator Loop */}
        <section className="py-20 sm:py-24 border-b border-brand-border">
          <Container className="px-4 sm:px-6">
            <ScrollReveal duration={700} variant="subtle">
              <SectionHeader
                badge={<Badge variant="secondary">Step-by-Step</Badge>}
                title="How the creator workflow operates"
                description="A streamlined process designed to take minutes, not hours."
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
                {STEPS.map((step) => {
                  const Icon = step.icon;
                  return (
                    <div
                      key={step.num}
                      className="double-bezel p-1.5 rounded-2xl bg-brand-surface/40 border border-brand-border hover:border-brand-primary/40 transition-all duration-300"
                    >
                      <Card className="p-6 space-y-4 rounded-[calc(1rem-4px)] border-0 shadow-none bg-brand-surface h-full flex flex-col justify-between">
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <div className="h-9 w-9 rounded-xl bg-brand-primary/10 text-brand-primary font-bold text-xs flex items-center justify-center font-mono">
                              {step.num}
                            </div>
                            <div className="p-2 rounded-lg bg-brand-bg-soft text-brand-muted">
                              <Icon className="h-4 w-4 text-brand-primary" />
                            </div>
                          </div>
                          <h3 className="text-base font-display font-bold text-brand-text">{step.title}</h3>
                          <p className="text-xs text-brand-muted leading-relaxed">
                            {step.description}
                          </p>
                        </div>
                      </Card>
                    </div>
                  );
                })}
              </div>
            </ScrollReveal>
          </Container>
        </section>

        {/* View Qualification Model */}
        <section id="monetization" className="py-20 sm:py-24 border-b border-brand-border bg-brand-bg-soft/30">
          <Container className="max-w-4xl mx-auto px-4 sm:px-6">
            <ScrollReveal duration={700} variant="subtle">
              <SectionHeader
                badge={<Badge variant="default">Transparency Baseline</Badge>}
                title="What counts as a qualified view?"
                description="To protect the integrity of creator payouts and prevent ad-fraud, Playxim uses a strict verification formula."
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mt-10">
                <div className="double-bezel p-1.5 rounded-2xl bg-brand-surface/40 border border-brand-border hover:border-emerald-500/40 transition-all duration-300">
                  <Card className="p-6 sm:p-7 space-y-4 rounded-[calc(1rem-4px)] border-0 shadow-none bg-brand-surface h-full">
                    <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-semibold text-sm">
                      <CheckCircle2 className="h-4 w-4" />
                      <span>Eligible View Criteria</span>
                    </div>
                    <ul className="space-y-3 text-xs text-brand-muted">
                      <li className="flex items-start gap-2.5">
                        <span className="text-emerald-500 font-bold">•</span>
                        <span>Continuous playback of at least 30 seconds or 50% of content.</span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <span className="text-emerald-500 font-bold">•</span>
                        <span>Streamed through verified Playxim web player or native mobile app.</span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <span className="text-emerald-500 font-bold">•</span>
                        <span>Genuine viewer session with active audio/interaction state.</span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <span className="text-emerald-500 font-bold">•</span>
                        <span>Unique IP/viewer session token per 24-hour window per content item.</span>
                      </li>
                    </ul>
                  </Card>
                </div>

                <div className="double-bezel p-1.5 rounded-2xl bg-brand-surface/40 border border-brand-border hover:border-amber-500/40 transition-all duration-300">
                  <Card className="p-6 sm:p-7 space-y-4 rounded-[calc(1rem-4px)] border-0 shadow-none bg-brand-surface h-full">
                    <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400 font-semibold text-sm">
                      <ShieldCheck className="h-4 w-4" />
                      <span>Fraud & Abuse Prevention</span>
                    </div>
                    <ul className="space-y-3 text-xs text-brand-muted">
                      <li className="flex items-start gap-2.5">
                        <span className="text-amber-500 font-bold">•</span>
                        <span>Automated bot-traffic filtering and datacenter IP stripping.</span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <span className="text-amber-500 font-bold">•</span>
                        <span>Duplicate loop detection: rapid sequential refreshing is excluded.</span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <span className="text-amber-500 font-bold">•</span>
                        <span>Audit ledger: every balance credit is tied to verifiable session hash.</span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <span className="text-amber-500 font-bold">•</span>
                        <span>Zero clawbacks on legitimate creator traffic. Daily payouts from $5.00.</span>
                      </li>
                    </ul>
                  </Card>
                </div>
              </div>
            </ScrollReveal>
          </Container>
        </section>

        {/* Creator Branding & Identity */}
        <section className="py-20 sm:py-24 border-b border-brand-border">
          <Container className="px-4 sm:px-6">
            <ScrollReveal duration={700} variant="subtle">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 items-center">
                <div className="space-y-6">
                  <Badge variant="secondary">Branding Sovereignty</Badge>
                  <h2 className="text-3xl sm:text-4xl font-display font-extrabold tracking-tight text-brand-text">
                    Your identity, your domain
                  </h2>
                  <p className="text-base text-brand-muted leading-relaxed">
                    Every creator receives a personal profile handle like <code className="text-brand-primary font-mono bg-brand-primary/10 px-1.5 py-0.5 rounded">playxim.com/c/@yourname</code>.
                    Upload custom avatars, banner artwork, social links, and public video collections to turn your link drops into an owned destination.
                  </p>

                  <div className="grid grid-cols-2 gap-4 text-xs">
                    <div className="p-4 rounded-2xl bg-brand-surface border border-brand-border shadow-xs">
                      <Palette className="h-4 w-4 text-brand-primary mb-1.5" />
                      <div className="font-semibold text-brand-text">Custom Themes</div>
                      <div className="text-brand-muted mt-0.5">Brand colors on public watch pages</div>
                    </div>
                    <div className="p-4 rounded-2xl bg-brand-surface border border-brand-border shadow-xs">
                      <UserCheck className="h-4 w-4 text-emerald-500 mb-1.5" />
                      <div className="font-semibold text-brand-text">Verified Badges</div>
                      <div className="text-brand-muted mt-0.5">Trust indicators for your community</div>
                    </div>
                  </div>
                </div>

                {/* Profile card preview */}
                <div className="double-bezel shadow-2xl p-1.5 rounded-[2rem] bg-brand-surface/40 border border-brand-border">
                  <div className="p-6 sm:p-8 rounded-[calc(2rem-6px)] bg-brand-surface border border-brand-border space-y-5">
                    <div className="flex items-center gap-4">
                      <div className="h-16 w-16 rounded-2xl bg-gradient-to-tr from-brand-primary to-brand-glow flex items-center justify-center text-white font-bold text-xl shadow-md font-mono">
                        PK
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-display font-bold text-lg text-brand-text">PixelKraft Studio</h4>
                          <Badge variant="default" className="text-[10px]">Verified Creator</Badge>
                        </div>
                        <p className="text-xs text-brand-primary font-mono mt-0.5">@pixelkraft</p>
                        <p className="text-xs text-brand-muted mt-1">4K VFX Assets, Blender Presets & Color LUTs</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-3 pt-4 border-t border-brand-border text-center text-xs">
                      <div className="p-3 rounded-xl bg-brand-bg-soft">
                        <div className="font-bold text-brand-text font-mono text-sm">142</div>
                        <div className="text-brand-muted text-[11px] mt-0.5">Uploads</div>
                      </div>
                      <div className="p-3 rounded-xl bg-brand-bg-soft">
                        <div className="font-bold text-brand-text font-mono text-sm">1.2M</div>
                        <div className="text-brand-muted text-[11px] mt-0.5">Views</div>
                      </div>
                      <div className="p-3 rounded-xl bg-brand-bg-soft">
                        <div className="font-bold text-brand-text font-mono text-sm">38.4 GB</div>
                        <div className="text-brand-muted text-[11px] mt-0.5">Storage</div>
                      </div>
                    </div>
                  </div>
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
