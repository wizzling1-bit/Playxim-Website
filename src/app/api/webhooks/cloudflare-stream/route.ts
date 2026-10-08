import { NextRequest, NextResponse } from "next/server";
import { videoService } from "@/lib/services/video.service";
import { contentService } from "@/lib/services/content.service";

export async function POST(req: NextRequest) {
  try {
    const rawBody = await req.text();
    const signatureHeader = req.headers.get("webhook-signature");

    const isValid = videoService.verifyWebhookSignature(rawBody, signatureHeader);
    if (!isValid) {
      return NextResponse.json({ error: "Invalid webhook signature" }, { status: 401 });
    }

    const payload = JSON.parse(rawBody);
    const contentId = payload.meta?.contentId;
    const state = payload.status?.state;

    if (contentId) {
      if (state === "ready") {
        await contentService.updateStatus(contentId, "ready");
      } else if (state === "error") {
        await contentService.updateStatus(contentId, "failed");
      }
    }

    return NextResponse.json({ received: true });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Webhook processing error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
