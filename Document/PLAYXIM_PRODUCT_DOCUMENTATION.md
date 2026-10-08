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

# 3. WEBSITE PAGE FLOW

# 3.1 Global Entry Flow

```text
Visitor
│
├── Learn about Playxim
│      ├── Home
│      ├── Features
│      ├── Why Playxim
│      ├── Creator
│      ├── Pricing
│      ├── FAQ
│      └── Contact
│
├── Create account
│      ├── Sign Up
│      ├── Verify Email
│      └── Create Username
│
├── Existing creator
│      └── Login
│
└── Shared content
       ├── /watch/:code
       └── /app/:code
```

---

# 3.2 Authentication Flow

## Sign up

```text
Sign Up
  ↓
Email + Password OR Google
  ↓
Email verification
  ↓
Profile bootstrap
  ↓
Username selection
  ↓
Creator dashboard
```

## Login

```text
Login
  ↓
Email/password OR Google
  ↓
Session
  ↓
Dashboard
```

## Failed login

Always use clear but non-sensitive messaging.

Do not reveal whether an email exists through password-reset enumeration.

---

# 3.3 Creator First-Time Flow

```text
New Creator
  ↓
Welcome
  ↓
Choose username
  ↓
Upload first content
  ↓
Upload progress
  ↓
Processing
  ↓
Ready
  ↓
"Create your first share link"
  ↓
Share
  ↓
Dashboard overview
```

The first-run experience should avoid asking for unnecessary profile fields.

---

# 3.4 Dashboard Flow

```text
Dashboard
│
├── Overview
│
├── Content
│   ├── Files
│   ├── Folders
│   └── Playlists
│
├── Upload
│
├── Analytics
│
├── Links
│
├── Earnings
│
├── Branding
│
├── Storage
│
└── Settings
```

---

# 3.5 Upload Flow

```text
Upload
  ↓
Drop/Browse
  ↓
File validation
  ↓
Queue
  ↓
Direct upload
  ↓
Upload complete
  ↓
Scan
  ↓
Processing
  ↓
Ready
  ↓
Content detail
  ↓
Create/share link
```

---

# 3.6 Generic File Flow

```text
Choose PDF
 ↓
Create content row
 ↓
Create R2 multipart upload
 ↓
Upload parts
 ↓
Complete
 ↓
Malware scan
 ↓
Metadata
 ↓
Ready
 ↓
Creator sees file
 ↓
Create share link
 ↓
Audience opens link
 ↓
Download
```

---

# 3.7 Video Flow

```text
Choose MP4
 ↓
Validate
 ↓
Cloudflare Stream direct upload
 ↓
Resumable upload
 ↓
Stream processing
 ↓
Webhook
 ↓
video_asset ready
 ↓
Creator sees ready state
 ↓
Create share link
 ↓
Audience opens /watch/code
 ↓
Open Playxim app
 ↓
Future:
Flutter gets playback token
 ↓
HLS playback
```

---

# 3.8 Content Management Flow

```text
Content list
  ↓
Select item
  ↓
Details drawer/page
  ├── Rename
  ├── Move
  ├── Add to playlist
  ├── Create link
  ├── Download
  └── Delete
```

---

# 3.9 Folder Flow

```text
Content
 ↓
Create Folder
 ↓
Folder appears in library
 ↓
Move files into folder
 ↓
Open folder
 ↓
Nested organization
```

No browser directory upload.

---

# 3.10 Playlist Flow

```text
Playlists
 ↓
Create playlist
 ↓
Name + description
 ↓
Add content
 ↓
Reorder
 ↓
Save
 ↓
Share
```

---

# 3.11 Analytics Flow

```text
Analytics
 ↓
Select date range
 ↓
Overview KPIs
 ↓
Performance chart
 ↓
Top content
 ↓
Link performance
 ↓
Content detail
```

Avoid forcing creators to understand analytics terminology before seeing the basic answer.

---

# 3.12 Earnings Flow

```text
Earnings
 ↓
Total
Available
Pending
Paid
 ↓
Performance-to-earnings chart
 ↓
Ledger
 ↓
Payout section
```

For MVP, payout-provider execution may be disabled behind configuration.

The UI should still communicate:

```text
Payouts
Coming soon
```

rather than showing fake functionality.

---

# 3.13 Branding Flow

```text
Branding
 ↓
Profile picture
 ↓
Brand name
 ↓
Username
 ↓
Social links
 ↓
Playxim profile link
 ↓
Save changes
```

---

# 3.14 Public Share Flow

