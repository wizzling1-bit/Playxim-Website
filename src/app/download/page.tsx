import type { Metadata } from "next";
import {
  Smartphone,
  Laptop,
  CheckCircle2,
  Apple,
  Monitor,
} from "lucide-react";
import { MarketingNavbar } from "@/components/marketing/navbar";
import { MarketingFooter } from "@/components/marketing/footer";
import { CtaBanner } from "@/components/marketing/cta-banner";
import { Container } from "@/components/ui/layout-primitives";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Apps & Client Ecosystem — Playxim",
  description:
    "Discover the Playxim multi-client ecosystem: native consumer streaming apps for Android, iOS, Windows, and Linux built for zero-buffering playback.",
};

const PLATFORMS = [
  {
    name: "Android App",
    badge: "Beta Coming Soon",
    icon: <Smartphone className="h-8 w-8 text-emerald-500" />,
    desc: "Optimized for mobile & tablets with background audio, PIP mode, and offline caching.",
    features: ["Hardware HEVC/AV1 acceleration", "Offline storage vault", "Background audio playback"],
  },
  {
    name: "iOS & iPadOS",
    badge: "In Development",
    icon: <Apple className="h-8 w-8 text-brand-primary" />,
    desc: "Native SwiftUI & Flutter integration with AirPlay, Dynamic Island controls, and lock-screen widgets.",
    features: ["AirPlay 2 streaming support", "Picture in Picture", "Seamless iCloud keychain sync"],
  },
  {
    name: "Windows Desktop",
    badge: "Planned",
    icon: <Monitor className="h-8 w-8 text-sky-500" />,
    desc: "Lightweight native player with keyboard media shortcuts and high-bitrate audio passthrough.",
    features: ["Ultra-low CPU utilization", "Multi-monitor playback", "Global hotkey controls"],
  },
  {
    name: "Linux & macOS",
    badge: "Planned",
    icon: <Laptop className="h-8 w-8 text-amber-500" />,
    desc: "Universal desktop binaries with hardware acceleration for power users and developers.",
    features: ["Wayland & PipeWire support", "Metal rendering on Apple Silicon", "CLI automation bindings"],
  },
];

export default function DownloadPage() {
  return (
    <div className="min-h-screen flex flex-col bg-brand-bg transition-colors duration-200">
      <MarketingNavbar />

      <main className="flex-1">
        {/* Header */}
        <section className="py-20 border-b border-brand-border bg-gradient-to-b from-brand-bg to-brand-bg-soft/40">
          <Container className="text-center max-w-3xl mx-auto space-y-4">
            <Badge variant="default">Cross-Platform Media Engine</Badge>
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-brand-text">
              Consumer apps for seamless playback
            </h1>
            <p className="text-lg text-brand-muted leading-relaxed">
              While creators manage content from the web control plane, audiences experience high-fidelity
              streaming across native mobile and desktop clients built with Flutter.
            </p>
          </Container>
        </section>

        {/* Platforms Grid */}
        <section className="py-20 border-b border-brand-border">
          <Container>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {PLATFORMS.map((plat) => (
                <Card key={plat.name} variant="interactive" className="p-6 flex flex-col justify-between space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="p-3 rounded-xl bg-brand-bg-soft border border-brand-border">
                        {plat.icon}
                      </div>
                      <Badge variant="secondary">{plat.badge}</Badge>
                    </div>

                    <div>
                      <h3 className="text-lg font-bold text-brand-text">{plat.name}</h3>
                      <p className="text-xs text-brand-muted mt-2 leading-relaxed">
                        {plat.desc}
                      </p>
                    </div>

                    <div className="space-y-2 pt-2 border-t border-brand-border/60">
                      {plat.features.map((feat) => (
                        <div key={feat} className="flex items-center gap-2 text-xs text-brand-text">
                          <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Button variant="outline" size="sm" className="w-full justify-center">
                    Get Early Beta Notification
                  </Button>
                </Card>
              ))}
            </div>
          </Container>
        </section>

        {/* App Hand-off Architecture */}
        <section className="py-20 border-b border-brand-border bg-brand-bg-soft/30">
          <Container className="max-w-4xl mx-auto text-center space-y-6">
            <Badge variant="secondary">Universal Deep Linking</Badge>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-brand-text">
              One link, any device
            </h2>
            <p className="text-base text-brand-muted max-w-2xl mx-auto leading-relaxed">
              When a viewer clicks a Playxim link on mobile, our universal routing engine automatically
              opens the native player application if installed, or falls back to an instant web streaming experience.
            </p>

            <div className="p-6 rounded-[var(--radius-xl)] bg-brand-surface border border-brand-border text-left shadow-lg max-w-2xl mx-auto space-y-3 font-mono text-xs">
              <div className="text-brand-muted">{"// Universal Handoff Contract"}</div>
              <div className="text-brand-primary">GET /watch/:shareCode</div>
              <div className="pl-4 text-brand-text">
                ↳ Detect Client Device Context<br />
                ↳ If Playxim App installed: <span className="text-emerald-500">playxim://stream/:contentId</span><br />
                ↳ Fallback: <span className="text-sky-500">Adaptive Web Player with HLS Stream</span>
              </div>
            </div>
          </Container>
        </section>

        {/* CTA */}
        <CtaBanner
          title="Start uploading content today"
          subtitle="All media uploaded on the web will be immediately streamable across mobile client apps as they release."
        />
      </main>

      <MarketingFooter />
    </div>
  );
}
