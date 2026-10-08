"use client";

import * as React from "react";
import {
  Search,
  Upload,
  FolderPlus,
  Filter,
  Grid,
  List,
  FileVideo,
  FileArchive,
  FileImage,
  FileCode,
  MoreVertical,
  Share2,
  HardDrive,
  Eye,
  TrendingUp,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container, SectionHeader } from "@/components/ui/layout-primitives";
import { Badge } from "@/components/ui/badge";

export function ProductStorySection() {
  const [activeTab, setActiveTab] = React.useState<"all" | "videos" | "archives" | "raw">("all");
  const [searchQuery, setSearchQuery] = React.useState("");

  const mockItems = [
    {
      name: "Iceland_Volcano_8K_Master_RAW.mp4",
      type: "video",
      size: "4.82 GB",
      views: "148,200",
      earnings: "$259.35",
      status: "Stream Ready",
      updated: "2 hours ago",
    },
    {
      name: "Cinematic_Glitch_Transitions_Pack.zip",
      type: "archive",
      size: "1.20 GB",
      views: "42,100",
      earnings: "$73.68",
      status: "Zero Egress",
      updated: "Yesterday",
    },
    {
      name: "Cyberpunk_Environment_UnrealEngine5.uproject",
      type: "raw",
      size: "14.6 GB",
      views: "18,900",
      earnings: "$33.08",
      status: "Encrypted",
      updated: "3 days ago",
    },
    {
      name: "Analog_Synth_Drum_Kits_Lossless_WAV.zip",
      type: "archives",
      size: "620 MB",
      views: "29,400",
      earnings: "$51.45",
      status: "Public",
      updated: "Last week",
    },
  ];

  return (
    <section className="py-24 sm:py-32 border-t border-brand-border/60 bg-brand-surface/40 relative">
      <Container>
        <SectionHeader
          badge={<Badge variant="default">Creator Command Center</Badge>}
          title="Everything you need to manage your content."
          description="A high-performance workspace engineered for creators handling terabytes. Upload massive archives, organize libraries, and track engagement with zero latency."
        />

        {/* Big Product Browser Showcase */}
        <div className="max-w-5xl mx-auto rounded-2xl border border-brand-border bg-brand-surface shadow-2xl overflow-hidden">
          {/* Top Window Navigation Bar */}
          <div className="h-12 px-4 border-b border-brand-border bg-brand-bg-soft/80 flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
                <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
              </div>
              <span className="text-xs font-semibold text-brand-text hidden sm:inline">
                Playxim Studio · Content Hub
              </span>
            </div>

            {/* Quick Upload CTA inside mock UI */}
            <div className="flex items-center gap-2">
              <Button size="sm" variant="secondary" className="h-8 text-xs rounded-lg gap-1.5">
                <FolderPlus className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">New Folder</span>
              </Button>
              <Button size="sm" variant="primary" className="h-8 text-xs rounded-lg gap-1.5 shadow-xs">
                <Upload className="h-3.5 w-3.5" />
                <span>Upload Files</span>
              </Button>
            </div>
          </div>

          {/* Subheader Filter & Search Bar */}
          <div className="p-4 sm:p-5 border-b border-brand-border/70 bg-brand-surface flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            {/* Filter Tabs */}
            <div className="flex items-center gap-1.5 p-1 rounded-xl bg-brand-bg-soft border border-brand-border/60 text-xs font-medium">
              <button
                type="button"
                onClick={() => setActiveTab("all")}
                className={`px-3 py-1 rounded-lg transition-all ${
                  activeTab === "all"
                    ? "bg-brand-surface text-brand-text font-semibold shadow-xs"
                    : "text-brand-muted hover:text-brand-text"
                }`}
              >
                All Files
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("videos")}
                className={`px-3 py-1 rounded-lg transition-all ${
                  activeTab === "videos"
                    ? "bg-brand-surface text-brand-text font-semibold shadow-xs"
                    : "text-brand-muted hover:text-brand-text"
                }`}
              >
                Videos
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("archives")}
                className={`px-3 py-1 rounded-lg transition-all ${
                  activeTab === "archives"
                    ? "bg-brand-surface text-brand-text font-semibold shadow-xs"
                    : "text-brand-muted hover:text-brand-text"
                }`}
              >
                Archives
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("raw")}
                className={`px-3 py-1 rounded-lg transition-all ${
                  activeTab === "raw"
                    ? "bg-brand-surface text-brand-text font-semibold shadow-xs"
                    : "text-brand-muted hover:text-brand-text"
                }`}
              >
                RAW & 3D
              </button>
            </div>

            {/* Instant Search input */}
            <div className="relative w-full sm:w-64">
              <Search className="h-3.5 w-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-brand-muted" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search 1,482 files..."
                className="w-full h-8 pl-8 pr-3 text-xs rounded-xl bg-brand-bg-soft border border-brand-border/80 text-brand-text placeholder:text-brand-muted focus:outline-none focus:border-brand-primary/50"
              />
            </div>
          </div>

          {/* Explorer Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-brand-bg-soft/40 border-b border-brand-border/60 text-brand-muted font-semibold uppercase tracking-wider">
                <tr>
                  <th className="py-3 px-4 sm:px-6">Name</th>
                  <th className="py-3 px-4 hidden md:table-cell">Size</th>
                  <th className="py-3 px-4">Views</th>
                  <th className="py-3 px-4 hidden sm:table-cell">Revenue</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-brand-border/40 font-medium">
                {mockItems.map((item, idx) => (
                  <tr
                    key={idx}
                    className="hover:bg-brand-bg-soft/50 transition-colors group cursor-pointer"
                  >
                    <td className="py-3.5 px-4 sm:px-6">
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-lg bg-brand-primary/10 text-brand-primary border border-brand-primary/20 flex items-center justify-center shrink-0">
                          {item.type === "video" ? (
                            <FileVideo className="h-4 w-4" />
                          ) : item.type === "archive" ? (
                            <FileArchive className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                          ) : (
                            <FileCode className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                          )}
                        </div>
                        <div className="min-w-0">
                          <div className="text-brand-text font-semibold truncate group-hover:text-brand-primary transition-colors">
                            {item.name}
                          </div>
                          <div className="text-[11px] text-brand-muted md:hidden">
                            {item.size} · {item.updated}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 hidden md:table-cell text-brand-muted font-mono">
                      {item.size}
                    </td>
                    <td className="py-3.5 px-4 text-brand-text font-mono">
                      <div className="flex items-center gap-1">
                        <Eye className="h-3 w-3 text-brand-muted" />
                        <span>{item.views}</span>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 hidden sm:table-cell text-amber-900 dark:text-amber-400 font-mono font-bold">
                      {item.earnings}
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200 dark:bg-emerald-500/15 dark:text-emerald-400">
                        {item.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-7 px-2 text-xs rounded-lg"
                          title="Copy Link"
                          aria-label={`Copy link for ${item.name}`}
                        >
                          <Share2 className="h-3.5 w-3.5" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-7 w-7 p-0 rounded-lg text-brand-muted"
                          aria-label={`More options for ${item.name}`}
                        >
                          <MoreVertical className="h-3.5 w-3.5" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Footer Bar */}
          <div className="p-3.5 px-4 sm:px-6 bg-brand-bg-soft/70 border-t border-brand-border/60 flex items-center justify-between text-xs text-brand-muted">
            <div className="flex items-center gap-2">
              <HardDrive className="h-3.5 w-3.5 text-brand-primary" />
              <span>1,482 Total Files · 1.2 TB Stored</span>
            </div>
            <div className="flex items-center gap-1.5 text-emerald-800 dark:text-emerald-400 font-medium">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              <span>Real-time Sync Active</span>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
