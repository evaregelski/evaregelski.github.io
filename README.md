# evaregelski.com

Static portfolio. No build step, no dependencies.

## Structure

```
index.html                              home — hero, selected work, about, contact
about.html  development.html  illustration.html    work.html
styles/
  site.css            shared: tokens, chrome, case-study components, lightbox
  home.css            home, about, and the Kind words testimonials
  illustration.css    scoped to the illustration page
  development.css     scoped to the development page
  robota.css          scoped to the Robota case study (incl. the .flow component)
  designsystem.css    scoped styles for the design-system case study only
js/
  site.js             nav, section nav, lightbox, before/after tabs
  development.js      click-to-play swap for the embedded games
  designsystem.js     tooltips, token copy, before/after switch on that page
assets/               shared images (portrait, favicon, row covers)
work/
  cyberstar-dashboard/        index.html + assets/
  cyberstar-design-system/    index.html
  keybank-mortgage/           index.html + assets/
  keybank-workshop/           index.html + assets/
  robota/                     index.html + assets/
```

## Running locally

Open `index.html`, or `python3 -m http.server 8000` for a local server.

## Publishing to GitHub Pages

1. Push to `main`.
2. Settings → Pages → Deploy from a branch → `main` / `/ (root)`.
3. Custom domain: add a `CNAME` file at the root and point a DNS CNAME at `<username>.github.io`.

## Adding a case study

Copy any folder under `work/`, keep the `<header>` and `<footer>` as-is, and update
the next-project link at the bottom of the previous study. Add a `<article class="row">`
to the Selected work section in `index.html`.

## Still to do

- Update the portfolio URL inside `assets/eva-regelski-resume.pdf` (currently
  the old Figma Sites address, in both the text and the embedded link)
- A 1200x630 social share image; `og:image` mostly points at a row cover
- Replace `assets/ds-cover.jpg` with a real export once the design system ships
