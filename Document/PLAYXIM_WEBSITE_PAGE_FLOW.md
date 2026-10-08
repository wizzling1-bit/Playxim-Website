# Playxim — Website Page Flow

**Product:** Playxim  
**Domain:** `playxim.com`  
**Document status:** Authoritative, build-ready specification  
**Prepared:** 2026-10-08  
**Role:** Defines the route map, navigation hierarchy, page sequence, creator workflows, marketing flows, share-link flow, app handoff, loading/error behavior, and responsive route behavior.


> **Shared product baseline:** Playxim is a creator-facing web platform for unlimited content storage/upload, sharing, creator analytics, and future creator monetization. The future Flutter applications are consumer-facing, with video streaming as the main consumption experience.

> **Design baseline:** Apple × Linear, premium and minimal, subtle glassmorphism, light mode by default, responsive desktop/tablet/mobile, with dark mode as a first-class alternative.

## Authority and dependencies

**Primary authority of this file:** Website Page Flow — how users move through the website.

Use the other documents for decisions outside this document's ownership; do not independently redefine shared product behavior.

- `PLAYXIM_PRD.md` — product behavior and scope
- `PLAYXIM_TRD.md` — runtime architecture and infrastructure
- `PLAYXIM_WEBSITE_PAGE_FLOW.md` — routes and user journeys
- `PLAYXIM_UI_UX_DESIGN_SYSTEM.md` — visual and interaction language
- `PLAYXIM_BACKEND_SCHEMA.md` — persistence and authorization model
- `PLAYXIM_IMPLEMENTATION_PLAN.md` — execution order and release gates

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

## Flow governance

### Route contract

Every route has one primary purpose and one dominant next action. Secondary actions should remain visually quiet until needed.

### Universal state machine

```text
Entry
 ↓
Auth / permission check
 ↓
Skeleton
 ↓
Data ready? ── no → recoverable error / retry
 ↓ yes
Ready or Empty
 ↓
User action
 ↓
Validation
 ↓
Async operation
 ↓
Success / Recoverable failure
```

### Deep-link rule

Authenticated URLs, share links, creator profiles, and public marketing links must resolve directly to the requested destination rather than forcing a detour through `/`.

### Share-page rule

A share page represents a published content doorway. It must not leak internal database IDs, storage object keys, provider URLs, or administrative metadata.

### App handoff rule

Video shares should pass the stable content/link identifier into the future Flutter app. The web layer should show the appropriate app/download pathway when the native app is not available.

### Responsive route rule

Desktop, tablet, and mobile must preserve the same information architecture but may change layout, control density, navigation treatment, and action placement. Mobile web is creator tooling, not a compressed desktop screenshot.

### Route completion checklist

For every new route, document:

- purpose;
- authenticated/public status;
- required data;
- primary CTA;
- secondary actions;
- loading state;
- empty state;
- validation state;
- error state;
- success state;
- mobile behavior;
- analytics events;
- SEO/indexing policy if public.

