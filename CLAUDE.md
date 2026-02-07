# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Quick Start Commands

### Development & Building
- **Start dev server**: `npm run dev` (opens in browser, hot reload enabled)
- **Build for production**: `npm run prod` (minified output to `dist/`)
- **Build and serve locally**: `npm run serve`

### Project Info
- **Framework**: TypeScript + Webpack 5 + Redom (lightweight DOM library)
- **Entry point**: `src/index.ts`
- **Output**: `dist/` (cleaned on every build)
- **Source maps**: Inline in dev, external file in production

## Architecture Overview

### High-Level Structure
This is a puzzle game ("Deadly Affection") built as a single-page application with the following layer structure:

```
index.ts (entry point, intro animation, canvas fireflies)
├── systems/  (core game logic and state)
├── screens/  (UI views: game board, levels menu)
├── entities/ (game objects: blocks, tunnels, collectables, etc.)
├── components/ (reusable UI: buttons, modals, settings toggles)
├── data/     (level definitions)
├── helpers/  (utilities: SVG definitions, math helpers)
└── assets/   (images, audio, manifest, robots.txt)
```

### Key Systems

**State Management** (`src/systems/state.ts`):
- Central `state` object persists to localStorage every 5 seconds
- Tracks: current level, progress, sound preference, wallet connection, NFT data, theme colors
- Type: `State` interface with properties like `progress: { [key: number]: [boolean, number] }` (level completion + score)

**Game System** (`src/systems/game.ts`):
- Initializes header (settings, links), game container, and screen switching
- Manages theme colors via CSS variables (`--bg`, `--color`, `--shadow`)
- Integrates with Arcadians NFT contract for custom themes
- Handles responsive scaling with `getScale()` function

**Play System** (`src/systems/play.ts`):
- Loads level data and creates entity instances on the board
- Manages cell grid and collision/interaction logic
- Handles win/lose screens and level progression

**Audio System** (`src/components/music.ts`):
- Uses Howler.js for sound management
- Integrates ZzFX (procedural sound generation)
- Toggle-able via settings

### Entity System
Game objects inherit from `Base` class (`src/entities/base.ts`). Each entity type handles:
- Rendering (Redom elements)
- Click/tap interactions
- Collision detection
- State updates

Common entities: `Block`, `Start`, `End`, `Tunnel`, `Split`, `TurnOneSide`, `TurnTwoSides`, `Collectable`

### UI Components
Built with **Redom** (lightweight DOM library). Key components:
- `Button`: Simple button with callback
- `Modal`: Overlay dialog with buttons
- `Screens`: Screen switching system
- `ToggleSetting`: Toggles stored in state
- `LinkSetting`: External links or callbacks in header
- `ExternalLink`: Links component

### Canvas & Animation
- Intro screen: Animated SVG necromancer and fairy characters with staggered reveal
- Background: Canvas element with procedurally moving fireflies that change color with theme
- Firefly class defined inline in `src/index.ts` with simple physics (position, velocity, angular movement)

### Build Configuration
- **Webpack 5** with dev and production configs
- Assets copied: audio, images, manifest.json, service-worker.js
- Styles: SCSS compiled to inline CSS via style-loader
- TypeScript target: ES5 (for broad browser support)
- PWA support: Service worker registration in index.ts

## File Organization

### `src/systems/`
Core game logic: state, game initialization, level play, audio playback, procedural audio generation (zzfx)

### `src/screens/`
Full-page UI views: game board screen, levels menu screen

### `src/entities/`
Puzzle board entities: clickable/interactable objects with rendering and behavior

### `src/components/`
Reusable UI elements: buttons, modals, toggles, links, screens manager

### `src/helpers/`
Utilities: SVG definitions (in `svgs.ts`), math functions, DOM utilities

### `src/data/`
Level definitions as nested arrays (board dimensions, entity positions)

### `src/assets/` & `src/audio/`
Static files (images, sounds) bundled by webpack

## Important Details

### State Persistence
- Auto-saves to localStorage key `'deadly-affection'` every 5 seconds
- Also saves on page unload (`beforeunload` event)
- Load on app start via `initGameState()`

### Web3 Integration
- Wallet connection via ethers.js (declared in window globals)
- Arcadians NFT contract at `0xc3c8a1e1ce5386258176400541922c414e1b35fd` on Mainnet
- Moralis API for fetching user NFTs (API key in game.ts)
- Theme customization by picking NFT artwork

### Responsive Design
- Game scales via `getScale()` formula: `Math.min(width/400, height/800)`
- CSS custom properties for theme colors
- Canvas resizes on window resize

### PWA Support
- Service worker registration in index.ts (commented code for Workbox in webpack.prod.js)
- manifest.json and robots.txt included
- Installable via browser's "install app" prompt

## Development Tips

- **CSS**: Edit `src/style.scss` - auto-reloads in dev
- **Level editing**: Modify arrays in `src/data/levels.ts`
- **Entity behavior**: Each entity class has `render()` and interaction handlers
- **Audio**: Sound enums defined in `components/music.ts`, referenced by level logic
- **SVG assets**: Centralized in `helpers/svgs.ts`, use `getSVGElement()` to get copies
- **Testing theme colors**: Use browser console to set CSS vars: `document.documentElement.style.setProperty('--bg', '#...')`
