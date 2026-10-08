# Playxim — Technical Requirements Document (TRD)

**Product:** Playxim  
**Domain:** `playxim.com`  
**Document status:** Authoritative, build-ready specification  
**Prepared:** 2026-10-08  
**Role:** Defines the system architecture, runtime, providers, APIs, upload/video pipelines, security, observability, caching, deployments, and future client contract.


> **Shared product baseline:** Playxim is a creator-facing web platform for unlimited content storage/upload, sharing, creator analytics, and future creator monetization. The future Flutter applications are consumer-facing, with video streaming as the main consumption experience.

> **Design baseline:** Apple × Linear, premium and minimal, subtle glassmorphism, light mode by default, responsive desktop/tablet/mobile, with dark mode as a first-class alternative.

## Authority and dependencies

**Primary authority of this file:** TRD — how the product is implemented and operated.

Use the other documents for decisions outside this document's ownership; do not independently redefine shared product behavior.

- `PLAYXIM_PRD.md` — product behavior and scope
- `PLAYXIM_TRD.md` — runtime architecture and infrastructure
- `PLAYXIM_WEBSITE_PAGE_FLOW.md` — routes and user journeys
- `PLAYXIM_UI_UX_DESIGN_SYSTEM.md` — visual and interaction language
- `PLAYXIM_BACKEND_SCHEMA.md` — persistence and authorization model
- `PLAYXIM_IMPLEMENTATION_PLAN.md` — execution order and release gates

---

# 2. TRD — Technical Requirements Document

# 2.1 Architecture Overview

Recommended architecture:

```text
                         ┌────────────────────┐
                         │     PLAYXIM WEB    │
                         │ Next.js + React TS │
                         └─────────┬──────────┘
                                   │
                      Server actions / Route handlers
                                   │
                                   ▼
                         ┌────────────────────┐
                         │ Application Layer │
                         │ domain services   │
                         └───────┬──────┬─────┘
                                 │      │
                       ┌─────────┘      └─────────────┐
                       ▼                              ▼
               ┌──────────────┐               ┌──────────────┐
               │   Supabase   │               │  Cloudflare  │
               │ Auth/Postgres│               │ R2 / Stream  │
               └──────┬───────┘               └──────┬───────┘
                      │                              │
                      ▼                              ▼
                 Metadata                     Content / media
                      │                              │
                      └──────────────┬───────────────┘
                                     ▼
                              Event / Queue Layer
                                     │
                        ┌────────────┼────────────┐
                        ▼            ▼            ▼
                     Malware     Analytics    Processing
                     workflow    aggregation   callbacks
                                     │
                                     ▼
                                 PostHog/Sentry
```

---

# 2.2 Technology Stack

## Framework

- Next.js 16.4
- React 19.3
- TypeScript
- App Router

Next.js 16.4 and React 19.3 are current verified releases for the date of this specification.

## Styling

- Tailwind CSS 4.3
- CSS variables
- native CSS for complex visual effects

## UI

- shadcn/ui
- Base UI primitives
- Lucide React

As of July 2026, shadcn/ui defaults new projects to Base UI while continuing to support Radix. Playxim should use Base UI for new primitives.

## Animation

- Anime.js 4
- CSS transitions for micro-interactions
- Lenis for marketing-page smooth scroll

## Forms

- React Hook Form
- Zod

## Client state

- Zustand only where local client state genuinely benefits from it.

Do not move server state into Zustand.

## Charts

- Recharts

## Authentication

- Supabase Auth

## Database

- Supabase PostgreSQL
- Row Level Security

## Storage

- Cloudflare R2

## Video

- Cloudflare Stream

## Background infrastructure

- Cloudflare Workers
- Cloudflare Queues
- R2 event notifications

## Hosting

- Vercel

## Observability

- Sentry
- PostHog

## Testing

- Playwright
- Vitest 5.x/latest at lock time

## Version control

- GitHub

---

# 2.3 Version Policy

"Use all latest" should not mean dependency chaos.

Policy:

