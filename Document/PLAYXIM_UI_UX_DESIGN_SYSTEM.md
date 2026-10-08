# Playxim — UI & UX Design System

**Product:** Playxim  
**Domain:** `playxim.com`  
**Document status:** Authoritative, build-ready specification  
**Prepared:** 2026-10-08  
**Role:** Defines the visual system and interaction language: colors, typography, spacing, components, responsive behavior, motion, glassmorphism, accessibility, and premium quality rules.


> **Shared product baseline:** Playxim is a creator-facing web platform for unlimited content storage/upload, sharing, creator analytics, and future creator monetization. The future Flutter applications are consumer-facing, with video streaming as the main consumption experience.

> **Design baseline:** Apple × Linear, premium and minimal, subtle glassmorphism, light mode by default, responsive desktop/tablet/mobile, with dark mode as a first-class alternative.

## Authority and dependencies

**Primary authority of this file:** UI/UX Design System — what Playxim looks and feels like.

Use the other documents for decisions outside this document's ownership; do not independently redefine shared product behavior.

- `PLAYXIM_PRD.md` — product behavior and scope
- `PLAYXIM_TRD.md` — runtime architecture and infrastructure
- `PLAYXIM_WEBSITE_PAGE_FLOW.md` — routes and user journeys
- `PLAYXIM_UI_UX_DESIGN_SYSTEM.md` — visual and interaction language
- `PLAYXIM_BACKEND_SCHEMA.md` — persistence and authorization model
- `PLAYXIM_IMPLEMENTATION_PLAN.md` — execution order and release gates

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


## UI/UX execution gates

### Visual hierarchy

Every screen must answer immediately: where am I, what can I do, and what is the current state?

### Component state completeness

Every interactive component should define:
`default → hover → focus → active → disabled → loading → success/error where applicable`.

### Responsive gate

Check desktop, tablet, and mobile widths before design sign-off.

### Motion gate

Motion must communicate progress, state change, continuity, hierarchy, or feedback. Decorative motion is optional and must never obstruct utility.

### Accessibility gate

Keyboard navigation, visible focus, semantic labels, non-color-only state communication, sufficient contrast, and reduced-motion support are required for production.

