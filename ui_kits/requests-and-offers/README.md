# Requests & Offers — UI Kit

Pixel-fidelity recreation of the **hAppenings Community: Requests & Offers** application (SvelteKit + Skeleton UI in production, recreated here as React + Babel for portability).

## Files
- `index.html` — interactive click-thru: home dashboard → browse requests → request detail → create request flow.
- `Shell.jsx` — page shell: violet nav bar, mobile drawer trigger, status pill, content slot.
- `Buttons.jsx` — `<Button variant="primary|secondary|warning|tertiary|ghost|soft" size="sm|md">` plus the variant-shifting hover used in the live nav.
- `Cards.jsx` — `<ActionCard>` (home tiles) and `<ListingCard>` (request/offer rows in the public table).
- `Badges.jsx` — pill chips (Active / Archived / Service-Type / status dots).
- `Inputs.jsx` — `<Field>`, `<TextInput>`, `<TextArea>`, `<Select>` matching Skeleton's input look.
- `screens/` — composed screens (`Home`, `RequestsBrowse`, `RequestDetail`, `RequestCreate`).

Sourced from `ui/src/routes/+layout.svelte`, `+page.svelte`, `(public)/requests/*`, `(public)/offers/*`, and `lib/components/shared/NavBar.svelte`.