```text
Visitor
  ↓
/watch/ABC123
  ↓
Resolve share code
  ↓
Check access mode
  │
  ├── Public
  │     ↓
  │   Show content page
  │
  ├── Password Protected
  │     ↓
  │   Password form
  │     ↓
  │   Temporary access session
  │
  └── Private
        ↓
      Access denied
```

---

# 3.15 App Handoff Flow

For a video:

```text
Visitor opens /watch/ABC123
        ↓
Video file detected
        ↓
Show "Open in Playxim App"
        ↓
/app/ABC123
        ↓
Deep link / Universal Link / Android App Link
        ↓
Playxim App
```

Fallback:

```text
App not installed
 ↓
Playxim app download page
 ↓
Google Play / App Store
```

---

# 3.16 Admin Flow

```text
Admin login
   ↓
Admin Dashboard
   │
   ├── Users
   ├── Content
   ├── Uploads
   ├── Links
   ├── Storage
   ├── Analytics
   ├── Earnings
   ├── Audit Logs
   └── Settings
```

---

# 3.17 Loading Flow

Every important route needs:

```text
page skeleton
 ↓
data fetch
 ↓
partial rendering
 ↓
complete state
```

Avoid spinner-only screens.

Skeletons must mimic final content geometry.

---

# 3.18 Error Flow

Examples:

### Upload failed

```text
Upload interrupted

Your file was not lost.

[Retry upload] [Cancel]
```

### Processing failed

```text
We couldn't process this video.

Your upload is safely stored.
We'll retry automatically when possible.

[Retry] [Contact support]
```

### Link unavailable

```text
This link isn't available.

It may be private or no longer accessible.
```

No technical stack traces.

---

# 4. UI & UX DESIGN SYSTEM

# 4.1 Design Direction

Core visual references:

- Apple product restraint,
- Linear information hierarchy,
- premium SaaS polish,
- subtle cinematic movement.

Not:

- over-glassified,
- neon gamer UI,
- excessive gradients,
- excessive 3D,
- dense enterprise dashboards,
- generic Bootstrap-like cards.

---

# 4.2 Design Philosophy

### 1. Spacious composition

Use whitespace to create hierarchy.

### 2. One dominant action

Every major screen should have one obvious primary CTA.

### 3. Strong typography

Typography should carry hierarchy more than decorative effects.

### 4. Glass only where it helps

Glassmorphism is an enhancement, not the entire UI.

### 5. Motion with purpose

Every animation must answer:

> What does this movement communicate?

---

# 4.3 Color Tokens

## Dark

```css
--bg: #060B18;
--bg-soft: #0A1226;
--surface: #0F1A33;
--surface-2: #162347;
--border: rgba(255,255,255,0.08);
--text: #F2F6FF;
--muted: #9DACCB;
--primary: #1E6BFF;
--primary-text: #4D8DFF;
--glow: #3CC8FF;
--accent: #F3C77B;
--band: #0A1226;
```

## Light

```css
--bg: #F3F6FC;
--bg-soft: #E9EFFA;
--surface: #FFFFFF;
--surface-2: #F8FAFE;
--border: #D3DEF2;
--text: #0A1330;
--muted: #55637F;
--primary: #1E6BFF;
--primary-text: #1E6BFF;
--glow: #0EA5E9;
--accent: #B7791F;
--band: #0A1330;
```

---

# 4.4 Color Rules

## Primary blue

Use for:

- primary buttons,
- active states,
- links,
- focus indicators,
- selected navigation.

## Cyan

Use sparingly for:

- informational accents,
- media-processing indicators,
- subtle glows.

## Champagne gold

Use for:

- premium/earning moments,
- revenue highlight,
- important creator milestone.

Do not use gold for primary interaction.

---

# 4.5 Background Strategy

Light mode:

```text
Page background
#F3F6FC

Section background
#E9EFFA

Card
#FFFFFF

Raised content
#F8FAFE
```

Do not use pure white as the complete page background.

This preserves a premium "soft canvas" feel.

---

# 4.6 Typography

Recommended:

### Primary

Geist Sans or a similarly neutral contemporary sans-serif.

### Numeric / technical

Geist Mono where useful for:

- IDs,
- file sizes,
- codes,
- technical diagnostics.

Typography hierarchy:

```text
Display XL
64–88px

Display
48–64px

H1
40–52px

H2
32–40px

H3
24–30px

Body large
18–20px

Body
15–16px

Caption
13–14px

Micro
11–12px
```

Use fluid type for marketing pages.

Dashboard typography should be more compact.

---

# 4.7 Font Weight

