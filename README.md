# Eugeniu Girla — An Odyssey in Five Landfalls

An interactive CV / personal site. Twenty years of building, charted as a voyage across five landfalls
(The Early Waters → GAUS Algorithm → XOR.ai → Index.dev → MIND), with a classic printable CV view.

- **Single file, zero build.** Everything lives in [`index.html`](index.html) — HTML, CSS and vanilla JS.
  No framework, no bundler, no dependencies (fonts load from Google Fonts).
- **Two modes:** *The Chart* (explore islands on a nautical map) and *The Crossing* (a linear timeline).
- **View / Download CV** opens a clean, print-ready CV you can save as PDF from the browser.

## Run locally

Just open the file:

```bash
open index.html        # macOS
```

Or serve it (any static server works):

```bash
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Deploy

This is a static site — `index.html` at the repo root is all that's served. It works on Cloudflare Pages,
GitHub Pages, Netlify, or any static host. See deployment steps in the project notes.

## License

Personal CV content © Eugeniu Girla. Code free to reuse.
