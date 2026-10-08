export type UserStatus = 'active' | 'suspended' | 'deleted';

export interface Profile {
  id: string;
  username: string;
  email: string | null;
  display_name: string | null;
  avatar_url: string | null;
  bio: string | null;
  status: UserStatus;
  created_at: string;
  updated_at: string;
}

export interface CreatorProfile {
  user_id: string;
  brand_name: string | null;
  profile_slug: string | null;
  platform_profile_url: string | null;
  public_email: string | null;
  created_at: string;
  updated_at: string;
}

export type SocialPlatform =
  | 'youtube'
  | 'telegram'
  | 'instagram'
  | 'x'
  | 'facebook'
  | 'linkedin'
  | 'website'
  | 'other';

export interface SocialLink {
  id: string;
  creator_id: string;
  platform: SocialPlatform;
  url: string;
  position: number;
  created_at: string;
  updated_at: string;
}

export interface Folder {
  id: string;
  owner_id: string;
  parent_folder_id: string | null;
  name: string;
  path_cache: string | null;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export type ContentType =
  | 'video'
  | 'audio'
  | 'image'
  | 'document'
  | 'archive'
  | 'other';

export type ContentStatus =
  | 'draft'
  | 'uploading'
  | 'uploaded'
  | 'scanning'
  | 'processing'
  | 'ready'
  | 'failed'
  | 'rejected'
  | 'deleted';

export type ContentVisibility = 'public' | 'private' | 'password';

export interface ContentItem {
  id: string;
  owner_id: string;
  folder_id: string | null;
  type: ContentType;
  status: ContentStatus;
  name: string;
  normalized_name: string | null;
  mime_type: string | null;
  extension: string | null;
  size_bytes: number;
  visibility: ContentVisibility;
  download_enabled: boolean;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface ContentVersion {
  id: string;
  content_id: string;
  version_number: number;
  size_bytes: number;
  checksum_sha256: string | null;
  original_filename: string | null;
  created_at: string;
  deleted_at: string | null;
}

export interface FileAsset {
  id: string;
  content_id: string;
  storage_provider: 'r2' | 's3';
  bucket_name: string;
  object_key: string;
  etag: string | null;
  checksum_sha256: string | null;
  created_at: string;
}

export type VideoProcessingStatus = 'pending' | 'inprogress' | 'ready' | 'error';

export interface VideoAsset {
  id: string;
  content_id: string;
  provider: 'cloudflare_stream';
  provider_video_id: string;
  duration_ms: number | null;
  width: number | null;
  height: number | null;
  frame_rate: number | null;
  thumbnail_url: string | null;
  processing_status: VideoProcessingStatus;
  playback_ready_at: string | null;
  created_at: string;
  updated_at: string;
}

export type ShareAccessType = 'public' | 'password';

export interface ShareLink {
  id: string;
  owner_id: string;
  content_id: string;
  code: string;
  access_type: ShareAccessType;
  password_hash: string | null;
  download_enabled: boolean;
  created_at: string;
}

export interface ShareLinkSession {
  id: string;
  share_link_id: string;
  session_token_hash: string;
  created_at: string;
  expires_at: string;
}

export interface Playlist {
  id: string;
  owner_id: string;
  name: string;
  description: string | null;
  is_public: boolean;
  cover_content_id: string | null;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface PlaylistItem {
  id: string;
  playlist_id: string;
  content_id: string;
  position: number;
  created_at: string;
}

export interface StorageUsage {
  owner_id: string;
  total_bytes: number;
  video_bytes: number;
  audio_bytes: number;
  image_bytes: number;
  document_bytes: number;
  archive_bytes: number;
  other_bytes: number;
  updated_at: string;
}

export type AnalyticsEventType =
  | 'view_start'
  | 'view_progress'
  | 'view_qualified'
  | 'download'
  | 'share_open';

export interface AnalyticsEvent {
  id: number;
  event_id: string;
  owner_id: string | null;
  content_id: string | null;
  share_link_id: string | null;
  event_type: AnalyticsEventType;
  viewer_hash: string | null;
  session_hash: string | null;
  country_code: string | null;
  device_type: string | null;
  platform: string | null;
  referrer: string | null;
  event_time: string;
}

export interface AnalyticsDaily {
  id: string;
  owner_id: string;
  content_id: string | null;
  share_link_id: string | null;
  metric_date: string;
  views: number;
  unique_viewers: number;
  downloads: number;
  watch_seconds: number;
  qualified_views: number;
  earnings_usd: number;
}

export type LedgerSourceType = 'qualified_views' | 'bonus' | 'adjustment' | 'payout';

export type LedgerStatus =
  | 'pending'
  | 'approved'
  | 'available'
  | 'paid'
  | 'reversed'
  | 'adjusted';

export interface EarningsLedgerEntry {
  id: string;
  creator_id: string;
  content_id: string | null;
  source_type: LedgerSourceType;
  source_event_id: string | null;
  eligible_views: number;
  rate_per_1000_views: number;
  amount_usd: number;
  status: LedgerStatus;
  created_at: string;
}

export interface CreatorBalance {
  creator_id: string;
  total_earned_usd: number;
  pending_usd: number;
  available_usd: number;
  paid_usd: number;
  updated_at: string;
}

export type PayoutStatus =
  | 'requested'
  | 'approved'
  | 'processing'
  | 'paid'
  | 'failed'
  | 'cancelled';

export interface Payout {
  id: string;
  creator_id: string;
  amount_usd: number;
  provider: string | null;
  provider_reference: string | null;
  status: PayoutStatus;
  requested_at: string | null;
  processed_at: string | null;
  created_at: string;
}

export type ScanStatus = 'queued' | 'scanning' | 'clean' | 'malicious' | 'error';

export interface MalwareScan {
  id: string;
  content_id: string;
  scanner: string;
  scanner_reference: string | null;
  status: ScanStatus;
  findings: Record<string, unknown> | null;
  started_at: string | null;
  completed_at: string | null;
  created_at: string;
}

export type JobStatus = 'queued' | 'processing' | 'completed' | 'failed' | 'retrying';

export interface ProcessingJob {
  id: string;
  content_id: string;
  job_type: string;
  provider: string | null;
  status: JobStatus;
  attempts: number;
  error_code: string | null;
  error_message: string | null;
  started_at: string | null;
  finished_at: string | null;
  created_at: string;
}

export interface AdminAuditLog {
  id: string;
  actor_user_id: string;
  action: string;
  target_type: string | null;
  target_id: string | null;
  metadata: Record<string, unknown> | null;
  created_at: string;
}

export interface PlatformSetting {
  key: string;
  value: Record<string, unknown> | string | number | boolean;
  description: string | null;
  updated_by: string | null;
  updated_at: string;
}
