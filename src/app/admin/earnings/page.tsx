"use client";

import * as React from "react";
import {
  PlusCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { PageHeader } from "@/components/ui/layout-primitives";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { formatCurrency } from "@/lib/utils";

interface LedgerOverview {
  totalAccruedUsd: number;
  totalPendingUsd: number;
  totalAvailableUsd: number;
  totalPaidUsd: number;
}

export default function AdminEarningsPage() {
  const [overview] = React.useState<LedgerOverview>({
    totalAccruedUsd: 148200.5,
    totalPendingUsd: 12450.2,
    totalAvailableUsd: 48900.0,
    totalPaidUsd: 86850.3,
  });

  const [adjustDialogOpen, setAdjustDialogOpen] = React.useState(false);
  const [creatorHandle, setCreatorHandle] = React.useState("wizzling");
  const [adjustmentAmount, setAdjustmentAmount] = React.useState("50.00");
  const [auditReason, setAuditReason] = React.useState("");

  const handleAdjustSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!auditReason.trim()) {
      alert("Mandatory audit reason required for manual ledger adjustments.");
      return;
    }

    alert(
      `Ledger adjustment of $${adjustmentAmount} recorded for @${creatorHandle}. Audit record appended to admin_audit_logs.`
    );
    setAdjustDialogOpen(false);
    setAuditReason("");
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Financial Ledger & Payout Oversight"
        description="Inspect aggregate accruals, pending settlements, and manual adjustments."
        action={
          <Button variant="primary" size="sm" onClick={() => setAdjustDialogOpen(true)}>
            <PlusCircle className="h-4 w-4 mr-1.5" />
            <span>Manual Adjustment</span>
          </Button>
        }
      />

      {/* 4 Overview Metrics (§ 6.7) */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <Card className="p-4 space-y-1">
          <div className="text-xs text-brand-muted font-semibold uppercase">Total Accrued</div>
          <div className="text-2xl font-bold font-mono text-brand-text">
            {formatCurrency(overview.totalAccruedUsd)}
          </div>
          <div className="text-[11px] text-brand-muted">Cumulative gross creator pool</div>
        </Card>

        <Card className="p-4 space-y-1">
          <div className="text-xs text-brand-muted font-semibold uppercase">Pending Verification</div>
          <div className="text-2xl font-bold font-mono text-amber-500">
            {formatCurrency(overview.totalPendingUsd)}
          </div>
          <div className="text-[11px] text-brand-muted">Awaiting 24h anti-fraud window</div>
        </Card>

        <Card className="p-4 space-y-1">
          <div className="text-xs text-brand-muted font-semibold uppercase">Available for Payout</div>
          <div className="text-2xl font-bold font-mono text-brand-primary">
            {formatCurrency(overview.totalAvailableUsd)}
          </div>
          <div className="text-[11px] text-brand-muted">Eligible for Stripe payout</div>
        </Card>

        <Card className="p-4 space-y-1">
          <div className="text-xs text-brand-muted font-semibold uppercase">Total Disbursed</div>
          <div className="text-2xl font-bold font-mono text-emerald-600 dark:text-emerald-400">
            {formatCurrency(overview.totalPaidUsd)}
          </div>
          <div className="text-[11px] text-brand-muted">Settled to bank accounts</div>
        </Card>
      </div>

      {/* Adjustment Dialog with Mandatory Audit Log Reason (§ 6.7) */}
      <Dialog open={adjustDialogOpen} onOpenChange={setAdjustDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Manual Balance Adjustment</DialogTitle>
            <DialogDescription>
              All balance overrides require a verified operational rationale and are permanently written to <code>admin_audit_logs</code>.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleAdjustSubmit} className="py-2 space-y-4 text-xs">
            <div className="space-y-1.5">
              <Label htmlFor="creator-handle" required>Creator Handle</Label>
              <Input
                id="creator-handle"
                value={creatorHandle}
                onChange={(e) => setCreatorHandle(e.target.value)}
                required
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="adjust-amount" required>Adjustment Amount (+ or - USD)</Label>
              <Input
                id="adjust-amount"
                type="number"
                step="0.01"
                value={adjustmentAmount}
                onChange={(e) => setAdjustmentAmount(e.target.value)}
                required
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="audit-reason" required>Mandatory Audit Log Reason</Label>
              <textarea
                id="audit-reason"
                rows={3}
                placeholder="e.g. Promotional partnership bonus approved by finance team (Ticket #SEC-4192)"
                value={auditReason}
                onChange={(e) => setAuditReason(e.target.value)}
                required
                className="w-full rounded-[var(--radius-md)] border border-brand-border bg-brand-surface p-2.5 text-xs text-brand-text outline-none focus:border-brand-primary"
              />
            </div>

            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setAdjustDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" variant="primary">
                Record Adjustment & Audit
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
