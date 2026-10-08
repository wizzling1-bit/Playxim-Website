"use client";

import * as React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface TrafficPoint {
  date: string;
  views: number;
  downloads: number;
}

export default function AnalyticsChart({ data }: { data: TrafficPoint[] }) {
  return (
    <div className="h-72 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data}>
          <defs>
            <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#1E6BFF" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#1E6BFF" stopOpacity={0.0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
          <XAxis dataKey="date" stroke="#888888" fontSize={11} tickLine={false} />
          <YAxis stroke="#888888" fontSize={11} tickLine={false} tickFormatter={(val) => `${val / 1000}k`} />
          <Tooltip
            contentStyle={{
              backgroundColor: "var(--surface)",
              borderColor: "var(--border)",
              borderRadius: "12px",
              fontSize: "12px",
            }}
          />
          <Area
            type="monotone"
            dataKey="views"
            stroke="#1E6BFF"
            strokeWidth={2}
            fillOpacity={1}
            fill="url(#colorViews)"
            name="Video Streams"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
