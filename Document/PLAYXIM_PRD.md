# Playxim — Product Requirements Document (PRD)

**Product:** Playxim  
**Domain:** `playxim.com`  
**Document status:** Authoritative, build-ready specification  
**Prepared:** 2026-10-08  
**Role:** Defines the product contract: vision, scope, personas, features, user value, monetization, analytics, content rules, public pages, KPIs, and acceptance criteria.


> **Shared product baseline:** Playxim is a creator-facing web platform for unlimited content storage/upload, sharing, creator analytics, and future creator monetization. The future Flutter applications are consumer-facing, with video streaming as the main consumption experience.

> **Design baseline:** Apple × Linear, premium and minimal, subtle glassmorphism, light mode by default, responsive desktop/tablet/mobile, with dark mode as a first-class alternative.

## Authority and dependencies

**Primary authority of this file:** PRD — what the product must do and what users should experience.

Use the other documents for decisions outside this document's ownership; do not independently redefine shared product behavior.

- `PLAYXIM_PRD.md` — product behavior and scope
- `PLAYXIM_TRD.md` — runtime architecture and infrastructure
- `PLAYXIM_WEBSITE_PAGE_FLOW.md` — routes and user journeys
- `PLAYXIM_UI_UX_DESIGN_SYSTEM.md` — visual and interaction language
- `PLAYXIM_BACKEND_SCHEMA.md` — persistence and authorization model
- `PLAYXIM_IMPLEMENTATION_PLAN.md` — execution order and release gates

---

# Playxim — Build-Ready Product & Engineering Specification

**Document:** `PLAYXIM_PRODUCT_DOCUMENTATION.md`  
**Version:** 1.0  
**Status:** Build-ready baseline specification  
**Prepared:** 2026-10-08  
**Product:** Playxim  
**Primary domain:** `playxim.com`  
**Primary web experience:** Creator-facing  
**Future application experience:** Consumer-facing video streaming  
**Reference product:** DiskWala (product model and information architecture inspiration only)  
**Design direction:** Apple × Linear — premium, clean, restrained, modern, high-quality SaaS  
**Primary website theme:** Light mode  
**Secondary theme:** Dark mode  
**Primary business goal:** Creator upload + share + analytics + monetization infrastructure  
**Long-term vision:** Creator content platform spanning Web + Android + iOS + Windows + Linux

---

# 0. Executive Product Definition

## 0.1 What Playxim is

Playxim is a creator-first content platform where a user can:

1. Create an account.
2. Upload videos and arbitrary files.
3. Organize content into folders and playlists.
4. Automatically receive shareable links.
5. Share content with an audience.
6. Track content usage and creator analytics.
7. Earn creator revenue from eligible application video views.
8. Manage identity, branding, links, storage usage, and earnings from a premium dashboard.

The **website is primarily the creator control plane**.

The **future Flutter applications are primarily the consumer media plane**, with video streaming as the central consumer experience.

The platform must therefore be designed from day one as a **multi-client content system**, not as a web-only file uploader.

---

## 0.2 Core product loop

```text
Creator
  │
  ▼
Create account
  │
  ▼
Upload content
  │
  ├── Video ───────────────► Cloudflare Stream
  │                             │
  │                             ▼
  │                       Encode / package
  │                             │
  │                             ▼
  │                       Video asset ready
  │
  └── Other files ─────────► Cloudflare R2
                                │
                                ▼
                           File ready
  │
  ▼
Create / receive share link
  │
  ▼
Share with audience
  │
  ├── Non-video ───────────► Web download / future app handling
  │
  └── Video ───────────────► Open Playxim app
                                 │
                                 ▼
                           Stream video
                                 │
                                 ▼
                         Eligible view event
                                 │
                                 ▼
                       Creator earnings ledger
```

---

## 0.3 Core product promise

> **Upload once. Share anywhere. Grow your audience. Earn from your content.**

The website should feel like a premium creator utility rather than a generic cloud drive.

The product must communicate:

- simplicity,
- speed,
- control,
- trust,
- creator ownership,
- modern infrastructure,
- premium craftsmanship.

---
# 1. PRD — Product Requirements Document

# 1.1 Product Vision

Playxim will become a modern creator infrastructure platform for publishing, distributing, and monetizing digital content.

The initial product intentionally separates responsibilities:

### Web

The web platform is optimized for:

- account creation,
- creator profile management,
- content upload,
- content organization,
- sharing,
- analytics,
- earnings,
- branding,
- storage visibility,
- administrative management.

