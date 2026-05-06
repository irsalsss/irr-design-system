# IRR Design System

Earthy, professional component library. **Stripe meets Linear** — confident geometry, restrained color, quiet warmth from stone neutrals.

**Brand:** Teal `#0F6E56` · Stone neutrals · Amber accent `#F59E0B`  
**Type:** Geist (UI) · Geist Mono (code/data)

---

## Stack

| Layer | Tool |
|---|---|
| Framework | React 18 + TypeScript (strict) |
| Build | Vite 5 |
| Styling | Tailwind CSS v3 + CSS custom properties |
| Storybook | v8 with Vite builder |
| Unit tests | Vitest 2 + Testing Library |
| Visual tests | Chromatic |
| Lint | ESLint 9 (flat config) + typescript-eslint |
| Icons | Lucide React |
| Fonts | `geist` npm package |

---

## Project structure

```
irr-design-system/
├── .storybook/
│   ├── main.ts          # addons, framework config
│   └── preview.ts       # dark/light theme decorator, global CSS
├── src/
│   ├── styles/
│   │   └── globals.css  # Tailwind directives + all IRR CSS vars
│   ├── tokens/
│   │   └── index.ts     # typed TS exports of all design tokens
│   ├── test/
│   │   └── setup.ts     # jest-dom matchers
│   ├── components/
│   │   └── Button/      # canonical first component
│   │       ├── Button.tsx
│   │       ├── Button.stories.tsx
│   │       └── Button.test.tsx
│   └── index.ts         # public barrel export
├── tailwind.config.ts   # full IRR token mapping
├── vitest.config.ts
├── eslint.config.js
└── vite.config.ts
```

---

## Getting started

```bash
# Install
pnpm install

# Storybook dev server
pnpm dev        # → http://localhost:6006

# Build Storybook static
pnpm build
```

---

## Testing

```bash
# Unit tests (single run)
pnpm test

# Watch mode
pnpm test:watch

# With coverage report
pnpm test:coverage
```

Tests live next to components as `*.test.tsx`. Coverage excludes stories and config files.

---

## Visual regression (Chromatic)

```bash
CHROMATIC_PROJECT_TOKEN=your_token pnpm chromatic
```

Get a project token at [chromatic.com](https://www.chromatic.com) after linking this repo. Store the token in `.env.local` (gitignored).

```bash
# .env.local
CHROMATIC_PROJECT_TOKEN=chpt_xxxxxxxxxxxxxxx
```

---

## Lint & typecheck

```bash
pnpm lint          # ESLint
pnpm lint:fix      # ESLint with autofix
pnpm typecheck     # tsc --noEmit
```

---

## Design tokens

All tokens live in two places:

- **CSS vars** — `src/styles/globals.css` (consumed at runtime, supports dark mode via `.dark` / `[data-theme="dark"]`)
- **TS exports** — `src/tokens/index.ts` (consumed in JS/TS logic, tests, or tooling)

```ts
import { colors, spacing, radius, duration } from '@/tokens'
```

### Dark mode

Toggle by adding `dark` class or `data-theme="dark"` to `<html>`. In Storybook, use the **Theme** toolbar in the top bar.

---

## Adding a new component

1. Create `src/components/ComponentName/`
2. Add `ComponentName.tsx`, `ComponentName.stories.tsx`, `ComponentName.test.tsx`
3. Export from `src/index.ts`

Use semantic color tokens (`bg-brand`, `text-fg-muted`, `border-border`) over raw palette values. Follow radius rules — `md` (8px) for buttons/inputs, `lg` (12px) for cards, never mix within a cluster.

---

## Downstream consumption (git submodule)

Downstream repos pull this as a submodule at `src/design-system/`, then extend their `tailwind.config.js`:

```js
// downstream tailwind.config.js
module.exports = {
  content: [
    './src/**/*.{ts,tsx}',
    './src/design-system/src/**/*.{ts,tsx}',  // include submodule
  ],
  presets: [require('./src/design-system/tailwind.config.ts')],
}
```