1. Start from the latest stable supported release.
2. Pin exact package versions through a lockfile.
3. Use Renovate/Dependabot-style controlled upgrades later.
4. Never upgrade production dependencies blindly immediately before release.
5. Read migration/breaking-change notes for major upgrades.
6. Keep the deployment reproducible.

At implementation lock time, verify all package versions again.

---

# 2.4 Runtime Policy

Recommended Node runtime:

- current active LTS supported by the selected Next.js version,
- use the version specified by the project toolchain file,
- lock development and CI to the same major/minor line.

Required files:

```text
.nvmrc
package.json
pnpm-lock.yaml
```

Optional:

```text
.tool-versions
```

---

# 2.5 Monorepo Recommendation

Because Web comes first but Flutter and desktop will come later, use a structure that keeps platform-neutral contracts separate.

Recommended future structure:

```text
playxim/
├── apps/
│   └── web/
│
├── packages/
│   ├── types/
│   ├── validation/
│   ├── config/
│   └── api-contracts/
│
├── workers/
│   ├── upload-events/
│   ├── media-events/
│   ├── malware/
│   └── analytics/
│
├── supabase/
│   ├── migrations/
│   ├── seed/
│   └── functions/
│
├── docs/
│
├── tests/
│
├── package.json
└── pnpm-workspace.yaml
```

Do not force Flutter into the same JavaScript workspace.

Later:

```text
playxim-flutter/
```

can consume stable API contracts.

---

# 2.6 Next.js Route Groups

Recommended:

```text
app/
├── (marketing)/
├── (auth)/
├── (creator)/
├── (share)/
├── (admin)/
└── api/
```

Example:

```text
app/
├── (marketing)/
│   ├── page.tsx
│   ├── features/
│   ├── why-playxim/
│   ├── creator/
│   ├── pricing/
│   ├── faq/
│   ├── download/
│   ├── contact/
│   └── ...
│
├── (auth)/
│   └── auth/
│
├── (creator)/
│   └── dashboard/
│
├── (share)/
│   ├── watch/[code]/
│   └── app/[code]/
│
├── (admin)/
│   └── admin/
│
└── api/
    ├── uploads/
    ├── content/
    ├── links/
    ├── analytics/
    └── app/
```

---

# 2.7 Rendering Strategy

## Marketing

Prefer:

- Server Components,
- static generation,
- ISR/cache where appropriate,
- minimal client components.

## Dashboard

Use:

- Server Components for data-heavy page shells,
- Client Components for interactive tables, filters, upload queue, dialogs, charts.

## Share pages

Server-render initial metadata.

Dynamic access verification should happen on the server.

## Admin

Server-first with client-side interaction only where required.

---

# 2.8 API Architecture

Use Next.js Route Handlers as the external application API during MVP.

The underlying business logic must live in services.

Bad:

```text
route.ts
  → 500 lines of database logic
```

Good:

```text
route.ts
  → authenticate
  → validate
  → call domain service
  → return response
```

Example:

```text
POST /api/uploads/initiate

Route Handler
   ↓
authService.requireUser()
   ↓
uploadService.initiateUpload()
   ↓
storageProvider.createMultipartUpload()
   ↓
databaseService.createContent()
   ↓
response
```

---

# 2.9 Domain Services

Recommended:

```text
AuthService
CreatorService
ContentService
FolderService
PlaylistService
UploadService
StorageService
MediaService
ShareLinkService
AnalyticsService
EarningsService
BrandingService
AdminService
AuditService
MalwareService
```

Each service should expose business-level operations.

---

# 2.10 Provider Abstractions

Important interfaces:

```text
ObjectStorageProvider
VideoProvider
MalwareScanner
AnalyticsProvider
EmailProvider
PayoutProvider
```

Example:

```ts
interface ObjectStorageProvider {
  createMultipartUpload(...): Promise<MultipartUpload>;
  getPartUploadUrl(...): Promise<SignedUploadPart>;
  completeMultipartUpload(...): Promise<StoredObject>;
  deleteObject(...): Promise<void>;
  createDownloadUrl(...): Promise<SignedDownload>;
}
```

Video:

