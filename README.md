# Gemma Guard Landing Page

Static marketing/demo site for **Gemma Guard**, built with plain HTML, CSS, and JavaScript for fast load times and easy GitHub Pages deployment.

## File structure

```text
.
├── index.html
├── styles.css
├── script.js
├── README.md
└── assets
    ├── favicon-gemma.ico
    ├── favicon.svg
    ├── gemma-guard-logo-removebg.png
    ├── logo.svg
    ├── og-image.jpg
    ├── og-image.svg
    └── screenshots
        ├── details-screen.svg
        ├── main-screen.svg
        ├── share-preview.svg
        └── warning-result.svg
```

## Run locally

Because this is a static site, you can use any simple local server.

### Option 1: Python

```bash
python3 -m http.server 4321
```

Then open [http://localhost:4321](http://localhost:4321).

### Option 2: Open directly

You can also open `index.html` in a browser, but a local server is recommended for the cleanest testing experience.

## Replace your real content

### 1. Video URL and GitHub URL

Edit [`script.js`](/Users/pavel/dev/gemma-guard-site/script.js):

```js
const SITE_CONFIG = {
  youtubeUrl: "YOUR_YOUTUBE_URL",
  githubUrl: "YOUR_GITHUB_URL",
  kaggleWriteupUrl: "YOUR_KAGGLE_WRITEUP_URL",
};
```

Use a normal YouTube watch URL or short `youtu.be` URL.

Use the Kaggle write-up URL for the project write-up link. The site copy keeps the
main hackathon attribution as the Google Gemma 4 Good Hackathon.

### 2. Logo

The site currently uses [`assets/gemma-guard-logo-removebg.png`](/Users/pavel/dev/gemma-guard-site/assets/gemma-guard-logo-removebg.png) in the header. If you want to swap it again later, update the `<img>` tag in [`index.html`](/Users/pavel/dev/gemma-guard-site/index.html).

### 3. App screenshots

Replace the files in [`assets/screenshots`](/Users/pavel/dev/gemma-guard-site/assets/screenshots) or update the image paths in [`index.html`](/Users/pavel/dev/gemma-guard-site/index.html).

Current files:

- `assets/screenshots/main-screen.webp`
- `assets/screenshots/warning-result.webp`
- `assets/screenshots/details-screen.webp`
- `assets/screenshots/share-preview.webp`

### 4. SEO and social metadata

Edit the `<head>` in [`index.html`](/Users/pavel/dev/gemma-guard-site/index.html) to update:

- page title
- meta description
- `og:url`
- `og:image`
- Twitter card image

The site currently points social metadata to [`assets/og-image.jpg`](/Users/pavel/dev/gemma-guard-site/assets/og-image.jpg).

### 5. Favicon

The site currently uses [`assets/favicon-gemma.ico`](/Users/pavel/dev/gemma-guard-site/assets/favicon-gemma.ico) as the favicon.

## Content checklist

These are the main items you still need to add and exactly where they go:

- `YOUR_YOUTUBE_URL` in [`script.js`](/Users/pavel/dev/gemma-guard-site/script.js)
- `YOUR_GITHUB_URL` in [`script.js`](/Users/pavel/dev/gemma-guard-site/script.js)
- `YOUR_KAGGLE_WRITEUP_URL` in [`script.js`](/Users/pavel/dev/gemma-guard-site/script.js)
- `YOUR_SITE_URL` in the Open Graph metadata in [`index.html`](/Users/pavel/dev/gemma-guard-site/index.html)
- Final logo file currently used by the site: [`assets/gemma-guard-logo-removebg.png`](/Users/pavel/dev/gemma-guard-site/assets/gemma-guard-logo-removebg.png)
- Final favicon currently used by the site: [`assets/favicon-gemma.ico`](/Users/pavel/dev/gemma-guard-site/assets/favicon-gemma.ico)
- Final social share image currently used by the site: [`assets/og-image.jpg`](/Users/pavel/dev/gemma-guard-site/assets/og-image.jpg)
- Main app screenshot currently used by the site: [`assets/screenshots/main-screen.webp`](/Users/pavel/dev/gemma-guard-site/assets/screenshots/main-screen.webp)
- Warning result screenshot currently used by the site: [`assets/screenshots/warning-result.webp`](/Users/pavel/dev/gemma-guard-site/assets/screenshots/warning-result.webp)
- Details screen screenshot currently used by the site: [`assets/screenshots/details-screen.webp`](/Users/pavel/dev/gemma-guard-site/assets/screenshots/details-screen.webp)
- Share preview screenshot currently used by the site: [`assets/screenshots/share-preview.webp`](/Users/pavel/dev/gemma-guard-site/assets/screenshots/share-preview.webp)
- Any final copy tweaks in [`index.html`](/Users/pavel/dev/gemma-guard-site/index.html) if you want to refine wording before launch

## Deploy to GitHub Pages

This project is already structured to work well as a GitHub Pages site because it has:

- no build step
- no backend
- no absolute asset paths
- no framework-specific configuration

### Deploy from the repository root

1. Create a GitHub repository and push these files.
2. Open the repository on GitHub.
3. Go to `Settings` → `Pages`.
4. Under `Build and deployment`, choose `Deploy from a branch`.
5. Select your default branch and the `/ (root)` folder.
6. Save the settings.

GitHub Pages will publish the site automatically.

## Editing notes

- Main page content and section copy live in [`index.html`](/Users/pavel/dev/gemma-guard-site/index.html).
- Styles live in [`styles.css`](/Users/pavel/dev/gemma-guard-site/styles.css).
- Editable external links and video configuration live in [`script.js`](/Users/pavel/dev/gemma-guard-site/script.js).
- Placeholder visuals live in [`assets`](/Users/pavel/dev/gemma-guard-site/assets).

## Accessibility and implementation notes

- Semantic sections, headings, lists, and figure captions are used throughout.
- The header is sticky and includes a keyboard-accessible mobile menu.
- Motion is intentionally subtle and respects `prefers-reduced-motion`.
- The YouTube embed uses the `youtube-nocookie.com` domain.
