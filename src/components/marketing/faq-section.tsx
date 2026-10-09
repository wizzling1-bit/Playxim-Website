"use client";

import * as React from "react";
import { ChevronDown, MessageSquare, Mail, HelpCircle } from "lucide-react";
import { Container, SectionHeader } from "@/components/ui/layout-primitives";
import { Badge } from "@/components/ui/badge";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { Button } from "@/components/ui/button";

export function FaqSection() {
  const [openIndex, setOpenIndex] = React.useState<number | null>(0);

  const faqs = [
    {
      q: "What is Playxim and how does it work?",
      a: "Playxim is a file hosting and creator monetization platform. You upload videos, apps, or files (via website or Telegram bot), get a direct link, share it with your audience, and earn money for every view. Viewers can watch or download with no sign-up needed.",
    },
    {
      q: "How much money can I earn?",
      a: "You earn a flat, guaranteed $1.00 for every 1,000 views and downloads on your links. Unlike YouTube, there are no subscriber counts or 4,000 watch-hour prerequisites — your content starts earning from the very 1st view.",
    },
    {
      q: "What is the minimum payout and how do I withdraw?",
      a: "The minimum payout is only $5.00. Once your balance reaches $5, you can withdraw daily via UPI (Google Pay, PhonePe, Paytm), direct Bank Transfer (IMPS/NEFT), PayPal (USD), or Crypto (Binance USDT). There are 0% withdrawal fees.",
    },
    {
      q: "Do viewers need to create an account to watch or download?",
      a: "No! Your audience does not need to register or create an account. When they open your Playxim link, they can stream the video immediately in 1080p or download the file at top speed without annoying popups or forced apps.",
    },
    {
      q: "How can I upload files?",
      a: "You have 3 easy options: (1) Use the Web Dashboard directly in your browser, (2) Send files to our Telegram Upload Bot (@PlayximBot), or (3) Forward links from other platforms into our Link Converter Bot to automatically create your own Playxim links.",
    },
    {
      q: "Is storage really 100% free and unlimited?",
      a: "Yes. Active creators enjoy unlimited cloud storage space with zero monthly subscription fees. You can upload single files up to 50 GB with automatic resume.",
    },
    {
      q: "Can I upload files other than videos?",
      a: "Yes! You can upload any digital file: videos (MP4, MKV), Android APKs, compressed archives (ZIP, RAR, 7Z), documents (PDF, DOCX), audio files (MP3, WAV), and software.",
    },
    {
      q: "Is there a mobile app available?",
      a: "Yes. Playxim has a free official Android mobile app available on Google Play. Viewers and creators can use it for smooth HD video streaming, background playback, and fast offline downloads.",
    },
  ];

  return (
    <section id="faq" className="py-20 sm:py-28 border-t border-brand-border/60 bg-transparent relative">
      <Container className="max-w-5xl mx-auto px-4 sm:px-8 lg:px-12">
        <ScrollReveal duration={600}>
          <SectionHeader
            badge={<Badge variant="default">FAQ</Badge>}
            title="Frequently Asked Questions"
            description="Everything you need to know about Playxim file storage, Telegram bots, video streaming, and our $1.00 / 1K views payout program."
          />
        </ScrollReveal>

        {/* Accordion List */}
        <div className="space-y-3.5 pt-4 text-left">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <ScrollReveal key={idx} delay={idx * 30} duration={500}>
                <div className="rounded-2xl border border-slate-200/80 dark:border-brand-border bg-white dark:bg-[#111728]/90 overflow-hidden transition-all shadow-xs hover:border-brand-primary/40">
                  <button
                    type="button"
                    onClick={() => setOpenIndex(isOpen ? null : idx)}
                    className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 font-display font-bold text-sm sm:text-base text-slate-900 dark:text-brand-text cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary/40"
                    aria-expanded={isOpen}
                    aria-controls={`faq-answer-${idx}`}
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      className={`h-4 w-4 text-slate-400 dark:text-brand-muted shrink-0 transition-transform duration-200 ${
                        isOpen ? "rotate-180 text-brand-primary" : ""
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div
                      id={`faq-answer-${idx}`}
                      className="px-5 sm:px-6 pb-6 text-xs sm:text-sm text-slate-600 dark:text-brand-muted leading-relaxed border-t border-slate-100 dark:border-brand-border/40 pt-3 animate-in fade-in-50 duration-150"
                    >
                      {faq.a}
                    </div>
                  )}
                </div>
              </ScrollReveal>
            );
          })}
        </div>

        {/* Still Have Questions Box (DiskWala Style) */}
        <ScrollReveal delay={300} duration={600}>
          <div className="mt-12 p-6 sm:p-8 rounded-3xl bg-slate-50/90 dark:bg-[#0D121F]/90 border border-slate-200/80 dark:border-brand-border flex flex-col sm:flex-row items-center justify-between gap-6 text-left">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-2xl bg-brand-primary/10 text-brand-primary flex items-center justify-center shrink-0">
                <HelpCircle className="h-6 w-6" />
              </div>
              <div>
                <h4 className="text-base font-bold text-slate-900 dark:text-brand-text">
                  Still have questions?
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-brand-muted mt-0.5">
                  Our creator support team is here to help you 24 hours a day, 7 days a week.
                </p>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-3 shrink-0 w-full sm:w-auto">
              <a
                href="https://t.me/playxim"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto"
              >
                <Button variant="primary" size="sm" className="w-full sm:w-auto rounded-full">
                  <MessageSquare className="h-3.5 w-3.5 mr-1.5" />
                  <span>Ask on Telegram</span>
                </Button>
              </a>
              <a href="mailto:support@playxim.com" className="w-full sm:w-auto">
                <Button
                  variant="secondary"
                  size="sm"
                  className="w-full sm:w-auto rounded-full bg-white dark:bg-transparent border border-slate-300 dark:border-brand-border text-slate-700 dark:text-brand-muted"
                >
                  <Mail className="h-3.5 w-3.5 mr-1.5" />
                  <span>Email Support</span>
                </Button>
              </a>
            </div>
          </div>
        </ScrollReveal>
      </Container>
    </section>
  );
}
