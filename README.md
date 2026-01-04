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

Once deployed, your app will be available at your GitHub Pages URL (set in `package.json` `homepage`).

## Deployment

This project is intended to be hosted on GitHub Pages. No local deploy scripts are required — GitHub Pages can serve the built output. To publish manually:

1. Build the app:

```bash
npm install
npm run build
```

2. Push the repository to GitHub and enable GitHub Pages in your repository settings (choose a branch/folder to serve from).

## Quick Start (Local Development)

1. Install dependencies:
```bash
npm install
```

2. Start development server:
```bash
npm start
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

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
