"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { useParams } from "next/navigation";
import {
  Download,
  Lock,
  Share2,
  Check,
  Smartphone,
  HardDrive,
  FileText,
  Archive,
  ArrowRight,
  ShieldCheck,
  Eye,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { WaveInput } from "@/components/ui/wave-input";
import { formatBytes } from "@/lib/utils";

interface SharedContent {
  id: string;
  name: string;
  type: string;
  sizeBytes: number;
  mimeType: string | null;
  streamPlaybackUrl?: string;
  downloadEnabled: boolean;
}

export default function WatchPage() {
  const params = useParams();
  const shareCode = params?.shareCode as string;

  const [loading, setLoading] = React.useState(true);
  const [requiresPassword, setRequiresPassword] = React.useState(false);
  const [passcode, setPasscode] = React.useState("");
  const [passcodeError, setPasscodeError] = React.useState<string | null>(null);
  const [content, setContent] = React.useState<SharedContent | null>(null);
  const [copied, setCopied] = React.useState(false);

  // Qualified view telemetry trigger
  const hasTriggeredQualifiedView = React.useRef(false);

  React.useEffect(() => {
    let ignore = false;
    async function load() {
      if (!shareCode) return;
      try {
        const res = await fetch(`/api/share/${shareCode}`);
        if (res.ok && !ignore) {
          const data = await res.json();
          if (data.requiresPassword) {
            setRequiresPassword(true);
          } else if (data.content) {
            setContent(data.content);
          }
        }
      } catch {
        // Handle error
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    }

    load();
    return () => {
      ignore = true;
    };
  }, [shareCode]);

  // Video qualified view tracking after 10 seconds of playback (§ Phase 11 & 12)
  const handleTimeUpdate = (e: React.SyntheticEvent<HTMLVideoElement>) => {
    const video = e.currentTarget;
    if (video.currentTime >= 10 && !hasTriggeredQualifiedView.current && content) {
      hasTriggeredQualifiedView.current = true;
      fetch("/api/events/view", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contentId: content.id,
          shareCode,
          watchSeconds: Math.floor(video.currentTime),
          eventType: "view_qualified",
        }),
      }).catch(() => {});
    }
  };

  const handleVerifyPasscode = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasscodeError(null);

    try {
      const res = await fetch(`/api/share/${shareCode}/verify`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: passcode }),
      });

      if (!res.ok) {
        setPasscodeError("Incorrect passcode. Please try again.");
        return;
      }

      const data = await res.json();
      setContent(data.content);
      setRequiresPassword(false);
    } catch {
      setPasscodeError("Failed to verify passcode.");
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-brand-bg flex items-center justify-center p-6">
        <div className="text-center space-y-3">
          <div className="h-8 w-8 border-2 border-brand-primary border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-xs text-brand-muted font-mono">Resolving edge playback stream...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-bg text-brand-text flex flex-col justify-between">
      {/* Top Header */}
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
            <Button
              variant="ghost"
              size="sm"
              onClick={handleCopyLink}
              className="text-xs text-brand-muted hover:text-brand-text"
            >
              {copied ? (
                <>
                  <Check className="h-3.5 w-3.5 text-emerald-500 mr-1" />
                  <span>Copied</span>
                </>
              ) : (
                <>
                  <Share2 className="h-3.5 w-3.5 mr-1" />
                  <span>Share</span>
                </>
              )}
            </Button>
            <Link href="/download">
              <Button variant="primary" size="sm" className="text-xs">
                <Smartphone className="h-3.5 w-3.5 mr-1" />
                <span>Open in App</span>
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Consumption Area */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-8">
        {/* Passcode Lock Challenge */}
        {requiresPassword ? (
          <div className="max-w-md mx-auto my-12 animate-in fade-in">
            <Card className="p-8 text-center space-y-6">
              <div className="h-16 w-16 rounded-2xl bg-brand-primary/10 text-brand-primary flex items-center justify-center mx-auto border border-brand-primary/20">
                <Lock className="h-8 w-8" />
              </div>

              <div className="space-y-1">
                <h2 className="text-xl font-bold text-brand-text">
                  Protected Shared File
                </h2>
                <p className="text-xs text-brand-muted">
                  The creator has secured this content with an access passcode.
                </p>
              </div>

              <form onSubmit={handleVerifyPasscode} className="space-y-6">
                <WaveInput
                  type="password"
                  label="Enter Access Passcode"
                  value={passcode}
                  onChange={(e) => setPasscode(e.target.value)}
                  autoFocus
                  required
                  error={passcodeError}
                />

                <Button variant="primary" size="md" className="w-full">
                  Unlock Content
                </Button>
              </form>
            </Card>
          </div>
        ) : content ? (
          <div className="space-y-8">
            {/* Player or File Showcase */}
            {content.type === "video" ? (
              <div className="space-y-4">
                <div className="relative aspect-video w-full rounded-[var(--radius-2xl)] overflow-hidden bg-black border border-brand-border shadow-2xl">
                  <video
                    src={content.streamPlaybackUrl}
                    controls
                    autoPlay={false}
                    onTimeUpdate={handleTimeUpdate}
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>
            ) : (
              <Card className="p-12 text-center max-w-2xl mx-auto space-y-6 border-dashed">
                <div className="h-20 w-20 rounded-2xl bg-brand-primary/10 text-brand-primary flex items-center justify-center mx-auto border border-brand-primary/20">
                  {content.type === "archive" ? (
                    <Archive className="h-10 w-10" />
                  ) : content.type === "document" ? (
                    <FileText className="h-10 w-10" />
                  ) : (
                    <HardDrive className="h-10 w-10" />
                  )}
                </div>

                <div className="space-y-2">
                  <h1 className="text-2xl font-bold text-brand-text">{content.name}</h1>
                  <p className="text-xs text-brand-muted font-mono">
                    {formatBytes(content.sizeBytes)} • Verified Cloudflare R2 Object
                  </p>
                </div>

                {content.downloadEnabled && (
                  <div className="pt-2">
                    <a
                      href={`/api/download/${shareCode}`}
                      className="inline-block"
                      download
                    >
                      <Button variant="primary" size="lg" className="shadow-lg shadow-brand-primary/20">
                        <Download className="h-4 w-4 mr-2" />
                        Download Asset ({formatBytes(content.sizeBytes)})
                      </Button>
                    </a>
                  </div>
                )}
              </Card>
            )}

            {/* Media Metadata & Action Strip */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-6 rounded-[var(--radius-xl)] bg-brand-surface border border-brand-border">
              <div className="space-y-1">
                <div className="flex items-center gap-2.5">
                  <h1 className="text-xl font-bold text-brand-text truncate max-w-lg">
                    {content.name}
                  </h1>
                  <Badge variant="glow" className="capitalize text-[10px]">
                    {content.type}
                  </Badge>
                </div>
                <div className="flex items-center gap-4 text-xs text-brand-muted font-mono">
                  <span>{formatBytes(content.sizeBytes)}</span>
                  <span>•</span>
                  <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400">
                    <ShieldCheck className="h-3.5 w-3.5" />
                    Malware Free
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Eye className="h-3.5 w-3.5" />
                    Stream Ready
                  </span>
                </div>
              </div>

              {content.downloadEnabled && content.type === "video" && (
                <a href={`/api/download/${shareCode}`} download>
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-1.5" />
                    Download File
                  </Button>
                </a>
              )}
            </div>

            {/* Flutter Consumer App Handoff Banner (§ 7.10) */}
            <div className="p-6 rounded-[var(--radius-xl)] bg-gradient-to-r from-brand-primary/10 via-brand-surface to-brand-glow/10 border border-brand-primary/20 flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-2xl bg-brand-primary text-white flex items-center justify-center shrink-0 shadow-md">
                  <Smartphone className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-brand-text">
                    Experience Playxim on Mobile & Tablet
                  </h4>
                  <p className="text-xs text-brand-muted mt-0.5">
                    Stream in 4K HDR, download for offline flights, and support creators with verified views.
                  </p>
                </div>
              </div>

              <Link href="/download" className="shrink-0">
                <Button variant="primary" size="sm" className="group">
                  <span>Get Free App</span>
                  <ArrowRight className="h-3.5 w-3.5 ml-1.5 group-hover:translate-x-0.5 transition-transform" />
                </Button>
              </Link>
            </div>
          </div>
        ) : (
          <Card className="p-16 text-center max-w-lg mx-auto space-y-4">
            <h2 className="text-xl font-bold text-brand-text">Content Unavailable</h2>
            <p className="text-xs text-brand-muted">
              The link you requested may have been revoked or removed by the creator.
            </p>
            <Link href="/">
              <Button variant="outline" size="sm">Return Home</Button>
            </Link>
          </Card>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-brand-border/60 py-6 text-center text-xs text-brand-muted">
        <div className="flex items-center justify-center gap-6">
          <Link href="/terms" className="hover:text-brand-text">Terms</Link>
          <Link href="/privacy" className="hover:text-brand-text">Privacy</Link>
          <Link href="/dmca" className="hover:text-brand-text">DMCA Policy</Link>
          <Link href="/creator" className="hover:text-brand-text">Host Your Media</Link>
        </div>
      </footer>
    </div>
  );
}