```ts
interface VideoProvider {
  createDirectUpload(...): Promise<DirectVideoUpload>;
  getVideoStatus(...): Promise<VideoStatus>;
  getPlaybackToken(...): Promise<PlaybackToken>;
  deleteVideo(...): Promise<void>;
}
```

This is essential for future multi-provider video architecture.

---

# 2.11 Upload Architecture

## Generic file flow

```text
Browser
  │
  │  POST /api/uploads/initiate
  ▼
Next.js
  │
  ├── Auth
  ├── Validate metadata
  ├── Generate object key
  ├── Create content row
  └── Create R2 multipart upload
  │
  ▼
Browser receives part URLs
  │
  ▼
Parallel PUT parts directly to R2
  │
  ▼
POST /api/uploads/complete
  │
  ▼
R2 CompleteMultipartUpload
  │
  ▼
content status = uploaded
  │
  ▼
Queue / processing event
  │
  ├── malware scan
  ├── metadata extraction
  └── ready/rejected
```

Application server must not proxy multi-gigabyte payloads.

---

# 2.12 Video Upload Architecture

For supported video sizes:

```text
Browser
   │
   ▼
POST /api/uploads/video
   │
   ▼
Next.js validates user/content
   │
   ▼
Cloudflare Stream Direct Creator Upload
   │
   ▼
Browser uploads directly to Stream
   │
   ▼
Stream processes video
   │
   ▼
Webhook/callback
   │
   ▼
Playxim media service updates video_asset
   │
   ▼
content.status = READY
```

For large/unreliable video uploads, use Stream's TUS resumable protocol.

---

# 2.13 Video Provider Constraint

Cloudflare Stream currently documents uploads smaller than 30 GB.

Therefore:

```text
Video < Stream max
   → Stream

Video > Stream max
   → reject with a precise message in MVP
   → future large-video adapter
```

Do not silently route huge videos to a path that cannot process them.

Future UX can say:

> This video is larger than the current Playxim video-processing limit. Large-video support is coming soon.

---

# 2.14 Video Processing States

```text
pending
uploading
uploaded
processing
ready
error
deleted
```

Potential provider state mapping:

```text
Stream upload complete
        ↓
queued
        ↓
processing
        ↓
ready
```

---

# 2.15 App Playback Architecture — Future

Flutter should not receive raw storage credentials.

Expected:

```text
Flutter
  │
  ▼
GET /api/app/videos/:id/playback
  │
  ▼
Auth / share authorization
  │
  ▼
VideoService
  │
  ▼
signed playback token / manifest
  │
  ▼
Flutter HLS player
  │
  ▼
Cloudflare Stream
```

For public video:

- app can use a tokenized/public policy depending on content configuration.

For private/password-protected content:

- application must obtain a short-lived authorized playback token.

---

# 2.16 Signed URL Strategy

For R2:

- direct bucket URLs should not be exposed as the application's canonical content URLs,
- generate short-lived presigned URLs for downloads where appropriate,
- keep credentials server-side.

Cloudflare R2 presigned URLs currently support temporary GET/PUT/HEAD/DELETE access, with an expiry window that can be configured up to seven days.

Recommended Playxim download token lifetime:

- 5–15 minutes for sensitive/private downloads,
- longer only when UX clearly benefits.

Public canonical URLs remain:

```text
playxim.com/watch/:code
```

not the R2 object URL.

---

# 2.17 Private Content

Private content access:

```text
request
  ↓
authenticate
  ↓
verify owner
  ↓
verify content relationship
  ↓
issue short-lived storage token
  ↓
download
```

Never:

```text
browser → R2 bucket public
```

---

# 2.18 Password-Protected Content

Flow:

```text
GET /watch/code
       ↓
access=PASSWORD
       ↓
password screen
       ↓
POST /api/share/code/unlock
       ↓
hash verification
       ↓
short-lived signed share-session cookie
       ↓
content action
```

Cookie requirements:

- HttpOnly,
- Secure in production,
- SameSite appropriate to flow,
- narrow path/domain,
- short lifetime.

Do not put the password itself into the browser's local storage.

---

# 2.19 Cloudflare R2 Buckets

Recommended separation:

```text
playxim-content
playxim-quarantine
playxim-derived
playxim-temp
```

### `playxim-content`

