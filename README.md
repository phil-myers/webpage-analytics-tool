# webpage-analytics-tool

A React dashboard for analyzing product performance on an e-commerce platform.

## Features

- **Category performance summary** — average rating, average discount %, total reviews, and product count per category.
- **Product table** — sortable by price, discount %, rating, and rating count.
- **Product reviews** — click a row to expand it and read customer reviews, plus an AI-generated summary of review sentiment.
- **Category filter** — narrow the product table down to a single category.
- **Light/dark theme toggle** — respects system preference by default and persists the choice in `localStorage`.

## Tech stack

- React 19 + Vite
- Tailwind CSS
- Vitest for unit tests

## Getting started

```bash
npm install
npm run dev
```

## Scripts

- `npm run dev` — start the Vite dev server
- `npm run build` — build for production
- `npm run preview` — preview the production build locally
- `npm run lint` — run ESLint
- `npm run test` — run the test suite with Vitest

## Project structure

```
src/
  components/
    CategorySummary.jsx   # Per-category aggregate stats table
    FilterBar.jsx          # Category dropdown filter
    ProductTable.jsx       # Sortable, expandable product table with reviews
    ThemeToggle.jsx         # Light/dark mode toggle
  data/
    products.json           # Sample product + review dataset
  utils/
    aggregateByCategory.js  # Aggregation logic used by CategorySummary
```
