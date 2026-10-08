"use client";

import * as React from "react";
import { ChevronDown } from "lucide-react";
import { Container, SectionHeader } from "@/components/ui/layout-primitives";
import { Badge } from "@/components/ui/badge";

export function FaqSection() {
  const [openIndex, setOpenIndex] = React.useState<number | null>(0);

  const faqs = [
    {
      q: "What is Playxim?",
      a: "Playxim is an all-in-one creator content platform. It combines high-speed S3-compatible cloud storage, video stream encoding, shareable shortlinks, and direct creator monetization into a unified command center.",
    },
    {
      q: "Is Playxim free to use?",
      a: "Yes. You can create a free creator account, begin uploading your content immediately, and create shareable links. There are no credit card requirements to get started.",
    },
    {
      q: "What file types can I upload?",
      a: "You can upload virtually any digital media: 4K/8K video footage (ProRes, MP4, MKV), audio masters (WAV, FLAC, MP3), compressed archives (ZIP, RAR, 7Z), and 3D or design project files (Blend, C4D, OBJ).",
    },
    {
      q: "Is storage really unlimited?",
      a: "Playxim operates on an unlimited-by-policy model for genuine creators. Unlike conventional providers that trap you behind rigid 100 GB tier paywalls, we do not impose artificial storage caps on creator accounts complying with our terms of service.",
    },
    {
      q: "How does creator monetization work?",
      a: "Whenever eligible viewers stream your video content through Playxim consumer applications, views are verified and calculated at platform CPM rates. Accrued revenue is logged in your transparent creator ledger.",
    },
    {
      q: "How do share links work?",
      a: "Every upload can generate an instant branded shortlink (e.g., playxim.com/watch/8XK92LM). You can distribute these links on YouTube descriptions, Patreon, Discord, or client review emails. Visitors get a clean, high-speed landing page with zero ads.",
    },
    {
      q: "Can I password-protect my content?",
      a: "Yes. You can enable PBKDF2 passcode security on any link. Anyone accessing the link must enter your custom password before viewing or downloading the content.",
    },
    {
      q: "Does Playxim compress my files?",
      a: "No. Your master files, raw footage, and downloadable archives are stored with byte-for-byte fidelity without quality degradation or lossy recompression.",
    },
    {
      q: "Can I use Playxim on mobile?",
      a: "Yes. The Playxim web application is fully responsive on modern mobile browsers. Dedicated iOS and Android playback applications are also part of the Playxim streaming ecosystem.",
    },
    {
      q: "How do payout withdrawals work?",
      a: "Once your balance reaches the standard threshold, you can request payouts directly to your linked bank account or supported payout methods. All earnings are tracked with double-entry accounting records.",
    },
  ];

  return (
    <section id="faq" className="py-24 sm:py-32 border-t border-brand-border/60 bg-brand-bg relative">
      <Container className="max-w-4xl mx-auto">
        <SectionHeader
          badge={<Badge variant="default">FAQ</Badge>}
          title="Frequently asked questions"
          description="Everything you need to know about Playxim content storage, share links, and creator earnings."
        />

        <div className="space-y-3 pt-2 text-left">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl border border-brand-border bg-brand-surface overflow-hidden transition-all shadow-2xs hover:border-brand-primary/30"
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 font-display font-bold text-sm sm:text-base text-brand-text cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary/40"
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${idx}`}
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`h-4 w-4 text-brand-muted shrink-0 transition-transform duration-200 ${
                      isOpen ? "rotate-180 text-brand-primary" : ""
                    }`}
                  />
                </button>
                {isOpen && (
                  <div
                    id={`faq-answer-${idx}`}
                    className="px-5 sm:px-6 pb-6 text-xs sm:text-sm text-brand-muted leading-relaxed border-t border-brand-border/40 pt-3 animate-in fade-in-50 duration-150"
                  >
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
