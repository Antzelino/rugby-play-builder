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

## Recent Improvements

- **Fixed animation replay bug**: Animation now properly resets state when replaying
- **Improved speed control**: Changed from "seconds per frame" to intuitive speed multiplier (0.5x - 3x)
- **Enhanced stability**: Added comprehensive edge case handling for all operations
- **Better UX**: Disabled controls during animation to prevent conflicts
- **Null safety**: Added checks to prevent crashes from missing players or keyframes

## Local Development

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm start
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

## Deploy to Netlify

### Option 1: Deploy via Git (Recommended)

1. Push this project to a GitHub/GitLab/Bitbucket repository
2. Log in to [Netlify](https://netlify.com)
3. Click "Add new site" → "Import an existing project"
4. Connect your Git provider and select the repository
5. Netlify will auto-detect the settings from `netlify.toml`
6. Click "Deploy site"

### Option 2: Deploy via Drag & Drop

1. Build the project locally:
```bash
npm run build
```

2. Go to [Netlify Drop](https://app.netlify.com/drop)
3. Drag and drop the `build` folder
4. Your site will be deployed instantly!

### Option 3: Deploy via Netlify CLI

1. Install Netlify CLI:
```bash
npm install -g netlify-cli
```

2. Build the project:
```bash
npm run build
```

3. Deploy:
```bash
netlify deploy --prod --dir=build
```

## Build Configuration

The project uses Create React App with the following configuration:

- **Build command**: `npm run build`
- **Publish directory**: `build`
- **Node version**: 18.x or higher (automatically detected)

These settings are defined in `netlify.toml` and will be automatically applied.

## Technologies Used

- React 18
- Tailwind CSS (via CDN)
- Lucide React (icons)
- HTML5 Canvas API

## Usage

1. **Add Players**: Click "Attacker" or "Defender" buttons to add players
2. **Position Players**: Click and drag players to position them
3. **Assign Ball**: Select a player and click "Give Ball"
4. **Create Keyframes**: Click "Add Keyframe" to create animation frames
5. **Animate**: Adjust speed and press Play to watch your play unfold

## License

MIT
