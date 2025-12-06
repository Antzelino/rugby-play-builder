# Initial GitHub Pages Setup (ONE TIME ONLY)

## You only need to do this ONCE when first deploying

### Quick Setup (Automatic)

**Windows:**
Run `deploy-to-github.bat`

**Mac/Linux:**
Run `./deploy-to-github.sh`

### Manual Setup (5 Steps)

1. **Create GitHub Repository**
   - Go to github.com → New Repository
   - Name: `rugby-play-builder` (or your choice)
   - Make it **Public**
   - Click "Create repository"

2. **Update package.json**
   - Open `package.json` in the project root
   - Find: `"homepage": "https://YOUR-USERNAME.github.io/rugby-play-builder"`
   - Replace `YOUR-USERNAME` with your GitHub username
   - Save the file

3. **Initialize Git and Push**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/YOUR-USERNAME/rugby-play-builder.git
   git branch -M main
   git push -u origin main
   ```

4. **Install Dependencies**
   ```bash
   npm install
   ```

5. **Deploy**
   ```bash
   npm run deploy
   ```

6. **Visit Your Live App**
   Wait 1-2 minutes, then go to:
   ```
   https://YOUR-USERNAME.github.io/rugby-play-builder
   ```

## After Initial Setup

**You can delete this folder!** You won't need these scripts again.

To update your app in the future, just run:
```bash
npm run deploy
```

That's it!
