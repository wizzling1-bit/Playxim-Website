import crypto from "crypto";
import { earningsService } from "@/lib/services/earnings.service";
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/lib/firebase/client";

export interface ViewEventPayload {
  contentId: string;
  shareCode?: string;
  watchSeconds: number;
  eventType: "view_start" | "view_progress" | "view_qualified";
  viewerIp?: string;
  userAgent?: string;
}

export interface AnalyticsTrendPoint {
  date: string;
  views: number;
  qualifiedViews: number;
  earningsUsd: number;
}

export interface GeographicDistribution {
  country: string;
  code: string;
  views: number;
  percentage: number;
}

// In-memory telemetry cache for deduplication & session storage
const processedViewKeys = new Set<string>();

class AnalyticsService {
  /**
   * Hashes viewer footprint for privacy-preserving deduplication (§ TRD Section 3.4)
   */
  public generateViewerHash(viewerIp?: string, userAgent?: string): string {
    const raw = `${viewerIp || "127.0.0.1"}_${userAgent || "unknown"}`;
    return crypto.createHash("sha256").update(raw).digest("hex").substring(0, 16);
  }

  /**
   * Ingests a playback event with anti-gaming idempotency and logs to Cloud Firestore
   */
  public async ingestViewEvent(payload: ViewEventPayload): Promise<{
    accepted: boolean;
    isQualified: boolean;
    reason?: string;
  }> {
    const today = new Date().toISOString().slice(0, 10);
    const viewerHash = this.generateViewerHash(payload.viewerIp, payload.userAgent);
    const dedupKey = `${today}:${payload.contentId}:${viewerHash}`;

    // Minimum 10 seconds watch time to count as a qualified view (§ Phase 11 & 12)
    const isQualified = payload.watchSeconds >= 10;

    // Log telemetry event to Firestore asynchronously
    const eventId = `evt_${Date.now()}_${Math.random().toString(36).substring(7)}`;
    try {
      const eventRef = doc(db, "analytics_events", eventId);
      await setDoc(eventRef, {
        event_id: eventId,
        content_id: payload.contentId,
        share_code: payload.shareCode || null,
        watch_seconds: payload.watchSeconds,
        event_type: payload.eventType,
        viewer_hash: viewerHash,
        is_qualified: isQualified,
        created_at: new Date().toISOString(),
      });
    } catch (err) {
      console.warn("Could not record analytics event to Firestore:", err);
    }

    if (!isQualified) {
      return { accepted: true, isQualified: false, reason: "Below qualification threshold" };
    }

    // Check anti-gaming duplicate view in same 24-hour cycle
    if (processedViewKeys.has(dedupKey)) {
      return { accepted: true, isQualified: false, reason: "Duplicate view in 24h window" };
    }

    processedViewKeys.add(dedupKey);

    // Accrue earnings in the financial ledger
    await earningsService.recordQualifiedViews({
      creatorId: "demo-creator-1",
      contentId: payload.contentId,
      qualifiedViews: 1,
    });

    return { accepted: true, isQualified: true };
  }

  /**
   * Returns creator analytics overview metrics
   */
  public async getOverview(creatorId: string) {
    return {
      creatorId,
      totalViews: 384900,
      qualifiedViews: 312400,
      totalWatchHours: 14280,
      totalStorageBytes: 4280000000000, // 4.28 TB
      qualificationRate: 81.2, // %
      estimatedEarningsUsd: 781.0,
    };
  }

  /**
   * Returns 14-day trends for Recharts
   */
  public async getTrends(): Promise<AnalyticsTrendPoint[]> {
    const result: AnalyticsTrendPoint[] = [];
    const now = Date.now();

    for (let i = 13; i >= 0; i--) {
      const d = new Date(now - i * 86400000);
      const dateStr = d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
      const baseViews = 18000 + Math.floor(Math.sin(i) * 5000) + Math.floor(Math.random() * 2000);
      const qualified = Math.floor(baseViews * 0.82);
      const earnings = Number(((qualified / 1000) * 2.5).toFixed(2));

      result.push({
        date: dateStr,
        views: baseViews,
        qualifiedViews: qualified,
        earningsUsd: earnings,
      });
    }

    return result;
  }

  /**
   * Returns top viewer countries
   */
  public async getGeographicDistribution(): Promise<GeographicDistribution[]> {
    return [
      { country: "United States", code: "US", views: 142000, percentage: 36.9 },
      { country: "Germany", code: "DE", views: 68000, percentage: 17.7 },
      { country: "United Kingdom", code: "GB", views: 49000, percentage: 12.7 },
      { country: "Japan", code: "JP", views: 34000, percentage: 8.8 },
      { country: "India", code: "IN", views: 28000, percentage: 7.3 },
      { country: "Canada", code: "CA", views: 22000, percentage: 5.7 },
      { country: "Others", code: "GLOBAL", views: 41900, percentage: 10.9 },
    ];
  }
}

export const analyticsService = new AnalyticsService();