### Applications

Future Flutter applications are optimized for:

- discovering shared content,
- streaming videos,
- following creators,
- viewer experience,
- ads,
- engagement,
- content consumption,
- future notifications,
- future creator-consumer interactions.

This separation allows the web application to stay highly productive while the application becomes highly immersive.

---

# 1.2 Business Objective

## Primary objective

Build a premium creator platform that can support large-scale content uploads and future application-based video consumption without requiring a major architectural rewrite.

## Secondary objectives

- Create a compelling creator dashboard.
- Make file upload extremely reliable.
- Make sharing extremely simple.
- Provide useful, understandable analytics.
- Establish a transparent creator earnings model.
- Keep infrastructure operationally simple and cost-aware.
- Make future Flutter development consume the same stable backend APIs.
- Give administrators complete operational control.

---

# 1.3 Competitive Position

DiskWala is considered a direct inspiration/competitor reference.

Playxim should **not** replicate DiskWala screen-for-screen.

Instead:

### Borrow the product category

- creator uploads,
- share links,
- creator profile,
- file management,
- analytics,
- monetization,
- payout visibility,
- application ecosystem.

### Improve the product

- stronger information architecture,
- significantly cleaner hierarchy,
- better upload UX,
- better content cards,
- better analytics visualization,
- more refined micro-interactions,
- better empty states,
- better loading states,
- more consistent typography,
- better responsive behavior,
- fewer visual distractions,
- less UI density,
- clearer primary actions,
- stronger accessibility,
- more obvious content states.

### Do not copy

- exact layouts,
- exact wording,
- exact component geometry,
- exact navigation structure,
- visual assets,
- brand language,
- competitor-specific workflows.

---

# 1.4 Target Users

## Persona A — Creator / Publisher

A person who uploads:

- videos,
- documents,
- images,
- archives,
- audio,
- educational content,
- downloadable resources,
- project files,
- community resources.

Primary needs:

- upload quickly,
- never lose an upload,
- share easily,
- understand performance,
- organize content,
- track earnings.

---

## Persona B — Audience / Consumer

A person receiving a Playxim link.

Current website role:

- open shared link,
- see content information,
- download supported files,
- open the Playxim app for video playback.

Future application role:

- stream video,
- follow creators,
- share content,
- interact with creators.

---

## Persona C — Platform Administrator

Responsible for:

- users,
- content,
- storage,
- analytics,
- creator balances,
- platform health,
- security,
- impersonation/support,
- administrative settings,
- operational investigations.

---

# 1.5 Product Principles

## Principle 1 — Creator first

Every creator action should have an obvious primary action.

## Principle 2 — Content first

The user's content is more important than dashboard decoration.

## Principle 3 — No unnecessary complexity

Do not introduce advanced controls unless they solve an actual creator problem.

## Principle 4 — Fast feedback

Every important action should provide immediate visual feedback.

## Principle 5 — Progressive disclosure

Show important information first; expose advanced configuration on demand.

## Principle 6 — Premium through restraint

Premium UI comes from:

- spacing,
- typography,
- contrast,
- motion,
- hierarchy,
- consistency,

not from adding effects everywhere.

## Principle 7 — Future-client ready

All creator content APIs must be usable by:

- Web,
- Android,
- iOS,
- Windows,
- Linux,

without coupling business logic to a browser-only implementation.

---

# 1.6 MVP Scope

## Included in MVP

### Identity

- Email/password authentication.
- Google authentication.
- Email verification.
- Username.
- Public creator profile.
- Profile image.
- Brand name.
- Social links.

### Content

- Video uploads.
- General file uploads.
- Folder creation.
- File organization.
- File metadata.
- Content status.
- File deletion.
- File renaming.
- Moving files.
- Search/filter inside creator library.
- Upload history.

### Upload system

- Direct-to-storage upload.
- Multipart upload for large files.
- Resumable upload.
- Concurrent upload parts.
- Retry failed parts.
- Upload progress.
- Background processing.
- Upload completion state.
- Upload failure recovery.
- Malware scan workflow.
- Content-type detection.
- Duplicate-safe upload handling.

### Sharing

- Automatic share link generation.
- Multiple share links per content item.
- Public links.
- Private content.
- Password-protected links.
- Permanent links.
- Copy link.
- Link analytics.
- Share-link metadata.

### Creator dashboard

- Dashboard overview.
- Content overview.
- Recent uploads.
- Storage usage.
- Views.
- Earnings.
- Top content.
- Recent activity.

