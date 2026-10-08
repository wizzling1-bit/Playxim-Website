import {
  ContentItem,
  ContentType,
  ContentStatus,
  ContentVisibility,
  Folder,
} from "@/lib/types/database";
import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  collection,
  query,
  where,
  getDocs,
  orderBy,
  limit as firestoreLimit,
} from "firebase/firestore";
import { db } from "@/lib/firebase/client";

export interface CreateContentInput {
  ownerId: string;
  name: string;
  mimeType?: string;
  sizeBytes: number;
  folderId?: string | null;
  visibility?: ContentVisibility;
}

export function detectContentType(
  filename: string,
  mimeType?: string
): ContentType {
  const ext = filename.split(".").pop()?.toLowerCase() || "";

  const videoExtensions = ["mp4", "mkv", "mov", "avi", "webm", "m4v", "wmv", "flv", "ts"];
  const audioExtensions = ["mp3", "wav", "flac", "aac", "m4a", "ogg", "wma", "opus"];
  const imageExtensions = ["jpg", "jpeg", "png", "webp", "gif", "svg", "avif", "bmp", "ico"];
  const docExtensions = ["pdf", "docx", "doc", "txt", "md", "pptx", "xlsx", "xls", "csv", "json"];
  const archiveExtensions = ["zip", "rar", "7z", "tar", "gz", "bz2", "xz", "iso"];

  if (mimeType?.startsWith("video/") || videoExtensions.includes(ext)) {
    return "video";
  }
  if (mimeType?.startsWith("audio/") || audioExtensions.includes(ext)) {
    return "audio";
  }
  if (mimeType?.startsWith("image/") || imageExtensions.includes(ext)) {
    return "image";
  }
  if (docExtensions.includes(ext) || mimeType?.includes("pdf") || mimeType?.includes("text/")) {
    return "document";
  }
  if (archiveExtensions.includes(ext) || mimeType?.includes("zip") || mimeType?.includes("tar")) {
    return "archive";
  }

  return "other";
}

// In-memory local cache & seed data for fast reads and resilient offline tests
const devContentStore: Map<string, ContentItem> = new Map([
  [
    "sample-video-1",
    {
      id: "sample-video-1",
      owner_id: "demo-creator-1",
      folder_id: "demo-folder-1",
      type: "video",
      status: "ready",
      name: "Cyberpunk City Master 4K.mp4",
      normalized_name: "cyberpunk_city_master_4k.mp4",
      mime_type: "video/mp4",
      extension: "mp4",
      size_bytes: 4280000000,
      visibility: "public",
      download_enabled: true,
      created_at: new Date(Date.now() - 3600000 * 24 * 2).toISOString(),
      updated_at: new Date(Date.now() - 3600000 * 24 * 2).toISOString(),
      deleted_at: null,
    },
  ],
  [
    "sample-video-2",
    {
      id: "sample-video-2",
      owner_id: "demo-creator-1",
      folder_id: "demo-folder-1",
      type: "video",
      status: "ready",
      name: "Camera Grading LUTs & B-Roll.mov",
      normalized_name: "camera_grading_luts_b_roll.mov",
      mime_type: "video/quicktime",
      extension: "mov",
      size_bytes: 1820000000,
      visibility: "password",
      download_enabled: true,
      created_at: new Date(Date.now() - 3600000 * 18).toISOString(),
      updated_at: new Date(Date.now() - 3600000 * 18).toISOString(),
      deleted_at: null,
    },
  ],
  [
    "sample-archive-1",
    {
      id: "sample-archive-1",
      owner_id: "demo-creator-1",
      folder_id: null,
      type: "archive",
      status: "ready",
      name: "Playxim_Complete_Asset_Pack_v2.zip",
      normalized_name: "playxim_complete_asset_pack_v2.zip",
      mime_type: "application/zip",
      extension: "zip",
      size_bytes: 12400000000,
      visibility: "public",
      download_enabled: true,
      created_at: new Date(Date.now() - 3600000 * 48).toISOString(),
      updated_at: new Date(Date.now() - 3600000 * 48).toISOString(),
      deleted_at: null,
    },
  ],
  [
    "sample-doc-1",
    {
      id: "sample-doc-1",
      owner_id: "demo-creator-1",
      folder_id: null,
      type: "document",
      status: "ready",
      name: "Creator_Sponsorship_Deck_2026.pdf",
      normalized_name: "creator_sponsorship_deck_2026.pdf",
      mime_type: "application/pdf",
      extension: "pdf",
      size_bytes: 48000000,
      visibility: "public",
      download_enabled: true,
      created_at: new Date(Date.now() - 3600000 * 72).toISOString(),
      updated_at: new Date(Date.now() - 3600000 * 72).toISOString(),
      deleted_at: null,
    },
  ],
]);

