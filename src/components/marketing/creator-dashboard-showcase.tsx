"use client";

import * as React from "react";
import Link from "next/link";
import {
  Folder,
  ArrowRight,
  UploadCloud,
  CheckCircle2,
  Share2,
  BarChart3,
  UserCheck,
  Search,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/layout-primitives";

export function CreatorDashboardShowcase() {
  const folders = [
    { name: "4K Master Videos", count: "34 files", size: "820 GB", active: true },
    { name: "Sound FX & Audio Stems", count: "412 files", size: "48 GB", active: false },
    { name: "Unreal & Blender 3D", count: "18 files", size: "142 GB", active: false },
    { name: "Client Deliverables (Private)", count: "89 files", size: "210 GB", active: false },
  ];

  return (
    <section className="py-24 sm:py-32 border-t border-brand-border/60 bg-transparent relative">
      <div className="absolute inset-0 bg-grid-pattern opacity-25 pointer-events-none" />
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Large Product Mockup */}
          <div className="lg:col-span-7">
            <div className="relative rounded-2xl p-1.5 bg-gradient-to-br from-brand-border/80 via-brand-border/40 to-transparent border border-brand-border shadow-xl">
              <div className="rounded-xl border border-brand-border bg-brand-surface p-5 sm:p-7 space-y-5">
                {/* Visual Header */}
                <div className="flex items-center justify-between pb-4 border-b border-brand-border/70">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-lg bg-brand-primary/10 text-brand-primary flex items-center justify-center font-bold">
                      PX
                    </div>
                    <div>
                      <div className="text-sm font-bold text-brand-text">Content Explorer</div>
                      <div className="text-xs text-brand-muted">Root Directory / Folders</div>
                    </div>
                  </div>
                  <span className="text-xs px-2.5 py-1 rounded-full bg-blue-50 text-blue-900 border border-blue-200 dark:bg-brand-primary/20 dark:text-brand-glow font-medium">
                    Auto-Synced
                  </span>
                </div>

                {/* Folder Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {folders.map((folder, i) => (
                    <div
                      key={i}
                      className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
                        folder.active
                          ? "bg-brand-primary/5 border-brand-primary/40 shadow-xs"
                          : "bg-brand-bg-soft/50 border-brand-border/70 hover:border-brand-primary/30"
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <Folder
                          className={`h-4 w-4 ${
                            folder.active ? "text-brand-primary" : "text-brand-muted"
                          }`}
                        />
                        <div className="text-xs font-semibold text-brand-text truncate">
                          {folder.name}
                        </div>
                      </div>
                      <div className="text-[11px] text-brand-muted mt-2 flex items-center justify-between font-mono">
                        <span>{folder.count}</span>
                        <span>{folder.size}</span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Active Folder Preview Callout */}
                <div className="p-4 rounded-xl bg-brand-bg-soft/70 border border-brand-border/80 space-y-2">
                  <div className="flex items-center justify-between text-xs font-medium">
                    <span className="text-brand-text font-semibold">Active Selection: /4K Master Videos</span>
                    <span className="text-brand-muted font-mono">820 GB</span>
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-brand-border/60 overflow-hidden">
                    <div className="h-full bg-brand-primary rounded-full w-2/3" />
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-brand-muted pt-1">
                    <span>S3 Chunked Mirror: Cloudflare R2</span>
                    <span className="text-emerald-800 dark:text-emerald-400 font-semibold">Ready for link creation</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Story Copy & Feature List */}
          <div className="lg:col-span-5 space-y-6 text-left">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-brand-primary/10 text-brand-primary border border-brand-primary/20">
              For Creators
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold tracking-tight text-brand-text leading-tight">
              Everything in one place
            </h2>

            <p className="text-base text-brand-muted leading-relaxed">
              Upload and organize your files, manage shareable links, and understand how your content is performing without switching between fragmented tools.
            </p>

            <ul className="space-y-3 pt-2 text-sm text-brand-muted">
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="h-4 w-4 text-brand-primary shrink-0 mt-0.5" />
                <span><strong className="text-brand-text">Upload management:</strong> Chunked multipart uploads that resume if disconnected.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="h-4 w-4 text-brand-primary shrink-0 mt-0.5" />
                <span><strong className="text-brand-text">Smart folders & search:</strong> Find any file in milliseconds across terabytes of media.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="h-4 w-4 text-brand-primary shrink-0 mt-0.5" />
                <span><strong className="text-brand-text">Audience analytics:</strong> Real-time tracking of views, unique watchers, and downloads.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="h-4 w-4 text-brand-primary shrink-0 mt-0.5" />
                <span><strong className="text-brand-text">Creator profile:</strong> Custom verified hub displaying your work and playlists.</span>
              </li>
            </ul>

            <div className="pt-3">
              <Link href="/auth/sign-up">
                <Button variant="primary" size="lg" className="rounded-full px-6 group font-semibold shadow-md shadow-brand-primary/20">
                  <span>Explore Dashboard</span>
                  <ArrowRight className="h-4 w-4 ml-1.5 transition-transform duration-200 group-hover:translate-x-1" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
