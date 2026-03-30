# Portfolio Project - Copilot Instructions

This is a modern React portfolio built with Vite, Tailwind CSS, and Framer Motion.

## Project Setup

- **Framework**: React 19 with TypeScript
- **Build Tool**: Vite 8
- **Styling**: Tailwind CSS 4
- **Animations**: Framer Motion
- **CSS**: PostCSS with @tailwindcss/postcss

## Key Directories

- `src/components/` - Reusable React components
- `src/pages/` - Page components
- `src/assets/` - Images, fonts, and static files

## Development

- **Dev Server**: `npm run dev` - Start development server
- **Build**: `npm run build` - Create production build
- **Preview**: `npm run preview` - Preview production build

## Styling Details

- **Dark Theme**: `bg-gray-950` background with `text-gray-100` text
- **Font**: System UI font stack for smooth rendering
- **Layout**: Full-height responsive layout using Flexbox
- **Utilities**: All styling via Tailwind utility classes

## Component Patterns

- Use TypeScript interfaces for props
- Wrap animations with Framer Motion's `motion` components
- Define components in `src/components/` folder
- Export components as named exports
