import {
  S3Client,
  CreateMultipartUploadCommand,
  UploadPartCommand,
  CompleteMultipartUploadCommand,
  AbortMultipartUploadCommand,
  GetObjectCommand,
  HeadObjectCommand,
  DeleteObjectCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { env } from "@/lib/env";

export interface MultipartUploadSession {
  uploadId: string;
  key: string;
  bucket: string;
  isMock: boolean;
}

export interface UploadPartUrlResult {
  partNumber: number;
  url: string;
  isMock: boolean;
}

export interface CompletedPartInput {
  PartNumber: number;
  ETag: string;
}

class StorageService {
  private client: S3Client | null = null;
  private bucket: string;
  private isConfigured: boolean;

  constructor() {
    const accountId = env.CLOUDFLARE_ACCOUNT_ID;
    const accessKeyId = env.CLOUDFLARE_R2_ACCESS_KEY_ID;
    const secretAccessKey = env.CLOUDFLARE_R2_SECRET_ACCESS_KEY;
    this.bucket = env.CLOUDFLARE_R2_BUCKET_NAME || "playxim-content";

    if (accountId && accessKeyId && secretAccessKey) {
      this.client = new S3Client({
        region: "auto",
        endpoint: `https://${accountId}.r2.cloudflarestorage.com`,
        credentials: {
          accessKeyId,
          secretAccessKey,
        },
      });
      this.isConfigured = true;
    } else {
      this.isConfigured = false;
    }
  }

  public isStorageConfigured(): boolean {
    return this.isConfigured;
  }

  public getBucketName(): string {
    return this.bucket;
  }

  /**
   * Generates a collision-resistant storage key based on owner and content ID
   */
  public generateObjectKey(ownerId: string, contentId: string, filename: string): string {
    const sanitizedFilename = filename.replace(/[^a-zA-Z0-9.-]/g, "_");
    const datePrefix = new Date().toISOString().slice(0, 10);
    return `creators/${ownerId}/${datePrefix}/${contentId}/${sanitizedFilename}`;
  }

  /**
   * Initiates a multipart upload session for large files
   */
  public async createMultipartUpload(
    key: string,
    contentType: string,
    metadata?: Record<string, string>
  ): Promise<MultipartUploadSession> {
    if (!this.client) {
      return {
        uploadId: `mock_upload_${Date.now()}_${Math.random().toString(36).substring(7)}`,
        key,
        bucket: this.bucket,
        isMock: true,
      };
    }

    const command = new CreateMultipartUploadCommand({
      Bucket: this.bucket,
      Key: key,
      ContentType: contentType,
      Metadata: metadata,
    });

    const response = await this.client.send(command);
    if (!response.UploadId) {
      throw new Error("Storage provider failed to issue upload ID");
    }

    return {
      uploadId: response.UploadId,
      key,
      bucket: this.bucket,
      isMock: false,
    };
  }

  /**
   * Generates a presigned URL for an individual upload chunk / part
   */
  public async getUploadPartUrl(
    key: string,
    uploadId: string,
    partNumber: number,
    expiresInSeconds: number = 3600
  ): Promise<UploadPartUrlResult> {
    if (!this.client || uploadId.startsWith("mock_upload_")) {
      const mockUrl = `${env.NEXT_PUBLIC_APP_URL}/api/uploads/mock-chunk?key=${encodeURIComponent(
        key
      )}&uploadId=${uploadId}&partNumber=${partNumber}`;
      return {
        partNumber,
        url: mockUrl,
        isMock: true,
      };
    }

    const command = new UploadPartCommand({
      Bucket: this.bucket,
      Key: key,
      UploadId: uploadId,
      PartNumber: partNumber,
    });

    const url = await getSignedUrl(this.client, command, {
      expiresIn: expiresInSeconds,
    });

    return {
      partNumber,
      url,
      isMock: false,
    };
  }

  /**
   * Finalizes the multipart upload once all parts are successfully uploaded
   */
  public async completeMultipartUpload(
    key: string,
    uploadId: string,
    parts: CompletedPartInput[]
  ): Promise<{ etag?: string; isMock: boolean }> {
    if (!this.client || uploadId.startsWith("mock_upload_")) {
      return {
        etag: `"mock-etag-${Date.now()}"`,
        isMock: true,
      };
    }

    const sortedParts = [...parts].sort((a, b) => a.PartNumber - b.PartNumber);

    const command = new CompleteMultipartUploadCommand({
      Bucket: this.bucket,
      Key: key,
      UploadId: uploadId,
      MultipartUpload: {
        Parts: sortedParts,
      },
    });

    const response = await this.client.send(command);
    return {
      etag: response.ETag,
      isMock: false,
    };
  }

  /**
   * Aborts an active multipart upload to release reserved cloud capacity
   */
  public async abortMultipartUpload(key: string, uploadId: string): Promise<{ success: boolean }> {
    if (!this.client || uploadId.startsWith("mock_upload_")) {
      return { success: true };
    }

    const command = new AbortMultipartUploadCommand({
      Bucket: this.bucket,
      Key: key,
      UploadId: uploadId,
    });

    await this.client.send(command);
    return { success: true };
  }

  /**
   * Creates a time-limited presigned URL for downloading content
   */
  public async createSignedDownloadUrl(
    key: string,
    downloadFilename?: string,
    expiresInSeconds: number = 3600
  ): Promise<string> {
    if (!this.client) {
      return `${env.NEXT_PUBLIC_APP_URL}/api/uploads/mock-download?key=${encodeURIComponent(
        key
      )}&name=${encodeURIComponent(downloadFilename || "download")}`;
    }

    const disposition = downloadFilename
      ? `attachment; filename="${encodeURIComponent(downloadFilename)}"`
      : undefined;

    const command = new GetObjectCommand({
      Bucket: this.bucket,
      Key: key,
      ResponseContentDisposition: disposition,
    });

    return await getSignedUrl(this.client, command, {
      expiresIn: expiresInSeconds,
    });
  }

  /**
   * Deletes an object from storage
   */
  public async deleteObject(key: string): Promise<boolean> {
    if (!this.client) {
      return true;
    }

    try {
      const command = new DeleteObjectCommand({
        Bucket: this.bucket,
        Key: key,
      });
      await this.client.send(command);
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Verifies if an object exists and retrieves size metadata
   */
  public async getObjectMetadata(key: string): Promise<{ sizeBytes: number; exists: boolean }> {
    if (!this.client) {
      return { sizeBytes: 1024 * 1024 * 50, exists: true };
    }

    try {
      const command = new HeadObjectCommand({
        Bucket: this.bucket,
        Key: key,
      });
      const response = await this.client.send(command);
      return {
        sizeBytes: response.ContentLength || 0,
        exists: true,
      };
    } catch {
      return { sizeBytes: 0, exists: false };
    }
  }
}

export const storageService = new StorageService();
