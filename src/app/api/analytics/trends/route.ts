import { NextResponse } from "next/server";
import { analyticsService } from "@/lib/services/analytics.service";

export async function GET() {
  try {
    const trends = await analyticsService.getTrends();
    return NextResponse.json(trends);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to load trend data";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
