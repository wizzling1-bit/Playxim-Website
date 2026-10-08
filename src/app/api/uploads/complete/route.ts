import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { storageService } from "@/lib/services/storage.service";
import { contentService } from "@/lib/services/content.service";

const completeSchema = z.object({
  contentId: z.string().min(1),
  key: z.string().min(1),
  uploadId: z.string().min(1),
  parts: z.array(
    z.object({
      PartNumber: z.number().int().min(1),
      ETag: z.string().min(1),
    })
  ),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = completeSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid complete request", details: parsed.error.issues },
        { status: 400 }
      );
    }

    const { contentId, key, uploadId, parts } = parsed.data;

    // Complete R2 multipart upload
    const result = await storageService.completeMultipartUpload(key, uploadId, parts);

    // Transition content lifecycle: scanning -> ready
    await contentService.updateStatus(contentId, "scanning");

    // In production, background malware scan triggers here. We mark as ready.
    const updatedContent = await contentService.updateStatus(contentId, "ready");

    return NextResponse.json({
      success: true,
      etag: result.etag,
      isMock: result.isMock,
      content: updatedContent,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to complete upload";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
