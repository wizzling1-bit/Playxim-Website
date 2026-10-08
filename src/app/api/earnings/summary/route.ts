import { NextResponse } from "next/server";
import { earningsService } from "@/lib/services/earnings.service";

export async function GET() {
  try {
    const creatorId = "demo-creator-1";
    const balance = await earningsService.getBalance(creatorId);
    return NextResponse.json(balance);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to load earnings balance";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
