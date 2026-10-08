import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Send,
  Video,
  Globe,
  HardDrive,
  Eye,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { type FileCardData } from "@/components/ui/file-card";

interface CreatorPageProps {
  params: Promise<{ username: string }>;
}

export default async function CreatorPublicProfilePage({ params }: CreatorPageProps) {
  const { username } = await params;
  const cleanUsername = username.replace(/^@/, "");

  // Creator profile details
  const profile = {
    displayName: cleanUsername.charAt(0).toUpperCase() + cleanUsername.slice(1) + " Studio",
    username: cleanUsername,
    bio: "Cinematic 4K VFX Assets, sound design packs, and episodic filmmaking masterclasses hosted on Playxim.",
    verified: true,
    totalStorage: "4.8 TB Hosted",
    totalViews: "1.4M Qualified Streams",
    socialLinks: [
      { platform: "youtube", url: `https://youtube.com/@${cleanUsername}`, label: "YouTube" },
      { platform: "telegram", url: `https://t.me/${cleanUsername}`, label: "Telegram Channel" },
      { platform: "x", url: `https://x.com/${cleanUsername}`, label: "X / Twitter" },
    ],
  };

  const showcaseItems: FileCardData[] = [
    {
      id: "sample-video-1",
      name: "Cyberpunk City Master 4K.mp4",
      type: "video",
      size: 4280000000,
      status: "ready",
      views: 142000,
      updatedAt: "2 days ago",
    },
    {
      id: "sample-video-2",
      name: "Camera Grading LUTs & B-Roll.mov",
      type: "video",
      size: 1820000000,
      status: "ready",
      views: 89000,
      updatedAt: "3 days ago",
    },
    {
      id: "sample-archive-1",
      name: "Playxim_Complete_Asset_Pack_v2.zip",
      type: "archive",
      size: 12400000000,
      status: "ready",
      views: 52000,
      updatedAt: "Last week",
    },
    {
      id: "sample-doc-1",
      name: "Creator_Sponsorship_Deck_2026.pdf",
      type: "other",
      size: 48000000,
      status: "ready",
      views: 12400,
      updatedAt: "2 weeks ago",
    },
  ];

  return (
    <div className="min-h-screen bg-brand-bg text-brand-text flex flex-col justify-between">
      {/* Navigation */}
      <header className="border-b border-brand-border/60 bg-brand-surface/80 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <Image
              src="/logo.webp"
              alt="Playxim"
              width={28}
              height={28}
              className="rounded-lg object-contain"
            />
            <span className="font-bold text-base tracking-tight text-brand-text">
              Playxim
            </span>
          </Link>

          <div className="flex items-center gap-3">
            <Link href="/auth/sign-up">
              <Button variant="outline" size="sm" className="text-xs">
                Become a Creator
              </Button>
            </Link>
            <Link href="/download">
              <Button variant="primary" size="sm" className="text-xs">
                Watch in App
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Main profile container */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-10 space-y-10">
        {/* Profile Hero Header */}
        <div className="p-8 sm:p-10 rounded-[var(--radius-2xl)] bg-gradient-to-b from-brand-surface via-brand-surface to-brand-bg-soft/40 border border-brand-border shadow-xl">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="flex items-center gap-5">
              <div className="h-20 w-20 rounded-2xl bg-gradient-to-tr from-brand-primary to-brand-glow text-white font-black text-3xl flex items-center justify-center shadow-lg shrink-0">
                {profile.displayName.charAt(0)}
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h1 className="text-2xl font-bold text-brand-text">
                    {profile.displayName}
                  </h1>
                  {profile.verified && (
                    <Badge variant="default" className="text-[10px]">
                      Verified Creator
                    </Badge>
                  )}
                </div>
                <div className="text-sm font-mono text-brand-primary">
                  @{profile.username}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 w-full md:w-auto">
              <Button variant="primary" size="md" className="w-full md:w-auto shadow-md">
                <Sparkles className="h-4 w-4 mr-2" />
                <span>Follow Creator</span>
              </Button>
            </div>
          </div>

          <p className="mt-6 text-sm text-brand-muted max-w-2xl leading-relaxed">
            {profile.bio}
          </p>

          {/* Social Links Bar */}
          <div className="mt-6 pt-6 border-t border-brand-border/60 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              {profile.socialLinks.map((s) => (
                <a
                  key={s.label}
                  href={s.url}
                  target="_blank"
                  rel="noreferrer"
                  className="px-3 py-1.5 rounded-[var(--radius-md)] bg-brand-surface border border-brand-border text-xs font-semibold text-brand-text hover:border-brand-primary/40 hover:text-brand-primary transition-colors flex items-center gap-1.5"
                >
                  {s.platform === "youtube" ? (
                    <Video className="h-3.5 w-3.5 text-red-500" />
                  ) : s.platform === "telegram" ? (
                    <Send className="h-3.5 w-3.5 text-sky-500" />
                  ) : (
                    <Globe className="h-3.5 w-3.5 text-brand-text" />
                  )}
                  <span>{s.label}</span>
                </a>
              ))}
            </div>

            <div className="flex items-center gap-4 text-xs font-mono text-brand-muted">
              <span className="flex items-center gap-1.5">
                <HardDrive className="h-3.5 w-3.5 text-brand-primary" />
                {profile.totalStorage}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                <Eye className="h-3.5 w-3.5 text-brand-glow" />
                {profile.totalViews}
              </span>
            </div>
          </div>
        </div>

        {/* Public Content Showcase */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-brand-text">
              Hosted Content Showcase ({showcaseItems.length})
            </h2>
            <span className="text-xs text-brand-muted font-mono">
              Direct Edge Playback Enabled
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
            {showcaseItems.map((item) => (
              <Card key={item.id} className="p-5 flex flex-col justify-between group">
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-3">
                    <Badge variant={item.type === "video" ? "glow" : "secondary"}>
                      {item.type}
                    </Badge>
                    <span className="text-xs text-brand-muted font-mono">
                      {item.views?.toLocaleString()} views
                    </span>
                  </div>

                  <h3 className="font-semibold text-base text-brand-text group-hover:text-brand-primary transition-colors">
                    {item.name}
                  </h3>
                </div>

                <div className="pt-4 mt-4 border-t border-brand-border/40 flex items-center justify-between">
                  <span className="text-xs text-brand-muted font-mono">
                    {(item.size / (1024 * 1024 * 1024)).toFixed(2)} GB
                  </span>

                  <Link href={`/watch/${item.id}`}>
                    <Button variant="primary" size="sm" className="text-xs">
                      <span>Stream Now</span>
                      <ArrowRight className="h-3.5 w-3.5 ml-1" />
                    </Button>
                  </Link>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-brand-border/60 py-6 text-center text-xs text-brand-muted">
        <div className="flex items-center justify-center gap-6">
          <Link href="/terms" className="hover:text-brand-text">Terms</Link>
          <Link href="/privacy" className="hover:text-brand-text">Privacy</Link>
          <Link href="/creator" className="hover:text-brand-text">Join as Creator</Link>
        </div>
      </footer>
    </div>
  );
}
