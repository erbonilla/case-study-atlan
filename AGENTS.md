# Atlan Case Study Agent Notes

## Project Purpose
This project publishes the Atlan Performance UX case study: **Liquid Precision & The Quiet Sage**, a self-initiated portfolio case study by Edgar Bonilla. The scrolling web case study is the primary deliverable; `Atlan Deck.html` is the portfolio-review companion.

## Entry Points
- Web case study: `index.html` and `Atlan Case Study.html`
- React source: `case-study/main.jsx`
- Shared styles: `case-study/styles.css`, `case-study/hero.css`, `case-study/sections.css`
- Companion deck: `Atlan Deck.html`, `deck/deck.css`, `deck-stage.js`
- Embedded artifact frames: `figures/*.html`

## Commands
- Install: `npm install`
- Develop: `npm run dev`
- Build: `npm run build`
- Preview production build: `npm run preview`

## Design Rules
- Brand direction: Morning Light, Quiet Sage, calm editorial, high-contrast, generous whitespace.
- Keep the default presentation light. Dark theme must remain brand-consistent and accessible.
- No emojis. Use Lucide for UI/action icons.
- Preserve content symbols that are part of the writing or math, such as `2×2`, `320 × 360`, and ratio notation.
- Keep Coral as a scarce action/accent color; do not turn it into a decorative wash.

## Responsive Acceptance Matrix
Verify the case study at:
- `375x812`
- `430x932`
- `768x1024`
- `1024x768`
- `1440x900`

At each size, the document must have no horizontal page scroll, navigation must remain usable, images must not distort, and iframe artifacts must stay contained.

## Theme Expectations
- Respect stored user choice in `localStorage`.
- Before a manual choice exists, respect `prefers-color-scheme`.
- The light theme remains the baseline for publishing and screenshots.

## Generated/Reference Assets
Do not edit generated screenshots or uploaded reference artifacts unless the user explicitly asks. Treat `screenshots/` and `uploads/` as reference/output material.

## Publish Checklist
- `npm run build` succeeds.
- Production preview has no console errors.
- Favicon loads.
- All meaningful images have `alt` text.
- Icon-only buttons have accessible names.
- No emoji usage in source.
- Lucide is the only UI/action icon set in React UI.
- Lighthouse or equivalent lightweight audit has no critical accessibility or best-practice findings.
