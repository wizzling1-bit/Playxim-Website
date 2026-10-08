"use client";

import * as React from "react";
import { Send, CheckCircle2 } from "lucide-react";
import { MarketingNavbar } from "@/components/marketing/navbar";
import { MarketingFooter } from "@/components/marketing/footer";
import { Container } from "@/components/ui/layout-primitives";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

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
        <section className="py-20 border-b border-brand-border bg-gradient-to-b from-brand-bg to-brand-bg-soft/40">
          <Container className="text-center max-w-3xl mx-auto space-y-4">
            <Badge variant="default">Creator Relations & Support</Badge>
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-brand-text">
              We&apos;re here to assist you
            </h1>
            <p className="text-lg text-brand-muted leading-relaxed">
              Have questions regarding high-volume storage, catalog migration, or creator payouts?
              Send us a direct inquiry.
            </p>
          </Container>
        </section>

        {/* Contact Form Section */}
        <section className="py-20 border-b border-brand-border">
          <Container className="max-w-xl mx-auto">
            <Card className="p-8 sm:p-10 shadow-xl border border-brand-border bg-brand-surface">
              {submitted ? (
                <div className="py-12 text-center space-y-4 animate-in fade-in duration-300">
                  <div className="h-16 w-16 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center mx-auto border border-emerald-500/20">
                    <CheckCircle2 className="h-8 w-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-brand-text">Message Dispatched</h3>
                  <p className="text-sm text-brand-muted max-w-sm mx-auto leading-relaxed">
                    Thank you for reaching out. Our creator operations team will respond to your registered
                    email within 24 business hours.
                  </p>
                  <Button variant="outline" size="sm" onClick={() => setSubmitted(false)}>
                    Send Another Note
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="space-y-1.5">
                    <Label htmlFor="name" required>Your Name</Label>
                    <Input id="name" placeholder="Alex Morgan" required />
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="email" required>Email Address</Label>
                    <Input id="email" type="email" placeholder="alex@creatorstudio.com" required />
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="subject" required>Inquiry Subject</Label>
                    <Input id="subject" placeholder="Large catalog migration / Creator Program inquiry" required />
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="message" required>Message Details</Label>
                    <textarea
                      id="message"
                      rows={4}
                      required
                      placeholder="Tell us about your audience, storage needs, or specific question..."
                      className="w-full rounded-[var(--radius-md)] border border-brand-border bg-brand-surface p-3 text-sm text-brand-text placeholder:text-brand-muted/70 outline-none focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 transition-all resize-none"
                    />
                  </div>

                  <div className="pt-2">
                    <Button type="submit" variant="primary" size="lg" isLoading={loading} className="w-full justify-center">
                      <Send className="h-4 w-4" />
                      <span>Dispatch Message</span>
                    </Button>
                  </div>
                </form>
              )}
            </Card>
          </Container>
        </section>
      </main>

      <MarketingFooter />
    </div>
  );
}
