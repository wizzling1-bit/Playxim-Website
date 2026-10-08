"use client";

import * as React from "react";
import Image from "next/image";
import {
  CheckCircle2,
  Share2,
  Play,
  Globe,
  FileVideo,
  Sparkles,
} from "lucide-react";
import { Container, SectionHeader } from "@/components/ui/layout-primitives";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export function CreatorProfileShowcase() {
  const [activeProfileTab, setActiveProfileTab] = React.useState<"videos" | "playlists" | "archives">("videos");

  return (
    <section className="py-24 sm:py-32 border-t border-brand-border/60 bg-brand-bg relative">
      <Container>
        <SectionHeader
          badge={<Badge variant="default">Creator Hub</Badge>}
          title="Build a home for everything you create."
          description="Give your audience and collaborators a dedicated profile page. Curate public collections, organize video playlists, and build your digital identity."
        />

        <div className="max-w-4xl mx-auto rounded-2xl p-1.5 bg-gradient-to-br from-brand-border/80 to-transparent border border-brand-border shadow-2xl">
          <div className="rounded-xl border border-brand-border bg-brand-surface overflow-hidden text-left">
            {/* Creator Banner */}
            <div className="h-32 sm:h-44 w-full bg-gradient-to-r from-brand-primary/30 via-brand-glow/20 to-purple-600/20 relative p-4 flex items-end justify-between border-b border-brand-border/60">
              <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-black/40 text-white backdrop-blur-md">
                playxim.com/c/alexrivera
              </span>
            </div>

            {/* Profile Info Row */}
            <div className="p-6 sm:p-8 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 -mt-14 sm:-mt-16">
                {/* Avatar & Details */}
                <div className="flex items-end gap-4">
                  <div className="relative h-20 w-20 sm:h-24 sm:w-24 rounded-2xl bg-brand-primary/10 border-4 border-brand-surface shadow-xl flex items-center justify-center font-bold text-2xl text-brand-primary">
                    AR
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-xl sm:text-2xl font-display font-bold text-brand-text">
                        Alex Rivera
                      </h3>
                      <CheckCircle2 className="h-4 w-4 text-brand-primary shrink-0" />
                    </div>
                    <div className="text-xs text-brand-muted font-mono">@alexrivera · VFX Artist & Director</div>
                  </div>
                </div>

                {/* Profile Stats & Share */}
                <div className="flex items-center gap-3">
                  <div className="text-right hidden sm:block">
                    <div className="text-sm font-bold text-brand-text">148.2K</div>
                    <div className="text-[11px] text-brand-muted">Total Audience Views</div>
                  </div>
                  <Button variant="secondary" size="sm" className="rounded-full text-xs gap-1.5 shadow-xs">
                    <Share2 className="h-3 w-3" />
                    <span>Share Hub</span>
                  </Button>
                </div>
              </div>

              {/* Bio & Social Links */}
              <div className="text-xs sm:text-sm text-brand-muted max-w-2xl leading-relaxed">
                Directing commercial visual effects and documentary cinematography. Publishing 4K master camera tests, LUT archives, and lossless audio sound effects libraries.
              </div>

              {/* Tabs */}
              <div className="flex items-center gap-2 border-b border-brand-border/60 pb-3 text-xs font-semibold">
                <button
                  type="button"
                  onClick={() => setActiveProfileTab("videos")}
                  className={`px-3 py-1.5 rounded-lg transition-all ${
                    activeProfileTab === "videos"
                      ? "bg-brand-primary/10 text-brand-primary font-bold"
                      : "text-brand-muted hover:text-brand-text"
                  }`}
                >
                  Public Releases (14)
                </button>
                <button
                  type="button"
                  onClick={() => setActiveProfileTab("playlists")}
                  className={`px-3 py-1.5 rounded-lg transition-all ${
                    activeProfileTab === "playlists"
                      ? "bg-brand-primary/10 text-brand-primary font-bold"
                      : "text-brand-muted hover:text-brand-text"
                  }`}
                >
                  Playlists (3)
                </button>
                <button
                  type="button"
                  onClick={() => setActiveProfileTab("archives")}
                  className={`px-3 py-1.5 rounded-lg transition-all ${
                    activeProfileTab === "archives"
                      ? "bg-brand-primary/10 text-brand-primary font-bold"
                      : "text-brand-muted hover:text-brand-text"
                  }`}
                >
                  Raw Asset Packs (8)
                </button>
              </div>

              {/* Featured Showcase Reel Item */}
              <div className="p-4 rounded-xl bg-brand-bg-soft/70 border border-brand-border flex items-center justify-between gap-4">
                <div className="flex items-center gap-3.5 min-w-0">
                  <div className="h-12 w-12 rounded-lg bg-brand-primary/10 text-brand-primary flex items-center justify-center shrink-0">
                    <Play className="h-5 w-5 fill-current ml-0.5" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs sm:text-sm font-bold text-brand-text truncate">
                      Tokyo_Nightlife_4K_ProRes_ColorGrade.mp4
                    </div>
                    <div className="text-xs text-brand-muted font-mono">
                      4K Ultra HD · 2.25 GB · 74.2K Streams
                    </div>
                  </div>
                </div>

                <Button size="sm" variant="primary" className="h-8 text-xs rounded-lg shrink-0">
                  Watch Stream
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