### Analytics

- Views.
- Unique viewers where available.
- Watch-related metrics from app telemetry when app launches.
- Downloads.
- Content performance.
- Traffic/referrer data where available.
- Device/platform summary.
- Geographic summary where available.
- Daily/weekly/monthly ranges.
- Per-content performance.
- Per-share-link performance.

### Monetization

- Internal creator earnings ledger.
- `$1 per 1,000 eligible views` creator rate as the initial business rule.
- Earnings accumulation.
- Available / pending / paid states.
- Admin adjustment capability.
- Payout architecture reserved for later payment-provider implementation.

### Admin

- Admin dashboard.
- User management.
- Content management.
- Share-link management.
- Creator earnings review.
- Storage overview.
- Upload/processing status.
- Audit logs.
- User impersonation.
- Platform configuration.

---

# 1.7 Explicitly Out of MVP

The following are deliberately deferred:

- public content discovery,
- public search engine indexing of content,
- comments,
- likes,
- following,
- subscriptions,
- paid videos,
- creator subscriptions,
- AI content generation,
- AI summaries,
- AI chapters,
- AI thumbnails,
- live streaming,
- creator-to-viewer messaging,
- browser video streaming,
- advanced video-player customization,
- browser social features,
- push notifications,
- Telegram bot,
- Windows client,
- Linux client,
- iOS/Android consumer application,
- subscription plans,
- paid SaaS tiers,
- custom domains,
- white-labeling,
- creator-controlled colors,
- advanced payout integrations,
- advanced content moderation.

Architecture should remain extensible for these features.

---

# 1.8 Content Model

Playxim uses a unified `content_item` abstraction.

A creator does not interact with separate applications for video and files.

Instead:

```text
Content Item
│
├── Video Asset
├── Generic File
├── Folder
└── Playlist Membership
```

A content item contains common metadata:

- id,
- owner,
- name,
- type,
- size,
- path,
- created_at,
- updated_at,
- status,
- visibility,
- shareable state,
- metadata.

Type-specific information lives in specialized tables.

---

# 1.9 File Type Support

Playxim should accept common file categories.

## Video

Examples:

- MP4
- WebM
- MOV
- MKV
- AVI
- FLV
- MPEG-based formats
- 3GP
- QuickTime-compatible files

For video ingestion through Cloudflare Stream, current Cloudflare documentation supports common formats including MP4, MKV, MOV, AVI, WebM and others, with uploads under 30 GB. Playxim therefore must not pretend that every arbitrarily large video is immediately supported by the MVP video pipeline. See the architecture constraints section.

## Audio

Examples:

- MP3
- M4A
- WAV
- FLAC
- OGG

## Images

Examples:

- PNG
- JPG/JPEG
- WEBP
- GIF
- SVG

## Documents

Examples:

- PDF
- DOC
- DOCX
- XLS
- XLSX
- PPT
- PPTX
- TXT

## Archives

Examples:

- ZIP
- RAR
- 7Z
- TAR
- GZ

---

# 1.10 Folder Upload Requirement

Browser-based folder upload is **not an MVP feature**.

When a creator attempts to upload a directory:

```text
┌────────────────────────────────────────┐
│ Folder upload isn't supported yet      │
│                                        │
│ Playxim currently supports files only. │
│                                        │
│ Please compress the folder into a ZIP  │
│ archive and upload the ZIP instead.     │
│                                        │
│            [Got it]                     │
└────────────────────────────────────────┘
```

Important:

- Never silently upload a subset of the folder.
- Never create a confusing partial upload.
- Do not flatten folder contents unexpectedly.
- Explain exactly what the user should do.

Folders may still be created **inside Playxim** for organization.

---

# 1.11 Storage Model

The product promise is:

> No artificial consumer storage quota in the initial product model.

However, the system must distinguish between:

### Product policy

- no fixed Playxim per-user storage quota in the initial scope,
- creator sees current usage.

### Provider constraints

Cloudflare R2 currently supports up to approximately 5 TiB per object through multipart upload, with unlimited bucket object count/storage subject to the service's account-level terms. Therefore, "unlimited storage" is a product-policy statement, not an assertion that a single object can be infinite.

### Video constraint

Cloudflare Stream currently documents video uploads below 30 GB. Therefore:

- normal videos up to the current Stream limit use Stream,
- larger future video uploads require a secondary/custom video ingestion pipeline,
- Playxim's domain model must support this routing without changing creator-facing UX.

