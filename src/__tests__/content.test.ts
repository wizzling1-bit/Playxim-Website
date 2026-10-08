import { describe, it, expect } from "vitest";
import { detectContentType } from "@/lib/services/content.service";
import { storageService } from "@/lib/services/storage.service";

describe("Content Service & Storage Tests", () => {
  it("correctly classifies video files from extensions and MIME types", () => {
    expect(detectContentType("master.mp4")).toBe("video");
    expect(detectContentType("clip.mov")).toBe("video");
    expect(detectContentType("stream.mkv")).toBe("video");
    expect(detectContentType("custom.bin", "video/webm")).toBe("video");
  });

  it("correctly classifies archives, documents, and other media", () => {
    expect(detectContentType("project_assets.zip")).toBe("archive");
    expect(detectContentType("backup.tar.gz")).toBe("archive");
    expect(detectContentType("specification.pdf")).toBe("document");
    expect(detectContentType("track.flac")).toBe("audio");
    expect(detectContentType("cover.webp")).toBe("image");
    expect(detectContentType("unknown.xyz")).toBe("other");
  });

  it("generates structured collision-resistant R2 object keys", () => {
    const ownerId = "creator_123";
    const contentId = "item_456";
    const filename = "My Master Video (Final).mp4";

    const key = storageService.generateObjectKey(ownerId, contentId, filename);
    expect(key).toContain("creators/creator_123/");
    expect(key).toContain("/item_456/");
    expect(key).toContain("My_Master_Video__Final_.mp4");
  });
});
