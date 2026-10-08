# Playxim — Implementation Plan

**Product:** Playxim  
**Domain:** `playxim.com`  
**Document status:** Authoritative, build-ready specification  
**Prepared:** 2026-10-08  
**Role:** Defines the execution sequence from repository setup to production launch, including admin delivery, QA, security hardening, performance, AI coding-agent rules, and release gates.


> **Shared product baseline:** Playxim is a creator-facing web platform for unlimited content storage/upload, sharing, creator analytics, and future creator monetization. The future Flutter applications are consumer-facing, with video streaming as the main consumption experience.

> **Design baseline:** Apple × Linear, premium and minimal, subtle glassmorphism, light mode by default, responsive desktop/tablet/mobile, with dark mode as a first-class alternative.

## Authority and dependencies

**Primary authority of this file:** Implementation Plan — when and in what order the product is built.

Use the other documents for decisions outside this document's ownership; do not independently redefine shared product behavior.

- `PLAYXIM_PRD.md` — product behavior and scope
- `PLAYXIM_TRD.md` — runtime architecture and infrastructure
- `PLAYXIM_WEBSITE_PAGE_FLOW.md` — routes and user journeys
- `PLAYXIM_UI_UX_DESIGN_SYSTEM.md` — visual and interaction language
- `PLAYXIM_BACKEND_SCHEMA.md` — persistence and authorization model
- `PLAYXIM_IMPLEMENTATION_PLAN.md` — execution order and release gates

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

## Execution control model

### Phase gate format

Every phase should end with:

```text
Implementation complete
→ automated tests pass
→ manual acceptance pass
→ responsive pass
→ accessibility pass
→ observability pass
→ performance check
→ security review
→ next phase unlocked
```

### Work-item priority

Use this priority order when scope conflicts appear:

1. Authentication and authorization correctness
2. Reliable upload and content persistence
3. Share-link correctness/privacy
4. Data integrity and processing reliability
5. Creator-visible analytics/earnings correctness
6. Accessibility/responsive quality
7. Performance
8. Premium visual refinement
9. Non-essential motion/decorative polish

This prevents a visually excellent interface from hiding an unreliable content pipeline.

## AI coding-agent operating contract

AI coding agents may accelerate implementation but must obey the repository architecture, schema, validation, test, and security contracts. They must not silently invent alternate data models, provider flows, or package choices when an authoritative decision already exists.

Before changing a shared component or domain service, an agent should inspect existing conventions and update tests/types alongside behavior.

## Suggested repository delivery order

```text
Foundation
↓
Design system
↓
Marketing website
↓
Auth
↓
Dashboard shell
↓
Real upload vertical slice
↓
Video processing
↓
Content manager
↓
Share links
↓
Branding + profiles
↓
Playlists
↓
Analytics
↓
Earnings
↓
Admin
↓
Security + performance
↓
Automated test hardening
↓
Launch
```

## Release readiness rule

Do not launch merely because all planned routes render. A release is ready only when the core creator loop is reliable under realistic network conditions, privacy modes work correctly, background processing is recoverable, and the operational team can diagnose failures without direct database manipulation.

