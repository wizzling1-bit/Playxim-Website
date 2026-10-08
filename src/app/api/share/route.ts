import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { shareService } from "@/lib/services/share.service";
import { env } from "@/lib/env";

const createShareSchema = z.object({
  contentId: z.string().min(1),
  accessType: z.enum(["public", "password"]),
  password: z.string().optional(),
  downloadEnabled: z.boolean().optional(),
});

export async function GET() {
  try {
    const ownerId = "demo-creator-1";
    const links = await shareService.listCreatorLinks(ownerId);
    return NextResponse.json(links);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to fetch share links";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = createShareSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid share parameters", details: parsed.error.issues },
        { status: 400 }
      );
    }

    const ownerId = "demo-creator-1";
    const link = await shareService.createShareLink({
      ownerId,
      contentId: parsed.data.contentId,
      accessType: parsed.data.accessType,
      password: parsed.data.password,
      downloadEnabled: parsed.data.downloadEnabled,
    });

    const shareUrl = `${env.NEXT_PUBLIC_APP_URL}/watch/${link.code}`;

    return NextResponse.json({
      link,
      shareUrl,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to create share link";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
