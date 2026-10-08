import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { shareService } from "@/lib/services/share.service";

const verifySchema = z.object({
  password: z.string().min(1),
});

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ code: string }> }
) {
  try {
    const { code } = await params;
    const body = await req.json();
    const parsed = verifySchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: "Password required" }, { status: 400 });
    }

    const isMatch = await shareService.verifyPassword(code, parsed.data.password);
    if (!isMatch) {
      return NextResponse.json({ error: "Incorrect passcode" }, { status: 401 });
    }

    const resolution = await shareService.resolveShareCode(code);

    return NextResponse.json({
      verified: true,
      content: resolution.content,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Verification failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