---

# 1.12 Upload Routing Rules

```text
Incoming file
     │
     ▼
Content type detection
     │
     ├── Video ───────────► Cloudflare Stream
     │
     └── Non-video ───────► Cloudflare R2
```

Future:

```text
Very large video
     │
     ▼
Large-video ingestion adapter
     │
     ▼
R2 / external processing pipeline
     │
     ▼
HLS/DASH packaging
     │
     ▼
Video delivery service
```

The application layer must use a `MediaProvider` abstraction instead of directly assuming one provider.

---

# 1.13 Upload UX

## Upload entry points

Primary:

- Dashboard "Upload"
- Sidebar "Upload"
- Drag and drop
- Browse files

Future:

- Telegram bot
- API ingestion
- application upload.

---

## Upload screen

Recommended hierarchy:

```text
Upload Files

[ Drop files here or browse ]

Supported:
Videos · Audio · Images · Documents · Archives

Upload queue
────────────────────────────────

Video.mp4
Uploading                          67%
██████████████░░░░░░

Document.pdf
Processing                         ●

Image.png
Complete                          ✓
```

---

## Upload states

Every upload must have one explicit state:

```text
queued
preparing
uploading
paused
retrying
uploaded
scanning
processing
ready
failed
cancelled
expired
rejected
```

---

## Upload progress requirements

For large files:

- progress percentage,
- uploaded bytes,
- total bytes,
- upload speed,
- estimated remaining time,
- current state,
- retry option,
- cancel option,
- pause where technically supported,
- resumability,
- background persistence where possible.

---

# 1.14 Resumable Upload Requirement

Large files must use multipart/resumable upload.

Cloudflare R2 currently recommends multipart uploads for large or reliability-sensitive files and supports resumable multi-part uploads, with very large object limits. The system should therefore use multipart upload rather than a single HTTP request for large files.

Video uploads to Cloudflare Stream should use the TUS-based resumable upload path for larger uploads or unreliable network conditions.

---

# 1.15 Duplicate Upload Handling

MVP should support duplicate-safe processing.

Recommended logic:

```text
creator
+
content hash
+
file size
+
media type
```

If the same file is uploaded twice, the system should not accidentally associate two processing jobs with the same upload identifier.

However, do not automatically deduplicate user content at the UX level unless explicitly decided.

The first version can warn:

> "A file with the same name already exists."

Options:

- Upload anyway
- Replace
- Cancel

Replacement should create a new content version or perform a controlled object replacement rather than mutating historical analytics.

---

# 1.16 Content Visibility

Exactly three creator-facing visibility modes are required.

## Public

Anyone with the share link can access the shared content according to the link route.

## Private

Content is accessible only to the creator/account authorization context.

There is no publicly consumable link behavior for private content.

## Password Protected

A share link can be opened without a Playxim account but requires the creator-defined password.

Password handling requirements:

- never store plain text passwords,
- hash passwords server-side,
- rate-limit password attempts,
- use secure temporary verification session tokens,
- prevent password brute force,
- do not expose whether the password itself exists in API error detail.

---

# 1.17 Share Links

Recommended format:

```text
https://playxim.com/watch/8xK92Lm
```

Additional app handoff:

```text
https://playxim.com/app/8xK92Lm
```

## Link properties

- short code,
- content reference,
- creator reference,
- access mode,
- password hash when applicable,
- created timestamp,
- optional analytics metadata,
- permanent by default.

### Important scope decision

The current product does **not** provide an end-user "revoke link without deleting the file" feature.

Therefore avoid exposing:

- Disable link,
- Revoke link,
- Expire link.

A creator may create multiple links for the same content, but each link remains governed by its configured access policy.

---

# 1.18 Multiple Links Per Content

The same content may have:

```text
Content: Course Episode 01

Link A → public
Link B → password protected
Link C → campaign-specific
```

This provides future analytics segmentation.

Example:

```text
Video
│
├── Telegram link
├── WhatsApp link
├── Community link
└── Website link
```

Future application analytics can attribute performance to individual links.

---

# 1.19 Public Share Page

Because Playxim's current consumer streaming experience is application-first, the web share page should not become a fake browser video platform.

## Non-video

Show:

- Playxim branding,
- file type,
- file name,
- file size,
- creator,
- creator profile,
- download CTA,
- share/copy CTA,
- basic content metadata,
- footer/legal links.

## Video

Show:

