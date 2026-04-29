# Contributing to the hAppenings Design System

This repo is the playground for the hAppenings Community design system and UI prototypes. Contributions of any size are welcome — whether you're fixing a typo in the docs, adding a new component, or prototyping a new screen.

## What's in this repo

```
happenings-community-design-system/
├── index.html                         # Design system landing page (entry point)
├── colors_and_type.css                # All design tokens: colors, type, spacing, radii
├── assets/                            # Brand assets (logos, icons, default avatar)
├── preview/                           # Single-page token & component showcases
│   ├── colors-primary.html
│   ├── colors-accents.html
│   ├── colors-semantic.html
│   ├── type-display.html
│   ├── type-body.html
│   ├── spacing.html
│   ├── radii-shadows.html
│   ├── iconography.html
│   ├── logos.html
│   ├── components-buttons.html
│   ├── components-badges.html
│   ├── components-cards.html
│   ├── components-inputs.html
│   └── components-nav.html
├── ui_kits/
│   └── requests-and-offers/           # Interactive prototype (source of truth)
│       ├── index.html                 # Prototype entry point
│       ├── Shell.jsx                  # Nav bar + page shell
│       ├── Buttons.jsx                # Button component
│       ├── Badges.jsx                 # Badge/chip component
│       ├── Cards.jsx                  # Card components
│       ├── Inputs.jsx                 # Form input components
│       └── screens/                   # Composed screen components
├── SKILL.md                           # AI agent manifest (see below)
├── CONTRIBUTING.md                    # This file
└── README.md                          # Design system reference
```

## Running locally

Opening `index.html` as a `file://` URL will not work for the prototype — browsers block cross-origin script loading, which affects the JSX files. You need a local HTTP server.

```bash
# Install serve once (or use any static server)
npm run dev        # serves everything at http://localhost:3000
npm run dev:ui     # serves just the prototype at http://localhost:3001
```

No build step required. All JS runs via Babel in the browser.

## Adding a design token

All tokens live in `colors_and_type.css`. The format follows Skeleton UI conventions: RGB triplets so they compose with CSS alpha.

```css
/* Example: adding a new color */
--color-my-color-500: 100 150 200;   /* RGB triplet */
```

After updating the CSS:
1. Add a swatch to the relevant `preview/colors-*.html` file.
2. Document usage in `README.md` under the appropriate section.

## Adding a component to the prototype

The prototype is React 18 + Babel (CDN). Components are plain JSX files with inline styles attached to `window.*` globals.

**Pattern to follow** (look at `Buttons.jsx` as the reference):

```jsx
/* eslint-disable */

// 1. Define your component styles as a template literal
window.myComponentStyles = `
  .my-component { ... }
`;

// 2. Define your React component
function MyComponent({ variant, children }) {
  return <div className="my-component">{children}</div>;
}
```

**Steps:**
1. Create `ui_kits/requests-and-offers/MyComponent.jsx`
2. Add `<script type="text/babel" src="MyComponent.jsx"></script>` to `ui_kits/requests-and-offers/index.html` before `Shell.jsx`
3. Add `window.myComponentStyles` to the `StyleInjector` array in `index.html`
4. Add a preview card to `preview/components-mycomponent.html`
5. Link the preview from `index.html` landing page

## Adding a screen to the prototype

1. Add your component to the appropriate file in `ui_kits/requests-and-offers/screens/` (or create a new file)
2. Register the route in the `switch` statement in `index.html`
3. Add an entry to `SCREEN_MAP` in `Shell.jsx` so it appears in the screen map (press `M`)

## Updating the README

`README.md` is the authoritative design specification. Keep it updated when:
- Color values change
- New components are added
- Typography decisions are revised
- Voice/content guidelines evolve

## Design conventions

- **Colors:** always reference `colors_and_type.css` tokens, never hardcode hex values
- **Radius:** pill (`9999px`) for buttons/chips, `8px` for cards/modals
- **Icons:** emoji are the canonical icon system (no icon library)
- **Voice:** sentence case, "you/your", warm and community-first
- **Wordmark:** always `hAppenings` (lowercase h, capital A)

## AI agents and SKILL.md

`SKILL.md` is a machine-readable manifest that allows AI coding assistants (Claude Code, etc.) to load this design system as a skill. When an agent invokes the `happenings-design` skill, it reads `README.md` and the files referenced there to become an expert in the brand before generating any UI.

You don't need to edit `SKILL.md` unless you're changing the skill's entry instructions.