User-ready files.

### `playxim-quarantine`

Files awaiting malware validation.

### `playxim-derived`

Future:

- thumbnails,
- previews,
- metadata outputs,
- generated derivatives.

### `playxim-temp`

Temporary processing artifacts with strict lifecycle rules.

---

# 2.20 Object Key Strategy

Never use:

```text
/photos/IMG001.jpg
```

Recommended:

```text
accounts/{accountId}/content/{contentId}/original/{safeFilename}
```

Example:

```text
accounts/uuid/content/uuid/original/video.mp4
```

This prevents:

- collisions,
- username-based enumeration,
- unsafe path assumptions,
- accidental overwrite.

---

# 2.21 Filename Security

Store:

- original filename,
- sanitized display name,
- storage key.

Do not use raw user filenames directly as storage identifiers.

Normalize Unicode carefully.

Prevent:

- path traversal,
- slash injection,
- control characters,
- invalid UTF-8,
- spoofed extensions.

---

# 2.22 Malware Scanning

Every generic file should pass through a background scanning workflow before becoming fully downloadable.

Recommended:

```text
upload complete
   ↓
quarantine
   ↓
scan queued
   ↓
scanner
   ├── clean → ready
   └── malicious → rejected
```

Video processing can have a separate scan/provider policy.

The scanner should be an abstraction:

```text
MalwareScanner
```

so the engine can be changed later.

---

# 2.23 Cloudflare Queue Architecture

Use Cloudflare Queues to decouple upload completion from asynchronous processing.

Example queues:

```text
playxim-content-events
playxim-malware-jobs
playxim-analytics-events
playxim-revenue-events
```

Event flow:

```text
R2 event
  ↓
Queue
  ↓
Consumer Worker
  ↓
service/action
```

Cloudflare documents R2 event notifications that can push object-created/object-deleted events into queues, and Queues provides retrying and scalable asynchronous consumers.

---

# 2.24 Queue Idempotency

Every queued event must contain an idempotency key.

Example:

```json
{
  "eventId": "uuid",
  "eventType": "content.upload.completed",
  "contentId": "uuid",
  "attempt": 1
}
```

Consumer logic:

```text
if event already processed:
    acknowledge
else:
    process
    store event id
```

Never assume queue delivery occurs exactly once.

---

# 2.25 Background Worker Responsibilities

Worker responsibilities:

- R2 object event processing,
- malware scan orchestration,
- metadata extraction,
- content status updates,
- analytics aggregation,
- revenue ledger processing,
- cleanup,
- reconciliation jobs.

Do not place long-running binary processing directly inside Vercel request handlers.

---

# 2.26 Vercel Function Policy

Vercel route handlers should be used for:

- auth,
- validation,
- signed URL generation,
- metadata operations,
- small API requests,
- share-link resolution,
- admin actions.

Do not use them for:

- multi-GB proxy uploads,
- long-running FFmpeg,
- large synchronous media processing.

Vercel functions have configurable maximum execution durations; using them for media processing would create avoidable reliability and cost problems.

---

# 2.27 Supabase Architecture

Use Supabase for:

- authentication,
- PostgreSQL,
- RLS,
- relational metadata,
- transactional state,
- creator profiles.

Do not store the actual large user content in Supabase Storage.

Use Cloudflare R2/Stream as specified.

---

# 2.28 Authentication Architecture

Methods:

- Email/password
- Google OAuth

Required:

- email verification,
- secure session handling,
- password reset.

Recommended account flow:

```text
signup
 ↓
email verification
 ↓
profile bootstrap
 ↓
username selection
 ↓
creator dashboard
```

Google flow:

```text
Google OAuth
 ↓
Supabase Auth
 ↓
profile bootstrap if first login
 ↓
username setup if needed
```

---

# 2.29 Username Requirements

Username:

- unique,
- case-insensitive,
- URL-safe,
- 3–30 characters,
- letters/numbers/underscore/hyphen,
- no reserved system names.

Reserved:

```text
admin
api
app
auth
dashboard
download
features
help
privacy
pricing
settings
status
support
watch
www
```

Potential route collision names must be reserved.

---

