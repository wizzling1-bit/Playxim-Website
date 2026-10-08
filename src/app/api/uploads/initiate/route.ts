import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { storageService } from "@/lib/services/storage.service";
import { videoService } from "@/lib/services/video.service";
import { contentService, detectContentType } from "@/lib/services/content.service";

const initiateSchema = z.object({
  name: z.string().min(1).max(255),
  sizeBytes: z.number().positive(),
  mimeType: z.string().optional(),
  folderId: z.string().nullable().optional(),
  visibility: z.enum(["public", "private", "password"]).optional(),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = initiateSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid upload request", details: parsed.error.issues },
        { status: 400 }
      );
    }

    const { name, sizeBytes, mimeType, folderId, visibility } = parsed.data;
    const detectedType = detectContentType(name, mimeType);
    const mockOwnerId = "demo-creator-1";

    // Create database content record
    const contentItem = await contentService.createContentItem({
      ownerId: mockOwnerId,
      name,
      sizeBytes,
      mimeType,
      folderId,
      visibility,
    });

    // If it's a video and Cloudflare Stream is configured, initiate direct creator upload
    if (detectedType === "video" && videoService.isConfigured()) {
      const videoUpload = await videoService.createDirectUpload({
        creatorId: mockOwnerId,
        contentId: contentItem.id,
        filename: name,
      });

      return NextResponse.json({
        uploadType: "stream_direct",
        contentId: contentItem.id,
        contentItem,
        uploadUrl: videoUpload.uploadUrl,
        videoId: videoUpload.videoId,
        isMock: videoUpload.isMock,
      });
    }

    // Default: Cloudflare R2 / S3 Multipart upload
    const objectKey = storageService.generateObjectKey(mockOwnerId, contentItem.id, name);
    const session = await storageService.createMultipartUpload(
      objectKey,
      mimeType || "application/octet-stream",
      {
        contentId: contentItem.id,
        ownerId: mockOwnerId,
      }
    );

    return NextResponse.json({
      uploadType: "r2_multipart",
      contentId: contentItem.id,
      contentItem,
      uploadId: session.uploadId,
      key: session.key,
      bucket: session.bucket,
      isMock: session.isMock,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to initiate upload";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
