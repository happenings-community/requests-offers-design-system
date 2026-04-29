# hAppenings Community — Design System

> **Status: alpha prototype.** This repo is the community playground for developing the hAppenings design system and prototyping features. Contributions welcome — see [CONTRIBUTING.md](CONTRIBUTING.md).

A design system for **hAppenings Community CIC** — a UK-based Community Interest Company building peer-to-peer collaboration tools on Holochain. Their flagship application, **Requests & Offers**, is a simple peer-to-peer bulletin board where creators, developers, and organizations post requests and offers for services, skills, and resources, with direct contact facilitation.

The production app is built on SvelteKit + TailwindCSS + Skeleton UI, with a Holochain DNA back-end and a 7-layer Effect-TS architecture in the front-end.

---

## Getting Started

No build step required. You need a local HTTP server because browsers block cross-origin script loading when opening `file://` URLs directly.

```bash
# Clone and serve
git clone https://github.com/happenings-community/happenings-community-design-system.git
cd happenings-community-design-system
npm run dev          # → http://localhost:3000  (full design system)
npm run dev:ui       # → http://localhost:3001  (prototype only)
```

Then open `http://localhost:3000` for the design system index, or go straight to `http://localhost:3000/ui_kits/requests-and-offers/` for the interactive prototype.

### Prototype tech note

The UI kit prototype uses **React 18 + Babel loaded from CDN** — no build toolchain, no `npm install`. This keeps the playground frictionless for rapid UI prototyping. When a prototype screen matures into production code, it gets translated to **SvelteKit + TailwindCSS + Skeleton UI** (the production stack). See [CONTRIBUTING.md](CONTRIBUTING.md) for how to add components and screens.

---

## What's in this repo

```
happenings-community-design-system/
├── index.html                      # Design system landing page
├── colors_and_type.css             # All design tokens
├── assets/                         # Brand assets (logos, icons, avatar)
├── preview/                        # Per-token HTML showcases
├── ui_kits/
│   └── requests-and-offers/        # Interactive prototype (source of truth)
├── SKILL.md                        # AI agent manifest
├── CONTRIBUTING.md                 # How to contribute
└── README.md                       # This file
```

---

## AI Agents and SKILL.md

`SKILL.md` is a machine-readable manifest for AI coding assistants (Claude Code, etc.). When an agent invokes the `happenings-design` skill, it reads this README and the referenced files to become an expert in the brand before generating any UI. You don't need to edit `SKILL.md` unless you're changing the skill's entry behavior.

---

## Sources

These are the sources this system was extracted from. The agent has read them; assume the reader may not.

| Source | Path / URL |
|---|---|
| **Codebase** | https://github.com/happenings-community/requests-and-offers (branch `main`) |
| Theme tokens | `ui/src/happening_theme.ts` (Skeleton custom theme) |
| Tailwind setup | `ui/tailwind.config.ts` (Skeleton crimson preset + custom theme) |
| Global CSS | `ui/src/app.postcss` |
| Layout / shell | `ui/src/routes/+layout.svelte`, `ui/src/lib/components/shared/NavBar.svelte` |
| Home dashboard | `ui/src/routes/+page.svelte` |
| Browse screens | `ui/src/routes/(public)/{requests,offers}/+page.svelte` |
| Brand site | https://happenings.community/ |
| Discord | https://discord.gg/happening |
| Logos (provided) | `assets/hAppeningsCIClogo.png`, `assets/hAppeningsLogoWsun2.webp`, `assets/icon.png` |
| Default avatar | `assets/default_avatar.webp` (from `ui/static/default_avatar.webp`) |

---

## Products

There is **one** active product surface, plus an admin shell:

1. **Requests & Offers** — public bulletin board (browse, create, view requests/offers, organizations, service types, user profiles).
2. **Admin** — internal moderation panel (administrators, status history, organizations, mediums of exchange, hREA test). Same visual language as the public app, just behind `/admin` and accented with error-red affordances.

---

## Index

- `README.md` — this file.
- `colors_and_type.css` — color + type CSS variables (RGB triplets, Skeleton-compatible) and semantic element classes (`.ds-h1`, `.ds-display`, `.ds-code`, …).
- `SKILL.md` — agent skill manifest.
- `assets/` — logos, icons, default avatar.
- `preview/` — small HTML cards that populate the Design System tab.
- `ui_kits/requests-and-offers/` — pixel-fidelity recreations of core screens with reusable Svelte-shaped JSX components.

---

## CONTENT FUNDAMENTALS

Voice is **warm, plain, community-first**. Less marketing copy, more "here's what you can do".

