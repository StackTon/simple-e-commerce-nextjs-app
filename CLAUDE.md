# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a fully-featured Next.js 16 e-commerce application named "ShopHub" using the App Router, React 19, TypeScript, and Tailwind CSS v4. The application includes product listing, search, filtering, shopping cart with persistence, and a comprehensive component architecture.

## Key Features

- **Product Management**: Product listing with pagination, search (debounced), and category filtering
- **Shopping Cart**: Full cart system with add/remove/update functionality and localStorage persistence
- **Product Details**: Dynamic product pages with image galleries and detailed information
- **User Feedback**: Toast notification system for user actions
- **State Management**: React Context API for cart and toast notifications
- **Data Source**: DummyJSON API for product data
- **Responsive Design**: Mobile-first design with Tailwind CSS

## Development Commands

```bash
# Development
npm run dev              # Start dev server at http://localhost:3000

# Building
npm run build            # Build production bundle
npm start                # Start production server

# Type Checking & Linting
npm run type-check       # Run TypeScript type checking
npm run lint             # Run ESLint
npm run lint:fix         # Run ESLint with auto-fix
npm run verify           # Run lint + type-check + build (full verification)
```

## Code Quality Configuration

The project uses strict TypeScript and ESLint configurations:

- **TypeScript**: Strict mode enabled with ES2017 target, using JSX transform (`jsx: "react-jsx"`)
- **ESLint**: Uses flat config (eslint.config.mjs) with:
  - `typescript-eslint` strict and stylistic type-checked configs
  - Next.js core web vitals and TypeScript configs
  - Prettier integration for formatting
  - `projectService` for better performance
- **Prettier**: Single quotes, no semicolons, 2-space indentation, with Tailwind CSS plugin for class sorting

## Architecture

### Framework & Routing

- **Framework**: Next.js 16.0.5 with App Router
- **React**: 19.2.0 with Server Components
- **Routing**:
  - Home page: `/` (product listing)
  - Product details: `/products/[id]` (dynamic route)
  - Cart: `/cart`
  - Error handling: `error.tsx`, `not-found.tsx`
  - Loading states: `loading.tsx`

### Project Structure

```
app/
├── cart/page.tsx              # Shopping cart page
├── products/[id]/            # Dynamic product detail pages
│   ├── page.tsx
│   └── not-found.tsx
├── layout.tsx                 # Root layout with providers
├── page.tsx                   # Home page (product listing)
├── error.tsx                  # Error boundary
├── loading.tsx                # Loading state
└── not-found.tsx              # 404 page

components/
├── cart/                      # Cart-related components
│   ├── CartIcon.tsx          # Header cart icon with badge
│   ├── CartItem.tsx          # Individual cart item
│   └── CartSummary.tsx       # Order summary
├── error/
│   └── ErrorBoundary.tsx     # Error boundary component
├── layout/
│   └── Header.tsx            # Site header with navigation
├── products/                  # Product components
│   ├── ProductCard.tsx       # Product card for grid
│   ├── ProductGrid.tsx       # Grid layout
│   ├── ProductFilters.tsx    # Category filtering
│   ├── ProductDetailActions.tsx
│   ├── QuantitySelector.tsx
│   └── AddToCartButton.tsx
└── ui/                        # Reusable UI components
    ├── SearchBar.tsx         # Debounced search
    ├── Pagination.tsx        # Page navigation
    ├── Loading.tsx           # Loading spinner
    ├── ErrorMessage.tsx      # Error display
    └── Toast.tsx             # Toast notifications

contexts/
├── CartContext.tsx            # Global cart state management
└── ToastContext.tsx           # Toast notification system

hooks/
└── useDebounce.ts            # Custom debounce hook

lib/
├── api/
│   └── products.ts           # API functions for DummyJSON
├── utils/
│   ├── cart.ts               # Cart calculation utilities
│   ├── format.ts             # String formatting utilities
│   ├── storage.ts            # localStorage wrapper
│   └── validation.ts         # Runtime validation (no Zod)
└── constants.ts              # Application constants

types/
├── product.ts                # Product type definitions
├── cart.ts                   # Cart type definitions
├── api.ts                    # API response types
└── index.ts                  # Type exports
```

### State Management

- **Cart State**: React Context API with localStorage persistence
- **Toast Notifications**: React Context API for global notifications
- **Server State**: Next.js data fetching with ISR (Incremental Static Regeneration)
- **No external state library**: Uses built-in React features only

### Data Flow

- **API Integration**: DummyJSON API via native fetch with Next.js caching
- **Runtime Validation**: Custom validation functions (no Zod dependency)
- **Type Safety**: Strict TypeScript + runtime checks for API responses
- **Persistence**: localStorage for cart state (hydration-safe)

### Configuration Details

- **Path Aliases**: `@/*` maps to project root
- **Fonts**: Uses next/font with Geist Sans and Geist Mono
- **Styling**: Tailwind CSS v4 with PostCSS
- **Images**: Next.js Image component with remote patterns configured for:
  - `cdn.dummyjson.com`
  - `dummyjson.com`
- **Next Config**: TypeScript config file (`next.config.ts`)
- **ESLint**: Flat config that ignores `.next/`, `out/`, `build/`, `.d.ts` files
- **React Import**: Not required (uses JSX transform)

## Development Guidelines

### Component Patterns

- **Server Components**: Used by default for pages that fetch data (home, product details)
- **Client Components**: Marked with `'use client'` for interactive features (cart, forms, buttons)
- **Separation**: Clear separation between server and client components

### Code Style

- No semicolons (enforced by Prettier)
- Single quotes for strings
- 2-space indentation
- Tailwind classes sorted automatically
- Strict TypeScript mode - no implicit any

### Best Practices

- Always validate API responses at runtime
- Use TypeScript for compile-time type safety
- Prefer Server Components unless interactivity is needed
- Keep components focused and single-purpose
- Use custom hooks for reusable logic
- Handle loading and error states explicitly
