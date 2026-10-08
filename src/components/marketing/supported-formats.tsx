"use client";

import * as React from "react";
import {
  FileVideo,
  FileAudio,
  FileArchive,
  FileText,
  Binary,
  Layers,
} from "lucide-react";
import { Container } from "@/components/ui/layout-primitives";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

const FORMAT_CATEGORIES = [
  {
    icon: <FileVideo className="h-4 w-4 text-brand-primary" />,
    label: "Video Formats",
    formats: "MP4 · MKV · MOV · WEBM",
    tag: "Adaptive Bitrate",
  },
  {
    icon: <FileAudio className="h-4 w-4 text-brand-glow" />,
    label: "Audio & Podcasts",
    formats: "MP3 · WAV · FLAC · AAC",
    tag: "Lossless Master",
  },
  {
    icon: <FileArchive className="h-4 w-4 text-amber-500" />,
    label: "Compressed Archives",
    formats: "ZIP · RAR · 7Z · TAR",
    tag: "High-Speed Chunking",
  },
  {
    icon: <FileText className="h-4 w-4 text-emerald-500" />,
    label: "Documents & Books",
    formats: "PDF · DOCX · PPTX · EPUB",
    tag: "Instant Viewer",
  },
  {
    icon: <Binary className="h-4 w-4 text-purple-500" />,
    label: "Apps & Software",
    formats: "APK · IPA · ISO · EXE",
    tag: "Zero Malware Scan",
  },
  {
    icon: <Layers className="h-4 w-4 text-cyan-500" />,
    label: "Design & Project RAW",
    formats: "PSD · BLEND · AI · RAW",
    tag: "Byte-for-Byte",
  },
];

export function SupportedFormatsStrip() {
  return (
    <section className="py-10 border-y border-brand-border/60 bg-brand-surface/30 backdrop-blur-xs relative">
      <Container className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
        <ScrollReveal duration={600}>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-2">
              <span className="flex h-2 w-2 rounded-full bg-brand-primary animate-pulse" />
              <h2 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-brand-muted">
                Supported Formats & Multi-Platform Ingestion
              </h2>
            </div>
            <span className="text-xs font-mono text-brand-primary bg-brand-primary/10 px-3 py-1 rounded-full border border-brand-primary/20">
              50 GB+ Single File Limit
            </span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3.5">
            {FORMAT_CATEGORIES.map((item, idx) => (
              <div
                key={idx}
                className="p-4 rounded-2xl bg-brand-surface/90 dark:bg-[#111728]/90 border border-brand-border/70 hover:border-brand-primary/40 hover:-translate-y-0.5 transition-all shadow-xs group text-left"
              >
                <div className="flex items-center justify-between mb-2.5">
                  <div className="h-8 w-8 rounded-xl bg-brand-bg-soft dark:bg-[#161F36] border border-brand-border/60 flex items-center justify-center group-hover:scale-105 transition-transform">
                    {item.icon}
                  </div>
                  <span className="text-[10px] font-mono font-medium text-brand-muted">
                    {item.tag}
                  </span>
                </div>
                <div className="text-xs font-bold text-brand-text truncate">
                  {item.label}
                </div>
                <div className="text-[11px] font-mono text-brand-muted mt-0.5 truncate">
                  {item.formats}
                </div>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </Container>
    </section>
  );
}
