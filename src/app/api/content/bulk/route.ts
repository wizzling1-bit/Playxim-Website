import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { contentService } from "@/lib/services/content.service";

const bulkSchema = z.object({
  action: z.enum(["delete", "move", "set_visibility"]),
  contentIds: z.array(z.string().min(1)).min(1),
  folderId: z.string().nullable().optional(),
  visibility: z.enum(["public", "private", "password"]).optional(),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = bulkSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid bulk operation", details: parsed.error.issues },
        { status: 400 }
      );
    }

    const { action, contentIds, folderId, visibility } = parsed.data;

    let processedCount = 0;

    for (const id of contentIds) {
      if (action === "delete") {
        const ok = await contentService.deleteContent(id);
        if (ok) processedCount++;
      } else if (action === "move" && folderId !== undefined) {
        const ok = await contentService.updateContent(id, { folder_id: folderId });
        if (ok) processedCount++;
      } else if (action === "set_visibility" && visibility) {
        const ok = await contentService.updateContent(id, { visibility });
        if (ok) processedCount++;
      }
    }

    return NextResponse.json({
      success: true,
      action,
      processedCount,
      totalRequested: contentIds.length,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to execute bulk operation";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