const devFoldersStore: Map<string, Folder> = new Map([
  [
    "demo-folder-1",
    {
      id: "demo-folder-1",
      owner_id: "demo-creator-1",
      parent_folder_id: null,
      name: "Video Productions",
      path_cache: "/Video Productions",
      created_at: new Date(Date.now() - 3600000 * 96).toISOString(),
      updated_at: new Date(Date.now() - 3600000 * 96).toISOString(),
      deleted_at: null,
    },
  ],
  [
    "demo-folder-2",
    {
      id: "demo-folder-2",
      owner_id: "demo-creator-1",
      parent_folder_id: null,
      name: "Sound FX & Audio",
      path_cache: "/Sound FX & Audio",
      created_at: new Date(Date.now() - 3600000 * 90).toISOString(),
      updated_at: new Date(Date.now() - 3600000 * 90).toISOString(),
      deleted_at: null,
    },
  ],
]);

class ContentService {
  /**
   * Creates a draft content item record in Cloud Firestore and local store
   */
  public async createContentItem(input: CreateContentInput): Promise<ContentItem> {
    const id = `item_${Date.now()}_${Math.random().toString(36).substring(7)}`;
    const ext = input.name.split(".").pop()?.toLowerCase() || null;
    const type = detectContentType(input.name, input.mimeType);

    const item: ContentItem = {
      id,
      owner_id: input.ownerId,
      folder_id: input.folderId || null,
      type,
      status: "uploading",
      name: input.name,
      normalized_name: input.name.toLowerCase().replace(/[^a-z0-9.]/g, "_"),
      mime_type: input.mimeType || "application/octet-stream",
      extension: ext,
      size_bytes: input.sizeBytes,
      visibility: input.visibility || "public",
      download_enabled: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      deleted_at: null,
    };

    devContentStore.set(id, item);

    try {
      const docRef = doc(db, "content", id);
      await setDoc(docRef, item);
    } catch (err) {
      console.warn("Could not persist content to Firestore:", err);
    }

    return item;
  }

  /**
   * Updates content status and processing metadata in Cloud Firestore
   */
  public async updateStatus(
    id: string,
    status: ContentStatus
  ): Promise<ContentItem | null> {
    const item = devContentStore.get(id);
    const updatedAt = new Date().toISOString();

    if (item) {
      item.status = status;
      item.updated_at = updatedAt;
      devContentStore.set(id, item);
    }

    try {
      const docRef = doc(db, "content", id);
      await updateDoc(docRef, { status, updated_at: updatedAt });
    } catch (err) {
      console.warn("Could not update content status in Firestore:", err);
    }

    return item || null;
  }

  /**
   * Retrieves content by ID from Firestore or cache
   */
  public async getContentById(id: string): Promise<ContentItem | null> {
    try {
      const docRef = doc(db, "content", id);
      const snap = await getDoc(docRef);
      if (snap.exists()) {
        const data = snap.data() as ContentItem;
        if (data.deleted_at === null) {
          devContentStore.set(id, data);
          return data;
        }
        return null;
      }
    } catch {
      // Fallback to in-memory store
    }

    const item = devContentStore.get(id);
    if (!item || item.deleted_at !== null) return null;
    return item;
  }

