"use client";

import * as React from "react";
import {
  TrendingUp,
  Eye,
  Download,
  Clock,
  Globe2,
} from "lucide-react";
import dynamic from "next/dynamic";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PageHeader } from "@/components/ui/layout-primitives";

const AnalyticsChart = dynamic(
  () => import("@/components/dashboard/analytics-chart"),
  {
    ssr: false,
    loading: () => (
      <div className="h-72 w-full flex items-center justify-center bg-brand-surface-2/40 rounded-xl animate-pulse">
        <span className="text-xs text-brand-muted font-medium">Loading stream metrics...</span>
      </div>
    ),
  }
);

const TRAFFIC_DATA = [
  { date: "Oct 1", views: 24200, downloads: 1800 },
  { date: "Oct 2", views: 29800, downloads: 2100 },
  { date: "Oct 3", views: 35100, downloads: 2600 },
  { date: "Oct 4", views: 42000, downloads: 3400 },
  { date: "Oct 5", views: 48900, downloads: 3900 },
  { date: "Oct 6", views: 56400, downloads: 4200 },
  { date: "Oct 7", views: 68200, downloads: 5100 },
];

const TOP_COUNTRIES = [
  { code: "US", name: "United States", pct: "38%", views: "149.8K" },
  { code: "DE", name: "Germany", pct: "18%", views: "71.0K" },
  { code: "UK", name: "United Kingdom", pct: "14%", views: "55.2K" },
  { code: "JP", name: "Japan", pct: "12%", views: "47.3K" },
  { code: "IN", name: "India", pct: "9%", views: "35.5K" },
];

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Creator Analytics"
        description="First-party audience performance metrics, stream completion signals, and download statistics."
        action={
          <Badge variant="glow" className="flex items-center gap-1.5 py-1">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Real-time Stream Engine</span>
          </Badge>
        }
      />

      {/* Top 3 Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="p-5 space-y-2">
          <div className="flex items-center justify-between text-xs font-semibold text-brand-muted uppercase">
            <span>Weekly Video Streams</span>
            <Eye className="h-4 w-4 text-brand-primary" />
          </div>
          <div className="text-3xl font-extrabold text-brand-text">304.6K</div>
          <p className="text-xs text-emerald-600 dark:text-emerald-400 font-medium flex items-center gap-1">
            <TrendingUp className="h-3.5 w-3.5" />
            <span>+24.8% vs last week</span>
          </p>
        </Card>

        <Card className="p-5 space-y-2">
          <div className="flex items-center justify-between text-xs font-semibold text-brand-muted uppercase">
            <span>Raw File Downloads</span>
            <Download className="h-4 w-4 text-emerald-500" />
          </div>
          <div className="text-3xl font-extrabold text-brand-text">23.1K</div>
          <p className="text-xs text-brand-muted font-medium">
            18.4 TB edge bandwidth delivered
          </p>
        </Card>

        <Card className="p-5 space-y-2">
          <div className="flex items-center justify-between text-xs font-semibold text-brand-muted uppercase">
            <span>Avg. Watch Duration</span>
            <Clock className="h-4 w-4 text-amber-500" />
          </div>
          <div className="text-3xl font-extrabold text-brand-text">6m 42s</div>
          <p className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">
            88.2% qualification rate
          </p>
        </Card>
      </div>

      {/* Recharts Area Chart */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="font-bold text-base text-brand-text">Daily Stream & Download Velocity</h3>
            <p className="text-xs text-brand-muted mt-0.5">Continuous audience growth over past 7 days</p>
          </div>
          <Badge variant="secondary" className="text-xs">Past 7 Days</Badge>
        </div>

        <AnalyticsChart data={TRAFFIC_DATA} />
      </Card>

      {/* Geography Breakdown */}
      <Card className="p-6">
        <h3 className="font-bold text-base text-brand-text mb-4 flex items-center gap-2">
          <Globe2 className="h-4 w-4 text-brand-primary" />
          <span>Top Audience Regions</span>
        </h3>

        <div className="space-y-3">
          {TOP_COUNTRIES.map((c) => (
            <div key={c.code} className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-3">
                <span className="font-mono font-bold text-brand-primary w-6">{c.code}</span>
                <span className="font-medium text-brand-text">{c.name}</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="font-mono text-brand-muted">{c.views} views</span>
                <span className="font-mono font-bold text-brand-text w-10 text-right">{c.pct}</span>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
