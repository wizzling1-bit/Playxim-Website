"use client";

import * as React from "react";
import Link from "next/link";
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
      a: "You earn a flat, guaranteed $1.00 for every 1,000 views and downloads on your links. Unlike traditional platforms, there are no subscriber counts or 4,000 watch-hour prerequisites — your content starts earning from the very 1st view.",
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
    <section id="faq" className="py-20 sm:py-28 border-t border-brand-border bg-transparent relative">
      <Container className="max-w-5xl mx-auto px-4 sm:px-8 lg:px-12">
        <ScrollReveal duration={600} variant="subtle">
          <SectionHeader
            badge={<Badge variant="default">FAQ</Badge>}
            title="Frequently Asked Questions"
            description="Everything you need to know about Playxim file storage, Telegram bots, video streaming, and our $1.00 / 1K views payout program."
          />
        </ScrollReveal>

        {/* Accordion List with CSS Grid Height Transition */}
        <div className="space-y-3.5 pt-4 text-left">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className={`rounded-2xl border transition-all duration-200 shadow-xs ${
                  isOpen
                    ? "border-brand-primary/50 bg-brand-surface shadow-md shadow-brand-primary/5"
                    : "border-brand-border bg-brand-surface hover:border-brand-border-highlight"
                }`}
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 font-display font-bold text-sm sm:text-base text-brand-text cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary/50 rounded-2xl"
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${idx}`}
                >
                  <span className="leading-snug">{faq.q}</span>
                  <div
                    className={`h-7 w-7 rounded-full flex items-center justify-center shrink-0 transition-transform duration-250 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                      isOpen
                        ? "rotate-180 bg-brand-primary/10 text-brand-primary"
                        : "bg-brand-bg-soft text-brand-muted"
                    }`}
                  >
                    <ChevronDown className="h-4 w-4" />
                  </div>
                </button>
                <div
                  id={`faq-answer-${idx}`}
                  className={`grid transition-[grid-template-rows] duration-250 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                    isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="px-5 sm:px-6 pb-6 text-xs sm:text-sm text-brand-muted leading-relaxed border-t border-brand-border/50 pt-3">
                      {faq.a}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* 24/7 Creator Support Help Card */}
        <ScrollReveal delay={200} duration={600} variant="subtle">
          <div className="mt-12 rounded-3xl p-6 sm:p-8 border border-brand-border bg-brand-surface text-center flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xs">
            <div className="text-left space-y-1">
              <h4 className="text-base sm:text-lg font-display font-bold text-brand-text flex items-center gap-2">
                <HelpCircle className="h-5 w-5 text-brand-primary shrink-0" />
                <span>Still have questions or need help?</span>
              </h4>
              <p className="text-xs sm:text-sm text-brand-muted">
                Our support team is available 24/7 on Telegram and email to help with your files and payouts.
              </p>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <a
                href="https://t.me/playxim"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button size="md" variant="primary" className="rounded-full shadow-md shadow-brand-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all">
                  <MessageSquare className="h-4 w-4 mr-1.5" />
                  <span>Telegram Support</span>
                </Button>
              </a>
              <Link href="/contact">
                <Button size="md" variant="secondary" className="rounded-full bg-brand-bg-soft text-brand-text border border-brand-border hover:bg-brand-surface">
                  <Mail className="h-4 w-4 mr-1.5" />
                  <span>Contact Us</span>
                </Button>
              </Link>
            </div>
          </div>
        </ScrollReveal>
      </Container>
    </section>
  );
}

export default FaqSection;
