"use client";

import * as React from "react";
import { Check, X, Minus } from "lucide-react";
import { Container, SectionHeader } from "@/components/ui/layout-primitives";
import { Badge } from "@/components/ui/badge";

export function ComparisonTableSection() {
  const rows = [
    {
      capability: "Creator Dashboard",
      playxim: "Dedicated creator control plane with live sync",
      traditional: "Generic folder file tree",
      hasPlayxim: true,
      hasTraditional: false,
    },
    {
      capability: "Shareable Content Links",
      playxim: "Instant branded shortlinks with zero ads",
      traditional: "Clunky download pages with bandwidth limits",
      hasPlayxim: true,
      hasTraditional: true,
    },
    {
      capability: "Creator Earnings",
      playxim: "Direct video stream CPM revenue accrual",
      traditional: "Zero monetization",
      hasPlayxim: true,
      hasTraditional: false,
    },
    {
      capability: "Content Analytics",
      playxim: "Full watch time, view counts, and retention curves",
      traditional: "Basic download tally",
      hasPlayxim: true,
      hasTraditional: false,
    },
    {
      capability: "Public Creator Profile",
      playxim: "Branded creator hub with playlists and links",
      traditional: "None",
      hasPlayxim: true,
      hasTraditional: false,
    },
    {
      capability: "Unlimited Storage Policy",
      playxim: "Unlimited by policy without arbitrary creator caps",
      traditional: "Expensive monthly storage tiers",
      hasPlayxim: true,
      hasTraditional: false,
    },
  ];

  return (
    <section className="py-24 sm:py-32 border-t border-brand-border/60 bg-brand-surface/40 relative">
      <Container className="max-w-4xl mx-auto">
        <SectionHeader
          badge={<Badge variant="secondary">Comparison</Badge>}
          title="Built differently for creators."
          description="Traditional cloud storage charges you for bandwidth and ignores your audience. Playxim turns storage into an asset."
        />

        <div className="rounded-2xl border border-brand-border bg-brand-surface shadow-xl overflow-hidden text-left">
          <div className="overflow-x-auto">
            <table className="w-full text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-brand-border bg-brand-bg-soft/70">
                  <th className="py-4 px-5 sm:px-6 font-semibold text-brand-muted">Capability</th>
                  <th className="py-4 px-5 sm:px-6 font-bold text-brand-primary bg-brand-primary/5 border-x border-brand-primary/20">
                    Playxim
                  </th>
                  <th className="py-4 px-5 sm:px-6 font-semibold text-brand-muted">Traditional Storage</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-brand-border/60 font-medium">
                {rows.map((row, idx) => (
                  <tr key={idx} className="hover:bg-brand-bg-soft/40 transition-colors">
                    <td className="py-4 px-5 sm:px-6 font-semibold text-brand-text">
                      {row.capability}
                    </td>
                    <td className="py-4 px-5 sm:px-6 bg-brand-primary/5 border-x border-brand-primary/20 text-brand-text font-medium">
                      <div className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-brand-primary shrink-0 font-bold" />
                        <span>{row.playxim}</span>
                      </div>
                    </td>
                    <td className="py-4 px-5 sm:px-6 text-brand-muted">
                      <div className="flex items-center gap-2">
                        {row.hasTraditional ? (
                          <Check className="h-4 w-4 text-brand-muted shrink-0 opacity-70" />
                        ) : (
                          <Minus className="h-4 w-4 text-brand-muted shrink-0 opacity-40" />
                        )}
                        <span>{row.traditional}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Container>
    </section>
  );
}
