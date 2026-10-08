"use client";

import * as React from "react";
import { ChevronDown } from "lucide-react";
import { Container, SectionHeader } from "@/components/ui/layout-primitives";
import { Badge } from "@/components/ui/badge";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

export function FaqSection() {
  const [openIndex, setOpenIndex] = React.useState<number | null>(0);

  const faqs = [
    {
      q: "What is Playxim?",
      a: "Playxim is an all-in-one creator content platform. It combines high-speed cloud storage, instant shareable links, 4K video transcoding, and direct creator monetization ($1.00 per 1,000 views) into a unified platform.",
    },
    {
      q: "Is Playxim free to use?",
      a: "Yes. You can create a free creator account, begin uploading your content immediately, and generate shareable links. There are no fees or credit card requirements to get started.",
    },
    {
      q: "What file types can I upload?",
      a: "You can upload virtually any digital media: 4K/8K video footage (ProRes, MP4, MKV), audio masters (WAV, FLAC, MP3), compressed archives (ZIP, RAR, 7Z), and documents or software files (PDF, APK, IPA, EXE).",
    },
    {
      q: "Is storage really unlimited?",
      a: "Playxim operates on an unlimited-by-policy model for creators. We do not impose artificial storage quotas or sudden subscription paywalls on creator accounts complying with our terms of service.",
    },
    {
      q: "How does creator monetization work?",
      a: "Playxim pays a flat, guaranteed $1.00 for every 1,000 views and downloads on your shared links. As your audience streams your 4K videos or downloads files via our web and mobile app, earnings accumulate live in your dashboard. You can withdraw daily with a low $5.00 minimum threshold via Bank, UPI, PayPal, or Crypto.",
    },
    {
      q: "How do share links work?",
      a: "Every upload generates an instant branded shortlink (e.g., playxim.com/watch/8XK92LM). You can distribute these links on YouTube, Telegram, Discord, Patreon, or blogs. Visitors get a clean, high-speed landing page to view or download.",
    },
    {
      q: "Can I password-protect my content?",
      a: "Yes. You can enable passcode security on any link. Anyone accessing the link must enter your custom password before viewing or downloading the content.",
    },
    {
      q: "Does Playxim compress my files?",
      a: "No. Your master files, raw footage, and downloadable archives are stored with byte-for-byte fidelity without quality degradation or lossy recompression.",
    },
    {
      q: "How do audience members watch or download?",
      a: "Anyone with your link can view your video directly in the browser or via our free Playxim mobile app for Android and iOS, with buffer-free adaptive streaming or direct fast download.",
    },
    {
      q: "How do payout withdrawals work?",
      a: "Once your balance reaches the $5.00 threshold, you can request daily withdrawals directly to your linked bank account, UPI, PayPal, or Crypto. All earnings are logged with transparent accounting records.",
    },
  ];

  return (
    <section id="faq" className="py-20 sm:py-28 border-t border-brand-border/60 bg-transparent relative">
      <Container className="max-w-5xl mx-auto px-4 sm:px-8 lg:px-12">
        <ScrollReveal duration={600}>
          <SectionHeader
            badge={<Badge variant="default">FAQ</Badge>}
            title="Frequently asked questions"
            description="Everything you need to know about Playxim file storage, share links, mobile app streaming, and the $1.00 / 1K views payout program."
          />
        </ScrollReveal>

        <div className="space-y-3.5 pt-2 text-left">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <ScrollReveal key={idx} delay={idx * 40} duration={500}>
                <div
                  className="rounded-2xl border border-slate-200/80 dark:border-brand-border bg-white dark:bg-[#111728]/90 overflow-hidden transition-all shadow-xs hover:border-brand-primary/40"
                >
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
      </Container>
    </section>
  );
}
