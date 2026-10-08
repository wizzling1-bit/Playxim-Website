import { describe, it, expect } from "vitest";
import { earningsService } from "@/lib/services/earnings.service";

describe("Earnings Financial Ledger Tests", () => {
  it("calculates accurate USD monetization for qualified views at $2.50 per 1000", async () => {
    const entry = await earningsService.recordQualifiedViews({
      creatorId: "test_creator_1",
      contentId: "content_video_1",
      qualifiedViews: 20000,
    });

    // 20,000 views * ($2.50 / 1000) = $50.00
    expect(entry.amount_usd).toBe(50.0);
    expect(entry.status).toBe("pending");
    expect(entry.eligible_views).toBe(20000);
  });

  it("updates creator balances correctly and checks minimum payout thresholds", async () => {
    const balance = await earningsService.getBalance("test_creator_1");
    expect(balance.total_earned_usd).toBeGreaterThanOrEqual(50.0);

    // Minimum payout threshold is $50.00
    const failedPayout = await earningsService.requestPayout("test_creator_1", 20.0);
    expect(failedPayout.success).toBe(false);
    expect(failedPayout.error).toContain("Minimum payout request threshold is $50.00");
  });
});
