import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { storageService } from "@/lib/services/storage.service";
import { contentService } from "@/lib/services/content.service";

const abortSchema = z.object({
  contentId: z.string().min(1),
  key: z.string().min(1),
  uploadId: z.string().min(1),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = abortSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid abort request", details: parsed.error.issues },
        { status: 400 }
      );
    }

    const { contentId, key, uploadId } = parsed.data;

    await storageService.abortMultipartUpload(key, uploadId);
    await contentService.updateStatus(contentId, "failed");

    return NextResponse.json({ success: true, aborted: true });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to abort upload";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