Recommended scale:

```text
400 Regular
500 Medium
600 Semibold
700 Bold
```

Avoid excessive 800/900 weights.

Use 600/700 for major headings.

---

# 4.8 Spacing System

Base unit:

```text
4px
```

Common:

```text
4
8
12
16
20
24
32
40
48
64
80
96
120
160
```

Marketing pages can use larger spacing.

Dashboard should stay efficient.

---

# 4.9 Radius System

Recommended:

```text
xs: 6px
sm: 8px
md: 12px
lg: 16px
xl: 20px
2xl: 24px
pill: 999px
```

Primary dashboard cards:

- 16–20px.

Large marketing panels:

- 24–32px.

---

# 4.10 Border System

Default:

```text
1px solid rgba(...)
```

Do not use thick borders everywhere.

Borders should define grouping, not decorate every element.

---

# 4.11 Glassmorphism Rules

Recommended recipe:

```css
background:
  color-mix(... / 60–80%);

backdrop-filter:
  blur(18px);

border:
  1px solid rgba(...);

box-shadow:
  subtle;
```

Glass should primarily be used for:

- navbar,
- floating action groups,
- command palette,
- modals,
- hero overlays,
- selected elevated panels.

Do not make:

- every card,
- every table row,
- every form field

glass.

---

# 4.12 Shadows

Use low-alpha shadows.

Light mode:

- soft,
- wide,
- low opacity.

Dark mode:

- glow only when useful,
- avoid large black drop shadows that disappear.

---

# 4.13 Button System

Types:

### Primary

Blue fill.

### Secondary

Soft surface/outline.

### Ghost

Minimal.

### Destructive

Red semantic treatment.

### Icon button

Square.

### Floating action

Rounded/pill.

Button states:

```text
default
hover
pressed
focus
loading
disabled
success
error
```

Never change button width dramatically during loading.

Reserve space for spinner/text.

---

# 4.14 Input System

Inputs should have:

- clear labels,
- optional helper text,
- error text,
- focus ring,
- disabled state,
- autofill-safe styling.

Floating labels may be used selectively, but standard top labels are preferred for accessibility and clarity.

---

# 4.15 File Card

Visual structure:

```text
┌─────────────────────────────────────┐
│ [icon]   filename.mp4       •••    │
│          Video · 1.8 GB             │
│                                     │
│          Ready                      │
│                                     │
│ Views 42.8K      Updated 2h ago     │
└─────────────────────────────────────┘
```

Use icon + type + status.

Do not use a huge colorful icon for every file type.

---

# 4.16 Upload Queue Component

This is one of the most important UX components.

Requirements:

- sticky or floating panel,
- collapsible,
- persistent while navigating,
- upload count,
- current progress,
- status,
- retry,
- cancellation.

Example:

```text
Uploading 3 files

video.mp4       68%     2m 14s
pdf.pdf         Done
archive.zip     Scanning
```

When complete:

```text
✓ 3 uploads complete
```

The panel should collapse into a small floating status pill.

---

# 4.17 Dashboard Sidebar

Desktop:

```text
Logo

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

Bottom:

```text
Help
Theme
Account
```

Sidebar width recommendation:

```text
240–280px
```

Use compact spacing.

---

# 4.18 Mobile Navigation

Mobile should use:

- top bar,
- bottom nav for primary destinations,
- sheet/drawer for secondary actions.

Primary bottom navigation:

```text
Home
Content
Upload
Analytics
More
```

Do not force a 280px desktop sidebar onto mobile.

---

# 4.19 Responsive Breakpoints

Use practical responsive ranges:

```text
xs: < 480
sm: ≥ 480
md: ≥ 768
lg: ≥ 1024
xl: ≥ 1280
2xl: ≥ 1536
```

Do not design solely around framework breakpoints.

Design according to content breakpoints.

---

# 4.20 Desktop Dashboard Grid

Suggested:

```text
12-column layout

Main content max-width:
1440–1600px
```

Cards may span:

```text
3 / 4 / 6 / 8 / 12 columns
```

Avoid card mosaics where every card has different alignment.

---

# 4.21 Analytics Visualization

Use simple visual grammar:

- line chart = trend,
- bar chart = comparison,
- area chart = volume,
- table = exact values.

Do not use:

- 3D charts,
- donut chart overload,
- excessive color categories.

Legend should remain readable.

---

# 4.22 Empty States

Premium empty state:

```text
             [minimal illustration]

              Nothing here yet

        Upload your first file to
        start building your library.

             [Upload files]
