import { NextRequest, NextResponse } from "next/server";
import { shareService } from "@/lib/services/share.service";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ code: string }> }
) {
  try {
    const { code } = await params;
    const resolution = await shareService.resolveShareCode(code);

    if (!resolution.isValid || !resolution.content) {
      return NextResponse.json({ error: "Share link not found or expired" }, { status: 404 });
    }

    if (resolution.requiresPassword) {
      return NextResponse.json({
        requiresPassword: true,
        name: resolution.content.name,
        type: resolution.content.type,
      });
    }

    return NextResponse.json({
      requiresPassword: false,
      content: resolution.content,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to resolve share link";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
