import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { storageService } from "@/lib/services/storage.service";

const partUrlSchema = z.object({
  key: z.string().min(1),
  uploadId: z.string().min(1),
  partNumber: z.number().int().min(1).max(10000),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = partUrlSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid part URL request", details: parsed.error.issues },
        { status: 400 }
      );
    }

    const { key, uploadId, partNumber } = parsed.data;
    const result = await storageService.getUploadPartUrl(key, uploadId, partNumber);

    return NextResponse.json(result);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to generate part URL";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
