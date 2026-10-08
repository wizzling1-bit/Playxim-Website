import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { contentService } from "@/lib/services/content.service";

const createFolderSchema = z.object({
  name: z.string().min(1).max(100),
  parentFolderId: z.string().nullable().optional(),
});

export async function GET(req: NextRequest) {
  try {
    const parentFolderId = req.nextUrl.searchParams.get("parentFolderId");
    const ownerId = "demo-creator-1";

    const folders = await contentService.listFolders(
      ownerId,
      parentFolderId === "root" ? null : parentFolderId || undefined
    );

    return NextResponse.json(folders);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to fetch folders";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = createFolderSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid folder name", details: parsed.error.issues },
        { status: 400 }
      );
    }

    const ownerId = "demo-creator-1";
    const folder = await contentService.createFolder(
      ownerId,
      parsed.data.name,
      parsed.data.parentFolderId
    );

    return NextResponse.json(folder, { status: 201 });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to create folder";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
