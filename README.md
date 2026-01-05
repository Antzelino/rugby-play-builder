# Rugby Play Builder

Interactive rugby play visualization and animation tool built with React and Vite.

## Quick start

1. Install dependencies:

```bash
npm install
```

2. Start local dev server:

```bash
npm run start
```

3. Build production assets (outputs `dist/`):

```bash
npm run build
```

4. Preview production build locally:

```bash
npm run preview
```

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

## Notes

- Tailwind CSS is built at compile time via PostCSS (no CDN in production).
- The project is configured to deploy the `dist/` folder to GitHub Pages via a GitHub Actions workflow.

## Scripts

- `npm run start` — start Vite dev server
- `npm run build` — build production assets to `dist/`
- `npm run preview` — locally preview the production build

## CI / GitHub Actions

- Workflow: `.github/workflows/deploy.yml`
- Uses Node.js 20 and `npm ci` to install dependencies, runs `npm run build`, and deploys `dist/` to `gh-pages`.

## Troubleshooting

- If the dev server fails, run `npm install` and retry `npm run start`.
- If CI fails on the runner, check Actions logs and ensure the workflow uses Node.js 20+.

## License

MIT
