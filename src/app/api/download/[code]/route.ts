import { NextRequest, NextResponse } from "next/server";
import { shareService } from "@/lib/services/share.service";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ code: string }> }
) {
  try {
    const { code } = await params;
    const downloadUrl = await shareService.getDownloadUrl(code);

    if (!downloadUrl) {
      return NextResponse.json(
        { error: "Download not available or link expired" },
        { status: 404 }
      );
    }

    return NextResponse.redirect(downloadUrl, 307);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Download processing error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
