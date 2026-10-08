import { NextRequest, NextResponse } from "next/server";
import { contentService } from "@/lib/services/content.service";

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const success = await contentService.deleteFolder(id);

    if (!success) {
      return NextResponse.json({ error: "Folder not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, deletedId: id });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to delete folder";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