- video poster/thumbnail if available,
- title,
- creator,
- duration,
- file metadata where appropriate,
- `Open in Playxim App`,
- `Download` only when creator allows download,
- app download CTA,
- app handoff CTA.

The web should not stream video in MVP.

---

# 1.20 Public Creator Profile

URL:

```text
playxim.com/@username
```

Profile contents:

- avatar,
- brand/creator name,
- username,
- bio,
- social links,
- Playxim profile link,
- public content/collections only if content discovery is later enabled.

For MVP, the creator profile is primarily an identity and trust page rather than a social feed.

---

# 1.21 Playlist System

Creators can create playlists to organize content.

Examples:

```text
Java Course
├── Episode 01
├── Episode 02
├── Episode 03
└── Episode 04
```

Requirements:

- create playlist,
- rename playlist,
- delete playlist,
- reorder content,
- add content,
- remove content,
- publish/share playlist,
- playlist share route,
- sequential playback support reserved for the future app.

Web MVP can manage playlists; future Flutter application consumes playlist metadata and plays sequential content.

---

# 1.22 Analytics Philosophy

Playxim analytics should be **useful, not overwhelming**.

The dashboard should answer:

1. How much content do I have?
2. How many people are viewing it?
3. Which content is performing?
4. Which links are working?
5. How much have I earned?
6. What changed over time?

Avoid displaying dozens of vanity metrics with no actionable meaning.

---

# 1.23 Creator Analytics

## Overview KPIs

Recommended top-level cards:

- Total Views
- Unique Viewers
- Watch Time
- Downloads
- Storage Used
- Total Earnings
- Available Earnings
- Published Content

---

## Time filters

- 7 days
- 30 days
- 90 days
- 12 months
- custom range

---

## Content performance

Table:

| Content | Views | Downloads | Watch Time | Earnings | Trend |
|---|---:|---:|---:|---:|---:|
| Video A | 42,891 | 183 | 382h | $42.89 | ↑ |
| Video B | 17,120 | 83 | 114h | $17.12 | ↑ |
| File C | 3,881 | 421 | — | — | → |

---

## Link analytics

For each share link:

- total opens,
- eligible views,
- downloads,
- creator revenue,
- device distribution,
- source/referrer,
- created date.

---

# 1.24 Monetization Model

Initial creator rate:

> **$1 per 1,000 eligible application video views**

This is an internal Playxim creator earnings rule.

It should not be implemented as an uncontrolled formula scattered through the codebase.

Store the rate in configuration:

```text
creator_view_rate_usd = 1.00
creator_view_rate_unit = 1000
currency = USD
```

---

# 1.25 Eligible View Definition

Because unrestricted raw play events would create severe fraud exposure, the monetary ledger should use a stricter server-side definition.

Recommended initial default:

```text
Eligible View =
  playback started
  AND
  playback reached the minimum qualification threshold
  AND
  content is monetizable
  AND
  event passes fraud/rate checks
  AND
  event isn't a duplicate billing event
```

Recommended initial qualification:

- minimum continuous watch: 30 seconds, OR
- 25% of video duration for very short videos,
- maximum one monetized view per viewer/content/day,
- server-side deduplication,
- suspicious device/IP/session patterns excluded or flagged.

These thresholds are configuration, not hardcoded business logic.

---

# 1.26 Revenue Ledger

Every earning event should be immutable.

Example:

```text
View event
   ↓
Qualification
   ↓
Revenue calculation
   ↓
Earnings ledger entry
   ↓
Creator balance
```

Never calculate lifetime earnings by repeatedly scanning raw events at request time.

Use an append-only ledger + aggregate balance.

---

# 1.27 Earnings States

```text
pending
approved
available
paid
reversed
adjusted
```

Creator dashboard:

```text
Total Earnings
$428.92

Available
$212.31

Pending
$16.92

Paid
$199.69
```

---

# 1.28 Advertising Model

The application will later carry ads.

The high-level economic model is:

```text
Advertiser revenue
       │
       ▼
Playxim platform
       │
       ├── infrastructure/platform costs
       │
       ├── platform margin
       │
       └── creator earning obligation
                │
                ▼
       $1 / 1,000 eligible views
```

The actual ad technology is not part of the web MVP.

The web should only expose creator earnings derived from the configured creator-rate ledger.

---

# 1.29 Storage Usage Dashboard

Even without a user storage quota, creators should clearly see usage.

Example:

```text
Storage

238.6 GB used

Videos             182.1 GB
Documents           31.8 GB
Images              14.4 GB
Archives             8.7 GB
Other                1.6 GB
────────────────────────────
Total              238.6 GB
```