- **Pronouns:** "you" / "your". Occasional collective "our community". Rarely "we".
- **Casing:** Sentence case for buttons and headings, except the wordmark **hAppenings** (the lowercase `h` + capital `A` is intentional — it puns on "happening" / "happen-in-gs"). Service-type and section names use Title Case ("Service Types", "All Users", "Mediums of Exchange").
- **Length:** Short. Headings ≤ 6 words. Card descriptions one sentence. Empty states one sentence.
- **Tone:** Inviting, action-oriented. Examples lifted directly from the app:
  - "Welcome to Requests & Offers"
  - "Connect with the Holochain community to exchange skills, resources, and support."
  - "Discover Opportunities" / "Offer Your Skills" / "Explore Community"
  - "Ready to make a difference in the community today?"
  - "Find requests you can help with"
  - "Our community operates on **mutual aid principles**."
- **Emoji:** Used liberally as inline icons in headings, buttons, and nav items — 🔍 ✨ 👥 📋 🎯 👤 📝 💡 🏷️ 🤝 🏢 ⚙️ 📦 🟢 🟡 🟠 🔴 ⏳. They function as the icon system for headings and CTAs (see ICONOGRAPHY below).
- **Formality:** Low. Imperatives are friendly invitations ("Create your first request!", "Join the community").
- **Status / errors:** Direct and human ("Connection failed", "Profile Approval Required", "No active requests found. Create your first request!").
- **Domain words:** _request_, _offer_, _service type_, _medium of exchange_, _organization_, _profile_, _network seed_, _agent_, _Holochain_, _hREA_, _mutual aid_, _bulletin board_.

---

## VISUAL FOUNDATIONS

The brand reads as **calm, civic, slightly handcrafted**. Royal violet anchors everything; a sun-gold and a sky-cyan supply warmth and lift. Surfaces are mostly white with grey hairlines; the nav and key gradient panels carry the brand color.

### Color
- **Primary** royal violet `#4720b7` — nav bar, primary buttons, links, page headings. Always white text on filled.
- **Secondary** sun gold `#ebc634` — "Requests" CTA, accent buttons. Black text on filled.
- **Tertiary** sky cyan `#0EA5E9` — "Community" wordmark, tertiary buttons. Black text on filled.
- **Warning** orange `#ff8800` — "Offers" CTA, archive states.
- **Success** lime `#84cc16`, **Error** crimson `#d21919`, **Surface** indigo-slate `#495a8f` (cards, dark mode body, drawer).
- Light mode is dominant; dark mode is supported through Skeleton (`darkMode: 'class'` + `dark:bg-surface-800` patterns).

### Type
- Codebase ships **system-ui** for both base and heading. We promote **Inter** as the default in this design system for consistency across rendered HTML, with **Caveat** as a handwritten display accent (echoing the wordmark) and **JetBrains Mono** for code/technical surfaces.
- **Substitution flag:** the brand currently has no licensed display font — Caveat is our nearest-match Google Font for the script wordmark in the logo. If the brand has an official handwritten font, please share it and we'll swap.
- Headings are bold, short, and tend to be wrapped in primary or surface color.
- The `h1`/`h2`/`h3` Skeleton classes are used heavily in routes.

### Spacing
- Tailwind defaults: 4 / 8 / 12 / 16 / 24 / 32 / 48 / 64 px.
- Page containers: `max-w-6xl mx-auto px-4 py-8`.
- Cards: `p-6` to `p-8`. Gaps in card grids: `gap-6`.

### Backgrounds
- **No hand-drawn illustrations or patterns** in the codebase. Surfaces are flat color or simple gradients.
- Landing card uses a **diagonal gradient**: `bg-gradient-to-r from-primary-500 to-secondary-500` on the join-the-community panel; Requests/Offers CTAs use `from-secondary-500 to-secondary-600` and `from-warning-500 to-warning-600`.
- Cards are white over off-white page (`bg-gray-50` zones for "Community Features" sections).
- Main content area uses `flex flex-col items-center justify-center py-10`.

### Animation
- Restrained. The codebase uses Tailwind's `transition-all`, `transition-shadow`, `transition-colors` on hover, plus `transition-transform` for the subtle 1.1× icon-pop on card hover.
- Loaders: spinning border (`animate-spin rounded-full border-b-2 border-primary-500`) and Skeleton's `<ConicGradient … spin>` during init.
- Durations: default Tailwind (~150ms). No bounces, no parallax, no scroll-tied effects.

