import { EarningsLedgerEntry, CreatorBalance, Payout } from "@/lib/types/database";
import {
  doc,
  getDoc,
  setDoc,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { db } from "@/lib/firebase/client";

// In-memory ledger storage for double-entry records
const devLedgerStore: EarningsLedgerEntry[] = [
  {
    id: "tx-1",
    creator_id: "demo-creator-1",
    content_id: "sample-video-1",
    source_type: "qualified_views",
    source_event_id: null,
    eligible_views: 48000,
    rate_per_1000_views: 2.5,
    amount_usd: 120.0,
    status: "available",
    created_at: new Date(Date.now() - 86400000 * 5).toISOString(),
  },
  {
    id: "tx-2",
    creator_id: "demo-creator-1",
    content_id: "sample-video-2",
    source_type: "qualified_views",
    source_event_id: null,
    eligible_views: 32000,
    rate_per_1000_views: 2.5,
    amount_usd: 80.0,
    status: "available",
    created_at: new Date(Date.now() - 86400000 * 3).toISOString(),
  },
  {
    id: "tx-3",
    creator_id: "demo-creator-1",
    content_id: "sample-video-1",
    source_type: "qualified_views",
    source_event_id: null,
    eligible_views: 18400,
    rate_per_1000_views: 2.5,
    amount_usd: 46.0,
    status: "pending",
    created_at: new Date(Date.now() - 86400000 * 1).toISOString(),
  },
];

const devBalanceStore: Map<string, CreatorBalance> = new Map([
  [
    "demo-creator-1",
    {
      creator_id: "demo-creator-1",
      total_earned_usd: 3420.5,
      pending_usd: 184.2,
      available_usd: 736.3,
      paid_usd: 2500.0,
      updated_at: new Date().toISOString(),
    },
  ],
]);

class EarningsService {
  private defaultRatePer1000 = 2.5; // $2.50 per 1,000 qualified views

  /**
   * Appends an immutable qualified view earning record to the ledger
   */
  public async recordQualifiedViews(params: {
    creatorId: string;
    contentId: string | null;
    qualifiedViews: number;
    customRate?: number;
  }): Promise<EarningsLedgerEntry> {
    const rate = params.customRate ?? this.defaultRatePer1000;
    const amountUsd = Number(((params.qualifiedViews / 1000) * rate).toFixed(6));

    const entry: EarningsLedgerEntry = {
      id: `tx_${Date.now()}_${Math.random().toString(36).substring(7)}`,
      creator_id: params.creatorId,
      content_id: params.contentId,
      source_type: "qualified_views",
      source_event_id: null,
      eligible_views: params.qualifiedViews,
      rate_per_1000_views: rate,
      amount_usd: amountUsd,
      status: "pending",
      created_at: new Date().toISOString(),
    };

    devLedgerStore.unshift(entry);

    // Update aggregate balances
    const balance = devBalanceStore.get(params.creatorId) || {
      creator_id: params.creatorId,
      total_earned_usd: 0,
      pending_usd: 0,
      available_usd: 0,
      paid_usd: 0,
      updated_at: new Date().toISOString(),
    };

    balance.total_earned_usd = Number((balance.total_earned_usd + amountUsd).toFixed(2));
    balance.pending_usd = Number((balance.pending_usd + amountUsd).toFixed(2));
    balance.updated_at = new Date().toISOString();
    devBalanceStore.set(params.creatorId, balance);

    // Non-blocking Firestore persistence
    setDoc(doc(db, "earnings_ledger", entry.id), entry).catch((err) => {
      console.warn("Could not write earnings record to Firestore:", err);
    });
    setDoc(doc(db, "creator_balances", params.creatorId), balance, { merge: true }).catch((err) => {
      console.warn("Could not write creator balance to Firestore:", err);
    });

    return entry;
  }

  /**
   * Retrieves current creator financial balance (Stale-while-revalidate with Firestore)
   */
  public async getBalance(creatorId: string): Promise<CreatorBalance> {
    const cached = devBalanceStore.get(creatorId);
    if (cached) {
      // Asynchronously refresh from Firestore in background
      getDoc(doc(db, "creator_balances", creatorId))
        .then((snap) => {
          if (snap.exists()) {
            devBalanceStore.set(creatorId, snap.data() as CreatorBalance);
          }
        })
        .catch(() => {});
      return cached;
    }

    try {
      const snap = await Promise.race([
        getDoc(doc(db, "creator_balances", creatorId)),
        new Promise<null>((resolve) => setTimeout(() => resolve(null), 400)),
      ]);
      if (snap && snap.exists()) {
        const bal = snap.data() as CreatorBalance;
        devBalanceStore.set(creatorId, bal);
        return bal;
      }
    } catch {
      // Fallback
    }

    return {
      creator_id: creatorId,
      total_earned_usd: 0,
      pending_usd: 0,
      available_usd: 0,
      paid_usd: 0,
      updated_at: new Date().toISOString(),
    };
  }

  /**
   * Lists historical ledger transactions
   */
  public async listTransactions(creatorId: string): Promise<EarningsLedgerEntry[]> {
    try {
      const ledgerCol = collection(db, "earnings_ledger");
      const q = query(ledgerCol, where("creator_id", "==", creatorId));
      const snap = await getDocs(q);
      if (!snap.empty) {
        snap.forEach((d) => {
          const item = d.data() as EarningsLedgerEntry;
          if (!devLedgerStore.some((x) => x.id === item.id)) {
            devLedgerStore.unshift(item);
          }
        });
      }
    } catch {
      // Fallback
    }

    return devLedgerStore.filter((tx) => tx.creator_id === creatorId);
  }

  /**
   * Submits a payout request for available balance
   */
  public async requestPayout(
    creatorId: string,
    amountUsd: number
  ): Promise<{ success: boolean; payout?: Payout; error?: string }> {
    const balance = await this.getBalance(creatorId);

    if (amountUsd < 50) {
      return { success: false, error: "Minimum payout request threshold is $50.00" };
    }

    if (amountUsd > balance.available_usd) {
      return { success: false, error: "Insufficient available balance" };
    }

    // Deduct available
    balance.available_usd = Number((balance.available_usd - amountUsd).toFixed(2));
    balance.paid_usd = Number((balance.paid_usd + amountUsd).toFixed(2));
    balance.updated_at = new Date().toISOString();
    devBalanceStore.set(creatorId, balance);

    const payout: Payout = {
      id: `po_${Date.now()}_${Math.random().toString(36).substring(7)}`,
      creator_id: creatorId,
      amount_usd: amountUsd,
      provider: "stripe_connect",
      provider_reference: `ch_${Date.now()}`,
      status: "processing",
      requested_at: new Date().toISOString(),
      processed_at: null,
      created_at: new Date().toISOString(),
    };

    const debitTx: EarningsLedgerEntry = {
      id: `tx_${Date.now()}`,
      creator_id: creatorId,
      content_id: null,
      source_type: "payout",
      source_event_id: null,
      eligible_views: 0,
      rate_per_1000_views: 0,
      amount_usd: -amountUsd,
      status: "approved",
      created_at: new Date().toISOString(),
    };

    devLedgerStore.unshift(debitTx);

    // Non-blocking Firestore persistence
    setDoc(doc(db, "payout_requests", payout.id), payout).catch((err) => {
      console.warn("Could not save payout to Firestore:", err);
    });
    setDoc(doc(db, "creator_balances", creatorId), balance, { merge: true }).catch((err) => {
      console.warn("Could not update creator balance in Firestore:", err);
    });
    setDoc(doc(db, "earnings_ledger", debitTx.id), debitTx).catch((err) => {
      console.warn("Could not save debit tx in Firestore:", err);
    });

    return { success: true, payout };
  }
}

export const earningsService = new EarningsService();
