import { NextResponse } from "next/server";
import { analyticsService } from "@/lib/services/analytics.service";

export async function GET() {
  try {
    const creatorId = "demo-creator-1";
    const overview = await analyticsService.getOverview(creatorId);
    const geo = await analyticsService.getGeographicDistribution();

    return NextResponse.json({
      overview,
      geographic: geo,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to load analytics overview";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
