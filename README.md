# Eugeniu Girla - The Builder's Odyssey

Interactive CV / personal site for Eugeniu Girla.

This is a static site with no build step. Cloudflare Pages can deploy it directly from the repository root.

## Files

- `index.html` - live homepage, currently the v2 interactive Odyssey CV
- `v2.html` - same v2 version kept as a named reference
- `assets/aegean-journey-map.png` - visual map asset used by the site

## Local Preview

```bash
python3 -m http.server 8000
```

Then open:

```text
http://localhost:8000
```

## Cloudflare Pages

Use these settings:

- Framework preset: None
- Build command: leave empty
- Build output directory: `/`
- Root directory: `/`

The site is plain HTML/CSS/JS and can also be hosted on GitHub Pages, Netlify, or any static host.