```

Avoid generic giant cartoon illustrations.

---

# 4.23 Success States

Example:

```text
✓ Upload complete

Your video is now processing.

We'll make it available as soon
as processing finishes.
```

Use motion:

- subtle checkmark draw,
- status transition,
- no giant celebration unless genuinely meaningful.

---

# 4.24 Loading States

Prefer skeletons.

Examples:

```text
Card skeleton
Table row skeleton
Chart skeleton
Profile skeleton
```

Use shimmer carefully.

Do not animate every skeleton independently with heavy JS.

CSS animation is sufficient.

---

# 4.25 Error States

Error presentation must be:

- understandable,
- actionable,
- concise.

Bad:

> ECONNRESET 502 UPSTREAM MEDIA ERROR

Good:

> We couldn't finish processing this video. Your upload is safe. Retry processing or contact support.

---

# 4.26 Motion Design

## Micro interaction

```text
120–220ms
```

## Standard interaction

```text
180–280ms
```

## Page transitions

```text
280–500ms
```

## Hero choreography

```text
600–1200ms
```

Do not animate data tables on every refresh.

---

# 4.27 Anime.js Usage

Use Anime.js 4 for:

- hero entrance choreography,
- metric count-up,
- selected navigation indicator,
- complex reveal sequences,
- CTA magnetic/subtle response where useful,
- visual timeline animations.

Use CSS for:

- hover,
- focus,
- opacity,
- transform,
- skeleton shimmer.

---

# 4.28 Lenis Usage

Use Lenis primarily on:

- marketing pages,
- feature storytelling pages,
- premium long-form sections.

Avoid applying aggressive smooth scrolling to:

- data tables,
- form-heavy pages,
- modal content,
- upload interfaces.

Respect reduced-motion settings.

---

# 4.29 Parallax

Use subtle parallax only for:

- hero product imagery,
- decorative ambient elements,
- marketing section backgrounds.

Do not parallax primary text or interactive elements.

---

# 4.30 3D Policy

Three.js / React Three Fiber is allowed only when it improves communication.

Valid:

- abstract platform architecture visual,
- subtle hero depth,
- product device scene.

Invalid:

- 3D file icons,
- distracting particles,
- CPU-heavy dashboard backgrounds.

The default should be:

> No WebGL unless a static or DOM animation cannot achieve the desired communication.

---

# 4.31 90 FPS-Oriented Rules

To make animation high-refresh-rate friendly:

- animate `transform`,
- animate `opacity`,
- avoid animating layout properties,
- batch DOM reads/writes,
- avoid large blur layers,
- limit simultaneous animated elements,
- use CSS for simple effects,
- lazy-load heavy visual libraries,
- pause off-screen animations,
- avoid continuous JS loops when possible.

---

# 4.32 Reduced Motion

When:

```text
prefers-reduced-motion: reduce
```

Disable:

- parallax,
- large transforms,
- looping decorative motion,
- animated page transitions.

Keep:

- instant state feedback,
- loading indicators,
- accessible focus transitions.

---

# 4.33 Iconography

Use Lucide React.

Rules:

- 16px for dense controls,
- 18px standard,
- 20–24px section icons,
- 32px+ only for empty/hero state icons.

Stroke consistency should remain visually consistent.

---

# 4.34 Content Iconography

Recommended:

```text
Video       Video
Document    FileText
Image       Image
Archive     Archive
Audio       Music
Folder      Folder
Playlist    ListVideo
Link        Link
Analytics   ChartLine
Earnings    Wallet
Branding    Palette
Settings    Settings
```

---

# 4.35 Navigation States

Active item:

- subtle background,
- primary icon,
- primary text,
- optional left accent line.

Do not use saturated full-color blocks.

---

# 4.36 Data Density

Dashboard density:

```text
medium
```

Target:

- enough data to work quickly,
- enough spacing to remain calm,
- no cramped 2010-era admin panel appearance.

---

# 4.37 Premium Details

The "premium" layer should appear in:

- refined hover states,
- subtle border transitions,
- intelligent skeletons,
- carefully aligned numeric values,
- animated upload progress,
- polished dialogs,
- consistent empty states,
- precise responsive spacing.

Not:

- giant gradients,
- excessive glowing cards,
- random floating shapes.

---

# 4.38 Dashboard Visual Language

The creator dashboard should feel like:

```text
Linear
×
Dropbox
×
Vercel
×
premium media CMS
```

but not resemble any one product closely.

---

# 4.39 Public Share Visual Language

Public share page should feel more consumer-oriented:

- stronger brand header,
- focused file card,
- clear CTA,
- creator identity,
- minimal distractions,
- app handoff for video.

Inspired by the supplied DiskWala share screen, but much more refined.

---

# 4.40 Marketing Header

Desktop:

```text
┌──────────────────────────────────────────────────────┐
│ Playxim   Product  Creators  Why Playxim  Pricing   │
│                                  [Log in] [Join]      │
└──────────────────────────────────────────────────────┘
```

Use:

- translucent capsule,
- subtle border,
- sticky on scroll,
- very light shadow.

Mobile:

```text
Logo                             Menu
```

---

# 4.41 Footer

Recommended:

```text
Playxim
The creator platform for
uploading, sharing and growing.

