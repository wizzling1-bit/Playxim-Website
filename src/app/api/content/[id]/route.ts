import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { contentService } from "@/lib/services/content.service";

const updateSchema = z.object({
  name: z.string().min(1).max(255).optional(),
  visibility: z.enum(["public", "private", "password"]).optional(),
  folder_id: z.string().nullable().optional(),
  download_enabled: z.boolean().optional(),
});

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const item = await contentService.getContentById(id);

  if (!item) {
    return NextResponse.json({ error: "Content not found" }, { status: 404 });
  }

  return NextResponse.json(item);
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await req.json();
    const parsed = updateSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid updates", details: parsed.error.issues },
        { status: 400 }
      );
    }

    const updated = await contentService.updateContent(id, parsed.data);
    if (!updated) {
      return NextResponse.json({ error: "Content not found" }, { status: 404 });
    }

    return NextResponse.json(updated);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to update content";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const success = await contentService.deleteContent(id);

    if (!success) {
      return NextResponse.json({ error: "Content not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, deletedId: id });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to delete content";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
