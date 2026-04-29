---
name: happenings-design
description: Use this skill to generate well-branded interfaces and assets for hAppenings Community (the Requests & Offers Holochain app), either for production or throwaway prototypes/mocks/etc. Contains essential design guidelines, colors, type, fonts, assets, and UI kit components for prototyping.
user-invocable: true
---

Read the README.md file within this skill, and explore the other available files.

If creating visual artifacts (slides, mocks, throwaway prototypes, etc), copy assets out and create static HTML files for the user to view. Always reference `colors_and_type.css` for color and type tokens, and lift component patterns from `ui_kits/requests-and-offers/`.

If working on production code, you can copy assets and read the rules here to become an expert in designing with this brand. The production app is **SvelteKit + TailwindCSS + Skeleton UI** with a custom theme defined in `ui/src/happening_theme.ts`.

If the user invokes this skill without any other guidance, ask them what they want to build or design, ask some questions, and act as an expert designer who outputs HTML artifacts _or_ production code, depending on the need.

Key facts:
- Brand colors: primary `#4720b7` (royal violet), secondary `#ebc634` (sun gold), tertiary `#0EA5E9` (sky cyan), warning `#ff8800` (orange).
- Pill radius is the **default** for buttons, chips, badges. 8px for cards.
- Voice is warm + community-first; emoji are the canonical icon system.
- Tone uses "you" / "our community"; sentence case headings; "hAppenings" wordmark keeps its lowercase h.
