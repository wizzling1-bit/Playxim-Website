import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { earningsService } from "@/lib/services/earnings.service";

const payoutSchema = z.object({
  amountUsd: z.number().positive(),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = payoutSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid payout amount", details: parsed.error.issues },
        { status: 400 }
      );
    }

    const creatorId = "demo-creator-1";
    const result = await earningsService.requestPayout(creatorId, parsed.data.amountUsd);

    if (!result.success) {
      return NextResponse.json({ error: result.error }, { status: 400 });
    }

    return NextResponse.json({ success: true, payout: result.payout });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Payout request failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
