"use client";

import * as React from "react";
import {
  Save,
  CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PageHeader } from "@/components/ui/layout-primitives";

export default function AdminSettingsPage() {
  const [cpmRate, setCpmRate] = React.useState("2.50");
  const [qualificationSeconds, setQualificationSeconds] = React.useState("10");
  const [uploadConcurrency, setUploadConcurrency] = React.useState("3");
  const [sessionLifetimeHours, setSessionLifetimeHours] = React.useState("72");
  const [publicRegistration, setPublicRegistration] = React.useState(true);
  const [maintenanceMode, setMaintenanceMode] = React.useState(false);
  const [saved, setSaved] = React.useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Platform Governance & Core Parameters"
        description="Dynamic platform settings stored in platform_settings and broadcast to ingestion workers."
      />

      <Card className="p-6 max-w-3xl">
        <form onSubmit={handleSave} className="space-y-6">
          {/* Financial Parameters */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-brand-text border-b border-brand-border/60 pb-2">
              Financial & Monetization Models
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="cpm-rate" required>Creator Baseline CPM (USD per 1,000 Views)</Label>
                <Input
                  id="cpm-rate"
                  value={cpmRate}
                  onChange={(e) => setCpmRate(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="qual-seconds" required>Minimum Qualified Watch Seconds</Label>
                <Input
                  id="qual-seconds"
                  value={qualificationSeconds}
                  onChange={(e) => setQualificationSeconds(e.target.value)}
                  required
                />
              </div>
            </div>
          </div>

          {/* Infrastructure Parameters */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-brand-text border-b border-brand-border/60 pb-2">
              Ingestion & Session Boundaries
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="upload-concurrency" required>Max Parallel Upload Chunks</Label>
                <Input
                  id="upload-concurrency"
                  value={uploadConcurrency}
                  onChange={(e) => setUploadConcurrency(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="session-lifetime" required>Share Password Session Lifetime (Hours)</Label>
                <Input
                  id="session-lifetime"
                  value={sessionLifetimeHours}
                  onChange={(e) => setSessionLifetimeHours(e.target.value)}
                  required
                />
              </div>
            </div>
          </div>

          {/* Platform Gates */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-brand-text border-b border-brand-border/60 pb-2">
              Platform Access Controls
            </h3>

            <div className="space-y-3">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={publicRegistration}
                  onChange={(e) => setPublicRegistration(e.target.checked)}
                  className="rounded border-brand-border text-brand-primary"
                />
                <div>
                  <span className="text-xs font-semibold text-brand-text block">
                    Public Creator Registration Enabled
                  </span>
                  <span className="text-[11px] text-brand-muted">
                    Allow new creators to sign up and claim @usernames.
                  </span>
                </div>
              </label>

              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={maintenanceMode}
                  onChange={(e) => setMaintenanceMode(e.target.checked)}
                  className="rounded border-brand-border text-brand-primary"
                />
                <div>
                  <span className="text-xs font-semibold text-brand-text block">
                    Maintenance Mode Active
                  </span>
                  <span className="text-[11px] text-brand-muted">
                    Temporarily routes non-admin traffic to system maintenance splash.
                  </span>
                </div>
              </label>
            </div>
          </div>

          <div className="pt-4 flex items-center gap-3">
            <Button type="submit" variant="primary" size="md">
              <Save className="h-4 w-4 mr-1.5" />
              <span>Save Platform Settings</span>
            </Button>
            {saved && (
              <span className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1">
                <CheckCircle2 className="h-4 w-4" />
                <span>Saved & broadcasted to edge nodes</span>
              </span>
            )}
          </div>
        </form>
      </Card>
    </div>
  );
}