# 2.30 Database Rules

Every user-owned table should contain:

```text
owner_id / creator_id
```

Every exposed user-owned table must have RLS.

Supabase explicitly recommends enabling RLS on exposed tables and using policies for granular authorization.

Principle:

> Database authorization must not depend only on frontend route protection.

---

# 2.31 RLS Strategy

Example:

```sql
create policy "creator can read own content"
on content_items
for select
using (owner_id = auth.uid());
```

For updates:

```sql
using (owner_id = auth.uid())
with check (owner_id = auth.uid());
```

Public share resolution should use a secure server-side service path rather than weakening creator-owned RLS globally.

---

# 2.32 Admin Security

Admin operations should not be granted merely because a user has a client-side role.

Use:

```text
authenticated user
        ↓
admin authorization check
        ↓
server-side service
        ↓
privileged database operation
```

Admin actions must be audited.

---

# 2.33 Audit Logging

Log:

- admin login,
- user impersonation,
- content deletion,
- account suspension if later enabled,
- earnings adjustment,
- link/password changes,
- platform configuration changes,
- payout state changes,
- sensitive security events.

Audit entry:

```text
id
actor_user_id
action
target_type
target_id
metadata
ip_hash / privacy-safe network context
user_agent
created_at
```

Sensitive data must not be logged unnecessarily.

---

# 2.34 User Impersonation

Admin can support:

```text
Admin
 ↓
Select user
 ↓
Start support session
 ↓
View user experience
```

Security requirements:

- explicit audit record,
- admin identity remains known,
- impersonated session cannot silently become a normal login,
- sensitive operations may require re-authentication,
- clear UI indicator:

> "Viewing as Sohan"

Do not allow an admin to forget which identity is active.

---

# 2.35 API Error Contract

Every API should return predictable errors.

Example:

```json
{
  "error": {
    "code": "UPLOAD_LIMIT_EXCEEDED",
    "message": "This video exceeds the current video processing limit."
  }
}
```

Stable error codes:

```text
AUTH_REQUIRED
FORBIDDEN
NOT_FOUND
VALIDATION_ERROR
UPLOAD_NOT_FOUND
UPLOAD_EXPIRED
UPLOAD_ALREADY_COMPLETED
CONTENT_NOT_READY
PASSWORD_REQUIRED
INVALID_PASSWORD
LINK_NOT_FOUND
LINK_ACCESS_DENIED
RATE_LIMITED
STORAGE_ERROR
MEDIA_PROCESSING_ERROR
MALWARE_REJECTED
INTERNAL_ERROR
```

Do not expose provider internals to end users.

---

# 2.36 API Rate Limits

Important endpoints should have rate limits:

```text
login
signup
password reset
share unlock
link creation
upload initiate
admin actions
download token creation
analytics event ingestion
```

Use IP/user/account-based keys as appropriate.

Do not rely on client-side throttling.

---

# 2.37 Upload Abuse Protection

Controls:

- maximum concurrent active uploads per creator,
- maximum request frequency,
- file size validation,
- MIME sniffing,
- extension validation,
- upload expiration,
- abandoned upload cleanup,
- signed upload URL expiration,
- malicious payload rejection.

Because storage is "unlimited" by product policy, abuse controls become more important, not less.

---

# 2.38 Storage Usage Calculation

Do not calculate total storage by scanning all objects during every dashboard request.

Maintain:

```text
storage_usage
```

aggregated by creator.

Update transactionally/eventually:

```text
upload complete → +size
delete          → -size
replacement     → delta
```

Periodic reconciliation job:

```text
actual object metadata
        vs
database usage
```

to detect drift.

---

# 2.39 Content Lifecycle

```text
created
  ↓
uploading
  ↓
uploaded
  ↓
scanning
  ↓
processing
  ↓
ready
  │
  ├── shared
  ├── downloaded
  └── viewed in app
  ↓
deleted
```

Deletion should use soft-delete first.

Later cleanup:

```text
soft-deleted record
   ↓
retention window
   ↓
object deletion
   ↓
permanent cleanup
```

This creates a recovery path during operational mistakes.

---

# 2.40 Content Versioning