  /**
   * Lists content for a creator with filtering, sorting and search
   */
  public async listCreatorContent(options: {
    ownerId: string;
    folderId?: string | null;
    type?: ContentType | "all";
    status?: ContentStatus | "all";
    search?: string;
    limit?: number;
    offset?: number;
  }): Promise<{ items: ContentItem[]; total: number }> {
    // Attempt Firestore retrieval
    try {
      const contentCol = collection(db, "content");
      const q = query(contentCol, where("owner_id", "==", options.ownerId));
      const snapshot = await getDocs(q);

      if (!snapshot.empty) {
        snapshot.forEach((docSnap) => {
          const item = docSnap.data() as ContentItem;
          devContentStore.set(item.id, item);
        });
      }
    } catch {
      // Fallback to cache/seed
    }

    let items = Array.from(devContentStore.values()).filter(
      (item) => item.deleted_at === null
    );

    if (options.folderId !== undefined) {
      items = items.filter((item) => item.folder_id === options.folderId);
    }

    if (options.type && options.type !== "all") {
      items = items.filter((item) => item.type === options.type);
    }

    if (options.status && options.status !== "all") {
      items = items.filter((item) => item.status === options.status);
    }

    if (options.search) {
      const q = options.search.toLowerCase();
      items = items.filter((item) => item.name.toLowerCase().includes(q));
    }

    // Sort newest first
    items.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

    const total = items.length;
    const offset = options.offset || 0;
    const limit = options.limit || 50;
    const paginated = items.slice(offset, offset + limit);

    return { items: paginated, total };
  }

  /**
   * Renames or modifies visibility / folder for content
   */
  public async updateContent(
    id: string,
    updates: Partial<Pick<ContentItem, "name" | "visibility" | "folder_id" | "download_enabled">>
  ): Promise<ContentItem | null> {
    const item = devContentStore.get(id);
    const updatedAt = new Date().toISOString();

    if (item) {
      if (updates.name !== undefined) item.name = updates.name;
      if (updates.visibility !== undefined) item.visibility = updates.visibility;
      if (updates.folder_id !== undefined) item.folder_id = updates.folder_id;
      if (updates.download_enabled !== undefined) item.download_enabled = updates.download_enabled;
      item.updated_at = updatedAt;
      devContentStore.set(id, item);
    }

    try {
      const docRef = doc(db, "content", id);
      await updateDoc(docRef, { ...updates, updated_at: updatedAt });
    } catch (err) {
      console.warn("Could not update content in Firestore:", err);
    }

    return item || null;
  }

  /**
   * Soft deletes content
   */
  public async deleteContent(id: string): Promise<boolean> {
    const deletedAt = new Date().toISOString();
    const item = devContentStore.get(id);
    if (item) {
      item.deleted_at = deletedAt;
      item.status = "deleted";
      devContentStore.set(id, item);
    }

    try {
      const docRef = doc(db, "content", id);
      await updateDoc(docRef, { deleted_at: deletedAt, status: "deleted" });
    } catch (err) {
      console.warn("Could not soft delete content in Firestore:", err);
    }

    return true;
  }

  /**
   * Folder operations backed by Cloud Firestore
   */
  public async listFolders(ownerId: string, parentFolderId?: string | null): Promise<Folder[]> {
    try {
      const foldersCol = collection(db, "folders");
      const q = query(foldersCol, where("owner_id", "==", ownerId));
      const snap = await getDocs(q);
      if (!snap.empty) {
        snap.forEach((d) => {
          const folder = d.data() as Folder;
          devFoldersStore.set(folder.id, folder);
        });
      }
    } catch {
      // Fallback to cache/seed
    }

    let folders = Array.from(devFoldersStore.values()).filter(
      (f) => f.deleted_at === null
    );

    if (parentFolderId !== undefined) {
      folders = folders.filter((f) => f.parent_folder_id === parentFolderId);
    }

    return folders.sort((a, b) => a.name.localeCompare(b.name));
  }

  public async createFolder(
    ownerId: string,
    name: string,
    parentFolderId?: string | null
  ): Promise<Folder> {
    const id = `folder_${Date.now()}_${Math.random().toString(36).substring(7)}`;
    const folder: Folder = {
      id,
      owner_id: ownerId,
      parent_folder_id: parentFolderId || null,
      name,
      path_cache: `/${name}`,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      deleted_at: null,
    };

    devFoldersStore.set(id, folder);

    try {
      const docRef = doc(db, "folders", id);
      await setDoc(docRef, folder);
    } catch (err) {
      console.warn("Could not save folder in Firestore:", err);
    }

    return folder;
  }

  public async deleteFolder(id: string): Promise<boolean> {
    const deletedAt = new Date().toISOString();
    const folder = devFoldersStore.get(id);
    if (folder) {
      folder.deleted_at = deletedAt;
      devFoldersStore.set(id, folder);
    }

    try {
      const docRef = doc(db, "folders", id);
      await updateDoc(docRef, { deleted_at: deletedAt });
    } catch (err) {
      console.warn("Could not soft delete folder in Firestore:", err);
    }

    return true;
  }
}

export const contentService = new ContentService();
