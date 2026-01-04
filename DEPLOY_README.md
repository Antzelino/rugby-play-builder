# Quick GitHub Pages Deployment

## Automated Deployment (Easiest)

### For Windows:
1. Open Command Prompt in the project folder
2. Run: `deploy-to-github.bat`
3. Follow the prompts

### For Mac/Linux:
1. Open Terminal in the project folder
2. Run: `./deploy-to-github.sh`
3. Follow the prompts

The script will:
- Ask for your GitHub username
- Ask for your repository name
- Update package.json automatically
- Install dependencies
- Create Git repository
- Push to GitHub
- Deploy to GitHub Pages

## Manual Deployment

See the full guide: `GITHUB_PAGES_DEPLOY.md`

````markdown
# GitHub Pages Deployment (consolidated)

This document contains both the automated and manual instructions for deploying the app to GitHub Pages. If you only need quick steps, follow the "Automated" section below. For the one-time initial setup scripts, see the `setup-once/` folder.

## Automated Deployment (recommended)

### Windows
1. Open Command Prompt in the project folder
2. Run:

```powershell
deploy-to-github.bat
```

Follow the prompts.

### macOS / Linux
1. Open Terminal in the project folder
2. Run:

```bash
./deploy-to-github.sh
```

Follow the prompts.

What the automated scripts do
- Prompt for your GitHub username and repository name
- Update the `homepage` field in `package.json` (if requested)
- Install dependencies (`npm install`)
- Initialize and push a Git repository (if not already)
- Build the app and deploy the `build/` directory to GitHub Pages using `gh-pages`

## Manual Deployment (step-by-step)

1. Create a public GitHub repository (or use an existing one).
2. Update `package.json` `homepage` to:

```
https://YOUR-USERNAME.github.io/YOUR-REPO-NAME
```

3. Build the app:

```bash
npm install
npm run build
```

4. Deploy using `gh-pages` (already configured in `package.json`):

```bash
npm run deploy
```

If you prefer to create a gh-pages branch manually, follow the standard GitHub Pages workflow: commit the `build/` output to the branch configured for Pages.

## One-time initial setup (optional)

If you prefer guided initial setup, the `setup-once/` folder contains helper scripts and `INITIAL_SETUP.md` with a manual walkthrough. That folder is intended to be used once and can be removed or archived after initial deployment.

Files of interest:
- `deploy-to-github.bat` — Windows automated deploy script (root)
- `deploy-to-github.sh` — macOS/Linux automated deploy script (root)
- `setup-once/deploy-to-github.bat` and `setup-once/deploy-to-github.sh` — legacy/one-time copies
- `package.json` — `homepage`, `predeploy` and `deploy` scripts are already configured

## After deployment

- The app will be reachable at the `homepage` URL from `package.json`.
- If changes do not appear immediately, wait a minute then hard-refresh the page.

## Troubleshooting

- If `npm run deploy` fails due to auth, ensure your Git credentials are set up and you have push access to the repository.
- If you want to remove the one-time `setup-once/` folder after use, it's safe to delete or archive it.

## Update your app

After making changes locally, run:

```bash
npm run deploy
```

````
