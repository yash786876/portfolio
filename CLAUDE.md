# Portfolio — Yash Santwani

Personal portfolio. Design reference: pivenilya.com (screenshots in /reference).
Goal: recreate the *feel* with Yash's own content — never copy text, images or code.

## Before any task
- Read `docs/solutions/` for past fixes and patterns.
- Read `docs/backlog.md` to see which feature is next.
- One feature per session. Plans go in `docs/plans/`.

## Stack
- Plain HTML + CSS + vanilla JS. No frameworks or build step unless a plan justifies it.
- GSAP only if a scroll effect can't be done with CSS + IntersectionObserver.
- Deploy: GitHub Pages (main branch, root).

## Design tokens (source of truth: css/tokens.css)
- Background cream `#D9CCB4` · ink `#1E1B18` · accent rust `#B5452A`
- Dark pages `#1F1F1F` · dark-page headline yellow `#F2D46B`
- Headings: geometric rounded sans — "Outfit" (free stand-in for TT Norms Pro), weight 600
- Accent serif: "Fraunces" for small details only
- Display sizes: clamp(64px, 11vw, 160px); body 15–16px, line-height 1.5
- Rust is reserved for headlines and big numbers

## Signature effects (reuse, don't rebuild)
- `js/grain.js` — film grain overlay + vignette on every page
- `js/dust.js` — drifting particles on canvas (`data-dust="dark|light"`)
- `js/reveal.js` — ink-blot → sharp text reveal (`data-reveal`)
- `js/counter.js` — count-up numbers (`data-count="50" data-suffix="+"`)

## Layout rules
- Tiny nav: name left; "Portfolio, About, Contacts" right (commas are part of the style)
- About = 50/50 split: fixed portrait left (half photo, half dotted), right column scrolls
- Sections numbered 01–04: thin top rule, small label left, number right
- Home: dust intro with name → full-screen moody photo with headline spread across → 2-col project grid

## Quality bar (every feature)
- Works at 1440px and 390px wide
- Respects `prefers-reduced-motion` (no animation, content visible)
- Grain/vignette never block clicks (`pointer-events: none`)
- Text contrast checked on top of grain
- No console errors; Lighthouse mobile ≥ 90 (Performance, Accessibility)
- All images have alt text and are compressed (WebP, < 300 KB)

## Content
- Name: Yash Santwani
- PGP TBM, Masters' Union · MU Ventures
- Former founder — Shubhrashi (Malava Food Industries)
- Former Business Technology Associate — ZS Associates
- Projects: CareVoyage, Naap, Shubhrashi, garlic export site, selected case competitions

## Learned rules
<!-- /ce-compound adds rules here. Keep this file under ~150 lines; move detail to docs/solutions/. -->
