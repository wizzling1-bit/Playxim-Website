import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { analyticsService } from "@/lib/services/analytics.service";

const viewEventSchema = z.object({
  contentId: z.string().min(1),
  shareCode: z.string().optional(),
  watchSeconds: z.number().nonnegative(),
  eventType: z.enum(["view_start", "view_progress", "view_qualified"]),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = viewEventSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid event payload", details: parsed.error.issues },
        { status: 400 }
      );
    }

    const viewerIp = req.headers.get("x-forwarded-for") || "127.0.0.1";
    const userAgent = req.headers.get("user-agent") || undefined;

    const result = await analyticsService.ingestViewEvent({
      ...parsed.data,
      viewerIp,
      userAgent,
    });

    return NextResponse.json(result);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to record event";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