Product
Features
Creators
Pricing
Download

Resources
FAQ
Contact
Status

Legal
Privacy
Terms
Creator Agreement
DMCA

© Playxim
```

---

# 4.42 Design Tokens as CSS Variables

The implementation should centralize:

```text
color
radius
shadow
spacing
font
motion
z-index
```

Example:

```css
:root {
  --radius-card: 18px;
  --radius-control: 12px;
  --motion-fast: 160ms;
  --motion-base: 240ms;
  --motion-slow: 420ms;
}
```

Never scatter raw design values throughout components.

---

# 4.43 Z-Index Scale

Recommended:

```text
base: 0
raised: 10
sticky: 30
dropdown: 50
popover: 60
modal: 80
toast: 100
system: 120
```

Avoid arbitrary values like:

```text
z-[9999]
```

unless absolutely justified.

---

# 4.44 Toast System

Use toasts for:

- copied,
- saved,
- upload completed,
- link generated,
- settings saved.

Do not use toasts as the only place to communicate critical errors.

---

# 4.45 Dialog System

Dialogs:

- simple,
- focused,
- one primary action,
- clear cancel,
- accessible escape handling.

For destructive actions:

```text
Delete file?

This will remove the file from your Playxim library.

[Cancel] [Delete]
```

---

# 4.46 Command Palette

Future-friendly but highly valuable.

Shortcut:

```text
⌘K / Ctrl+K
```

Actions:

```text
Upload
Find content
Open analytics
Open earnings
Open settings
Create playlist
Create folder
```

Implement after core navigation is stable.

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

# 6. ADMIN PANEL

# 6.1 Admin Philosophy

Admin is the operational command center.

It should be:

- information dense,
- extremely functional,
- less decorative than creator UI,
- audit-focused.

---

# 6.2 Admin Dashboard

Top cards:

```text
Total Users
Active Creators
Uploads Today
Storage Used
Views Today
Processing Queue
Earnings Accrued
```

Health:

```text
Upload success
Processing success
Queue backlog
Webhook failures
Provider errors
```

---

# 6.3 Users

Admin can:

- search users,
- open profile,
- see account status,
- see storage usage,
- see upload stats,
- impersonate,
- inspect earnings.

---

# 6.4 Content

Admin can:

- search,
- filter,
- inspect,
- see provider,
- see scan state,
- see processing state,
- delete content,
- inspect share links.

---

# 6.5 Upload Monitor

Show:

- current uploads,
- failures,
- abandoned uploads,
- processing states,
- queue delays.

---

# 6.6 Storage

Global:

```text
Total R2 storage
Video storage
Other files
Largest creators
Largest files
Daily growth
```

---

# 6.7 Earnings

Admin:

- total accrued,
- pending,
- available,
- paid,
- creator ledger,
- adjustments.

All manual balance changes require audit logs.

---

# 6.8 Platform Settings

Admin-controlled settings:

```text
Creator rate
View qualification threshold
Upload concurrency
Share session lifetime
Maintenance mode
Public registration
App handoff destination
```

---

# 6.9 Admin User Experience

Do not expose dangerous actions by default.

Use:

```text
Inspect
→
Confirm
→
Execute
→
Audit
```

for destructive operations.

---

# 7. IMPLEMENTATION PLAN

# 7.1 Development Principles

Build in vertical slices, not page-by-page mock implementation.

Bad:

```text
Build 20 screens
then backend
then upload
```

Good:

```text
Auth
→
one real upload flow
→
one real content item
→
one real share link
→
real analytics
→
real dashboard
```

This exposes architecture problems early.

---

# 7.2 Phase 0 — Repository Foundation

Tasks:

- create GitHub repository,
- configure branch strategy,
- configure package manager,
- configure TypeScript strict mode,
- install current locked stack,
- configure Tailwind 4.3,
- initialize shadcn/ui with Base UI,
- configure Lucide,
- configure ESLint/formatting,
- configure environment schema,
- create local `.env.example`,
- configure CI.

Deliverable:

```text
Clean bootable Next.js application
```

Exit criteria:

- app boots,
- CI passes,
- typecheck passes,
- lint passes.

---

# 7.3 Phase 1 — Design System Foundation

Build:

- design tokens,
- themes,
- typography,
- buttons,
- inputs,
- cards,
- badges,
- dialogs,
- dropdowns,
- tabs,
- tables,
- tooltips,
- toast,
- skeleton,
- empty state,
- command palette primitives.

Also:

- responsive container,
- page header,
- section header,
- sidebar,
- mobile nav.

Exit criteria:

> No product screen is allowed to invent its own visual token.

---

# 7.4 Phase 2 — Public Marketing Site

Build:

```text
/
 /features
 /why-playxim
 /creator
 /pricing
 /faq
 /download
 /contact
 /terms
 /privacy
 /creator-agreement
 /dmca
