# Playxim — Back-End Schema

**Product:** Playxim  
**Domain:** `playxim.com`  
**Document status:** Authoritative, build-ready specification  
**Prepared:** 2026-10-08  
**Role:** Defines the canonical PostgreSQL schema, entities, relationships, enums, RLS, financial ledger, processing state model, indexing, and database governance.


> **Shared product baseline:** Playxim is a creator-facing web platform for unlimited content storage/upload, sharing, creator analytics, and future creator monetization. The future Flutter applications are consumer-facing, with video streaming as the main consumption experience.

> **Design baseline:** Apple × Linear, premium and minimal, subtle glassmorphism, light mode by default, responsive desktop/tablet/mobile, with dark mode as a first-class alternative.

## Authority and dependencies

**Primary authority of this file:** Back-End Schema — what is persisted and who is allowed to access it.

Use the other documents for decisions outside this document's ownership; do not independently redefine shared product behavior.

- `PLAYXIM_PRD.md` — product behavior and scope
- `PLAYXIM_TRD.md` — runtime architecture and infrastructure
- `PLAYXIM_WEBSITE_PAGE_FLOW.md` — routes and user journeys
- `PLAYXIM_UI_UX_DESIGN_SYSTEM.md` — visual and interaction language
- `PLAYXIM_BACKEND_SCHEMA.md` — persistence and authorization model
- `PLAYXIM_IMPLEMENTATION_PLAN.md` — execution order and release gates

---

# 5. BACK-END SCHEMA

# 5.1 Schema Principles

1. Auth identity comes from Supabase Auth.
2. App profile data lives in public application tables.
3. Large binaries stay outside PostgreSQL.
4. All creator-owned records have owner/creator references.
5. Monetary records are append-only.
6. Provider identifiers are stored but never exposed as public security credentials.
7. Soft deletion is preferred for important content.
8. Public sharing is modeled separately from content ownership.

---

# 5.2 Core Entities

```text
profiles
creator_profiles
social_links

content_items
content_versions
video_assets
file_assets
folders

share_links
share_link_sessions

playlists
playlist_items

analytics_events
analytics_daily

storage_usage
earnings_ledger
creator_balances
payouts

malware_scans
processing_jobs

notifications  -- reserved
admin_audit_logs
platform_settings
provider_webhook_events
```

---

# 5.3 Profiles

```sql
profiles (
  id uuid primary key references auth.users(id),
  username text unique not null,
  email text,
  display_name text,
  avatar_url text,
  bio text,
  status text not null default 'active',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
)
```

Possible statuses:

```text
active
suspended
deleted
```

---

# 5.4 Creator Profiles

```sql
creator_profiles (
  user_id uuid primary key references profiles(id),
  brand_name text,
  profile_slug text unique,
  platform_profile_url text,
  public_email text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
)
```

`profile_slug` may map to the username.

---

# 5.5 Social Links

```sql
social_links (
  id uuid primary key,
  creator_id uuid not null references profiles(id),
  platform text not null,
  url text not null,
  position integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
)
```

Supported initially:

```text
youtube
telegram
instagram
x
facebook
linkedin
website
other
```

---

# 5.6 Folders

```sql
folders (
  id uuid primary key,
  owner_id uuid not null references profiles(id),
  parent_folder_id uuid references folders(id),
  name text not null,
  path_cache text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  deleted_at timestamptz
)
```

Constraint:

```text
parent_folder_id
```

must belong to the same owner.

---

# 5.7 Content Items

```sql
content_items (
  id uuid primary key,
  owner_id uuid not null references profiles(id),

  folder_id uuid references folders(id),

  type text not null,
  status text not null,

  name text not null,
  normalized_name text,
  mime_type text,
  extension text,

  size_bytes bigint not null default 0,

  visibility text not null default 'private',

  download_enabled boolean not null default true,

  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),

  deleted_at timestamptz
)
```

Types:

```text
video
audio
image
document
archive
other
```

Statuses:

```text
draft
uploading
uploaded
scanning
processing
ready
failed
rejected
deleted
```

Visibility:

```text
public
private
password
```

---

# 5.8 Content Versions

```sql
content_versions (
  id uuid primary key,
  content_id uuid not null references content_items(id),
  version_number integer not null,
  size_bytes bigint not null,
  checksum_sha256 text,
  original_filename text,
  created_at timestamptz not null default now(),
  deleted_at timestamptz,

  unique(content_id, version_number)
)
```

---

# 5.9 File Assets

```sql
file_assets (
  id uuid primary key,
  content_id uuid unique not null references content_items(id),

  storage_provider text not null default 'r2',
  bucket_name text not null,
  object_key text not null,

  etag text,
  checksum_sha256 text,

  created_at timestamptz not null default now()
)
```

---

# 5.10 Video Assets

```sql
video_assets (
  id uuid primary key,
  content_id uuid unique not null references content_items(id),

  provider text not null default 'cloudflare_stream',
  provider_video_id text unique not null,

  duration_ms bigint,
  width integer,
  height integer,
  frame_rate numeric,
  thumbnail_url text,

  processing_status text not null default 'pending',

  playback_ready_at timestamptz,

  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
)
```

