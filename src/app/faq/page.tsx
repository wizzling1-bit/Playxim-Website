"use client";

import * as React from "react";
import { ChevronDown, Search, HelpCircle, HardDrive, Video, DollarSign, ShieldCheck } from "lucide-react";
import { MarketingNavbar } from "@/components/marketing/navbar";
import { MarketingFooter } from "@/components/marketing/footer";
import { FinalCtaSection } from "@/components/marketing/final-cta";
import { Container } from "@/components/ui/layout-primitives";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { cn } from "@/lib/utils";

interface FaqItem {
  q: string;
  a: string;
  category: "storage" | "video" | "monetization" | "security";
}

const FAQ_DATA: FaqItem[] = [
  {
    q: "What types of files can I upload to Playxim?",
    a: "You can upload arbitrary files of any standard format: videos (MP4, MKV, MOV, WebM), compressed archives (ZIP, RAR, 7Z, TAR), documents (PDF, DOCX), graphic project files (PSD, BLEND, AI), and raw disk images. All arbitrary files are stored safely in Cloudflare R2 without compression.",
    category: "storage",
  },
  {
    q: "Is storage truly unlimited?",
    a: "Playxim operates on an unlimited-by-policy model for genuine creators. We do not enforce artificial 15 GB or 100 GB barriers. As long as your uploads represent authentic creative work, software releases, media archives, or video content conforming to our Terms of Service, there are no storage caps.",
    category: "storage",
  },
  {
    q: "Can I upload very large files (e.g. 50 GB+)?",
    a: "Yes. Our S3-compatible chunked multipart upload engine slices files into optimized chunks directly in your browser. If your internet connection flickers, the upload automatically pauses and resumes from the last confirmed part without restarting from scratch.",
    category: "storage",
  },
  {
    q: "Can I organize my uploads into folders and playlists?",
    a: "Yes. The creator dashboard supports full nested folder structures for file management, as well as sequential video playlists for tutorials, podcasts, and episodic series.",
    category: "storage",
  },
  {
    q: "Where are Playxim videos watched?",
    a: "Videos can be watched directly on web browsers via fast adaptive streaming, and will be consumed through dedicated native Flutter applications for Android, iOS, Windows, and Linux. Consumer apps provide offline caching, background playback, and higher creator engagement.",
    category: "video",
  },
  {
    q: "How does video streaming work under the hood?",
    a: "When you upload a video, it is ingested through Cloudflare Stream and automatically encoded into multiple adaptive bitrate resolutions (360p, 720p, 1080p, and 4K). Viewers receive optimized HLS/DASH streams tailored dynamically to their network bandwidth.",
    category: "video",
  },
  {
    q: "How do creator earnings work?",
    a: "Creators earn revenue whenever eligible consumers stream their videos. Our payout rate is guaranteed at flat $1.00 per 1,000 qualified views, calculated based on qualified continuous viewing (minimum 30 seconds / 50% watch time) and recorded to your creator ledger in real time.",
    category: "monetization",
  },
  {
    q: "When and how can I withdraw my earnings?",
    a: "Earnings accrue daily on your creator balance. Once your available balance meets our ultra-low $5.00 USD minimum cashout threshold, you can initiate instant withdrawals via UPI, Bank Transfer, PayPal, or Crypto (USDT).",
    category: "monetization",
  },
  {
    q: "How do shareable links work?",
    a: "Every uploaded file and video receives an instant unique shortlink like playxim.com/watch/:code. You can copy and distribute this link anywhere. Viewers open a clean, ad-free page where they can stream video or download files with one click.",
    category: "security",
  },
  {
    q: "Can I password-protect or expire my share links?",
    a: "Yes. You can optionally require an access passcode before files can be viewed or downloaded. You can also configure expiration dates (e.g., 24 hours, 7 days) to limit distribution duration.",
    category: "security",
  },
  {
    q: "How does Playxim protect against malware and abuse?",
    a: "All uploaded content is scanned asynchronously using automated malware detection pipelines. Harmful payloads are isolated and flagged, protecting your viewers from infected files.",
    category: "security",
  },
  {
    q: "What happens if an upload is interrupted or fails?",
    a: "Because uploads are chunked into independent multipart blocks, you don't lose your progress. The upload manager detects network stalls and retries failed parts automatically.",
    category: "storage",
  },
];

const CATEGORIES = [
  { id: "all", label: "All Questions", icon: HelpCircle },
  { id: "storage", label: "Cloud Storage", icon: HardDrive },
  { id: "video", label: "Video Streaming", icon: Video },
  { id: "monetization", label: "Earnings & Payouts", icon: DollarSign },
  { id: "security", label: "Security & Sharing", icon: ShieldCheck },
] as const;

