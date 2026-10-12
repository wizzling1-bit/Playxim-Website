import type { Metadata } from "next";
import {
  Smartphone,
  Laptop,
  CheckCircle2,
  Apple,
  Monitor,
  Download,
  ExternalLink,
  Sparkles,
} from "lucide-react";
import { MarketingNavbar } from "@/components/marketing/navbar";
import { MarketingFooter } from "@/components/marketing/footer";
import { FinalCtaSection } from "@/components/marketing/final-cta";
import { Container } from "@/components/ui/layout-primitives";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

export const metadata: Metadata = {
  title: "Download Playxim Apps — Android, iOS & Desktop Ecosystem",
  description:
    "Download official Playxim apps for Android, iOS, Windows, and Linux. Buffer-free 4K video playback, offline storage, and instant cloud sharing.",
};

const PLATFORMS = [
  {
    name: "Android Mobile App",
    badge: "Live on Play Store",
    isLive: true,
    href: "https://play.google.com/store/apps/details?id=com.playxim.app&pcampaignid=web_share",
    icon: <Smartphone className="h-8 w-8 text-emerald-500" />,
    desc: "Official Play Store release. Buffer-free 1080p/4K streaming, background audio, PIP mode, and direct offline downloads.",
    features: ["Hardware HEVC/AV1 acceleration", "Offline storage vault", "Background audio playback", "Zero ad popups"],
    cta: "Download on Google Play",
  },
  {
    name: "iOS & iPadOS",
    badge: "In Development",
    isLive: false,
    icon: <Apple className="h-8 w-8 text-brand-primary" />,
    desc: "Native SwiftUI & Flutter integration with AirPlay, Dynamic Island controls, and lock-screen widgets.",
    features: ["AirPlay 2 streaming support", "Picture in Picture", "Seamless iCloud keychain sync", "Haptic player controls"],
    cta: "Get Early Notification",
  },
  {
    name: "Windows Desktop",
    badge: "Planned",
    isLive: false,
    icon: <Monitor className="h-8 w-8 text-sky-500" />,
    desc: "Lightweight native player with keyboard media shortcuts and high-bitrate audio passthrough.",
    features: ["Ultra-low CPU utilization", "Multi-monitor playback", "Global hotkey controls", "Direct folder sync"],
    cta: "Join Waitlist",
  },
  {
    name: "Linux & macOS",
    badge: "Planned",
    isLive: false,
    icon: <Laptop className="h-8 w-8 text-amber-500" />,
    desc: "Universal desktop binaries with hardware acceleration for power users, creators, and developers.",
    features: ["Wayland & PipeWire support", "Metal rendering on Apple Silicon", "CLI automation bindings", "Headless downloader"],
    cta: "Join Waitlist",
  },
];

