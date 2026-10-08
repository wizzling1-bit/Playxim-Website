"use client";

import { useState, useCallback, useRef } from "react";
import { formatBytes } from "@/lib/utils";

export interface UploadItem {
  id: string;
  file: File;
  name: string;
  sizeBytes: number;
  formattedSize: string;
  progress: number;
  speedBytesPerSec: number;
  status: "queued" | "uploading" | "paused" | "completed" | "error";
  error?: string;
  contentId?: string;
  uploadId?: string;
  key?: string;
  uploadType?: "r2_multipart" | "stream_direct";
}

const CHUNK_SIZE = 10 * 1024 * 1024; // 10MB parts for S3/R2 multipart compliance

export function useUploader() {
  const [queue, setQueue] = useState<UploadItem[]>([]);
  const abortControllers = useRef<Map<string, AbortController>>(new Map());
  const pauseFlags = useRef<Map<string, boolean>>(new Map());

  const addFiles = useCallback((files: FileList | File[]) => {
    const newItems: UploadItem[] = Array.from(files).map((file) => ({
      id: `up_${Date.now()}_${Math.random().toString(36).substring(7)}`,
      file,
      name: file.name,
      sizeBytes: file.size,
      formattedSize: formatBytes(file.size),
      progress: 0,
      speedBytesPerSec: 0,
      status: "queued",
    }));

    setQueue((prev) => [...prev, ...newItems]);
    return newItems;
  }, []);

  const updateItem = useCallback((id: string, updates: Partial<UploadItem>) => {
    setQueue((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...updates } : item))
    );
  }, []);

  const uploadFile = useCallback(
    async (item: UploadItem) => {
      const controller = new AbortController();
      abortControllers.current.set(item.id, controller);
      pauseFlags.current.set(item.id, false);

      updateItem(item.id, { status: "uploading", progress: 0, error: undefined });

      try {
        // Step 1: Initiate upload
        const initRes = await fetch("/api/uploads/initiate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: item.name,
            sizeBytes: item.sizeBytes,
            mimeType: item.file.type || undefined,
          }),
          signal: controller.signal,
        });

        if (!initRes.ok) {
          const errData = await initRes.json().catch(() => ({}));
          throw new Error(errData.error || `Initiate failed with status ${initRes.status}`);
        }

        const initData = await initRes.json();
        const contentId = initData.contentId;
        const uploadType = initData.uploadType;

        updateItem(item.id, {
          contentId,
          uploadType,
          key: initData.key,
          uploadId: initData.uploadId,
        });

        // Step 2A: Direct Stream Upload (if VideoProvider direct upload was returned)
        if (uploadType === "stream_direct" && initData.uploadUrl) {
          const uploadRes = await fetch(initData.uploadUrl, {
            method: "POST",
            body: item.file,
            signal: controller.signal,
          });

          if (!uploadRes.ok) {
            throw new Error(`Direct stream upload failed: ${uploadRes.status}`);
          }

          updateItem(item.id, { status: "completed", progress: 100 });
          return;
        }

        // Step 2B: Cloudflare R2 / S3 Multipart upload
        const key = initData.key;
        const uploadId = initData.uploadId;
        const totalParts = Math.max(1, Math.ceil(item.sizeBytes / CHUNK_SIZE));
        const completedParts: { PartNumber: number; ETag: string }[] = [];

        let uploadedBytes = 0;
        let lastTimestamp = Date.now();
        let bytesSinceLastTime = 0;

        for (let partNumber = 1; partNumber <= totalParts; partNumber++) {
          // Check if paused
          if (pauseFlags.current.get(item.id)) {
            updateItem(item.id, { status: "paused" });
            return;
          }

          // Fetch presigned part URL
          const partRes = await fetch("/api/uploads/part-url", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ key, uploadId, partNumber }),
            signal: controller.signal,
          });

          if (!partRes.ok) {
            throw new Error(`Failed to obtain URL for part ${partNumber}`);
          }

          const { url: partUploadUrl } = await partRes.json();

          // Slice chunk
          const start = (partNumber - 1) * CHUNK_SIZE;
          const end = Math.min(item.sizeBytes, start + CHUNK_SIZE);
          const chunkBlob = item.file.slice(start, end);

          // Upload chunk
          const putRes = await fetch(partUploadUrl, {
            method: "PUT",
            body: chunkBlob,
            signal: controller.signal,
          });

          if (!putRes.ok) {
            throw new Error(`Failed to upload part ${partNumber} (${putRes.status})`);
          }

          let etag = putRes.headers.get("ETag");
          if (!etag) {
            etag = `"etag-part-${partNumber}"`;
          }

          completedParts.push({ PartNumber: partNumber, ETag: etag });

          uploadedBytes += chunkBlob.size;
          bytesSinceLastTime += chunkBlob.size;

          const now = Date.now();
          const elapsedSec = (now - lastTimestamp) / 1000;
          let speed = 0;
          if (elapsedSec >= 0.5) {
            speed = bytesSinceLastTime / elapsedSec;
            lastTimestamp = now;
            bytesSinceLastTime = 0;
          }

          const progressPercent = Math.min(99, Math.round((uploadedBytes / item.sizeBytes) * 100));
          updateItem(item.id, {
            progress: progressPercent,
            speedBytesPerSec: speed,
          });
        }

        // Step 3: Complete multipart upload
        const completeRes = await fetch("/api/uploads/complete", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contentId,
            key,
            uploadId,
            parts: completedParts,
          }),
          signal: controller.signal,
        });

        if (!completeRes.ok) {
          throw new Error("Failed to finalize multipart upload");
        }

        updateItem(item.id, {
          status: "completed",
          progress: 100,
          speedBytesPerSec: 0,
        });
      } catch (err: unknown) {
        if ((err as Error)?.name === "AbortError") {
          updateItem(item.id, { status: "paused" });
        } else {
          const message = err instanceof Error ? err.message : "Upload failed";
          updateItem(item.id, { status: "error", error: message });
        }
      } finally {
        abortControllers.current.delete(item.id);
      }
    },
    [updateItem]
  );

  const pauseUpload = useCallback(
    (id: string) => {
      pauseFlags.current.set(id, true);
      const controller = abortControllers.current.get(id);
      if (controller) {
        controller.abort();
      }
      updateItem(id, { status: "paused" });
    },
    [updateItem]
  );

  const resumeUpload = useCallback(
    (id: string) => {
      const item = queue.find((i) => i.id === id);
      if (item) {
        uploadFile(item);
      }
    },
    [queue, uploadFile]
  );

  const cancelUpload = useCallback(
    async (id: string) => {
      const item = queue.find((i) => i.id === id);
      if (item) {
        const controller = abortControllers.current.get(id);
        if (controller) {
          controller.abort();
        }

        if (item.uploadId && item.key && item.contentId) {
          fetch("/api/uploads/abort", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              contentId: item.contentId,
              key: item.key,
              uploadId: item.uploadId,
            }),
          }).catch(() => {});
        }
      }

      setQueue((prev) => prev.filter((i) => i.id !== id));
    },
    [queue]
  );

  const startAll = useCallback(() => {
    queue.forEach((item) => {
      if (item.status === "queued" || item.status === "paused") {
        uploadFile(item);
      }
    });
  }, [queue, uploadFile]);

  return {
    queue,
    addFiles,
    uploadFile,
    pauseUpload,
    resumeUpload,
    cancelUpload,
    startAll,
  };
}