Recommended future-proof model:

```text
content_item
   │
   ├── content_version_1
   ├── content_version_2
   └── content_version_3
```

MVP may store one active version, but schema should be able to evolve without changing URLs.

This is especially useful if "Replace file" is added.

---

# 2.41 Analytics Architecture

Do not write every raw event directly into a dashboard aggregate table.

Use:

```text
Client/App event
    ↓
API/event collector
    ↓
queue
    ↓
raw event storage
    ↓
aggregation
    ↓
daily/period aggregates
    ↓
dashboard
```

For website analytics, PostHog handles product/web analytics.

For creator business analytics and monetization, Playxim should maintain first-party aggregates because those metrics are product/business records.

---

# 2.42 First-Party Analytics Event Types

Examples:

```text
content_uploaded
content_ready
content_downloaded
share_link_created
share_link_opened
share_password_unlocked
app_handoff_opened
app_playback_started
app_view_qualified
app_playback_completed
playlist_created
content_added_to_playlist
profile_viewed
```

---

# 2.43 Analytics Privacy

Avoid collecting more personal information than necessary.

Store:

- coarse country when required,
- device class,
- platform,
- referrer,
- event timestamp,
- anonymized/deduplicated viewer identifier.

Avoid storing raw IP addresses long-term unless there is an explicit operational/legal reason.

Where possible, hash or truncate sensitive network identifiers.

---

# 2.44 PostHog Use

PostHog should primarily handle:

- web product analytics,
- marketing analytics,
- conversion funnels,
- session/replay where appropriately configured,
- UX investigation.

It should not be the authoritative ledger for creator monetary earnings.

Current PostHog supports web analytics around visitors, pageviews, sessions, referrers, UTMs, devices and related metrics, making it suitable for the web behavioral layer.

---

# 2.45 Sentry Use

Sentry should capture:

- server errors,
- client errors,
- route failures,
- upload failures,
- processing errors,
- important custom breadcrumbs,
- performance traces where useful.

Never send:

- passwords,
- private file contents,
- presigned URLs,
- access tokens,
- secret keys.

Mask sensitive metadata.

---

# 2.46 Caching

Safe caching targets:

- marketing pages,
- public feature metadata,
- static assets,
- public creator profile metadata when safe,
- public share metadata after authorization rules permit.

Do not cache private:

- dashboard data,
- balances,
- private file metadata,
- authenticated download tokens.

---

# 2.47 Database Index Strategy

Core indexes:

```text
profiles(username)
content_items(owner_id, created_at desc)
content_items(owner_id, type)
content_items(owner_id, status)
content_items(owner_id, deleted_at)
content_items(owner_id, parent_folder_id)
share_links(code)
share_links(content_id)
share_links(owner_id, created_at desc)
playlists(owner_id, created_at desc)
playlist_items(playlist_id, position)
analytics_daily(owner_id, date)
analytics_daily(content_id, date)
earnings_ledger(creator_id, created_at desc)
earnings_ledger(content_id, created_at desc)
```

Use partial indexes where appropriate for non-deleted content.

---

# 2.48 Pagination

Never fetch all content for large creators.

Use cursor pagination for content lists where practical.

Example:

```text
GET /api/content?cursor=...
```

Prefer stable ordering:

```text
created_at desc, id desc
```

This avoids duplicate/missing records when content is inserted while paging.

---

# 2.49 Search

MVP:

- PostgreSQL trigram/full-text search where appropriate.

Search fields:

- file name,
- display title,
- folder name.

Future:

- semantic search,
- AI search,
- content transcript search.

AI search is explicitly deferred.

---

# 2.50 Security Baseline

Implement:

- HTTPS,
- secure cookies,
- CSP,
- strict transport security,
- frame protections,
- MIME sniffing protection,
- CSRF protection where applicable,
- server-side validation,
- RLS,
- signed uploads,
- signed downloads,
- short-lived tokens,
- rate limiting,
- malware scanning,
- audit logging,
- dependency security scanning.

Never expose:

```text
SUPABASE_SERVICE_ROLE_KEY
CLOUDFLARE_API_TOKEN
R2_SECRET_ACCESS_KEY
```