---

# 5.11 Share Links

```sql
share_links (
  id uuid primary key,

  owner_id uuid not null references profiles(id),
  content_id uuid not null references content_items(id),

  code text unique not null,

  access_type text not null,
  password_hash text,

  download_enabled boolean not null default true,

  created_at timestamptz not null default now()
)
```

Access:

```text
public
password
```

Private content does not need a public share link. A private share record may be reserved internally but should not behave as a public URL.

No expiry field is needed for MVP.

---

# 5.12 Share Link Sessions

```sql
share_link_sessions (
  id uuid primary key,
  share_link_id uuid not null references share_links(id),

  session_token_hash text not null,

  created_at timestamptz not null default now(),
  expires_at timestamptz not null
)
```

Use hashed session tokens rather than storing raw tokens.

---

# 5.13 Playlists

```sql
playlists (
  id uuid primary key,
  owner_id uuid not null references profiles(id),

  name text not null,
  description text,

  is_public boolean not null default false,

  cover_content_id uuid references content_items(id),

  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  deleted_at timestamptz
)
```

---

# 5.14 Playlist Items

```sql
playlist_items (
  id uuid primary key,
  playlist_id uuid not null references playlists(id),
  content_id uuid not null references content_items(id),

  position integer not null,

  created_at timestamptz not null default now(),

  unique(playlist_id, content_id)
)
```

---

# 5.15 Storage Usage

```sql
storage_usage (
  owner_id uuid primary key references profiles(id),

  total_bytes bigint not null default 0,
  video_bytes bigint not null default 0,
  audio_bytes bigint not null default 0,
  image_bytes bigint not null default 0,
  document_bytes bigint not null default 0,
  archive_bytes bigint not null default 0,
  other_bytes bigint not null default 0,

  updated_at timestamptz not null default now()
)
```

---

# 5.16 Analytics Events

```sql
analytics_events (
  id bigint generated always as identity primary key,

  event_id uuid unique not null,

  owner_id uuid references profiles(id),
  content_id uuid references content_items(id),
  share_link_id uuid references share_links(id),

  event_type text not null,

  viewer_hash text,
  session_hash text,

  country_code text,
  device_type text,
  platform text,

  referrer text,

  event_time timestamptz not null
)
```

Do not use this table directly for dashboard queries at very high scale.

---

# 5.17 Analytics Daily

```sql
analytics_daily (
  id uuid primary key,

  owner_id uuid not null references profiles(id),
  content_id uuid references content_items(id),
  share_link_id uuid references share_links(id),

  metric_date date not null,

  views bigint not null default 0,
  unique_viewers bigint not null default 0,
  downloads bigint not null default 0,

  watch_seconds bigint not null default 0,
  qualified_views bigint not null default 0,

  earnings_usd numeric(18,6) not null default 0,

  unique(owner_id, content_id, share_link_id, metric_date)
)
```

---

# 5.18 Earnings Ledger

```sql
earnings_ledger (
  id uuid primary key,

  creator_id uuid not null references profiles(id),

  content_id uuid references content_items(id),

  source_type text not null,
  source_event_id uuid,

  eligible_views bigint not null default 0,

  rate_per_1000_views numeric(18,6) not null,

  amount_usd numeric(18,6) not null,

  status text not null,

  created_at timestamptz not null default now()
)
```

Statuses:

```text
pending
approved
available
paid
reversed
adjusted
```

---

# 5.19 Creator Balances

```sql
creator_balances (
  creator_id uuid primary key references profiles(id),

  total_earned_usd numeric(18,6) not null default 0,
  pending_usd numeric(18,6) not null default 0,
  available_usd numeric(18,6) not null default 0,
  paid_usd numeric(18,6) not null default 0,

  updated_at timestamptz not null default now()
)
```

Balance values should be rebuildable from the ledger.

---

# 5.20 Payouts

Reserved architecture:

```sql
payouts (
  id uuid primary key,

  creator_id uuid not null references profiles(id),

  amount_usd numeric(18,6) not null,

  provider text,
  provider_reference text,

  status text not null,

  requested_at timestamptz,
  processed_at timestamptz,

  created_at timestamptz not null default now()
)
```

Statuses:

```text
requested
approved
processing
paid
failed
cancelled
```

MVP provider implementation may be disabled.

---

# 5.21 Malware Scans

```sql
malware_scans (
  id uuid primary key,

  content_id uuid not null references content_items(id),

  scanner text not null,
  scanner_reference text,

  status text not null,

  findings jsonb,

  started_at timestamptz,
  completed_at timestamptz,

  created_at timestamptz not null default now()
)
```

Statuses:

```text
queued
scanning
clean
malicious
error
```

---

# 5.22 Processing Jobs

```sql
processing_jobs (
  id uuid primary key,

  content_id uuid not null references content_items(id),

  job_type text not null,
  provider text,

  status text not null,

  attempts integer not null default 0,

  error_code text,
  error_message text,

  started_at timestamptz,
  finished_at timestamptz,

  created_at timestamptz not null default now()
)
```