### Hover & press states
- Hover on filled buttons: shift to a sibling color or a darker shade — e.g. `variant-filled-secondary` → `hover:variant-filled-tertiary`, primary `hover:bg-primary-600`.
- Hover on cards: `hover:shadow-lg` (or `hover:shadow-xl` on the gradient CTAs) plus `hover:border-primary-300`.
- Hover on icons inside cards: `group-hover:scale-110`.
- Hover on chrome links: `hover:opacity-80`.
- Press / active: not customised — relies on default browser depression.

### Borders, shadows, radii
- **Pill radius is the base** (`--theme-rounded-base: 9999px`). Buttons, chips, status dots are pill-shaped.
- **Cards / modals: 8px** (`--theme-rounded-container: 8px`, `rounded-lg`/`rounded-xl` in routes).
- Default border: 1px (`--theme-border-base`).
- Card chrome: `border border-gray-200 bg-white shadow-md`. Elevated CTAs: `shadow-lg` → `hover:shadow-xl`.
- No inner shadows. Protection gradients are not used over imagery (there is no imagery to protect).

### Layout rules
- Top nav is fixed-height (`h-20`), full-bleed `bg-primary-500`, `shadow-lg`, with the logo at left and pill buttons at right.
- Admin badge can be **fixed** at `top-24 left-4` (desktop) or floating bottom-right (mobile).
- Modals via Skeleton `<Modal />`; drawers via Skeleton `<Drawer />` (mobile menu lives at `bg-primary-500`).

### Transparency & blur
- Sparse. The connection-status pill in the nav uses `bg-white/10 backdrop-blur-sm border border-white/20` over the violet nav.
- Otherwise solid fills.

### Imagery
- The codebase ships exactly **two photographic-style assets** (`hAppeningsCIClogo.png`, `hAppeningsLogoWsun2.webp`) and one favicon (`icon.png`). No stock photography, no illustration set. When the brand wants imagery, it leans on the logo's color palette (warm gold sun on violet) — that's the only "brand image" you'll see.

### Cards (canonical recipe)
```html
<div class="rounded-lg border border-gray-200 bg-white p-6 shadow-md transition-shadow hover:shadow-lg">
  <div class="text-center">
    <div class="mb-4 text-4xl">🔍</div>
    <h3 class="h3 mb-3 text-gray-800">Discover Opportunities</h3>
    <p class="mb-4 text-gray-600">Browse requests from the community…</p>
    <a class="btn bg-secondary-500 hover:bg-secondary-600 px-6 py-2 font-medium text-white">Explore</a>
  </div>
</div>
```

---

## ICONOGRAPHY

The codebase has **no icon font and no SVG icon set**. Icons are rendered as **emoji**, sized via Tailwind `text-lg` / `text-2xl` / `text-4xl`. This is intentional: the app reads as friendly and informal.

- **Primary emoji vocabulary** (lifted from `+page.svelte` and `NavBar.svelte`):
  - 🔍 discover · ✨ skills · 👥 community · 📋 my requests / active · 🎯 my offers · 👤 profile · 📝 requests · 💡 offers · 🏷️ service types · 🤝 mutual aid · 🏢 organizations · ⚙️ admin · 📦 archived · ⏳ loading
- **Status dots** are emoji too: 🟢 connected · 🟡 checking · 🟠 disconnected · 🔴 error.
- **The one custom illustration** is the sun-spiral mark (`assets/icon.png`) — a hand-drawn yellow sun with a spiral center on a violet background. It is the favicon and an in-product brand mark.
- Two SVG components ship in code (`shared/svg/bars.svelte` for the mobile menu hamburger, plus a small `lock` glyph elsewhere); these are not used as a system.
- **No** Lucide / Heroicons / Material icons in the codebase. Skeleton's optional `svelte-hero-icons` is installed but not invoked anywhere we read.

**Recommendation in this design system:** keep emoji as the canonical icon vocabulary for parity with the live app. If a future surface needs a stricter icon system (e.g. dense admin tables), substitute **Lucide** at 1.5px stroke — flagged as a substitution.

---

## Caveats

- **Font substitution flagged:** Inter (body) and Caveat (display) are nearest-match Google Fonts. The codebase ships only `system-ui`. If the brand has licensed fonts, please share them.
- **No production icon set:** the live app uses emoji exclusively. Recommendation to substitute Lucide for dense admin tables is unconfirmed.
- **One product, one UI kit:** this codebase ships a single product (Requests & Offers). The Admin shell shares the visual language and is not separately recreated.
- **Imagery is sparse:** the brand has no stock photo library or illustration set in the codebase — only logos. Designs that need imagery will require user-supplied assets.
