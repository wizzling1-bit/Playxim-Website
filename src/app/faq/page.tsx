"use client";

import * as React from "react";
import { ChevronDown, Search } from "lucide-react";
import { MarketingNavbar } from "@/components/marketing/navbar";
import { MarketingFooter } from "@/components/marketing/footer";
import { CtaBanner } from "@/components/marketing/cta-banner";
import { Container } from "@/components/ui/layout-primitives";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
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
    a: "Creators earn revenue whenever eligible consumers stream their videos in future client applications. Payout rates (CPM) are calculated based on qualified continuous viewing (minimum 30 seconds / 50% watch time) and recorded to your creator ledger in real time.",
    category: "monetization",
  },
  {
    q: "When and how can I withdraw my earnings?",
    a: "Earnings accrue daily on your creator balance. Once your available balance meets the minimum payout threshold ($25 USD), you can initiate withdrawals to supported payout methods including direct bank transfer and digital wallets.",
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

export default function FaqPage() {
  const [search, setSearch] = React.useState("");
  const [openItems, setOpenItems] = React.useState<Record<number, boolean>>({ 0: true, 1: true });

  const toggleItem = (idx: number) => {
    setOpenItems((prev) => ({ ...prev, [idx]: !prev[idx] }));
  };

  const filtered = FAQ_DATA.filter(
    (item) =>
      item.q.toLowerCase().includes(search.toLowerCase()) ||
      item.a.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen flex flex-col bg-transparent transition-colors duration-200">
      <MarketingNavbar />

      <main className="flex-1">
        {/* Header */}
        <section className="py-24 border-b border-brand-border bg-gradient-to-b from-brand-bg to-brand-bg-soft/40 relative overflow-hidden">
          <div className="absolute inset-0 bg-grid-pattern opacity-30 pointer-events-none" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-brand-primary/10 blur-[130px] rounded-full pointer-events-none -z-10" />
          <Container className="text-center max-w-3xl mx-auto space-y-5 relative z-10">
            <Badge variant="default">Frequently Asked Questions</Badge>
            <h1 className="text-4xl sm:text-5xl font-display font-extrabold tracking-tight text-brand-text">
              Everything you need to know
            </h1>
            <p className="text-lg text-brand-muted leading-relaxed">
              Find clear answers on storage policies, video encoding pipelines, audience sharing, and creator payouts.
            </p>

            <div className="pt-4 max-w-md mx-auto">
              <div className="p-1 rounded-2xl bg-brand-surface/60 border border-brand-border shadow-sm">
                <Input
                  placeholder="Search questions or keywords..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  leftIcon={<Search className="h-4 w-4" />}
                  className="border-0 bg-transparent focus-visible:ring-0 shadow-none"
                />
              </div>
            </div>
          </Container>
        </section>

        {/* FAQ Accordion List */}
        <section className="py-24 border-b border-brand-border">
          <Container className="max-w-3xl mx-auto">
            {filtered.length === 0 ? (
              <div className="text-center py-12 text-brand-muted">
                No matching questions found for &ldquo;{search}&rdquo;. Try another term or contact support.
              </div>
            ) : (
              <div className="space-y-4">
                {filtered.map((item, idx) => {
                  const isOpen = !!openItems[idx];
                  return (
                    <Card
                      key={item.q}
                      variant="default"
                      className="transition-all duration-300 overflow-hidden hover:border-brand-primary/30"
                    >
                      <button
                        type="button"
                        onClick={() => toggleItem(idx)}
                        className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 select-none hover:bg-brand-bg-soft/40 transition-colors"
                      >
                        <span className="font-display font-semibold text-base sm:text-lg text-brand-text">
                          {item.q}
                        </span>
                        <ChevronDown
                          className={cn(
                            "h-5 w-5 text-brand-muted shrink-0 transition-transform duration-300",
                            isOpen && "rotate-180 text-brand-primary"
                          )}
                        />
                      </button>

                      {isOpen && (
                        <div className="px-5 sm:px-6 pb-6 pt-1 text-sm text-brand-muted leading-relaxed border-t border-brand-border/40 animate-in fade-in duration-200">
                          {item.a}
                        </div>
                      )}
                    </Card>
                  );
                })}
              </div>
            )}
          </Container>
        </section>

        {/* CTA */}
        <CtaBanner
          title="Still have questions about your specific setup?"
          subtitle="Our engineering and creator relations team is here to assist with catalog migrations."
        />
      </main>

      <MarketingFooter />
    </div>
  );
}
