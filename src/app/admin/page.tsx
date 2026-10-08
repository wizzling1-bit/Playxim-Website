import * as React from "react";
import {
  Users,
  HardDrive,
  Eye,
  DollarSign,
  UploadCloud,
  CheckCircle2,
  Server,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PageHeader } from "@/components/ui/layout-primitives";

export default function AdminDashboardPage() {
  const topMetrics = [
    { label: "Total Users", value: "14,820", sub: "+124 today", icon: Users },
    { label: "Active Creators", value: "3,180", sub: "98% verified", icon: Users },
    { label: "Uploads Today", value: "482", sub: "1.2 TB ingested", icon: UploadCloud },
    { label: "Storage Used", value: "48.2 TB", sub: "R2 + Stream", icon: HardDrive },
    { label: "Views Today", value: "842.1K", sub: "82% qualified", icon: Eye },
    { label: "Processing Queue", value: "0", sub: "All jobs clean", icon: Server },
    { label: "Earnings Accrued", value: "$2,105.25", sub: "Current cycle", icon: DollarSign },
  ];

  const systemHealth = [
    { service: "Cloudflare R2 Multipart", status: "Healthy", latency: "42ms", rate: "99.98%" },
    { service: "Cloudflare Stream Video", status: "Healthy", latency: "110ms", rate: "99.95%" },
    { service: "Cloud Firestore & Security Rules", status: "Healthy", latency: "14ms", rate: "100%" },
    { service: "Ingestion Deduplication Queue", status: "Healthy", latency: "8ms", rate: "100%" },
    { service: "Stripe Connect Payouts", status: "Operational", latency: "240ms", rate: "99.9%" },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Operational Command Center"
        description="Global system telemetry, infrastructure ingestion health, and user metrics."
      />

      {/* 7 Top Command Cards (§ 6.2) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {topMetrics.map((m) => {
          const Icon = m.icon;
          return (
            <Card key={m.label} className="p-4 space-y-2">
              <div className="flex items-center justify-between text-xs font-semibold text-brand-muted">
                <span>{m.label}</span>
                <Icon className="h-4 w-4 text-brand-primary" />
              </div>
              <div className="text-2xl font-bold font-mono text-brand-text">
                {m.value}
              </div>
              <div className="text-[11px] text-brand-muted">{m.sub}</div>
            </Card>
          );
        })}
      </div>

      {/* System Health Breakdown (§ 6.2) */}
      <Card className="p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-sm text-brand-text flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-emerald-500" />
            <span>Infrastructure Node Health</span>
          </h3>
          <Badge variant="success" className="text-[10px]">All Systems Nominal</Badge>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead>
              <tr className="border-b border-brand-border text-brand-muted">
                <th className="pb-3 font-semibold">Service</th>
                <th className="pb-3 font-semibold">Status</th>
                <th className="pb-3 font-semibold">Latency</th>
                <th className="pb-3 font-semibold text-right">Success Rate</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-border/40">
              {systemHealth.map((sh) => (
                <tr key={sh.service}>
                  <td className="py-3 font-semibold text-brand-text">{sh.service}</td>
                  <td className="py-3 text-emerald-600 dark:text-emerald-400">
                    ● {sh.status}
                  </td>
                  <td className="py-3 text-brand-muted">{sh.latency}</td>
                  <td className="py-3 text-right font-bold text-brand-text">{sh.rate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