export default function FaqPage() {
  const [search, setSearch] = React.useState("");
  const [selectedCategory, setSelectedCategory] = React.useState<string>("all");
  const [openItems, setOpenItems] = React.useState<Record<number, boolean>>({ 0: true, 1: true });

  const toggleItem = (idx: number) => {
    setOpenItems((prev) => ({ ...prev, [idx]: !prev[idx] }));
  };

  const filtered = FAQ_DATA.filter((item) => {
    const matchesCategory = selectedCategory === "all" || item.category === selectedCategory;
    const matchesSearch =
      item.q.toLowerCase().includes(search.toLowerCase()) ||
      item.a.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

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
              <Badge variant="default" className="shadow-xs">Knowledge Base & FAQ</Badge>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-extrabold tracking-tight text-brand-text mt-3">
                Everything you need to know
              </h1>
              <p className="text-base sm:text-lg text-brand-muted leading-relaxed max-w-2xl mx-auto mt-3">
                Find clear answers on storage policies, video encoding pipelines, audience sharing, and our guaranteed $1/1K views daily payout system.
              </p>

              <div className="pt-6 max-w-lg mx-auto">
                <div className="double-bezel p-1 rounded-2xl bg-brand-surface/80 border border-brand-border shadow-lg">
                  <Input
                    placeholder="Search questions or keywords..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    leftIcon={<Search className="h-4 w-4 text-brand-muted" />}
                    className="border-0 bg-transparent focus-visible:ring-0 shadow-none text-brand-text placeholder:text-brand-muted"
                  />
                </div>
              </div>

              {/* Category Filter Pills */}
              <div className="flex flex-wrap items-center justify-center gap-2 pt-6">
                {CATEGORIES.map((cat) => {
                  const Icon = cat.icon;
                  const isActive = selectedCategory === cat.id;
                  return (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => setSelectedCategory(cat.id)}
                      className={cn(
                        "inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 active:scale-95",
                        isActive
                          ? "bg-brand-primary text-white shadow-md shadow-brand-primary/25"
                          : "bg-brand-surface text-brand-muted border border-brand-border hover:text-brand-text hover:bg-brand-bg-soft"
                      )}
                    >
                      <Icon className="h-3.5 w-3.5" />
                      <span>{cat.label}</span>
                    </button>
                  );
                })}
              </div>
            </ScrollReveal>
          </Container>
        </section>

        {/* FAQ Accordion List */}
        <section className="py-20 sm:py-24 border-b border-brand-border">
          <Container className="max-w-3xl mx-auto px-4 sm:px-6">
            <ScrollReveal duration={700} variant="subtle">
              {filtered.length === 0 ? (
                <div className="text-center py-16 text-brand-muted space-y-3">
                  <p className="text-base">No matching questions found for &ldquo;{search}&rdquo;.</p>
                  <button
                    onClick={() => {
                      setSearch("");
                      setSelectedCategory("all");
                    }}
                    className="text-xs text-brand-primary hover:underline font-semibold"
                  >
                    Reset search filters
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {filtered.map((item, idx) => {
                    const isOpen = !!openItems[idx];
                    return (
                      <div
                        key={item.q}
                        className="double-bezel p-1 sm:p-1.5 rounded-2xl bg-brand-surface/60 border border-brand-border hover:border-brand-primary/40 transition-all duration-300 shadow-sm"
                      >
                        <Card
                          variant="default"
                          className="border-0 shadow-none rounded-[calc(1rem-4px)] overflow-hidden bg-brand-surface"
                        >
                          <button
                            type="button"
                            onClick={() => toggleItem(idx)}
                            aria-expanded={isOpen}
                            className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 select-none hover:bg-brand-bg-soft/40 transition-colors group cursor-pointer"
                          >
                            <span className="font-display font-semibold text-base sm:text-lg text-brand-text group-hover:text-brand-primary transition-colors">
                              {item.q}
                            </span>
                            <div className={cn(
                              "h-8 w-8 rounded-full flex items-center justify-center shrink-0 transition-all duration-300",
                              isOpen ? "bg-brand-primary/10 text-brand-primary" : "bg-brand-bg-soft text-brand-muted group-hover:text-brand-text"
                            )}>
                              <ChevronDown
                                className={cn(
                                  "h-4 w-4 transition-transform duration-300",
                                  isOpen && "rotate-180"
                                )}
                              />
                            </div>
                          </button>

                          {/* Smooth CSS Grid Height Transition */}
                          <div
                            className={cn(
                              "grid transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]",
                              isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                            )}
                          >
                            <div className="overflow-hidden">
                              <div className="px-5 sm:px-6 pb-6 pt-1 text-sm text-brand-muted leading-relaxed border-t border-brand-border/40">
                                {item.a}
                              </div>
                            </div>
                          </div>
                        </Card>
                      </div>
                    );
                  })}
                </div>
              )}
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
