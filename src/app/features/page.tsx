import type { Metadata } from "next";
import {
  UploadCloud,
  Video,
  Share2,
  FolderTree,
  BarChart3,
  DollarSign,
  Smartphone,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";
import { MarketingNavbar } from "@/components/marketing/navbar";
import { MarketingFooter } from "@/components/marketing/footer";
import { CtaBanner } from "@/components/marketing/cta-banner";
import { Container } from "@/components/ui/layout-primitives";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: "Features — Playxim Creator Infrastructure",
  description:
    "Explore Playxim's creator platform features: unlimited file storage, video stream ingestion, folder hierarchies, instant share links, and analytics.",
};

const FEATURES_LIST = [
  {
    icon: <UploadCloud className="h-6 w-6 text-brand-primary" />,
    badge: "Storage Engine",
    title: "Upload Without Artificial Quotas",
    problem: "Traditional cloud storage services charge punitive fees for large video catalogs or throttle uploads.",
    solution: "Playxim provides an unlimited-by-policy creator storage architecture powered by Cloudflare R2 with chunked multipart uploads.",
    outcome: "Upload 100 GB+ archives and 4K masters with automatic pause, resume, and zero file compression.",
  },
  {
    icon: <Video className="h-6 w-6 text-brand-glow" />,
    badge: "Video Streaming",
    title: "Cloudflare Stream Video Pipeline",
    problem: "Raw video files delivered via basic HTTP result in endless buffering, high data consumption, and broken playback on mobile.",
    solution: "Automatic multi-bitrate HLS/DASH transcoding with global CDN caching across 300+ edge locations worldwide.",
    outcome: "Silky smooth video playback on web and direct handoff to future native mobile applications.",
  },
  {
    icon: <Share2 className="h-6 w-6 text-emerald-500" />,
    badge: "Sharing Control",
    title: "Instant Share Links & Access Rules",
    problem: "Sharing large files often forces your viewers through ad-cluttered landing pages or mandatory software installs.",
    solution: "One-click clean shareable links with optional passcode protection, expiration dates, and custom slugs.",
    outcome: "Your audience accesses files cleanly without popups, dark patterns, or forced registrations.",
  },
  {
    icon: <FolderTree className="h-6 w-6 text-indigo-500" />,
    badge: "Organization",
    title: "Folders & Curated Playlists",
    problem: "Flat file storage becomes chaotic once a creator uploads hundreds of assets and video episodes.",
    solution: "Deep nested folder hierarchies, bulk file operations, and sequential video playlists for episodic content.",
    outcome: "Keep project archives structured and group tutorials or series into streamable collections.",
  },
  {
    icon: <BarChart3 className="h-6 w-6 text-sky-500" />,
    badge: "Creator Analytics",
    title: "First-Party Audience Insights",
    problem: "Third-party tracking widgets leak viewer data and fail to provide actionable creator performance signals.",
    solution: "First-party analytics showing view counts, download statistics, completion rates, and bandwidth consumption.",
    outcome: "Understand which content drives true engagement with privacy-first aggregation.",
  },
  {
    icon: <DollarSign className="h-6 w-6 text-amber-500" />,
    badge: "Creator Economics",
    title: "Qualified View Monetization",
    problem: "Creators drive millions of views to generic storage hosts without seeing a dime of platform value.",
    solution: "Built-in double-entry ledger that attributes revenue to creators based on qualified mobile video views.",
    outcome: "Turn your media distribution into an ongoing, predictable revenue channel.",
  },
  {
    icon: <Smartphone className="h-6 w-6 text-violet-500" />,
    badge: "Cross-Platform",
    title: "Built for the Future App Ecosystem",
    problem: "Web-only file hosts fail to capture the high engagement of dedicated mobile streaming experiences.",
    solution: "Architected from day one as a multi-client platform with unified REST APIs ready for native Flutter apps.",
    outcome: "Publish once on Playxim Web, stream seamlessly to Android, iOS, Windows, and Linux consumers.",
  },
  {
    icon: <ShieldCheck className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />,
    badge: "Security Baseline",
    title: "Enterprise Firestore Security Rules & Scanning",
    problem: "Unauthorized access, link scraping, and malware proliferation ruin creator reputation.",
    solution: "Granular Cloud Firestore Security Rules, presigned short-lived download tokens, and async malware analysis.",
    outcome: "Total peace of mind that private files remain private and audience downloads are safe.",
  },
];

export default function FeaturesPage() {
  return (
    <div className="min-h-screen flex flex-col bg-brand-bg transition-colors duration-200">
      <MarketingNavbar />

      <main className="flex-1">
        {/* Header */}
        <section className="py-24 border-b border-brand-border bg-gradient-to-b from-brand-bg to-brand-bg-soft/40 relative overflow-hidden">
          <div className="absolute inset-0 bg-grid-pattern opacity-30 pointer-events-none" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-brand-primary/10 blur-[130px] rounded-full pointer-events-none -z-10" />
          <Container className="text-center max-w-3xl mx-auto space-y-5 relative z-10">
            <Badge variant="default">Complete Platform Capabilities</Badge>
            <h1 className="text-4xl sm:text-5xl font-display font-extrabold tracking-tight text-brand-text">
              Features built for creator autonomy
            </h1>
            <p className="text-lg text-brand-muted leading-relaxed">
              Every system in Playxim is built with intention: eliminate file limits, deliver flawless video playback,
              and reward the creators who build audiences.
            </p>
          </Container>
        </section>

        {/* Feature Grid */}
        <section className="py-24 border-b border-brand-border">
          <Container>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {FEATURES_LIST.map((feat, idx) => (
                <div key={feat.title} className="p-1 rounded-[var(--radius-2xl)] bg-brand-surface/40 border border-brand-border/60 hover:border-brand-primary/30 transition-all duration-300">
                  <Card variant="interactive" className="p-8 space-y-6 h-full border-0 shadow-none">
                    <div className="flex items-center justify-between">
                      <div className="p-3 rounded-xl bg-brand-bg-soft border border-brand-border/60">
                        {feat.icon}
                      </div>
                      <Badge variant="secondary">{feat.badge}</Badge>
                    </div>

                    <div>
                      <h3 className="text-xl font-display font-bold text-brand-text">{feat.title}</h3>
                      <div className="mt-4 space-y-3 text-sm">
                        <div className="p-3 rounded-lg bg-red-500/5 border border-red-500/10 text-brand-muted">
                          <strong className="text-red-600 dark:text-red-400 font-semibold">The Problem: </strong>
                          {feat.problem}
                        </div>
                        <div className="p-3 rounded-lg bg-brand-primary/5 border border-brand-primary/10 text-brand-muted">
                          <strong className="text-brand-primary font-semibold">Playxim Solution: </strong>
                          {feat.solution}
                        </div>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-brand-border/60 flex items-center gap-2 text-xs text-emerald-600 dark:text-emerald-400 font-medium">
                      <CheckCircle2 className="h-4 w-4 shrink-0" />
                      <span>{feat.outcome}</span>
                    </div>
                  </Card>
                </div>
              ))}
            </div>
          </Container>
        </section>

        {/* CTA */}
        <CtaBanner
          title="Ready to experience modern creator storage?"
          subtitle="Start uploading unlimited files today without storage tiers or hidden fees."
        />
      </main>

      <MarketingFooter />
    </div>
  );
}