---

# 5.23 Provider Webhook Events

```sql
provider_webhook_events (
  id uuid primary key,

  provider text not null,
  external_event_id text not null,

  event_type text not null,

  payload jsonb,

  processed_at timestamptz,

  created_at timestamptz not null default now(),

  unique(provider, external_event_id)
)
```

---

# 5.24 Admin Audit Logs

```sql
admin_audit_logs (
  id uuid primary key,

  actor_user_id uuid not null references profiles(id),

  action text not null,

  target_type text,
  target_id uuid,

  metadata jsonb,

  created_at timestamptz not null default now()
)
```

---

# 5.25 Platform Settings

```sql
platform_settings (
  key text primary key,
  value jsonb not null,
  description text,
  updated_by uuid references profiles(id),
  updated_at timestamptz not null default now()
)
```

Examples:

```text
creator_view_rate_usd
creator_view_rate_unit
qualified_view_seconds
qualified_view_short_video_percentage
max_parallel_uploads
share_session_minutes
```

---

# 5.26 Recommended Database Enums

Use PostgreSQL enum types when they are stable and central.

For rapidly evolving business states, text + CHECK constraints may be easier to migrate.

Do not create dozens of tiny enums unnecessarily.

---

# 5.27 Core Relationships

```text
profiles
  │
  ├── creator_profiles
  ├── social_links
  ├── folders
  ├── content_items
  │     ├── content_versions
  │     ├── file_assets
  │     ├── video_assets
  │     ├── share_links
  │     └── playlist_items
  │
  ├── playlists
  ├── analytics_daily
  ├── earnings_ledger
  ├── creator_balances
  └── payouts
```

---

# 5.28 RLS Policy Model

## Profiles

User can:

- read/update own profile,
- public read selected fields for creator profile.

## Content

User can:

- CRUD own content,
- no direct public access through table APIs.

## Folders

User can CRUD own folders.

## Playlists

User can CRUD own playlists.

## Share links

User can create/read own links.

## Analytics

Creator can only read aggregates associated with own content.

## Earnings

Creator can read only own earnings.

## Admin

Admin access should use server-controlled authorization.

---

# 5.29 Database Transaction Rules

Important multi-step operations should be transactional.

Example create content:

```text
content_items
+
content_version
+
upload tracking
```

Example delete:

```text
mark deleted
+
storage state
+
usage delta
```

Monetization:

```text
eligible event
+
ledger entry
+
balance update
```

---

# 5.30 Monetary Precision

Never use JavaScript floating point for ledger settlement.

Use:

```text
numeric(18,6)
```

in PostgreSQL.

Represent cents/micro-units explicitly in application code when possible.

---

# 5.31 API Authentication Matrix

| Route category | Auth |
|---|---|
| Marketing | Public |
| Sign up/login | Public |
| Public share | Public/password session |
| Dashboard | Required |
| Upload initiation | Required |
| Content CRUD | Required + ownership |
| Analytics | Required + ownership |
| Earnings | Required + ownership |
| Admin | Required + admin |
| App playback | Required or authorized share context |

---


## Schema implementation standard

### Canonical identity

Use UUIDs (or equivalent cryptographically strong IDs) for internal entities. Never expose sequential database IDs in public URLs. Public link codes and usernames are separate public identifiers.

### Ownership column

Any user-owned domain record must have a direct or safely derivable ownership path. Prefer explicit `owner_id`/`user_id` fields on hot-path resources rather than expensive multi-hop ownership resolution.

### Auditability

Changes to sensitive resources such as visibility, password protection, payout state, admin settings, or impersonation must produce an auditable event.

### Soft deletion

Content deletion should normally transition the logical record first and defer physical provider deletion through an asynchronous cleanup job. This protects against accidental immediate data loss and makes retries possible.

### Idempotency

Use unique idempotency keys for:

- upload completion;
- webhook events;
- earnings credits;
- payout state transitions;
- analytics ingestion where duplicate counting would materially distort metrics.

## Reference SQL conventions

The implementation should use migrations that explicitly define:

- `uuid`/identity keys;
- `timestamptz` for time;
- `numeric(p,s)` for money;
- constrained enums or lookup tables for finite states;
- `jsonb` only for genuinely variable provider/event payloads;
- explicit foreign-key `on delete` behavior.

Do not turn PostgreSQL into an untyped JSON document store.

## Hot-path indexes

At minimum, review indexes for:

```text
content_items(owner_id, created_at desc)
content_items(owner_id, status)
share_links(code)
share_links(content_id, is_active)
folders(owner_id, parent_id)
playlists(owner_id, created_at desc)
analytics_events(content_id, occurred_at)
earnings_ledger(owner_id, created_at desc)
processing_jobs(status, available_at)
admin_audit_logs(actor_id, created_at desc)
```

The exact final index set should be validated against query plans in staging.

## RLS rule of thumb

RLS should express ownership and role constraints, while complex business processes remain in domain services/transactions. Avoid encoding multi-step monetization logic entirely inside RLS policies.

