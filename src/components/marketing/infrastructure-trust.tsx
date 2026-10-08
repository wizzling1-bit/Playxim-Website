"use client";

import * as React from "react";
import { ShieldCheck, Cloud, Cpu, Globe2, Lock, Zap } from "lucide-react";
import { Container, SectionHeader } from "@/components/ui/layout-primitives";
import { Badge } from "@/components/ui/badge";

export function InfrastructureTrustSection() {
  const providers = [
    {
      name: "Cloudflare R2",
      role: "Object Cloud Storage",
      description: "High-durability storage with zero egress bandwidth charges. Your fans and clients download freely.",
      metric: "99.999999999% Durability",
    },
    {
      name: "Cloudflare Stream",
      role: "Adaptive Video Encoding",
      description: "Automated multi-bitrate HLS/DASH video encoding cached across 300+ city edge points of presence.",
      metric: "300+ Global PoPs",
    },
    {
      name: "Firebase & Google Cloud",
      role: "Identity & Double-Entry Ledgers",
      description: "Enterprise user authentication, encrypted security rules, and real-time creator ledger tracking.",
      metric: "SOC 2 Type II Compliant",
    },
    {
      name: "Vercel Edge Network",
      role: "Application Infrastructure",
      description: "Sub-millisecond edge rendering and global DNS for instant link loading worldwide.",
      metric: "99.98% Global Uptime",
    },
  ];

  return (
    <section className="py-24 sm:py-32 border-t border-brand-border/60 bg-brand-surface/40 relative">
      <Container>
        <SectionHeader
          badge={<Badge variant="secondary">Reliability</Badge>}
          title="Built on infrastructure creators can rely on."
          description="Engineered on industry-leading primitives for maximum speed, zero file loss, and reliable creator monetization."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto pt-4 text-left">
          {providers.map((p, idx) => (
            <div
              key={p.name}
              className="p-6 rounded-2xl bg-brand-surface border border-brand-border shadow-xs hover:border-brand-primary/40 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-brand-primary">
                    {p.role}
                  </span>
                  <ShieldCheck className="h-4 w-4 text-emerald-800 dark:text-emerald-400" />
                </div>
                <h3 className="text-lg font-display font-bold text-brand-text">
                  {p.name}
                </h3>
                <p className="text-xs sm:text-sm text-brand-muted leading-relaxed">
                  {p.description}
                </p>
              </div>

              <div className="pt-3 border-t border-brand-border/60 text-xs font-mono font-semibold text-brand-text">
                {p.metric}
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
