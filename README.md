# 🛒 ShopHub - Modern E-Commerce Application

A fully-functional e-commerce web application built with Next.js 16, React 19, TypeScript, and Tailwind CSS v4. This project demonstrates modern web development practices with server-side rendering, client-side interactivity, and a clean, maintainable architecture.

## 🌐 Live Demo

**Deployed on Vercel:** [Coming Soon - Add your URL here]

---

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Architecture](#-architecture)
- [Getting Started](#-getting-started)
- [Project Structure](#-project-structure)
- [Thought Process & Trade-offs](#-thought-process--trade-offs)
- [Known Limitations](#-known-limitations)
- [Future Improvements](#-future-improvements)

---

## ✨ Features

### Core Functionality
- **Product Listing**: Browse 20 products per page with pagination
- **Search**: Real-time search with 300ms debounce for optimal performance
- **Category Filtering**: Dynamic category filtering from API
- **Product Details**: Comprehensive product pages with image galleries
- **Shopping Cart**: Full cart management with add, remove, and update quantity
- **Cart Persistence**: Cart state persists using localStorage
- **Responsive Design**: Mobile-first design that works on all devices

### Additional Features
- ⭐ Product ratings and reviews
- 💰 Discount calculations and display
- 📦 Stock availability tracking
- 🔢 Minimum order quantity enforcement
- 🔔 Toast notifications for user actions
- 🎨 Clean, modern UI with Tailwind CSS
- ♿ Accessibility features (ARIA labels, semantic HTML)
- 🔒 XSS protection with input sanitization
- ⚡ ISR (Incremental Static Regeneration) for optimal performance

---

## 🛠️ Tech Stack

### Frontend
- **Next.js 16** - React framework with App Router
- **React 19** - Latest React with Server Components
- **TypeScript** - Type-safe development
- **Tailwind CSS v4** - Utility-first CSS framework

### State Management
- **React Context API** - For global cart state
- **localStorage** - For cart persistence

### API
- **DummyJSON API** - Mock e-commerce data source
- **Native Fetch API** - With Next.js caching and revalidation

### Developer Tools
- **ESLint** - Code linting with Next.js and TypeScript configs
- **Prettier** - Code formatting with Tailwind CSS class sorting
- **TypeScript Strict Mode** - Maximum type safety

---

## 🏗️ Architecture

### Design Patterns

#### 1. **Layered Architecture**
```
┌─────────────────────────────────────┐
│         UI Layer (Pages)            │  ← Server/Client Components
├─────────────────────────────────────┤
│      Component Layer (UI)           │  ← Reusable components
├─────────────────────────────────────┤
│    Business Logic (Contexts)        │  ← State management
├─────────────────────────────────────┤
│       Utility Layer (Utils)         │  ← Helper functions
├─────────────────────────────────────┤
│        API Layer (lib/api)          │  ← Data fetching
└─────────────────────────────────────┘
```

#### 2. **Server vs Client Components**
- **Server Components**: Pages that fetch data (home, product details)
- **Client Components**: Interactive UI (cart, forms, buttons)
- **Benefits**: Reduced JavaScript bundle, better performance, automatic code splitting

#### 3. **Data Flow**
```
API → Validation → Type Safety → Component → UI
                      ↓
               Runtime Checks
                      ↓
            TypeScript Compilation
```

### Key Architectural Decisions

#### **ISR (Incremental Static Regeneration)**
- Product list: Revalidates every 1 hour
- Product details: Revalidates every 1 hour
- Categories: Revalidates every 24 hours
- **Why?** Balance between fresh data and performance

#### **Cart State Management**
- Used React Context instead of Zustand
- **Why?** No external dependencies, sufficient for cart complexity
- **Trade-off?** Zustand would be lighter but adds dependency

#### **Validation Strategy**
- Runtime validation on all API responses
- TypeScript for compile-time safety
- **Why?** Double layer of protection against bad data

#### **localStorage for Cart Persistence**
- Saves cart state automatically on every change
- Loads on mount with hydration safety
- **Why?** Simple, works offline, no backend needed

---

## 🚀 Getting Started

### Prerequisites

The following tools are required to run this project. It has been developed and tested with
  these specific versions:

  - **Node.js** 22.18.0 ([Download](https://nodejs.org/))
  - **npm** 11.6.4 (comes with Node.js)
  - **Git** ([Download](https://git-scm.com/))

  > **Note:** Other versions may work, but these are the versions used during development to
  ensure compatibility.

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd simple-e-commerce-nextjs-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   ```
   Navigate to: http://localhost:3000
   ```

### Available Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run ESLint
npm run lint

# Run ESLint with auto-fix
npm run lint:fix

# Type check without building
npm run type-check

# Verify everything (lint + type-check + build)
npm run verify
```

### Development Workflow

1. **Start dev server**: `npm run dev`
2. **Make changes**: Edit files in `app/`, `components/`, or `lib/`
3. **Auto-reload**: Changes appear instantly in browser
4. **Before commit**: Run `npm run verify` to check everything

### Environment Variables (Optional)

Currently, the app uses hardcoded API URL. For production, you might want to use environment variables:

```bash
# Create .env.local file
NEXT_PUBLIC_API_URL=https://dummyjson.com
```

---

## 📁 Project Structure

```
simple-e-commerce-nextjs-app/
├── app/                          # Next.js App Router
│   ├── cart/                     # Cart page
│   ├── products/[id]/            # Dynamic product detail pages
│   ├── layout.tsx                # Root layout with providers
│   ├── page.tsx                  # Home page (product listing)
│   ├── not-found.tsx             # 404 page
│   └── error.tsx                 # Error boundary
│
├── components/                   # React components
│   ├── cart/                     # Cart-related components
│   │   ├── CartIcon.tsx          # Header cart icon with badge
│   │   ├── CartItem.tsx          # Individual cart item
│   │   └── CartSummary.tsx       # Order summary sidebar
│   ├── error/                    # Error handling components
│   │   └── ErrorBoundary.tsx     # Custom error boundary
│   ├── layout/                   # Layout components
│   │   └── Header.tsx            # Site header with navigation
│   ├── products/                 # Product components
│   │   ├── ProductCard.tsx       # Product card for grid
│   │   ├── ProductGrid.tsx       # Grid layout for products
│   │   ├── ProductFilters.tsx    # Category filter dropdown
│   │   ├── ProductDetailActions.tsx  # Add to cart section
│   │   ├── QuantitySelector.tsx  # Quantity input
│   │   └── AddToCartButton.tsx   # Smart add to cart button
│   └── ui/                       # Reusable UI components
│       ├── SearchBar.tsx         # Debounced search input
│       ├── Pagination.tsx        # Page navigation
│       ├── Loading.tsx           # Loading spinner
│       ├── ErrorMessage.tsx      # Error display
│       └── Toast.tsx             # Toast notifications
│
├── contexts/                     # React contexts
│   ├── CartContext.tsx           # Cart state management
│   └── ToastContext.tsx          # Toast notifications system
│
├── lib/                          # Business logic and utilities
│   ├── api/                      # API integration
│   │   └── products.ts           # Product API functions
│   ├── utils/                    # Utility functions
│   │   ├── cart.ts               # Cart calculations
│   │   ├── validation.ts         # Input/API validation
│   │   ├── storage.ts            # localStorage wrapper
│   │   └── format.ts             # String formatting
│   ├── constants.ts              # App constants
│   └── hooks.ts                  # Custom React hooks
│
├── types/                        # TypeScript type definitions
│   ├── product.ts                # Product types
│   ├── cart.ts                   # Cart types
│   ├── api.ts                    # API response types
│   └── index.ts                  # Type exports
│
├── public/                       # Static assets
├── .eslintrc.json                # ESLint configuration
├── tsconfig.json                 # TypeScript configuration
├── tailwind.config.ts            # Tailwind CSS configuration
├── next.config.js                # Next.js configuration
├── package.json                  # Dependencies and scripts
├── CLAUDE.md                     # AI assistant instructions
└── README.md                     # This file
```

### Component Hierarchy

```
App Layout (Providers)
├── ToastProvider
│   └── CartProvider
│       └── Page Content
│
Home Page
├── Header (with CartIcon)
├── SearchBar
├── ProductFilters
├── ProductGrid
│   └── ProductCard (×20)
└── Pagination

Product Detail Page
├── Header (with CartIcon)
├── Image Gallery
├── ProductDetailActions
│   ├── QuantitySelector
│   └── AddToCartButton
└── Reviews Section

Cart Page
├── Header (with CartIcon)
├── CartItem List
│   └── CartItem (×n)
└── CartSummary (sticky)
```

---

## 💭 Thought Process & Trade-offs

### Development Philosophy

I approached this project with three core principles:
1. **Quality over speed** - Write clean, maintainable code
2. **User experience first** - Fast, intuitive, accessible
3. **Production-ready** - Not just a demo, but deployable code

### Key Decisions

#### 1. **Next.js 16 with App Router**
**Why?**
- Server Components reduce JavaScript bundle size
- Built-in performance optimizations (Image, Font)
- ISR for optimal data freshness vs. speed balance

**Trade-off?**
- Steeper learning curve than Pages Router
- More complexity in understanding Server/Client components
- Worth it for performance and modern patterns

#### 2. **React Context for State Management**
**Why?**
- No external dependencies
- Built into React, well-understood pattern
- Sufficient for cart complexity

**Trade-off?**
- Slightly more boilerplate than Zustand
- All consumers re-render on cart change
- Alternative considered: Zustand would be lighter but adds 3KB dependency

#### 3. **Runtime Validation Instead of Zod**
**Why?**
- Complete control over error messages
- No dependency on validation library
- Learning opportunity to implement validation

**Trade-off?**
- More verbose code (~200 lines)
- Zod would be more concise and powerful
- Worth it to avoid 15KB dependency and demonstrate TypeScript skills

#### 4. **localStorage Over Cookies**
**Why?**
- Simple API, no backend needed
- 5-10MB storage vs 4KB for cookies
- Client-side only, no server round-trips

**Trade-off?**
- Not accessible on server (handled with hydration check)
- Not sent with requests (don't need this)
- No expiration (acceptable for cart use case)

#### 5. **No External UI Library**
**Why?**
- Custom Tailwind components are lightweight
- Full control over styling and behavior
- No learning curve for UI library

**Trade-off?**
- More code to write (but clean and reusable)
- Material-UI or Chakra would be faster initially
- Worth it for bundle size and customization

### Performance Decisions

#### **Image Optimization**
- Used Next.js Image component everywhere
- Automatic lazy loading, responsive images
- Saves ~60% bandwidth

#### **Code Splitting**
- Client components auto-split by Next.js
- Contexts loaded only when needed
- Keeps initial bundle small

#### **Memoization**
- Cart recalculation wrapped in `useCallback`
- Prevents unnecessary re-renders
- Critical for cart performance

### Security Decisions

#### **Input Sanitization**
- All search/category inputs sanitized
- Removes XSS attack vectors
- Numeric inputs validated with bounds

#### **API Response Validation**
- Every response validated before use
- Prevents corrupt data from crashing app
- Type safety at runtime + compile time

#### **localStorage Safety**
- SSR checks before accessing
- Error handling for quota exceeded
- No sensitive data stored

---

## ⚠️ Known Limitations

### 1. **No Backend**
- **Impact**: Cart only persists locally, not across devices
- **Workaround**: For production, would need user accounts + database
- **Severity**: Low (acceptable for assignment)

### 2. **No Authentication**
- **Impact**: No user accounts, orders, or profiles
- **Workaround**: Would integrate NextAuth.js or similar
- **Severity**: Low (not required)

### 3. **No Tests**
- **Impact**: No automated testing, manual testing only
- **Workaround**: Should add Vitest + React Testing Library
- **Severity**: High (critical for production)

### 4. **Cart Doesn't Sync Across Tabs**
- **Impact**: Opening cart in two tabs shows different states
- **Workaround**: Add storage event listener
- **Severity**: Low (edge case)

### 5. **No Checkout Flow**
- **Impact**: Can't actually purchase products
- **Workaround**: Button marked "Coming Soon"
- **Severity**: Low (out of scope)

### 6. **Search Doesn't Highlight Matches**
- **Impact**: No visual indication of why results match
- **Workaround**: Add match highlighting in titles
- **Severity**: Low (nice to have)

### 7. **Limited Error Recovery**
- **Impact**: Failed API calls show error, no retry
- **Workaround**: Add retry button in error state
- **Severity**: Medium (affects UX)

### 8. **Mobile Menu Doesn't Trap Focus**
- **Impact**: Keyboard users can tab out of mobile menu
- **Workaround**: Implement focus trap
- **Severity**: Medium (accessibility issue)

### 9. **No Bundle Size Optimization**
- **Impact**: Haven't analyzed or optimized bundle
- **Workaround**: Add @next/bundle-analyzer
- **Severity**: Medium (important for production)

### 10. **No Rate Limiting**
- **Impact**: Can spam search/API calls
- **Workaround**: Implement client-side rate limiting
- **Severity**: Low (DummyJSON has own limits)

---

## 📝 Assignment Requirements

This project fulfills all requirements from the Phase 1 assignment:

### ✅ Completed Requirements

1. **Home Page (Product List)**
   - ✅ Fetches from DummyJSON API
   - ✅ Displays product image, title, price, rating
   - ✅ Clicking navigates to product detail page
   - **Bonus**: Search, category filter, pagination

2. **Product Details Page**
   - ✅ Dynamic route `/products/[id]`
   - ✅ Fetches product details from API
   - ✅ Displays title, image, description, price, discount, rating
   - **Bonus**: Image gallery, reviews, add to cart

3. **Cart Page**
   - ✅ Add products to cart
   - ✅ Remove products from cart
   - ✅ Update quantities
   - ✅ Display list of products, item count, total price
   - ✅ Persistence with localStorage and React Context

4. **Navigation**
   - ✅ Clear navigation between pages
   - ✅ Header with site name and cart icon
   - ✅ Cart icon shows item count
   - **Bonus**: Mobile responsive menu

---

## 🤝 Contributing

This is an assignment project, but feedback is welcome! If you have suggestions:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

---

## 📄 License

This project is created for educational purposes as part of a coding assignment.

---

## 👨‍💻 Developer

**Your Name**
- GitHub: [@StackTon](https://github.com/StackTon)
---

## 🙏 Acknowledgments

- **DummyJSON** - For providing the free mock API
- **Next.js Team** - For the amazing framework
- **Vercel** - For free hosting
- **Tailwind CSS** - For the utility-first CSS framework

---

## 📚 Resources Used

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [DummyJSON API](https://dummyjson.com)

---

**Built with ❤️ using Next.js, React, and TypeScript**
