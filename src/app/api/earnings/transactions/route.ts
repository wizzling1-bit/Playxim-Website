import { NextResponse } from "next/server";
import { earningsService } from "@/lib/services/earnings.service";

export async function GET() {
  try {
    const creatorId = "demo-creator-1";
    const transactions = await earningsService.listTransactions(creatorId);
    return NextResponse.json(transactions);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to load transactions";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