Do not show a misleading "238 GB / ∞" progress bar.

Instead:

```text
238.6 GB
used
```

with categories.

---

# 1.30 Dashboard Homepage

Recommended structure:

```text
Good morning, Creator

Your content is ready to share.

[ Upload ]

────────────────────────────────────

Overview

Views          Downloads       Earnings       Storage
42.8K          1.3K            $42.31         238.6 GB

────────────────────────────────────

Performance

[ Views / Downloads / Earnings chart ]

────────────────────────────────────

Top content

Video A
Video B
Video C

────────────────────────────────────

Recent activity

Upload completed
New link created
Video processing complete
```

---

# 1.31 Dashboard Navigation

Recommended:

```text
Overview
Content
  Files
  Folders
  Playlists
Upload
Analytics
Links

Earnings

Branding
Storage
Settings
```

Optional compact utility items:

```text
Help
Account menu
Theme
Logout
```

Do not overload the left sidebar.

---

# 1.32 Dashboard Search

Global dashboard search should eventually support:

- file name,
- folder,
- playlist,
- share link code.

MVP can implement content-only search.

Search should support:

- keyboard shortcut,
- fuzzy matching,
- file-type filter,
- date filter,
- status filter.

---

# 1.33 Content Manager

Default layout:

### Desktop

Table/list view by default.

Columns:

- Name
- Type
- Size
- Status
- Visibility
- Updated
- Views
- Actions

### Optional grid view

Useful for visual content and thumbnails.

### Mobile

Use stacked content rows/cards.

---

# 1.34 Content Actions

Per content item:

- Open details
- Rename
- Move
- Add to playlist
- Create link
- Copy link
- Change visibility
- Download
- Delete

Video-specific future actions:

- Stream preview,
- thumbnail,
- chapters,
- captions,
- player settings.

These remain outside the web MVP.

---

# 1.35 Branding

Creators can control:

- profile picture,
- brand name,
- public email/contact identity where allowed,
- social links,
- Playxim profile link.

Do not allow arbitrary CSS/custom color themes in MVP.

Global Playxim identity remains visually dominant.

---

# 1.36 Website Information Architecture

## Public marketing

```text
/
├── /features
├── /why-playxim
├── /creator
├── /pricing
├── /faq
├── /download
├── /contact
├── /status
├── /terms
├── /privacy
└── /dmca
```

## Authentication

```text
/auth/sign-in
/auth/sign-up
/auth/verify
/auth/forgot-password
/auth/reset-password
```

## Creator application

```text
/dashboard
/dashboard/content
/dashboard/folders
/dashboard/playlists
/dashboard/upload
/dashboard/analytics
/dashboard/links
/dashboard/earnings
/dashboard/branding
/dashboard/storage
/dashboard/settings
```

## Public profile

```text
/@username
```

## Public share

```text
/watch/:shareCode
/app/:shareCode
```

## Admin

```text
/admin
/admin/users
/admin/content
/admin/links
/admin/uploads
/admin/storage
/admin/analytics
/admin/earnings
/admin/audit
/admin/settings
```

---

# 1.37 Marketing Website Requirements

The website should not look like the dashboard.

Marketing experience:

- spacious,
- cinematic,
- editorial,
- premium,
- strong typography,
- restrained glass,
- product visualizations,
- high-quality transitions.

Dashboard:

- operational,
- fast,
- information-dense,
- quiet,
- highly functional.

---

# 1.38 Homepage Flow

Recommended:

```text
Hero
  ↓
Product proof
  ↓
Upload workflow
  ↓
Creator dashboard preview
  ↓
Share link experience
  ↓
Analytics
  ↓
Monetization
  ↓
Platform architecture / trust
  ↓
Creator story
  ↓
FAQ
  ↓
CTA
  ↓
Footer
```

Headline direction:

> Upload. Share. Grow.

Subheadline:

> A creator-first platform for publishing your files, sharing content with your audience, and earning from the views that matter.

Do not copy DiskWala wording.

---

# 1.39 Marketing Homepage Hero

Recommended composition:

```text
                           NAVBAR

             Everything you create,
             ready to share.

     Upload videos, files, and resources
     to one elegant creator platform.

       [Start uploading] [See how it works]

           Product preview / dashboard

     subtle glow
     subtle glass
     animated content particles
```

Hero visuals should demonstrate the actual product rather than decorative 3D for its own sake.

---

