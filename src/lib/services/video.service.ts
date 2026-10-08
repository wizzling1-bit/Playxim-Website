import crypto from "crypto";
import { env } from "@/lib/env";

export interface DirectUploadResult {
  uploadUrl: string;
  videoId: string;
  isMock: boolean;
}

export interface VideoMetadata {
  videoId: string;
  status: "pending" | "inprogress" | "ready" | "error";
  durationSeconds: number;
  width: number;
  height: number;
  thumbnailUrl: string;
  playbackUrl: string;
  hlsManifestUrl: string;
  dashManifestUrl: string;
}

export interface VideoProvider {
  createDirectUpload(options: {
    maxDurationSeconds?: number;
    creatorId: string;
    contentId: string;
    filename: string;
  }): Promise<DirectUploadResult>;

  getVideoMetadata(videoId: string): Promise<VideoMetadata>;

  verifyWebhookSignature(payload: string, signatureHeader: string | null): boolean;
}

class CloudflareStreamService implements VideoProvider {
  private accountId: string | undefined;
  private apiToken: string | undefined;
  private webhookSecret: string | undefined;

  constructor() {
    this.accountId = env.CLOUDFLARE_ACCOUNT_ID;
    this.apiToken = env.CLOUDFLARE_STREAM_API_TOKEN || env.CLOUDFLARE_API_TOKEN;
    this.webhookSecret = env.CLOUDFLARE_STREAM_WEBHOOK_SECRET;
  }

  public isConfigured(): boolean {
    return Boolean(this.accountId && this.apiToken);
  }

  public async createDirectUpload(options: {
    maxDurationSeconds?: number;
    creatorId: string;
    contentId: string;
    filename: string;
  }): Promise<DirectUploadResult> {
    if (!this.isConfigured()) {
      const mockVideoId = `mock_stream_${Date.now()}_${Math.random().toString(36).substring(7)}`;
      return {
        uploadUrl: `${env.NEXT_PUBLIC_APP_URL}/api/videos/mock-upload?videoId=${mockVideoId}&contentId=${options.contentId}`,
        videoId: mockVideoId,
        isMock: true,
      };
    }

    const endpoint = `https://api.cloudflare.com/client/v4/accounts/${this.accountId}/stream/direct_upload`;

    const res = await fetch(endpoint, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${this.apiToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        maxDurationSeconds: options.maxDurationSeconds || 21600, // 6 hours
        meta: {
          creatorId: options.creatorId,
          contentId: options.contentId,
          name: options.filename,
        },
        requireSignedURLs: false,
      }),
    });

    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(`Cloudflare Stream upload initialization failed (${res.status}): ${errorText}`);
    }

    const data = await res.json();
    return {
      uploadUrl: data.result.uploadURL,
      videoId: data.result.uid,
      isMock: false,
    };
  }

  public async getVideoMetadata(videoId: string): Promise<VideoMetadata> {
    if (!this.isConfigured() || videoId.startsWith("mock_stream_")) {
      return {
        videoId,
        status: "ready",
        durationSeconds: 184,
        width: 1920,
        height: 1080,
        thumbnailUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1280&q=80",
        playbackUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
        hlsManifestUrl: "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8",
        dashManifestUrl: "",
      };
    }

    const endpoint = `https://api.cloudflare.com/client/v4/accounts/${this.accountId}/stream/${videoId}`;
    const res = await fetch(endpoint, {
      headers: {
        Authorization: `Bearer ${this.apiToken}`,
      },
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch Cloudflare Stream video metadata (${res.status})`);
    }

    const data = await res.json();
    const result = data.result;

    const statusMap: Record<string, VideoMetadata["status"]> = {
      ready: "ready",
      inprogress: "inprogress",
      queued: "pending",
      error: "error",
    };

    const status = statusMap[result.status?.state] || "pending";
    const subDomain = `customer-${this.accountId?.substring(0, 8)}.cloudflarestream.com`;

    return {
      videoId: result.uid,
      status,
      durationSeconds: Math.round(result.duration || 0),
      width: result.input?.width || 1920,
      height: result.input?.height || 1080,
      thumbnailUrl: result.thumbnail || `https://${subDomain}/${result.uid}/thumbnails/thumbnail.jpg`,
      playbackUrl: result.preview || `https://${subDomain}/${result.uid}/watch`,
      hlsManifestUrl: result.playback?.hls || `https://${subDomain}/${result.uid}/manifest/video.m3u8`,
      dashManifestUrl: result.playback?.dash || `https://${subDomain}/${result.uid}/manifest/video.mpd`,
    };
  }

  public verifyWebhookSignature(payload: string, signatureHeader: string | null): boolean {
    if (!this.webhookSecret) {
      return true; // Webhook secret not configured in dev, pass through safely
    }
    if (!signatureHeader) {
      return false;
    }

    // Cloudflare Stream webhook format: time=1234567890,sig1=abcdef...
    const parts = signatureHeader.split(",");
    let timestamp = "";
    let signature = "";

    for (const part of parts) {
      const [k, v] = part.split("=");
      if (k === "time") timestamp = v;
      if (k === "sig1") signature = v;
    }

    if (!timestamp || !signature) {
      return false;
    }

    // Verify timestamp within 5 minutes
    const timeDelta = Math.abs(Date.now() / 1000 - parseInt(timestamp, 10));
    if (timeDelta > 300) {
      return false;
    }

    const signedPayload = `${timestamp}.${payload}`;
    const expectedSignature = crypto
      .createHmac("sha256", this.webhookSecret)
      .update(signedPayload)
      .digest("hex");

    return crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expectedSignature));
  }
}

export const videoService = new CloudflareStreamService();
