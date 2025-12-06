# Rugby Play Builder

An interactive web application for creating and animating rugby plays with keyframe-based animation.

## Features

- Visual rugby field with accurate markings
- Add attackers and defenders
- Drag-and-drop player positioning
- Keyframe animation system with smooth transitions
- Ball possession tracking with smooth pass animations
- Adjustable animation speed (0.5x - 3x multiplier)
- Mobile and desktop responsive
- Robust edge case handling and error prevention

## Live Demo

Once deployed, your app will be available at:
```
https://antzelino.github.io/rugby-play-builder
```

## Quick Start

### First Time Setup (ONE TIME ONLY)

See the `setup-once` folder for initial deployment to GitHub Pages.

**Quick version:**
1. Create a public GitHub repository
2. Update `homepage` in `package.json` with your username
3. Run the setup script in `setup-once` folder
4. Your app goes live!

### Local Development

1. Install dependencies:
```bash
npm install
```

2. Start development server:
```bash
npm start
```
(Note: If port 3000 is taken, see `.env.example` for how to use a different port)

3. Open [http://localhost:3000](http://localhost:3000) in your browser

### Deploy Updates

After making changes to your app:

```bash
npm run deploy
```

That's it! Your changes will be live in 1-2 minutes.

## Project Structure

```
rugby-play-builder/
├── setup-once/          # Initial deployment scripts (use once, then delete)
├── public/              # Static files
│   └── index.html       # HTML template
├── src/                 # Source code
│   ├── App.js           # Main app component
│   ├── index.js         # Entry point
│   └── index.css        # Styles (including slider styles)
├── .env.example         # Example environment variables
├── .gitignore           # Git ignore rules
├── package.json         # Project config & dependencies
└── README.md            # This file
```

## Technologies Used

- React 18
- Tailwind CSS (via CDN)
- Lucide React (icons)
- HTML5 Canvas API
- GitHub Pages (hosting)

## Usage

1. **Add Players**: Click "Attacker" or "Defender" buttons to add players
2. **Position Players**: Click/tap and drag players to position them
3. **Assign Ball**: Select a player and click "Give Ball"
4. **Create Keyframes**: Click "Add Keyframe" to create animation frames
5. **Animate**: Adjust speed and press Play to watch your play unfold!

## Available Commands

- `npm start` - Start development server
- `npm run build` - Create production build
- `npm run deploy` - Deploy to GitHub Pages
- `npm test` - Run tests (if any)

## Troubleshooting

### Port 3000 Already in Use
Copy `.env.example` to `.env` and set a different port:
```
PORT=3001
```

### localStorage Error on Startup
The project is configured to handle Node.js 22+ localStorage requirements.
If you still see errors, make sure you ran `npm install` to get all dependencies.

### Slider Track Not Visible
Try:
1. Hard refresh (Ctrl+Shift+R or Cmd+Shift+R)
2. Clear browser cache
3. Try a different browser

### Changes Not Showing After Deploy
1. Wait 2 minutes for GitHub Pages to update
2. Hard refresh your browser
3. Clear browser cache

## License

MIT