```

Implement:

- light default,
- dark toggle,
- responsive layouts,
- Lenis,
- Anime.js choreography,
- reduced-motion behavior,
- SEO metadata,
- OG image support.

Performance target:

- minimal client bundle on marketing pages.

---

# 7.5 Phase 3 — Authentication

Build:

- sign up,
- sign in,
- Google OAuth,
- email verification,
- forgot password,
- reset password,
- session handling,
- profile bootstrap,
- username selection.

Testing:

- valid flow,
- invalid password,
- unverified account,
- expired verification,
- OAuth failure,
- session expiry.

---

# 7.6 Phase 4 — Creator Dashboard Shell

Build:

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

Implement:

- sidebar,
- mobile nav,
- account menu,
- responsive shell,
- theme switch,
- loading states,
- route guards.

---

# 7.7 Phase 5 — First Real Upload Vertical Slice

This phase is the highest priority.

Build:

```text
File picker
→
validation
→
content record
→
R2 upload
→
multipart
→
progress
→
complete
→
scan
→
ready
```

Before polishing every dashboard screen, prove that large uploads work.

Test with:

- small file,
- 100 MB,
- 1 GB,
- multi-GB,
- slow network,
- interrupted upload,
- refresh,
- failed part,
- retry,
- cancellation.

---

# 7.8 Phase 6 — Video Pipeline

Integrate Cloudflare Stream.

Implement:

- direct creator upload,
- TUS,
- provider metadata,
- webhook verification,
- video status sync,
- video thumbnail,
- ready state,
- failure state.

Build provider abstraction:

```text
VideoProvider
```

Do not couple UI directly to Cloudflare API payloads.

---

# 7.9 Phase 7 — Content Manager

Implement:

- list,
- filters,
- sort,
- search,
- folders,
- move,
- rename,
- delete,
- details,
- bulk selection.

Do not implement browser folder upload.

Folder upload attempt must produce the prescribed warning.

---

# 7.10 Phase 8 — Share Links

Implement:

- public link,
- password-protected link,
- multiple links/content,
- copy,
- share page,
- app handoff page,
- download endpoint,
- private handling.

Test:

```text public
password correct
password incorrect
private
missing
large file
disabled/deleted content
```

---

# 7.11 Phase 9 — Creator Profile & Branding

Implement:

- avatar,
- brand name,
- username,
- social links,
- profile page,
- profile sharing.

Focus on polish.

---

# 7.12 Phase 10 — Playlists

Implement:

- create,
- update,
- delete,
- add content,
- remove content,
- reorder,
- share.

Do not build the full consumer playback experience yet.

---

# 7.13 Phase 11 — Analytics

Implement first-party business analytics.

Creator overview:

```text
Views
Downloads
Storage
Earnings
Top content
```

Then:

- daily chart,
- monthly chart,
- content performance,
- link performance.

Use Recharts with accessible labels and responsive containers.

---

# 7.14 Phase 12 — Earnings Ledger

Implement:

- qualified-view event ingestion interface,
- rate configuration,
- ledger,
- balance aggregates,
- earning history,
- pending/available states.

Even if the app does not yet exist, build the backend contracts now.

Testing:

- duplicate event,
- replay event,
- invalid event,
- eligible view,
- non-qualified view,
- reversal,
- admin adjustment.

---

# 7.15 Phase 13 — Admin Panel

Implement:

- admin auth,
- dashboard,
- users,
- content,
- uploads,
- storage,
- earnings,
- audit logs,
- impersonation.

Destructive admin actions should require confirmation.

---

# 7.16 Phase 14 — Security Hardening

Perform:

- RLS audit,
- auth audit,
- API rate-limit audit,
- CSP audit,
- CORS audit,
- signed URL review,
- secret scanning,
- dependency audit,
- webhook verification audit,
- password session review,
- upload abuse tests,
- file spoofing tests,
- path traversal tests.

---

# 7.17 Phase 15 — Performance Engineering

Measure:

### Marketing

- LCP,
- CLS,
- INP,
- JS payload,
- image payload.

### Dashboard

- initial load,
- content list query,
- analytics query,
- dashboard hydration,
- chart rendering.

### Upload

- time-to-upload-start,
- throughput,
- retry rate.

---

# 7.18 Phase 16 — Automated Testing

## Unit / component

Vitest:

- validation,
- URL/code generation,
- access rules,
- earnings formulas,
- rate conversion,
- file type detection,
- state transitions.

## E2E

Playwright:

```text
signup
login
upload
content management
share link
password access
download
analytics
branding
earnings
admin
```

---

# 7.19 Phase 17 — Production Readiness

Before launch:

- production environment,
- domain,
- SSL,
- DNS,
- Cloudflare configuration,
- R2 bucket configuration,
- Stream configuration,
- Supabase production project,
- PostHog production project,
- Sentry production project,
- webhook endpoints,
- backup/recovery test,
- logging,
- alerting,
- status page.

---

# 7.20 Phase 18 — Launch

Launch sequence:

```text
Internal alpha
   ↓