to the browser.

---

# 2.51 Content Security Policy

Marketing/dashboard CSP should restrict:

- scripts,
- frames,
- images,
- media,
- connections.

Allow only explicitly required third-party origins:

- Supabase,
- PostHog,
- Sentry,
- Cloudflare,
- future app-store assets.

---

# 2.52 File Download Headers

For download:

```text
Content-Disposition: attachment
Content-Type: detected content type
```

For safe preview when intentionally supported:

```text
Content-Disposition: inline
```

Do not let arbitrary user-provided names inject response headers.

---

# 2.53 Image / Thumbnail Handling

For video:

- use Stream-provided thumbnail capabilities initially,
- cache poster URL metadata,
- do not dynamically generate thumbnails on every page load.

For generic images:

- optional lightweight thumbnail generation later.

MVP content cards should avoid loading original multi-megabyte images into the dashboard unnecessarily.

---

# 2.54 Video Metadata

Store:

- duration,
- width,
- height,
- frame rate where available,
- codec/container metadata where useful,
- thumbnail reference,
- provider video ID,
- processing status.

---

# 2.55 App/Web Contract

Future app must not need to know:

```text
R2 bucket names
Stream API tokens
Supabase service keys
```

The app sees only Playxim domain concepts:

```text
Content
Creator
ShareLink
Playlist
PlaybackSession
AnalyticsEvent
```

---

# 2.56 API Resource Naming

Recommended:

```text
GET    /api/content
POST   /api/content
GET    /api/content/:id
PATCH  /api/content/:id
DELETE /api/content/:id

POST   /api/uploads/initiate
POST   /api/uploads/:id/complete
POST   /api/uploads/:id/cancel
GET    /api/uploads/:id

POST   /api/links
GET    /api/links
PATCH  /api/links/:id

GET    /api/analytics/overview
GET    /api/analytics/content/:id
GET    /api/analytics/links/:id

GET    /api/earnings
GET    /api/earnings/ledger

GET    /api/profile
PATCH  /api/profile
```

App-specific:

```text
GET /api/app/content/:id
GET /api/app/content/:id/playback
POST /api/app/events
GET /api/app/playlists/:id
```

---

# 2.57 Webhook Architecture

Provider webhooks must be:

- signature-verified,
- idempotent,
- persisted,
- retried safely.

Example:

```text
Cloudflare webhook
      ↓
verify signature
      ↓
store provider event
      ↓
enqueue processing
      ↓
update domain state
```

Never trust provider webhook payloads without verification.

---

# 2.58 Operational Monitoring

Key health indicators:

```text
Upload success %
Upload median speed
Upload failure %
Processing success %
Processing latency
Malware scan failures
R2 error rate
Stream error rate
Share link error rate
API p95 latency
Database p95 latency
Queue backlog
Webhook delay
Creator earnings reconciliation drift
```

---

# 2.59 Disaster Recovery

Back up:

- database,
- application configuration,
- infrastructure configuration,
- webhook/event identifiers,
- business ledger.

Content itself resides in Cloudflare storage services.

Critical requirement:

> The database must be recoverable without losing the ability to reconstruct content ownership and storage references.

---

# 2.60 Deployment Environments

At minimum:

```text
Local
Preview
Production
```

Recommended:

```text
Local
Staging
Preview
Production
```

Production secrets must never be shared with preview deployments unless explicitly isolated.

---
# 12. AUTHORITATIVE ARCHITECTURE DECISION

The most important technical decision in this specification is:

```text
                    PLAYXIM
                       │
        ┌──────────────┴──────────────┐
        │                             │
       WEB                         FUTURE APPS
 Creator control plane           Consumer media plane
        │                             │
        └──────────────┬──────────────┘
                       │
                    API/domain
                       │
        ┌──────────────┼──────────────┐
        │              │              │
    Supabase          R2          Stream
    Auth/Postgres   Files        Video
        │              │              │
        └──────────────┼──────────────┘
                       │
                  Event / Queue
                       │
                Background workers
```

This architecture is intentionally designed so that:

