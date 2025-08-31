# Time Farm Landing

Static landing page for the Time Farm app. No build step required — open `index.html` directly or serve the folder with any static host.

## Replace the placeholders

Drop your final screenshots into `assets/` using the same file names to instantly update the page:

- `assets/feature-hero.svg` — hero image
- `assets/feature-1.svg` — Get a new pet for completed tasks
- `assets/feature-2.svg` — Delightful focus timer
- `assets/feature-3.svg` — Unlock pets. Grow your farm.
- `assets/feature-4.svg` — Track your progress
- `assets/feature-5.svg` — Widgets keep you focused
- `assets/og-cover.svg` — Open Graph preview (1200x630)
- `assets/favicon.svg` — Favicon

You can swap any of these for PNG/JPG files — just keep the same names and extensions referenced in `index.html`.

## Customize copy & links

- Update headlines and body copy in `index.html`.
- Replace the App Store badge/link in the Download section once the app is live.
- The waitlist form in `script.js` is client‑side only. When ready, POST to your provider (Formspree/ConvertKit/etc.).

## Local preview

Open `index.html` in a browser, or run a simple static server:

```
python3 -m http.server 8000
```

Then visit http://localhost:8000.

## Deploy

Any static host works (GitHub Pages, Netlify, Vercel, Cloudflare Pages). Just publish the folder contents.

