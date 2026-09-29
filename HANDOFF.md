# Portfolio site — handoff notes

Everything needed to pick this up in a fresh conversation. Attach the whole
`portfolio-site` folder (or the zip), plus this file.

## Where things stand

| Page | File | Status |
|---|---|---|
| Home | `index.html` | Done — hero, work cards, about teaser, **Kind words**, contact |
| Work index | `work.html` | Done — five case studies |
| Dashboard case study | `work/cyberstar-dashboard/index.html` | Done |
| Design system case study | `work/cyberstar-design-system/index.html` | Done |
| KeyBank mortgage case study | `work/keybank-mortgage/index.html` | Done |
| KeyBank workshop case study | `work/keybank-workshop/index.html` | Done |
| Robota case study | `work/robota/index.html` | Done |
| About | `about.html` | Done |
| Illustration | `illustration.html` | Done — 32 plates |
| Development | `development.html` | Done — two playable games, one app coming soon |

Nothing is a stub any more. Next-project chain runs:
dashboard → design system → mortgage → workshop → Robota → dashboard.

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

## Reusable components (in `site.css`)

`.cards`/`.card` project cards · `.compare` before/after tabs · `.statuses`/`.st` status
taxonomy rows · `.ramp` color ramp strip · `.chart` native bar chart · `.pull` pull quote ·
`.insight` callout · `.stats` stat trio · `.gallery` thumbnail grid · `.lb` lightbox ·
`.tally` convergence bars · `.proto` embedded prototype frame

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

- **Resume link is stale.** `assets/eva-regelski-resume.pdf` points at
  `https://evaregelski.figma.site/` — both as visible text and as an embedded
  clickable link on the page. Update both and re-export once this is hosted.
- Design system card cover (`assets/ds-cover.jpg`) is still a generated brand
  graphic, not a screenshot of the rebranded Overview page
- `og:image` on most pages points at a row cover; a purpose-built 1200×630
  share card would be better
- Dashboard case study: the journey map is still a low-res crop
- Robota: two source files are cropped or low-res — the hackathon banner is
  missing the left edge of its title (cropped at source, so it's shown as the
  phone mockups only), and the illustration exports run ~900px
- Illustration: the numbered plates are ~900px web exports. Originals would be
  sharper on retina. The four paintings are 1400px and visibly better
- Portrait background is lime; `assets/portrait-options/` holds peri, pink and
  ink alternates plus `_compare.png`. Swap by copying one over `assets/portrait.png`
- Reflections on the workshop and Robota case studies were drafted, not written
  by Eva — review before they go public
- ~70 unused CSS rules for a removed mockup remain in `styles/designsystem.css`

## Publishing

Push to `main`, then Settings → Pages → Deploy from a branch → `main` / `/ (root)`.
No build step. For a custom domain add a `CNAME` file at the root.
