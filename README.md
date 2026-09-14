# 🎮 Mini Games Collection

Website collection dari 6 minigames klasik yang dibangun menggunakan **React**, **Vite**, **TypeScript**, dan **Shadcn UI**.

![Games Preview](https://img.shields.io/badge/Games-6-blue) ![TypeScript](https://img.shields.io/badge/TypeScript-5.5-blue) ![React](https://img.shields.io/badge/React-18.3-blue) ![Vite](https://img.shields.io/badge/Vite-5.3-purple)

## 🎯 Features

- ✅ **6 Classic Games** - Memory Card, Tic Tac Toe, Typing Game, 2048, Flappy Bird, Minesweeper
- 🎨 **Modern UI** - Built with Shadcn UI dan Tailwind CSS
- 🌓 **Dark/Light Mode** - Theme switching support
- 💾 **Local Storage** - High scores saved locally
- 📱 **Responsive Design** - Works on mobile, tablet, and desktop
- ⚡ **Fast Performance** - Powered by Vite
- 🎮 **No Backend Required** - Pure client-side application

## 🎮 Games

### 1. 🃏 Memory Card (Easy)

Match pairs of cards to test your memory. Features:

- 4x4 grid (16 cards)
- Move counter and timer
- Score based on moves and time
- Confetti celebration on win

### 2. ⭕ Tic Tac Toe (Easy)

Classic X and O game against unbeatable AI. Features:

- Minimax algorithm AI
- Score tracking (wins/losses/draws)
- Winning line animation
- Player vs AI

### 3. ⌨️ Typing Game (Medium)

Test your typing speed and accuracy. Features:

- 3 difficulty levels (Easy, Medium, Hard)
- Real-time WPM calculation
- Accuracy percentage tracking
- 60-second timer
- Character-by-character highlighting

### 4. 💣 Minesweeper (Medium)

Find all mines without triggering them. Features:

- 3 difficulty levels (Beginner, Intermediate, Expert)
- First click always safe
- Flag system (right-click)
- Timer
- Number indicators

### 5. 🔢 2048 (Hard)

Slide tiles to reach the 2048 tile. Features:

- 4x4 grid with smooth animations
- Arrow key controls (desktop)
- Touch controls (mobile)
- Score and best score tracking
- Color-coded tiles

### 6. 🐦 Flappy Bird (Hard)

Navigate through pipes without crashing. Features:

- Realistic gravity physics
- Collision detection
- Score counter
- Click/tap/spacebar controls
- Smooth 60 FPS gameplay

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. Clone the repository

```bash
git clone <repository-url>
cd minigames
```

2. Install dependencies

```bash
npm install
```

3. Run development server

```bash
npm run dev
```

4. Open browser at `http://localhost:5173`

## 📦 Build for Production

```bash
npm run build
```

The built files will be in the `dist` folder, ready for deployment.

## 🛠️ Tech Stack

### Core

- **React 18.3** - UI library
- **TypeScript 5.5** - Type safety
- **Vite 6.4** - Build tool and dev server

### Styling

- **Tailwind CSS 3.4** - Utility-first CSS
- **Shadcn UI** - High-quality React components
- **Lucide React** - Icon library

### Routing & State

- **React Router 6** - Client-side routing
- **React Hooks** - State management
- **Context API** - Theme management

### Utilities

- **canvas-confetti** - Celebration effects
- **clsx** - Conditional classnames
- **tailwind-merge** - Merge Tailwind classes

## 📁 Project Structure

```
minigames/
├── src/
│   ├── components/
│   │   ├── ui/              # Shadcn UI components
│   │   └── layout/          # Header, Footer, GameCard
│   ├── games/
│   │   ├── memory-card/
│   │   ├── tic-tac-toe/
│   │   ├── typing-game/
│   │   ├── game-2048/
│   │   ├── flappy-bird/
│   │   └── minesweeper/
│   ├── pages/               # Home, NotFound
│   ├── hooks/               # useLocalStorage, useGameScore
│   ├── context/             # ThemeContext
│   ├── lib/                 # utils
│   ├── types/               # TypeScript types
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── public/
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
├── tailwind.config.js
└── components.json
```

## 🎯 Game Logic Highlights

### Memory Card

- **Fisher-Yates shuffle** untuk randomize cards
- State management untuk flipped cards
- Automatic flip-back dengan timeout

### Tic Tac Toe

- **Minimax algorithm** untuk unbeatable AI
- Recursive win condition checking
- Optimal move calculation

### Typing Game

- **WPM calculation**: `(characters / 5) / (time in minutes)`
- Real-time accuracy tracking
- Character-by-character comparison

### 2048

- Grid rotation untuk unified move logic
- Tile merge dengan animation
- Game over detection (no valid moves)

### Flappy Bird

- **RequestAnimationFrame** untuk smooth 60 FPS
- Gravity physics dengan velocity
- AABB collision detection

### Minesweeper

- Recursive cell reveal untuk empty cells
- Adjacent mine counting algorithm
- First click safety guarantee

## 🌐 Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import repository in Vercel
3. Deploy automatically

### Netlify

1. Push to GitHub
2. Connect repository in Netlify
3. Build command: `npm run build`
4. Publish directory: `dist`

### GitHub Pages

1. Install gh-pages: `npm install -D gh-pages`
2. Add to package.json:
   ```json
   "scripts": {
     "predeploy": "npm run build",
     "deploy": "gh-pages -d dist"
   }
   ```
3. Run: `npm run deploy`

## 💾 Local Storage

The application stores the following data in browser's localStorage:

- Theme preference (light/dark)
- High scores for each game
- Game metadata (moves, time, accuracy)

All data is stored locally and never leaves your browser.

## 🎨 Customization

### Changing Theme Colors

Edit `tailwind.config.js` and `src/index.css` to customize the color scheme.

### Adding New Games

1. Create new folder in `src/games/`
2. Implement game component and logic hook
3. Add route in `src/App.tsx`
4. Add game info to `src/pages/Home.tsx`

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🤝 Contributing

Contributions are welcome! Feel free to:

- Report bugs
- Suggest new features
- Submit pull requests

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👨‍💻 Author

Built with ❤️ using React, Vite, and Shadcn UI.

## 🙏 Acknowledgments

- [Shadcn UI](https://ui.shadcn.com) - For amazing React components
- [Lucide](https://lucide.dev) - For beautiful icons
- [Tailwind CSS](https://tailwindcss.com) - For utility-first CSS

---

**Enjoy the games! 🎮✨**