# 1.40 Features Page

Sections:

- Upload without friction
- Share with control
- Organize content
- Understand your audience
- Earn from views
- Built for future apps
- Secure infrastructure

Each section should explain:

```text
Problem
→
Playxim solution
→
Visual product proof
→
Outcome
```

---

# 1.41 Why Playxim Page

Position around differentiation:

- creator-first,
- unlimited-by-policy storage,
- clean sharing,
- application-first video streaming,
- transparent earnings,
- modern infrastructure,
- cross-platform roadmap.

---

# 1.42 Creator Page

Focus on:

- creator workflow,
- upload,
- content management,
- analytics,
- profile,
- earnings,
- future consumer reach.

CTA:

```text
Create your creator account
```

---

# 1.43 Pricing Page

MVP pricing model:

```text
Free

$0

Core uploads
Unlimited-by-policy storage
Share links
Creator dashboard
Analytics
Creator earnings
```

Do not invent additional paid tiers.

The page should clarify that future commercial plans may be introduced without making the MVP dependent on subscription billing.

---

# 1.44 FAQ

Recommended questions:

- What can I upload?
- Is storage limited?
- How do sharing links work?
- Can I password protect a file?
- Can users download my content?
- Where are Playxim videos watched?
- How do creator earnings work?
- How do I see my storage usage?
- Can I create folders?
- Can I create playlists?
- What happens when an upload fails?
- Can I upload large files?
- How does Playxim protect my content?

---

# 1.45 Contact Page

Simple premium contact form:

```text
Name
Email
Subject
Message

[Send message]
```

Future:

- support tickets,
- attachments,
- authenticated creator context.

---

# 1.46 Legal Pages

MVP includes:

- Privacy Policy
- Terms of Service
- Creator Agreement
- DMCA/Content Removal information
- Cookie/analytics policy as legally required by deployment context.

Legal content itself must be reviewed by an appropriate legal professional before production publication.

---

# 1.47 SEO Strategy

## Marketing pages

SEO:

- yes.

Optimize:

- title,
- description,
- canonical,
- Open Graph,
- sitemap,
- robots,
- JSON-LD,
- semantic HTML,
- internal linking,
- page performance.

## Creator and content pages

MVP:

- no public content indexing,
- no public discovery,
- share pages should use `noindex` unless a later business decision changes this.

Reason:

Playxim's current product model is sharing-focused, not search/discovery-focused.

---

# 1.48 Accessibility Requirements

Target:

- WCAG 2.2 AA-oriented implementation.
- keyboard navigation,
- visible focus,
- correct semantic labels,
- accessible forms,
- accessible dialogs,
- screen-reader friendly state changes,
- sufficient text contrast,
- reduced-motion support.

Critical rule:

Premium animation must never reduce usability.

---

# 1.49 Performance Requirements

Web:

- fast first contentful rendering,
- minimal client JavaScript on marketing pages,
- server-rendered content where useful,
- optimized images,
- lazy-loaded below-the-fold media,
- code splitting,
- route-level loading states,
- no unnecessary WebGL.

Dashboard:

- avoid huge client-side data payloads,
- server-side pagination,
- virtualized tables for large content sets,
- charts loaded only when required,
- efficient query indexes.

Animation target:

- 60 FPS baseline,
- 90 Hz-friendly animation where devices support it,
- transform/opacity-first animation,
- avoid layout thrashing.

"90 FPS" must be treated as a performance target for animation design, not a universal guarantee.

---

# 1.50 Product KPIs

## Activation

- account signup → first upload,
- percentage of creators completing first upload,
- time to first share link.

## Content

- uploads/day,
- videos uploaded/day,
- total storage,
- processing success rate.

## Sharing

- links created,
- link opens,
- downloads,
- application handoffs.

## Consumption — future app

- qualified views,
- watch time,
- retention,
- completed views.

## Creator monetization

- eligible views,
- revenue generated,
- creator balance,
- payout success rate.

---

# 1.51 Success Criteria for MVP

A creator should be able to complete this journey without support:

```text
Sign up
→ Verify email
→ Create username
→ Upload a large video
→ See upload progress
→ Wait for processing
→ Receive ready state
→ Create/share link
→ Open public link
→ Open Playxim app handoff
→ View analytics
→ See earning accrual when eligible view telemetry exists
```

---

# 10. FINAL PRODUCT POSITIONING

The website should feel like:

> **A premium creator operating system.**

Not:

> a generic cloud drive.

The future app should feel like:

