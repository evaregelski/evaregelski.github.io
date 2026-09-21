# Portfolio site — handoff notes

Everything needed to pick this up in a fresh conversation. Attach the whole
`portfolio-site` folder (or the zip), plus this file.

## Where things stand

| Page | File | Status |
|---|---|---|
| Home | `index.html` | Done — liquid metal hero, work cards, about teaser, Kind words, contact |
| Work index | `work.html` | Done — seven case studies |
| Resume | `resume.html` | Done — timeline with skill lenses, case studies linked to their roles |
| Dashboard case study | `work/cyberstar-dashboard/index.html` | Done |
| Design system case study | `work/cyberstar-design-system/index.html` | Done — built entirely in markup, no images |
| KeyBank mortgage case study | `work/keybank-mortgage/index.html` | Done |
| KeyBank workshop case study | `work/keybank-workshop/index.html` | Done |
| Robota case study | `work/robota/index.html` | Done |
| Cryptid Quest case study | `work/mappa-cryptid-quest/index.html` | Done |
| PetCo case study | `work/petco/index.html` | Done |
| About | `about.html` | Done |
| Illustration | `illustration.html` | Done — 32 plates |
| Development | `development.html` | Done — two playable games, one app coming soon |

Next-project chain: dashboard → design system → mortgage → workshop → Robota → Cryptid Quest → PetCo → dashboard.

## Design system

Defined in `styles/site.css` under `:root`. Do not hard-code these values.

**Color** — light base, dark punctuation.
- `--paper #f7f6f2` page base · `--white #ffffff` cards · `--ink #111114` dark bands
- `--lime #b8f04a` system accent. Fills and rules only — it never sets text (1.2:1 on paper)
- `--pink-text #c9146f` links on light · `--pink #ff48b1` accents on dark only
- `--peri #5b4fd6` secondary
- Contrast floor is AA. Every color pair on this site was checked.

**Type** — three families, no more.
- `--font` Space Grotesk — headings and body
- `--mono` Space Mono — labels, captions, metadata, eyebrows
- `--pixel` Silkscreen — wordmark only

**Chrome**
- Nav is dark glass: ink at 66%, 16px blur, deepens on scroll, lime hairline
- Footer is ink, centered
- Case study pages: dark hero + Fig. 00 diagram, lime outcome strip, sticky section nav

## Conventions that matter

- **"Cyberstar"** — lowercase s, always
- Images display at or below native width (`.figure .shell` caps at 44rem) so nothing upscales and blurs
- Everything zoomable opens in the lightbox; group with `data-group="…"`, caption with `data-caption="…"`
- Motion responds to the pointer. One orchestrated entrance maximum; no scroll-triggered fade-ins
- `prefers-reduced-motion` disables all of it
- Tall portrait mockups are constrained by height, not width (`.figure--phone`)
- No fabricated metrics anywhere. Unshipped work gets "anticipated impact" with a stated measurement plan
- **Rebuild diagrams, don't screenshot them.** Anything that's text or structure — HMWs, personas, flows,
  site maps, matrices, timelines — goes in markup using the components below. Screenshots are for real UI,
  photographs and artwork. Never upscale a low-res image; it can't gain detail, and text in it gets invented
- **`.sec p` greys every paragraph.** Any `<p>` placed on a dark background inside a case study must set its
  own colour, or it drops to about 2.85:1. This caught the dashboard problem statement once already
- Transparent source images (many AVIFs from the old site) must be saved as PNG with alpha. Converting to
  RGB fills transparency with black — this happened twice
- **Motion is content-driven and reduced-motion safe.** Every animation is either CSS (killed by the global
  rule in `site.css`) or checks `prefers-reduced-motion` in JS. Keep new motion tied to what a page is about
- Colour inside diagrams is checked: text on a coloured fill meets 4.5:1, white icons on a tile meet 3:1
- **Design system page icons are subset.** Its two Material Symbols links request only the 28 icons in use
  (`&icon_names=…`, alphabetical) at one instance (opsz 20, wght 400, FILL 0, GRAD 0). Add a new icon to the
  page and you must add its name to both links, or it renders as its raw word. Icons are decorative, so
  every icon span carries `aria-hidden="true"`

## Reusable components (in `site.css`)

**Original set:** `.cards`/`.card` project cards · `.compare` before/after tabs · `.statuses`/`.st` status
taxonomy rows · `.ramp` colour ramp strip · `.chart` native bar chart · `.pull` pull quote ·
`.insight` callout · `.stats` stat trio · `.gallery` thumbnail grid · `.lb` lightbox ·
`.tally` convergence bars · `.proto` embedded prototype frame

**Added during the fidelity pass** — each one replaced a screenshot somewhere, so there's a live example:

