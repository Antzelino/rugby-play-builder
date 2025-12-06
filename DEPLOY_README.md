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

## Your Live App

After deployment, your app will be available at:
```
https://YOUR-USERNAME.github.io/YOUR-REPO-NAME
```

## Update Your App

Whenever you make changes:
```bash
npm run deploy
```

That's it!