> **A premium video consumption platform.**

Not:

> a web dashboard squeezed into mobile.

This distinction is fundamental to the Playxim roadmap.

---
# 11. LOCKED DECISION SUMMARY

| Decision | Locked direction |
|---|---|
| Product | Creator-first content platform |
| Product vision | Upload + share + analytics + monetization |
| Web role | Creator-facing |
| App role | Consumer-facing |
| Main consumer media | Video |
| Web video playback | Deferred; app-first |
| Future platforms | Android, iOS, Windows, Linux |
| Storage | Cloudflare R2 |
| Video | Cloudflare Stream |
| Database | Supabase PostgreSQL |
| Auth | Supabase Auth |
| Authorization | PostgreSQL RLS |
| Hosting | Vercel |
| Background | Cloudflare Workers + Queues |
| Monitoring | Sentry |
| Analytics | PostHog |
| Charts | Recharts |
| UI | shadcn/ui + Base UI |
| Icons | Lucide |
| Styling | Tailwind CSS + CSS variables |
| Animation | Anime.js 4 |
| Smooth scroll | Lenis |
| 3D | Only when useful |
| Forms | React Hook Form + Zod |
| State | Zustand for client state only |
| Testing | Playwright + Vitest |
| Theme | Light default |
| Dark mode | Supported |
| Visual style | Apple × Linear |
| Glassmorphism | Subtle and purposeful |
| Storage policy | Unlimited-by-policy, provider constrained |
| Video upload limit | Current Stream constraint; larger-video adapter later |
| Folder upload | Not supported; instruct ZIP |
| File types | Broad/common support |
| Resumable uploads | Required |
| Share format | `/watch/:code` |
| App handoff | `/app/:code` |
| Link types | Public / Private / Password Protected |
| Link expiration | Never |
| Multiple links/file | Yes |
| Link revocation | Not an MVP feature |
| Public discovery | No |
| Public SEO content | No |
| Creator profile | Yes |
| Playlists | Yes |
| Social features | App future |
| Subscriptions | No |
| Paid plans | No |
| Creator monetization | Yes |
| Creator rate | $1 / 1,000 eligible views |
| Ads | Future app |
| AI | Deferred |
| Admin | Full operational panel |
| Admin roles | One admin role initially, RBAC-ready |
| Impersonation | Yes |
| Malware scanning | Background |
| Notifications | Future |
| Telegram bot | Future |
| Existing code | None |
| Build | Greenfield |

---

## Product requirement decision record

The following decisions are locked for the current web build:

| Decision | Locked behavior |
|---|---|
| Primary web audience | Creators / publishers |
| Consumer experience | Future Flutter applications |
| Main web purpose | Upload, organize, share, analytics, monetization management |
| Video streaming on website | Not required for the current creator web experience |
| Storage | Product-level unlimited storage policy; actual consumption visible in dashboard |
| General file storage | Cloudflare R2 |
| Video backend | Cloudflare Stream initially, behind a provider abstraction |
| Visibility | Public, Private, Password Protected |
| Link expiration | Never for current scope |
| Multiple links | Yes, multiple links per content item |
| Social features on website | No |
| Social features in app | Follow/share later |
| Monetization | Eligible app video views; baseline $1 per 1,000 eligible views before platform advertising economics/settlement rules |
| Paid plans | Not in current web release |
| AI | Not in current scope |
| Authentication | Email/password + Google; email verification required |
| Public SEO for creator/content pages | Disabled for creator content |
| Folder upload | Supported as selection input; browser must warn that native folders are not uploaded as ZIP and preserve only explicitly supported behavior |

## Product acceptance doctrine

Every requirement must have an observable outcome. A feature cannot be considered complete solely because the backend endpoint works; the user-visible states, permission rules, failure recovery, and responsive behavior are part of the product requirement.

### Mandatory state coverage

Every creator-facing workflow must define:

- initial/loading state;
- ready state;
- empty state;
- input validation state;
- asynchronous/in-progress state;
- success state;
- recoverable failure state;
- permission-denied state where relevant;
- destructive confirmation state where relevant.

### MVP product completion gate

A normal new creator must be able to:

```text
Sign up
→ verify email
→ create creator identity
→ open dashboard
→ upload a supported file
→ see reliable progress
→ wait through scan/processing
→ receive a shareable link
→ manage the item
→ see storage usage
→ see relevant analytics
→ see earnings eligibility/state where applicable
```

The workflow must complete without manual administrator intervention in the standard success path.