| Component | What it's for | Example |
|---|---|---|
| `.hmw` | Problem statement (dark callout) and numbered How Might We cards | Dashboard |
| `.hmw__grid--themes` | Same card grid relabelled "THEME 01"; set `--acc` per card | Robota, Cryptid Quest |
| `.persona` | Persona card: avatar, facts, tech literacy, pain points, goals. `--admin` switches accent | Dashboard |
| `.scope` | Columns of sorted items with counts. `--even` for equal widths; `__col--maybe/--out/--purple/--blue/--teal` | Dashboard, Cryptid Quest |
| `.matrix` | 2×2 assumption map, importance against evidence; `__q--leap` highlights the risky quadrant | Dashboard |
| `.swim` | Swimlane timeline, 17 week columns, scrolls inside its own frame with lane labels pinned | Mortgage |
| `.dt` | Process strip with drawn icons. `--full` with descriptions, `--mini` "you are here", `--four` for four phases | Workshop, Cryptid Quest |
| `.sheet` | Research worksheet: title, purpose, prompt boxes. Set `--n` for column count | Workshop |
| `.awards` | Award badges on ink | Robota |
| `.focus` | Non-sequential focus areas with icons (no connector, unlike `.dt`) | Cryptid Quest |
| `.venn` | Inline SVG framework diagram | Cryptid Quest |
| `.cardsort__pile` | The pile of cards from a card sort | Cryptid Quest |
| `.tree` | Site map as nested lists, three branch columns | Cryptid Quest |
| `.bp` | Service blueprint: stages across, lanes down, dashed lines between; `.bp__card--key` + `.bp__tag` mark key moments, matched by `.bp-out` cards | PetCo |
| `.persona--art` | Persona with an illustrated portrait as a side panel; add `--simple` when there's only facts and frustrations | PetCo |
| `.hmw__grid--tasks` | Card grid relabelled "TASK 01" for usability tasks | PetCo |
| `.feat` | A feature explained beside its looping prototype clip; clips use `data-loop` and play only on screen, never under reduced motion | PetCo |
| `.two-up--match` | Forces a pair of figures to one matched 3:4 frame | Cryptid Quest personas |
| `.flow` | Numbered flowchart with wrap-around arrows (in `robota.css`) | Robota |
| `.aurora` / `.aurora--soft` | Slow colour wash behind a section | Work, Illustration, Development, Resume, About |
| `.glass` | Frosted panel; only over an `.aurora` | Kind words cards |
| `.spec--glass` | Home portrait card in frosted glass over the liquid metal hero | Home |
| `.select-screen` | About art split into a still UI layer and an idling figure layer; they recombine into the original exactly | About |
| `.track--live` | Resume timeline that draws itself on scroll (`js/resume.js`); static and fully drawn without JS or under reduced motion | Resume |
| Attract mode | Game covers drift in slowly behind Play, pausing on hover (`development.css`) | Development |

**Liquid metal** — `js/liquid-metal.js`, a vanilla port of Paper Shaders (Apache-2.0), loaded only on
pages that use it. Rebuild from `entry.js` with esbuild if it changes.

- `.lm` + `[data-lm-hero]` — the home hero background
- `.lmb` + `[data-lm-btn]` — metallic ring on key buttons. Reserved: View project, Download the PDF,
  Play the game. Adding it everywhere cheapens it, and browsers cap WebGL contexts per page
- `.lmline` + `[data-lm-line]` — the chrome hairline under every case study hero

All three mount lazily, pause offscreen, render a still frame under reduced motion, and fall back to
a static lime-to-pink gradient without WebGL.

## Page-scoped stylesheets

`site.css` and `home.css` are shared. Three pages add their own on top:

- `styles/illustration.css` — plate rhythm, paper-edge padding, medium labels
- `styles/development.css` — project blocks, click-to-play poster over `.proto`
- `styles/robota.css` — full-bleed banner band, and `.flow` (see below)

`js/development.js` swaps a game's cover poster for its live iframe on click,
so two heavy game embeds don't load on page open.

## The .flow component

Built for the Robota case study: a flowchart in markup rather than a flat
image, so it stays sharp, selectable and screen-reader legible. Steps read
left to right in a three-column grid (two on tablet, one on phone). At the
end of a row the connector turns down and runs back to the first card of the
next row. Node type is carried by colour — lime start, periwinkle step, pink
input, ink decision, solid pink goal. Reusable for any other flow.

## Open items

**Source re-exports.** Every diagram is now markup; what remains soft needs the original files:
dashboard before screenshots, research boards, two workshop boards, options A–C and sketches ·
a real screenshot for the design system card (`assets/ds-cover.jpg`) · mortgage phone mockups, if
KeyBank files are still accessible · workshop photos from the original phone · Robota's Katerina
(Procreate), sketch scan, and 2× wireframe and usability exports · Cryptid Quest wireframes, UI change,
chat and tutorial screens at 2× · PetCo audit, iteration and hi-fi screens at 2×, if the Figma survives.

**Copy vs diagram mismatches found while rebuilding** (copy left unchanged, needs a decision):
the mortgage study says the control group had a "two-email cadence" but its map shows three emails;
it says phase three "handles expiration and renewal" but the map's phase 3 is SMS across all 17 weeks.


**Other items**

- Illustration: the numbered plates are ~900px web exports; originals would be sharper on retina.
  The four paintings are 1400px and visibly better
- Portrait background is lime; `assets/portrait-options/` holds peri, pink and ink alternates plus
  `_compare.png`. Swap by copying one over `assets/portrait.png`
- Reflections on the workshop, Robota and Cryptid Quest case studies were drafted, not written by
  Eva — review before relying on them
- ~70 unused CSS rules for a removed mockup remain in `styles/designsystem.css`

**Resolved:** the resume PDF now links to evaregelski.github.io (text, link and underline) · a
purpose-built 1200×630 share card (`assets/og-card.jpg`) with absolute `og:image` URLs on every page ·
the Robota Work-page card no longer shows the cut-off banner title.

## Publishing

Push to `main`, then Settings → Pages → Deploy from a branch → `main` / `/ (root)`.
No build step. For a custom domain add a `CNAME` file at the root.
