"use client";

import * as React from "react";
import { Send, CheckCircle2, MessageSquare } from "lucide-react";
import { MarketingNavbar } from "@/components/marketing/navbar";
import { MarketingFooter } from "@/components/marketing/footer";
import { Container } from "@/components/ui/layout-primitives";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { WaveInput } from "@/components/ui/wave-input";
import { Label } from "@/components/ui/label";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

export default function ContactPage() {
  const [submitted, setSubmitted] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex flex-col bg-brand-bg transition-colors duration-200">
      <MarketingNavbar />

      <main className="flex-1">
        {/* Header */}
        <section className="py-20 sm:py-28 border-b border-brand-border bg-gradient-to-b from-brand-bg to-brand-bg-soft/40 relative overflow-hidden">
          <div className="absolute inset-0 bg-grid-pattern opacity-30 pointer-events-none" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[320px] bg-brand-primary/10 blur-[130px] rounded-full pointer-events-none -z-10" />

          <Container className="text-center max-w-3xl mx-auto space-y-4 px-4">
            <ScrollReveal duration={600} variant="subtle">
              <Badge variant="default" className="shadow-xs">Creator Relations & Support</Badge>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-extrabold tracking-tight text-brand-text mt-3">
                We&apos;re here to assist you
              </h1>
              <p className="text-base sm:text-lg text-brand-muted leading-relaxed max-w-2xl mx-auto mt-3">
                Have questions regarding high-volume storage, catalog migration, or creator payouts?
                Send us a direct inquiry.
              </p>
            </ScrollReveal>
          </Container>
        </section>

        {/* Contact Form Section */}
        <section className="py-20 sm:py-24 border-b border-brand-border">
          <Container className="max-w-xl mx-auto px-4 sm:px-6">
            <ScrollReveal duration={700} variant="subtle">
              <div className="double-bezel p-1.5 sm:p-2 rounded-[2rem] bg-brand-surface/40 border border-brand-border shadow-2xl">
                <Card className="p-8 sm:p-10 border-0 shadow-none bg-brand-surface rounded-[calc(2rem-6px)]">
                  {submitted ? (
                    <div className="py-12 text-center space-y-4 animate-in fade-in duration-300">
                      <div className="h-16 w-16 rounded-2xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center mx-auto border border-emerald-500/20 shadow-xs">
                        <CheckCircle2 className="h-8 w-8" />
                      </div>
                      <h3 className="text-2xl font-display font-bold text-brand-text">Message Dispatched</h3>
                      <p className="text-xs sm:text-sm text-brand-muted max-w-sm mx-auto leading-relaxed">
                        Thank you for reaching out. Our creator operations team will respond to your registered
                        email within 24 business hours.
                      </p>
                      <div className="pt-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setSubmitted(false)}
                          className="rounded-full"
                        >
                          Send Another Note
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-4 pt-2">
                      <WaveInput
                        id="name"
                        label="Your Name"
                        required
                      />

                      <WaveInput
                        id="email"
                        type="email"
                        label="Email Address"
                        required
                      />

                      <WaveInput
                        id="subject"
                        label="Inquiry Subject"
                        required
                      />

                      <div className="space-y-1.5 pt-2">
                        <Label htmlFor="message" required className="text-xs font-semibold text-brand-muted">
                          Message Details
                        </Label>
                        <textarea
                          id="message"
                          rows={4}
                          required
                          placeholder="Tell us about your audience, storage needs, or specific question..."
                          className="w-full rounded-xl border border-brand-border bg-brand-surface p-3 text-sm text-brand-text placeholder:text-brand-muted/70 outline-none focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 transition-all resize-none shadow-xs"
                        />
                      </div>

                      <div className="pt-3">
                        <Button
                          type="submit"
                          variant="primary"
                          size="lg"
                          isLoading={loading}
                          className="w-full justify-center rounded-xl shadow-lg shadow-brand-primary/25 hover:scale-[1.01] active:scale-[0.98] transition-all"
                        >
                          <Send className="h-4 w-4 mr-2" />
                          <span>Dispatch Message</span>
                        </Button>
                      </div>
                    </form>
                  )}
                </Card>
              </div>
            </ScrollReveal>
          </Container>
        </section>
      </main>

      <MarketingFooter />
    </div>
  );
}
