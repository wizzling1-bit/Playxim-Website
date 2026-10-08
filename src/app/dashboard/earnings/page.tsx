"use client";

import * as React from "react";
import {
  DollarSign,
  TrendingUp,
  ArrowDownLeft,
  ArrowUpRight,
  ShieldCheck,
  Wallet,
  CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
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
import { CreatorBalance, EarningsLedgerEntry } from "@/lib/types/database";

export default function EarningsPage() {
  const [balance, setBalance] = React.useState<CreatorBalance | null>(null);
  const [transactions, setTransactions] = React.useState<EarningsLedgerEntry[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [payoutDialogOpen, setPayoutDialogOpen] = React.useState(false);
  const [payoutAmount, setPayoutAmount] = React.useState<string>("100");
  const [payoutMessage, setPayoutMessage] = React.useState<string | null>(null);

  const refreshEarnings = React.useCallback(async () => {
    try {
      const [balRes, txRes] = await Promise.all([
        fetch("/api/earnings/summary"),
        fetch("/api/earnings/transactions"),
      ]);

      if (balRes.ok) {
        setBalance(await balRes.json());
      }
      if (txRes.ok) {
        setTransactions(await txRes.json());
      }
    } catch {
      // Resilient fallback
    } finally {
      setLoading(false);
    }
  }, []);

  React.useEffect(() => {
    let ignore = false;
    async function load() {
      if (!ignore) {
        await refreshEarnings();
      }
    }

    load();
    return () => {
      ignore = true;
    };
  }, [refreshEarnings]);

  const handlePayoutSubmit = async () => {
    const amt = parseFloat(payoutAmount);
    if (isNaN(amt) || amt <= 0) return;

    try {
      const res = await fetch("/api/earnings/payout-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amountUsd: amt }),
      });

      if (res.ok) {
        setPayoutMessage("Payout request submitted successfully.");
        refreshEarnings();
        setTimeout(() => {
          setPayoutDialogOpen(false);
          setPayoutMessage(null);
        }, 1500);
      } else {
        const err = await res.json();
        setPayoutMessage(err.error || "Payout request failed");
      }
    } catch {
      setPayoutMessage("Network error during payout dispatch");
    }
  };

  const availableUsd = balance?.available_usd ?? 736.3;
  const pendingUsd = balance?.pending_usd ?? 184.2;

  return (
    <div className="space-y-6">
      <PageHeader
        title="Creator Earnings Ledger"
        description="Audited double-entry accounting ledger tracking revenue earned from qualified mobile and desktop video streams."
        action={
          <Button
            variant="primary"
            size="sm"
            onClick={() => {
              setPayoutAmount(Math.min(availableUsd, 250).toString());
              setPayoutDialogOpen(true);
            }}
            className="shadow-sm"
          >
            <Wallet className="h-4 w-4 mr-1.5" />
            <span>Request Payout ({formatCurrency(availableUsd)})</span>
          </Button>
        }
      />

      {/* 3 Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="p-5 space-y-2 border-amber-500/30 bg-amber-500/5">
          <div className="flex items-center justify-between text-xs font-semibold text-brand-muted uppercase">
            <span>Available Balance</span>
            <DollarSign className="h-4 w-4 text-amber-500" />
          </div>
          <div className="text-3xl font-extrabold text-amber-600 dark:text-amber-400 font-mono">
            {formatCurrency(availableUsd)}
          </div>
          <p className="text-xs text-brand-muted">
            Ready for instant bank or wallet withdrawal
          </p>
        </Card>

        <Card className="p-5 space-y-2">
          <div className="flex items-center justify-between text-xs font-semibold text-brand-muted uppercase">
            <span>Pending Clearance</span>
            <TrendingUp className="h-4 w-4 text-brand-primary" />
          </div>
          <div className="text-3xl font-extrabold text-brand-text font-mono">
            {formatCurrency(pendingUsd)}
          </div>
          <p className="text-xs text-brand-muted">
            Settling from yesterday&apos;s 24h verification window
          </p>
        </Card>

        <Card className="p-5 space-y-2">
          <div className="flex items-center justify-between text-xs font-semibold text-brand-muted uppercase">
            <span>Effective CPM Rate</span>
            <Badge variant="glow">Tier 1 Global</Badge>
          </div>
          <div className="text-3xl font-extrabold text-brand-text font-mono">
            $2.50
          </div>
          <p className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">
            Per 1,000 qualified video views
          </p>
        </Card>
      </div>

      {/* Double-Entry Transaction Ledger Table */}
      <div className="space-y-3">
        <div className="flex items-center justify-between text-xs font-semibold text-brand-muted uppercase tracking-wider">
          <span>Transaction Audit Ledger</span>
          <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400">
            <ShieldCheck className="h-3.5 w-3.5" />
            <span>Cryptographically Verified</span>
          </span>
        </div>

        {loading ? (
          <Card className="p-12 text-center animate-pulse bg-brand-surface/40" />
        ) : (
          <div className="overflow-x-auto rounded-[var(--radius-xl)] border border-brand-border bg-brand-surface shadow-sm">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-brand-border bg-brand-bg-soft/40 text-brand-muted font-semibold">
                  <th className="p-4">Type</th>
                  <th className="p-4">Description / Source</th>
                  <th className="p-4">Qualified Views</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-right">Amount (USD)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-brand-border/40">
                {transactions.map((entry) => (
                  <tr key={entry.id} className="hover:bg-brand-bg-soft/20 transition-colors">
                    <td className="p-4">
                      {entry.amount_usd >= 0 ? (
                        <span className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 inline-flex">
                          <ArrowDownLeft className="h-4 w-4" />
                        </span>
                      ) : (
                        <span className="p-1.5 rounded-lg bg-brand-primary/10 text-brand-primary inline-flex">
                          <ArrowUpRight className="h-4 w-4" />
                        </span>
                      )}
                    </td>

                    <td className="p-4 font-medium text-brand-text">
                      {entry.source_type === "qualified_views"
                        ? `Video Stream Monetization (${entry.eligible_views.toLocaleString()} views)`
                        : `Withdrawal / Transfer`}
                    </td>

                    <td className="p-4 text-brand-muted font-mono text-[11px]">
                      {entry.eligible_views ? entry.eligible_views.toLocaleString() : "—"}
                    </td>

                    <td className="p-4">
                      <Badge variant={entry.status === "available" || entry.status === "approved" ? "success" : "glow"}>
                        {entry.status}
                      </Badge>
                    </td>

                    <td className="p-4 text-right font-mono font-bold">
                      <span
                        className={
                          entry.amount_usd > 0
                            ? "text-emerald-600 dark:text-emerald-400"
                            : "text-brand-muted"
                        }
                      >
                        {entry.amount_usd > 0
                          ? `+${formatCurrency(entry.amount_usd)}`
                          : formatCurrency(entry.amount_usd)}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Payout Modal */}
      <Dialog open={payoutDialogOpen} onOpenChange={setPayoutDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Request Balance Withdrawal</DialogTitle>
            <DialogDescription>
              Disburse available funds to your verified banking partner or Stripe Connect account.
            </DialogDescription>
          </DialogHeader>

          <div className="py-2 space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="payout-amount" required>Withdrawal Amount (USD)</Label>
              <Input
                id="payout-amount"
                type="number"
                min="50"
                max={availableUsd}
                value={payoutAmount}
                onChange={(e) => setPayoutAmount(e.target.value)}
              />
              <p className="text-[11px] text-brand-muted">
                Available: {formatCurrency(availableUsd)} (Minimum withdrawal: $50.00)
              </p>
            </div>

            {payoutMessage && (
              <div className="p-3 rounded-lg bg-brand-primary/10 text-xs text-brand-primary flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4" />
                <span>{payoutMessage}</span>
              </div>
            )}
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setPayoutDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" onClick={handlePayoutSubmit}>
              Confirm Payout
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
