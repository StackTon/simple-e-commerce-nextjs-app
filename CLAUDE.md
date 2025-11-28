# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js 16 e-commerce application using the App Router, React 19, TypeScript, and Tailwind CSS v4. The project is in early development with a clean, minimal structure.

## Development Commands

```bash
# Development
npm run dev              # Start dev server at http://localhost:3000

# Building
npm run build            # Build production bundle
npm start                # Start production server

# Linting
npm run lint             # Run ESLint
npm run lint:fix         # Run ESLint with auto-fix
```

## Code Quality Configuration

The project uses strict TypeScript and ESLint configurations:

- **TypeScript**: Strict mode enabled with ES2017 target
- **ESLint**: Uses flat config (eslint.config.mjs) with:
  - `typescript-eslint` strict and stylistic type-checked configs
  - Next.js core web vitals and TypeScript configs
  - Prettier integration for formatting
- **Prettier**: Single quotes, no semicolons, 2-space indentation, with Tailwind CSS plugin for class sorting

## Architecture

- **Framework**: Next.js 16 with App Router
- **Path Aliases**: `@/*` maps to project root
- **Fonts**: Uses next/font with Geist Sans and Geist Mono
- **Styling**: Tailwind CSS v4 with PostCSS
- **Structure**: Currently minimal with `app/` directory containing layout.tsx and page.tsx

## Important Configuration Details

- ESLint ignores: `.next/`, `out/`, `build/`, `.d.ts` files, and `.mjs` config files
- TypeScript uses JSX transform (`jsx: "react-jsx"`) - React imports not required
- Project uses `projectService` for TypeScript-ESLint parser for better performance
