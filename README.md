# Portfolio - React + Vite + Tailwind CSS + Framer Motion

A modern, fast, and beautiful portfolio template built with cutting-edge technologies.

## Features

- ⚡ **Vite** - Lightning-fast build tool with HMR
- ⚛️ **React** - UI library for building interactive components
- 🎨 **Tailwind CSS** - Utility-first CSS framework
- ✨ **Framer Motion** - Animation library for smooth interactions
- 📁 **Clean Structure** - Organized folder layout with components, pages, and assets

## Project Structure

```
src/
├── components/     # Reusable React components
├── pages/          # Page components
├── assets/         # Images, fonts, and static files
├── App.tsx         # Main app component
├── main.tsx        # Entry point
└── index.css       # Global styles with Tailwind
```

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

### Build for Production

```bash
npm run build
```

The optimized build will be in the `dist/` folder.

## Technologies

- **React 19** - Component-based UI
- **TypeScript** - Type-safe JavaScript
- **Vite 8** - Next-generation frontend tooling
- **Tailwind CSS 4** - Utility-first CSS framework
- **Framer Motion** - React animation library
- **PostCSS** - CSS transformation tool

## Styling

The project uses Tailwind CSS for all styling. Global styles are defined in `src/index.css` and apply to:

- Dark background (`bg-gray-950`)
- Light text color (`text-gray-100`)
- Full height layout (`min-h-screen`)
- Smooth, system UI font stack

## Getting Started with Development

1. Create components in `src/components/`
2. Create pages in `src/pages/`
3. Add assets to `src/assets/`
4. Use Tailwind classes for styling
5. Use Framer Motion for animations

All changes will hot-reload automatically during development!
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
