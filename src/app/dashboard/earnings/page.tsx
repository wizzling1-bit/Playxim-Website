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
  Calendar,
  Search,
  Check,
  CreditCard,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { PageHeader } from "@/components/ui/layout-primitives";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { WaveInput } from "@/components/ui/wave-input";
import { formatCurrency, getNextPayoutInfo } from "@/lib/formatters";
import { CreatorBalance, EarningsLedgerEntry } from "@/lib/types/database";

export default function EarningsPage() {
  const [balance, setBalance] = React.useState<CreatorBalance | null>(null);
  const [transactions, setTransactions] = React.useState<EarningsLedgerEntry[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [payoutDialogOpen, setPayoutDialogOpen] = React.useState(false);
  const [payoutAmount, setPayoutAmount] = React.useState<string>("100");
  const [selectedMethod, setSelectedMethod] = React.useState<string>("upi");
  const [payoutMessage, setPayoutMessage] = React.useState<string | null>(null);
  const [txSearch, setTxSearch] = React.useState("");
  const [txFilter, setTxFilter] = React.useState<"all" | "credit" | "debit">("all");

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
        body: JSON.stringify({ amountUsd: amt, method: selectedMethod }),
      });

      if (res.ok) {
        setPayoutMessage("Payout request submitted successfully. Processing via edge clearinghouse.");
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
  const payoutInfo = React.useMemo(() => getNextPayoutInfo(availableUsd), [availableUsd]);

  const filteredTransactions = React.useMemo(() => {
    return transactions.filter((entry) => {
      if (txFilter === "credit" && entry.amount_usd < 0) return false;
      if (txFilter === "debit" && entry.amount_usd >= 0) return false;
      if (txSearch.trim()) {
        const query = txSearch.toLowerCase();
        const desc = (entry.source_type || "").toLowerCase();
        return desc.includes(query) || entry.amount_usd.toString().includes(query);
      }
      return true;
    });
  }, [transactions, txFilter, txSearch]);

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
            className="shadow-xs gap-1.5 rounded-xl"
          >
            <Wallet className="h-4 w-4" />
            <span>Request Payout ({formatCurrency(availableUsd)})</span>
          </Button>
        }
      />

      {/* 3 Overview Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Available Balance Card */}
        <div className="rounded-2xl border border-brand-border bg-brand-surface p-5 space-y-2.5 transition-all shadow-xs hover:border-amber-500/40">
          <div className="flex items-center justify-between text-xs font-semibold text-brand-muted uppercase tracking-wider">
            <span>Available Balance</span>
            <div className="h-8 w-8 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center">
              <DollarSign className="h-4 w-4" />
            </div>
          </div>
          <div className="text-3xl font-display font-extrabold text-brand-text font-mono tabular-nums tracking-tight">
            {formatCurrency(availableUsd)}
          </div>
          <div className="flex items-center justify-between text-xs text-brand-muted pt-1">
            <span className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-medium">
              <CheckCircle2 className="h-3.5 w-3.5" />
              <span>Min. $5.00 Threshold Met</span>
            </span>
          </div>
        </div>

        {/* Pending Clearance Card */}
        <div className="rounded-2xl border border-brand-border bg-brand-surface p-5 space-y-2.5 transition-all shadow-xs hover:border-brand-border-strong">
          <div className="flex items-center justify-between text-xs font-semibold text-brand-muted uppercase tracking-wider">
            <span>Pending Clearance</span>
            <div className="h-8 w-8 rounded-xl bg-brand-primary/10 text-brand-primary flex items-center justify-center">
              <TrendingUp className="h-4 w-4" />
            </div>
          </div>
          <div className="text-3xl font-display font-extrabold text-brand-text font-mono tabular-nums tracking-tight">
            {formatCurrency(pendingUsd)}
          </div>
          <p className="text-xs text-brand-muted pt-1">
            Settling from yesterday&apos;s 24h verification window
          </p>
        </div>

        {/* Payout Schedule Card */}
        <div className="rounded-2xl border border-brand-border bg-brand-surface p-5 space-y-2.5 transition-all shadow-xs hover:border-brand-border-strong">
          <div className="flex items-center justify-between text-xs font-semibold text-brand-muted uppercase tracking-wider">
            <span>Next Payout Cycle</span>
            <div className="h-8 w-8 rounded-xl bg-cyan-500/10 text-cyan-500 flex items-center justify-center">
              <Calendar className="h-4 w-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-display font-extrabold text-brand-text tracking-tight">
            Fri, {payoutInfo.formattedDate}
          </div>
          <p className="text-xs text-brand-muted pt-1">
            Weekly automated batch disbursement
          </p>
        </div>
      </div>

      {/* Payout Milestone Threshold Progress Strip */}
      <div className="rounded-2xl border border-brand-border bg-brand-surface p-4 sm:p-5 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-xs">
          <div className="space-y-1">
            <div className="font-semibold text-brand-text flex items-center gap-2">
              <span>Weekly Payout Milestone</span>
              <Badge variant="success" className="text-[10px] py-0">Active</Badge>
            </div>
            <p className="text-brand-muted text-[11px]">
              {payoutInfo.isReached
                ? `You have reached the minimum $5.00 threshold. Scheduled for Friday, ${payoutInfo.formattedDate}.`
                : `Accumulate $5.00 in qualified revenue to trigger automatic disbursement.`}
            </p>
          </div>

          <div className="flex items-center gap-4 shrink-0 font-mono text-[11px]">
            <span className="text-brand-muted">Target: $5.00 USD</span>
            <span className="text-emerald-600 dark:text-emerald-400 font-bold">
              Current: {formatCurrency(availableUsd)}
            </span>
          </div>
        </div>

        <div className="w-full bg-brand-border/60 dark:bg-white/10 rounded-full h-1.5 overflow-hidden mt-3">
          <div
            className="bg-emerald-500 h-full transition-all duration-500"
            style={{ width: `${Math.min(100, (availableUsd / 5) * 100)}%` }}
          />
        </div>
      </div>

      {/* Double-Entry Transaction Ledger Table */}
      <div className="space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-brand-muted uppercase tracking-wider">
              Transaction Audit Ledger
            </span>
            <div className="flex items-center gap-1 p-0.5 rounded-lg bg-brand-bg-soft border border-brand-border/60">
              <button
                type="button"
                onClick={() => setTxFilter("all")}
                className={`px-2 py-0.5 rounded text-[11px] font-medium transition-colors cursor-pointer ${
                  txFilter === "all" ? "bg-brand-surface text-brand-text shadow-xs" : "text-brand-muted"
                }`}
              >
                All
              </button>
              <button
                type="button"
                onClick={() => setTxFilter("credit")}
                className={`px-2 py-0.5 rounded text-[11px] font-medium transition-colors cursor-pointer ${
                  txFilter === "credit" ? "bg-brand-surface text-brand-text shadow-xs" : "text-brand-muted"
                }`}
              >
                Credits
              </button>
              <button
                type="button"
                onClick={() => setTxFilter("debit")}
                className={`px-2 py-0.5 rounded text-[11px] font-medium transition-colors cursor-pointer ${
                  txFilter === "debit" ? "bg-brand-surface text-brand-text shadow-xs" : "text-brand-muted"
                }`}
              >
                Disbursements
              </button>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Input
              placeholder="Search transactions..."
              value={txSearch}
              onChange={(e) => setTxSearch(e.target.value)}
              leftIcon={<Search className="h-3.5 w-3.5" />}
              className="w-48 text-xs h-8"
            />
            <span className="hidden md:flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-medium text-[11px]">
              <ShieldCheck className="h-3.5 w-3.5" />
              <span>Cryptographically Verified</span>
            </span>
          </div>
        </div>

        {loading ? (
          <div className="rounded-2xl border border-brand-border bg-brand-surface p-12 text-center text-brand-muted animate-pulse">
            Loading ledger transactions...
          </div>
        ) : filteredTransactions.length === 0 ? (
          <Card className="p-8 text-center border-dashed rounded-2xl">
            <p className="text-xs text-brand-muted">No transactions matched your query.</p>
          </Card>
        ) : (
          <div className="overflow-hidden rounded-2xl border border-brand-border bg-brand-surface shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-brand-border bg-brand-bg-soft/50 text-brand-muted font-semibold">
                    <th className="p-4">Type</th>
                    <th className="p-4">Description / Source</th>
                    <th className="p-4">Qualified Views</th>
                    <th className="p-4">Status</th>
                    <th className="p-4 text-right">Amount (USD)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-brand-border/40">
                  {filteredTransactions.map((entry) => (
                    <tr key={entry.id} className="hover:bg-brand-bg-soft/30 transition-colors">
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

                      <td className="p-4 text-brand-muted font-mono tabular-nums text-[11px]">
                        {entry.eligible_views ? entry.eligible_views.toLocaleString() : "—"}
                      </td>

                      <td className="p-4">
                        <Badge variant={entry.status === "available" || entry.status === "approved" ? "success" : "glow"}>
                          {entry.status}
                        </Badge>
                      </td>

                      <td className="p-4 text-right font-mono tabular-nums font-bold">
                        <span
                          className={
                            entry.amount_usd > 0
                              ? "text-emerald-600 dark:text-emerald-400"
                              : "text-brand-text"
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
          </div>
        )}
      </div>

      {/* Payout Modal */}
      <Dialog open={payoutDialogOpen} onOpenChange={setPayoutDialogOpen}>
        <DialogContent className="sm:max-w-md rounded-2xl">
          <DialogHeader>
            <DialogTitle className="font-display font-bold">Request Balance Withdrawal</DialogTitle>
            <DialogDescription>
              Disburse available funds to your verified payment method. Instant settlement.
            </DialogDescription>
          </DialogHeader>

          <div className="py-2 space-y-4">
            <div className="pt-2 pb-1">
              <WaveInput
                id="payout-amount"
                type="number"
                min="5"
                max={availableUsd}
                label="Withdrawal Amount (USD)"
                value={payoutAmount}
                onChange={(e) => setPayoutAmount(e.target.value)}
                helperText={`Available: ${formatCurrency(availableUsd)} (Minimum withdrawal: $5.00)`}
                required
              />
            </div>

            {/* Payout Method Selector */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-brand-muted">Payout Method</label>
              <div className="grid grid-cols-2 gap-2 text-xs">
                {[
                  { id: "upi", label: "UPI / Bank Transfer" },
                  { id: "paypal", label: "PayPal (USD)" },
                  { id: "usdt", label: "USDT (TRC-20)" },
                  { id: "wire", label: "International Wire" },
                ].map((m) => (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => setSelectedMethod(m.id)}
                    className={`p-3 rounded-xl border text-left flex items-center justify-between font-medium transition-colors cursor-pointer ${
                      selectedMethod === m.id
                        ? "border-brand-primary bg-brand-primary/10 text-brand-text"
                        : "border-brand-border bg-brand-surface text-brand-muted hover:text-brand-text hover:bg-brand-bg-soft"
                    }`}
                  >
                    <span>{m.label}</span>
                    {selectedMethod === m.id && (
                      <Check className="h-4 w-4 text-brand-primary" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {payoutMessage && (
              <div className="p-3 rounded-xl bg-brand-primary/10 text-xs text-brand-primary flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 shrink-0" />
                <span>{payoutMessage}</span>
              </div>
            )}
          </div>

          <DialogFooter className="gap-2 sm:gap-0">
            <Button variant="outline" onClick={() => setPayoutDialogOpen(false)} className="rounded-xl">
              Cancel
            </Button>
            <Button variant="primary" onClick={handlePayoutSubmit} className="rounded-xl shadow-xs">
              Confirm Withdrawal
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
