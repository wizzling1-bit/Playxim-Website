import { NextRequest, NextResponse } from "next/server";
import { contentService } from "@/lib/services/content.service";
import { ContentType, ContentStatus } from "@/lib/types/database";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = req.nextUrl;
    const folderId = searchParams.get("folderId");
    const type = (searchParams.get("type") as ContentType | "all") || "all";
    const status = (searchParams.get("status") as ContentStatus | "all") || "all";
    const search = searchParams.get("search") || undefined;
    const limit = parseInt(searchParams.get("limit") || "50", 10);
    const offset = parseInt(searchParams.get("offset") || "0", 10);

    const ownerId = "demo-creator-1";

    const { items, total } = await contentService.listCreatorContent({
      ownerId,
      folderId: folderId === "root" ? null : folderId || undefined,
      type,
      status,
      search,
      limit,
      offset,
    });

    return NextResponse.json({
      items,
      total,
      limit,
      offset,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to fetch content";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
