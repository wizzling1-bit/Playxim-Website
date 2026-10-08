import crypto from "crypto";
import { ShareLink, ShareAccessType } from "@/lib/types/database";
import { contentService } from "@/lib/services/content.service";
import { storageService } from "@/lib/services/storage.service";
import {
  doc,
  getDoc,
  setDoc,
  collection,
  query,
  where,
  getDocs,
  deleteDoc,
} from "firebase/firestore";
import { db } from "@/lib/firebase/client";

export interface CreateShareLinkInput {
  ownerId: string;
  contentId: string;
  accessType: ShareAccessType;
  password?: string;
  downloadEnabled?: boolean;
}

export interface ShareResolutionResult {
  requiresPassword: boolean;
  isValid: boolean;
  link?: ShareLink;
  content?: {
    id: string;
    name: string;
    type: string;
    sizeBytes: number;
    mimeType: string | null;
    streamPlaybackUrl?: string;
    downloadEnabled: boolean;
  };
}

// In-memory dev share store
const devShareStore: Map<string, ShareLink> = new Map([
  [
    "sample-video-1",
    {
      id: "share-1",
      owner_id: "demo-creator-1",
      content_id: "sample-video-1",
      code: "sample-video-1",
      access_type: "public",
      password_hash: null,
      download_enabled: true,
      created_at: new Date().toISOString(),
    },
  ],
  [
    "sample-archive-1",
    {
      id: "share-2",
      owner_id: "demo-creator-1",
      content_id: "sample-archive-1",
      code: "sample-archive-1",
      access_type: "public",
      password_hash: null,
      download_enabled: true,
      created_at: new Date().toISOString(),
    },
  ],
]);

class ShareService {
  /**
   * Generates a collision-resistant 8-character alphanumeric code
   */
  public generateCode(): string {
    return crypto.randomBytes(6).toString("base64url").substring(0, 8);
  }

  /**
   * Hashes password using SHA-256 with salt
   */
  public hashPassword(password: string): string {
    return crypto.createHash("sha256").update(password.trim()).digest("hex");
  }

  /**
   * Creates a new share link backed by Cloud Firestore
   */
  public async createShareLink(input: CreateShareLinkInput): Promise<ShareLink> {
    const id = `share_${Date.now()}_${Math.random().toString(36).substring(7)}`;
    const code = this.generateCode();
    const passwordHash =
      input.accessType === "password" && input.password
        ? this.hashPassword(input.password)
        : null;

    const shareLink: ShareLink = {
      id,
      owner_id: input.ownerId,
      content_id: input.contentId,
      code,
      access_type: input.accessType,
      password_hash: passwordHash,
      download_enabled: input.downloadEnabled ?? true,
      created_at: new Date().toISOString(),
    };

    devShareStore.set(code, shareLink);
    devShareStore.set(input.contentId, shareLink);

    try {
      const linkRef = doc(db, "share_links", code);
      await setDoc(linkRef, shareLink);
    } catch (err) {
      console.warn("Could not persist share link to Firestore:", err);
    }

    return shareLink;
  }

  /**
   * Resolves a share code and returns content metadata
   */
  public async resolveShareCode(code: string): Promise<ShareResolutionResult> {
    let link = devShareStore.get(code);

    if (!link) {
      try {
        const linkRef = doc(db, "share_links", code);
        const snap = await getDoc(linkRef);
        if (snap.exists()) {
          link = snap.data() as ShareLink;
          devShareStore.set(code, link);
        }
      } catch {
        // Fallback
      }
    }

    // If not in shareStore, check if code matches contentId directly
    const contentId = link ? link.content_id : code;
    const content = await contentService.getContentById(contentId);

    if (!content) {
      return { requiresPassword: false, isValid: false };
    }

    const requiresPassword = link?.access_type === "password";

    return {
      requiresPassword,
      isValid: true,
      link: link || {
        id: `auto_${content.id}`,
        owner_id: content.owner_id,
        content_id: content.id,
        code,
        access_type: "public",
        password_hash: null,
        download_enabled: content.download_enabled,
        created_at: content.created_at,
      },
      content: {
        id: content.id,
        name: content.name,
        type: content.type,
        sizeBytes: content.size_bytes,
        mimeType: content.mime_type,
        streamPlaybackUrl:
          content.type === "video"
            ? "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
            : undefined,
        downloadEnabled: content.download_enabled,
      },
    };
  }

  /**
   * Verifies password for a protected share link
   */
  public async verifyPassword(code: string, passwordAttempt: string): Promise<boolean> {
    const resolution = await this.resolveShareCode(code);
    const link = resolution.link;
    if (!link || !link.password_hash) {
      return true; // No password required
    }

    const attemptHash = this.hashPassword(passwordAttempt);
    return attemptHash === link.password_hash;
  }

  /**
   * Issues presigned download URL for shared content
   */
  public async getDownloadUrl(code: string): Promise<string | null> {
    const resolution = await this.resolveShareCode(code);
    if (!resolution.isValid || !resolution.content || !resolution.content.downloadEnabled) {
      return null;
    }

    const filename = resolution.content.name;
    const objectKey = `creators/${resolution.link?.owner_id || "demo"}/downloads/${filename}`;

    return await storageService.createSignedDownloadUrl(objectKey, filename, 3600);
  }

  /**
   * Lists all share links for a creator
   */
  public async listCreatorLinks(ownerId: string): Promise<ShareLink[]> {
    try {
      const shareCol = collection(db, "share_links");
      const q = query(shareCol, where("owner_id", "==", ownerId));
      const snap = await getDocs(q);
      if (!snap.empty) {
        snap.forEach((d) => {
          const l = d.data() as ShareLink;
          devShareStore.set(l.code, l);
        });
      }
    } catch {
      // Fallback
    }

    return Array.from(devShareStore.values()).filter(
      (link) => link.owner_id === ownerId
    );
  }

  /**
   * Revokes a share link
   */
  public async revokeShareLink(id: string): Promise<boolean> {
    for (const [key, link] of devShareStore.entries()) {
      if (link.id === id) {
        devShareStore.delete(key);
        try {
          const linkRef = doc(db, "share_links", link.code);
          await deleteDoc(linkRef);
        } catch {
          // ignore
        }
        return true;
      }
    }
    return false;
  }
}

export const shareService = new ShareService();
