npm start
```

3. Open http://localhost:3000 in your browser.

## Build (production)

Create an optimized production build:

```bash
npm run build
```

# Rugby Play Builder

Simple React app built with Vite and deployed to GitHub Pages.

## Quick start
- Install dependencies: `npm install`
- Local dev server: `npm run start` (Vite)
- Build production assets: `npm run build` (outputs `dist/`)
- Preview production build locally: `npm run preview`

The production build is written to `dist/`.

## Deployment
This repository uses a GitHub Actions workflow (.github/workflows/deploy.yml) that builds the app and deploys the `dist/` folder to the `gh-pages` branch. The CI workflow uses `npm ci` and Node.js 20.

You can also build locally (`npm run build`) and publish `dist/` via GitHub Pages or another host.

## Project structure
```
rugby-play-builder/
├── .github/                  # CI workflow (auto-deploy)
├── dist/                     # Generated production build (output of `npm run build`)
├── src/                      # Source code
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html                # Vite root HTML
├── package.json
├── vite.config.js
├── postcss.config.cjs
├── tailwind.config.cjs
└── README.md
```

Notes:
- Tailwind CSS is built at compile time via PostCSS (no CDN in production).

## Scripts
- `npm run start` — start Vite dev server
- `npm run build` — build production assets to `dist/`
- `npm run preview` — locally preview the production build

## CI / GitHub Actions
- Workflow: `.github/workflows/deploy.yml`
- Uses Node.js 20 and `npm ci` to install dependencies, runs `npm run build`, and deploys `dist/` to `gh-pages`.

## Troubleshooting
- If the dev server fails, run `npm install` and retry `npm run start`.
- If CI fails on the runner, ensure the workflow uses Node.js 20+.

## License
MIT