Small creator beta
   ↓
Observe upload reliability
   ↓
Fix critical UX
   ↓
Public launch
```

Do not launch based solely on "all screens exist."

The critical launch KPI is:

> Can users upload and successfully share large content without support?

---

# 7.21 Suggested Build Priority

Priority ranking:

```text
P0
Auth
Upload
Storage
Content
Share links
Security

P1
Dashboard
Folders
Branding
Analytics
Earnings ledger

P2
Playlists
Admin polish
Advanced analytics
Command palette

P3
App handoff refinement
Future consumer API enhancements
```

---

# 7.22 What AI Coding Agents Must Not Do

When using coding agents:

Do not allow automatic:

- dependency replacement,
- architecture rewrites,
- provider substitution,
- database schema destruction,
- bypassing RLS,
- client-side secret insertion,
- direct public R2 bucket exposure,
- hardcoded earning calculations,
- silent scope expansion.

Agent rule:

> Read the documentation and existing architecture before implementing a feature.

---

# 7.23 AI Coding Agent Working Rules

Recommended project instruction:

```text
Before modifying code:
1. Read relevant documentation.
2. Inspect existing architecture.
3. Reuse established components.
4. Follow design tokens.
5. Follow server/client boundaries.
6. Never expose secrets.
7. Never bypass RLS.
8. Never place large file payloads through Next.js.
9. Never hardcode business rates.
10. Add tests for business-critical behavior.
11. Verify responsive behavior.
12. Verify loading/error/empty states.
13. Verify accessibility.
14. Run typecheck/lint/tests after meaningful changes.
```

---

# 7.24 Component Architecture

Recommended:

```text
components/
├── ui/
├── layout/
├── navigation/
├── upload/
├── content/
├── analytics/
├── earnings/
├── branding/
├── share/
├── profile/
├── admin/
└── marketing/
```

Domain components should not be dumped into `components/ui`.

---

# 7.25 Service Architecture

```text
lib/
├── auth/
├── db/
├── storage/
│   ├── r2/
│   └── provider.ts
├── video/
│   ├── cloudflare-stream/
│   └── provider.ts
├── uploads/
├── content/
├── links/
├── analytics/
├── earnings/
├── malware/
├── admin/
├── security/
└── observability/
```

---

# 7.26 Validation Architecture

All request payloads should have Zod schemas.

Example:

```text
schemas/
├── auth.ts
├── content.ts
├── upload.ts
├── links.ts
├── playlists.ts
├── branding.ts
├── analytics.ts
└── admin.ts
```

Do not trust TypeScript types as runtime validation.

---

# 7.27 Server/Client Boundary Rules

Client Component:

- local interactions,
- upload UI,
- dialogs,
- charts,
- drag-drop,
- optimistic UI.

Server:

- database access,
- auth enforcement,
- private storage signing,
- admin access,
- earnings,
- share authorization.

---

# 7.28 Optimistic UI

Use optimistic updates only for safe low-risk actions:

- rename,
- reorder playlist,
- toggle UI settings.

Do not optimistically mark:

- upload complete,
- earnings paid,
- malware clean,
- video processing ready.

Those states require server truth.

---

# 7.29 Progressive Enhancement

Important workflows should remain understandable if:

- JavaScript fails,
- network is slow,
- API returns an error.

Forms should have clear server-side error behavior.

---

# 7.30 UX State Matrix

Every primary screen must design:

```text
loading
empty
ready
partial
error
permission denied
offline
processing
success
```

Example Content page:

| State | UI |
|---|---|
| Loading | skeleton table |
| Empty | first-upload CTA |
| Ready | content list |
| Filtering | filtered list |
| No results | clear filters CTA |
| Error | retry |
| Offline | cached shell + offline notice |
| Processing | state badge |

---

# 7.31 Offline Considerations

Full offline creator dashboard is not an MVP requirement.

However:

- do not lose selected file metadata during temporary network interruptions,
- keep upload state resilient,
- preserve retry information.

Future Flutter app may implement stronger offline behavior.

---

# 7.32 Future Telegram Bot Architecture

Reserved concept:

```text
Telegram Bot
    ↓