export default function DownloadPage() {
  return (
    <div className="min-h-screen flex flex-col bg-transparent text-brand-text selection:bg-brand-primary selection:text-white transition-colors duration-300">
      <MarketingNavbar />

      <main className="flex-1">
        {/* Header Hero */}
        <section className="py-20 sm:py-28 border-b border-brand-border bg-gradient-to-b from-brand-bg to-brand-bg-soft/40 relative overflow-hidden">
          <div className="absolute inset-0 bg-grid-pattern opacity-30 pointer-events-none -z-20" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[350px] bg-brand-primary/12 blur-[130px] rounded-full pointer-events-none -z-10" />

          <Container className="text-center max-w-4xl mx-auto space-y-6 relative z-10 px-4">
            <ScrollReveal duration={600} variant="subtle">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-brand-surface/90 border border-brand-border shadow-xs backdrop-blur-md text-brand-primary">
                <Sparkles className="h-3.5 w-3.5 text-brand-primary" />
                <span className="font-mono uppercase text-[11px] font-bold">
                  Official Android App Now Live on Google Play
                </span>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={100} duration={700} variant="perspective">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-extrabold tracking-tight text-brand-text leading-[1.08]">
                Stream & Download Faster on Any Screen
              </h1>
            </ScrollReveal>

            <ScrollReveal delay={180} duration={700} variant="subtle">
              <p className="text-base sm:text-xl text-brand-text-secondary max-w-2xl mx-auto leading-relaxed">
                While creators manage and monetize content via our web dashboard, audiences experience high-fidelity,
                buffer-free streaming across native mobile and desktop clients.
              </p>
            </ScrollReveal>
          </Container>
        </section>

        {/* Platforms Grid */}
        <section className="py-20 sm:py-28 border-b border-brand-border">
          <Container className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {PLATFORMS.map((plat, idx) => (
                <ScrollReveal key={plat.name} delay={idx * 80} duration={650} variant="perspective">
                  <div
                    className={`double-bezel h-full flex flex-col justify-between transition-all duration-300 group hover:-translate-y-1.5 ${
                      plat.isLive
                        ? "shadow-xl shadow-brand-primary/10 border-brand-primary/40 ring-1 ring-brand-primary/20"
                        : "shadow-md hover:shadow-lg"
                    }`}
                  >
                    <div className="p-6 sm:p-7 rounded-[calc(var(--radius-2xl)-6px)] bg-brand-surface border border-brand-border flex flex-col justify-between h-full space-y-6">
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="p-3 rounded-2xl bg-brand-bg-soft border border-brand-border group-hover:scale-105 transition-transform">
                            {plat.icon}
                          </div>
                          <Badge variant={plat.isLive ? "default" : "secondary"} className="text-[11px] font-semibold">
                            {plat.badge}
                          </Badge>
                        </div>

                        <div>
                          <h3 className="text-lg font-display font-extrabold text-brand-text tracking-tight">
                            {plat.name}
                          </h3>
                          <p className="text-xs text-brand-muted mt-2 leading-relaxed">
                            {plat.desc}
                          </p>
                        </div>

                        <div className="space-y-2 pt-2 border-t border-brand-border/60">
                          {plat.features.map((feat) => (
                            <div key={feat} className="flex items-center gap-2 text-xs text-brand-text font-medium">
                              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
                              <span>{feat}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="pt-2">
                        {plat.isLive ? (
                          <a
                            href={plat.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block"
                          >
                            <Button
                              variant="primary"
                              size="md"
                              className="w-full justify-center rounded-full shadow-md shadow-brand-primary/25 hover:scale-[1.02] active:scale-[0.98] transition-all"
                            >
                              <span>{plat.cta}</span>
                              <ExternalLink className="h-3.5 w-3.5 ml-1.5" />
                            </Button>
                          </a>
                        ) : (
                          <Button
                            variant="secondary"
                            size="md"
                            disabled
                            className="w-full justify-center rounded-full bg-brand-bg-soft text-brand-muted opacity-80 cursor-not-allowed text-xs"
                          >
                            {plat.cta}
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </Container>
        </section>

        {/* App Hand-off Architecture */}
        <section className="py-20 sm:py-28 border-b border-brand-border bg-brand-bg-soft/20">
          <Container className="max-w-4xl mx-auto text-center space-y-6 px-4">
            <ScrollReveal duration={600} variant="subtle">
              <Badge variant="default">Universal Deep Linking</Badge>
              <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-display font-extrabold tracking-tight text-brand-text leading-tight mt-3">
                One Link, Any Device
              </h2>
              <p className="text-base sm:text-lg text-brand-text-secondary max-w-2xl mx-auto leading-relaxed mt-2">
                When a viewer clicks a Playxim link on mobile, our universal routing engine automatically
                opens the native player application if installed, or falls back to an instant buffer-free web streaming experience.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={150} duration={700} variant="perspective">
              <div className="double-bezel max-w-2xl mx-auto shadow-2xl mt-8">
                <div className="p-6 sm:p-8 rounded-[calc(var(--radius-2xl)-6px)] bg-brand-surface border border-brand-border text-left space-y-3 font-mono text-xs">
                  <div className="text-brand-muted">{"// Universal Handoff Contract"}</div>
                  <div className="text-brand-primary font-bold">GET /watch/:shareCode</div>
                  <div className="pl-4 text-brand-text space-y-1.5">
                    <div>↳ Detect Client Device Context</div>
                    <div>
                      ↳ If Playxim App installed:{" "}
                      <span className="text-emerald-500 font-semibold">playxim://stream/:contentId</span>
                    </div>
                    <div>
                      ↳ Fallback:{" "}
                      <span className="text-sky-500 font-semibold">Adaptive Web Player with HLS Stream</span>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </Container>
        </section>

        {/* Cohesive Final CTA Section */}
        <FinalCtaSection />
      </main>

      <MarketingFooter />
    </div>
  );
}