- the web can launch first,
- Flutter can be added later,
- Windows/Linux can be added later,
- the video layer can evolve,
- storage can scale,
- creator earnings can become production-grade,
- the application does not need to know infrastructure internals.

---
# 13. CURRENT TECHNOLOGY VERIFICATION NOTES

The implementation should re-check package versions at lock time, but the following were verified while preparing this document:

- **Next.js 16.4** is available as of October 6, 2026.
- **React 19.3** is the latest documented React major/minor line.
- **Tailwind CSS 4.3** is current as of May 2026.
- **shadcn/ui** uses **Base UI as the default** for new projects as of July 2026.
- **Vitest 5.0** was announced in September 2026.
- **Cloudflare Stream** provides managed upload, storage, encoding, adaptive bitrate playback and signed-access features.
- **Cloudflare R2** supports resumable multipart uploads and large object storage.
- **Cloudflare R2 event notifications + Queues** can provide asynchronous object-processing workflows.
- **Supabase Auth + PostgreSQL + RLS** provides the intended authentication/authorization foundation.
- **PostHog** can cover the web analytics layer.
- **Lenis** remains a lightweight smooth-scroll option for immersive marketing experiences.

---
# 14. OFFICIAL REFERENCE SOURCES

These are implementation references, not product dependencies:

- Next.js: https://nextjs.org/
- React: https://react.dev/
- Tailwind CSS: https://tailwindcss.com/
- shadcn/ui: https://ui.shadcn.com/
- Base UI: https://base-ui.com/
- Supabase: https://supabase.com/docs
- Cloudflare R2: https://developers.cloudflare.com/r2/
- Cloudflare Stream: https://developers.cloudflare.com/stream/
- Cloudflare Queues: https://developers.cloudflare.com/queues/
- Vercel: https://vercel.com/docs
- Sentry: https://docs.sentry.io/
- PostHog: https://posthog.com/docs
- Lenis: https://lenis.dev/
- Playwright: https://playwright.dev/
- Vitest: https://vitest.dev/
- Recharts: https://recharts.org/

---
# 15. BUILD STANDARD

This project is considered complete only when:

> The product is not merely visually impressive; it is reliable under real uploads, predictable under failure, secure under adversarial use, responsive across device sizes, and structured so future Flutter/desktop clients can reuse the same domain and API architecture.

The priority order is:

```text
Reliability
>
Security
>
UX
>
Performance
>
Visual polish
>
Novel effects
```

Premium design never compensates for broken upload infrastructure.

---

# END OF DOCUMENT

## Technical non-negotiables

### Secrets and authorization

- Never expose Supabase service-role keys, Cloudflare API tokens, signing secrets, webhook secrets, or malware-scanning credentials to the browser.
- Browser authorization is not considered sufficient by itself; server and database policies must enforce resource ownership.
- Admin access must be separated from creator access and audited.

### Large file handling

- Large binary uploads must use direct or delegated upload paths, not Vercel request bodies.
- Resumable/multipart behavior must survive transient browser/network failure.
- Upload sessions must be resumable without creating duplicate logical content records.

### Async processing

- Malware scan, media metadata extraction, thumbnail generation, and video processing are asynchronous.
- Every job has a durable state, attempt counter, idempotency key, timestamps, and failure reason.
- Webhooks must be replay-safe.

### Provider abstraction

The web application must depend on internal interfaces such as:

```ts
interface FileStorageProvider {
  createUploadSession(...): Promise<UploadSession>;
  completeUpload(...): Promise<UploadResult>;
  createDownloadGrant(...): Promise<AccessGrant>;
  deleteObject(...): Promise<void>;
}

interface VideoProvider {
  createVideoUpload(...): Promise<VideoUploadSession>;
  getPlaybackAccess(...): Promise<PlaybackAccess>;
  deleteVideo(...): Promise<void>;
}
```

The rest of the application must not know whether the provider is R2, Stream, or a future replacement.

### API contract rule

API responses must be versionable and stable enough for the future Flutter applications. Do not return presentation-specific database shapes.

### Performance rule

Premium animation is subordinate to core interaction latency. The app must remain usable with reduced motion, lower-powered devices, slow connections, and large content libraries.

