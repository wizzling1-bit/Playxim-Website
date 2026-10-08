import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest) {
  // Read chunk body to simulate stream transmission
  await req.arrayBuffer();

  const partNumber = req.nextUrl.searchParams.get("partNumber") || "1";
  const etag = `"mock-etag-part-${partNumber}-${Date.now()}"`;

  return new NextResponse(null, {
    status: 200,
    headers: {
      ETag: etag,
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Expose-Headers": "ETag",
    },
  });
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "PUT, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Content-Length, Content-Range",
      "Access-Control-Expose-Headers": "ETag",
    },
  });
}