Webhook/API
    ↓
Telegram file retrieval
    ↓
Playxim upload ingestion service
    ↓
R2 / Stream
    ↓
Content record
    ↓
Creator share link
```

The bot must use the same `ContentService` rather than creating a second content system.

---

# 7.33 Future Flutter Architecture

Flutter app should consume:

```text
Auth API
Content API
Playback API
Creator API
Playlist API
Analytics API
```

Flutter should not directly query arbitrary Supabase tables.

This keeps authorization centralized and makes future Windows/Linux clients easier.

---

# 7.34 Future Desktop Architecture

Windows/Linux applications should reuse:

- same REST/API contract,
- same authentication model,
- same playback service,
- same content model.

Do not create a second backend.

---

# 7.35 Future Consumer Features

Reserved:

```text
Following
Comments
Likes
Shares
Notifications
Watch history
Continue watching
Recommendations
Search
Explore
Categories
Subscriptions
Ads
Creator subscriptions
```

None should influence MVP web architecture in a way that increases present complexity unnecessarily.

---

# 8. RELEASE CHECKLIST

# 8.1 Product

- [ ] All MVP flows work.
- [ ] Public share flow works.
- [ ] Password link works.
- [ ] Private content remains private.
- [ ] Video handoff works.
- [ ] Download permissions work.
- [ ] Multiple links work.
- [ ] Creator profile works.
- [ ] Storage usage is accurate.
- [ ] Earnings ledger is deterministic.

---

# 8.2 Security

- [ ] RLS enabled on all exposed tables.
- [ ] Admin routes protected.
- [ ] No secrets in client bundle.
- [ ] Upload URLs signed.
- [ ] Download URLs signed.
- [ ] Passwords hashed.
- [ ] Rate limits active.
- [ ] Webhook signatures validated.
- [ ] CSP enabled.
- [ ] Audit logging enabled.
- [ ] Malware workflow enabled.

---

# 8.3 UX

- [ ] Responsive desktop.
- [ ] Responsive tablet.
- [ ] Responsive mobile.
- [ ] Light mode default.
- [ ] Dark mode works.
- [ ] Keyboard navigation works.
- [ ] Reduced-motion behavior works.
- [ ] Loading states exist.
- [ ] Empty states exist.
- [ ] Errors are understandable.
- [ ] Upload progress is excellent.
- [ ] No accidental layout jumps.

---

# 8.4 Performance

- [ ] Marketing bundle optimized.
- [ ] Images optimized.
- [ ] Charts lazy loaded where appropriate.
- [ ] No unnecessary Three.js.
- [ ] Animation uses transform/opacity where possible.
- [ ] Large tables paginated.
- [ ] API p95 latency monitored.
- [ ] Upload throughput measured.

---

# 8.5 Observability

- [ ] Sentry connected.
- [ ] PostHog connected.
- [ ] Upload failures tracked.
- [ ] Media processing failures tracked.
- [ ] Queue backlog monitored.
- [ ] Webhook failures monitored.
- [ ] Earnings reconciliation monitored.

---

# 9. FINAL UX BENCHMARK

Playxim should pass this qualitative benchmark:

### A creator opens Playxim.

Within 5 seconds they should understand:

> "This is where I upload and manage my content."

Within 15 seconds they should understand:

> "I can share this content with my audience."

Within 30 seconds they should understand:

> "I can track how my content performs."

Within a short session they should understand:

> "My content can eventually generate earnings."

The interface should never require a tutorial to perform the core workflow.

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
