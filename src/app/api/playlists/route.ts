import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

interface PlaylistRecord {
  id: string;
  owner_id: string;
  name: string;
  description: string | null;
  is_public: boolean;
  videoCount: number;
  totalDuration: string;
  created_at: string;
}

// In-memory dev playlist store
const devPlaylistStore: Map<string, PlaylistRecord> = new Map([
  [
    "p1",
    {
      id: "p1",
      owner_id: "demo-creator-1",
      name: "Unreal Engine 5 Masterclass Series",
      description: "End-to-end procedural environment generation",
      is_public: true,
      videoCount: 12,
      totalDuration: "4h 18m",
      created_at: new Date().toISOString(),
    },
  ],
  [
    "p2",
    {
      id: "p2",
      owner_id: "demo-creator-1",
      name: "Tokyo Cinematic Travel Diaries",
      description: "8K HDR street journeys and soundscapes",
      is_public: true,
      videoCount: 8,
      totalDuration: "1h 45m",
      created_at: new Date().toISOString(),
    },
  ],
]);

const createPlaylistSchema = z.object({
  name: z.string().min(1).max(150),
  description: z.string().optional(),
  is_public: z.boolean().default(true),
});

export async function GET() {
  const playlists = Array.from(devPlaylistStore.values());
  return NextResponse.json(playlists);
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = createPlaylistSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid playlist input", details: parsed.error.issues },
        { status: 400 }
      );
    }

    const id = `pl_${Date.now()}_${Math.random().toString(36).substring(7)}`;
    const playlist: PlaylistRecord = {
      id,
      owner_id: "demo-creator-1",
      name: parsed.data.name,
      description: parsed.data.description || null,
      is_public: parsed.data.is_public,
      videoCount: 0,
      totalDuration: "0m",
      created_at: new Date().toISOString(),
    };

    devPlaylistStore.set(id, playlist);
    return NextResponse.json(playlist, { status: 201 });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to create playlist";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
