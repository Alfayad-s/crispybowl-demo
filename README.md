# Crispybowl

Production-oriented starter for **Next.js 16** (App Router, React Server Components, **Turbopack** in dev) with **TypeScript (strict)**, **Tailwind CSS v4**, **shadcn/ui** (Radix + Nova preset), **TanStack Query v5**, **Zustand**, **React Hook Form + Zod**, **next-themes**, and **Husky + lint-staged**.

## Requirements

- **Node.js** 20.9+ (LTS recommended)
- **npm** 10+ (ships with Node)

## Quick start

```bash
cp .env.example .env.local
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The homepage is intentionally a **blank white screen** (`src/app/page.tsx`); build features under `src/features/` or replace that page when you are ready.

## Commands used to bootstrap (reference)

```bash
npx create-next-app@latest . \
  --typescript \
  --tailwind \
  --eslint \
  --app \
  --src-dir \
  --import-alias "@/*" \
  --turbopack \
  --use-npm \
  --yes

npm install @tanstack/react-query @tanstack/react-query-devtools zustand \
  react-hook-form zod @hookform/resolvers next-themes date-fns lucide-react \
  clsx tailwind-merge class-variance-authority

npm install -D prettier eslint-config-prettier husky lint-staged prettier-plugin-tailwindcss

npx shadcn@latest init --base radix -p nova -y
npx shadcn@latest add button card dropdown-menu input label separator field -y
```

> **Note:** `shadcn init` is interactive unless you pass **`--base radix -p nova`** (or another preset code from [shadcn/create](https://ui.shadcn.com/create)).

## Scripts

| Script                 | Description                                            |
| ---------------------- | ------------------------------------------------------ |
| `npm run dev`          | Dev server with **Turbopack** (`next dev --turbopack`) |
| `npm run build`        | Production build                                       |
| `npm run start`        | Start production server                                |
| `npm run lint`         | ESLint (flat config + `eslint-config-next`)            |
| `npm run lint:fix`     | ESLint with `--fix`                                    |
| `npm run format`       | Prettier write (incl. Tailwind class sorting)          |
| `npm run format:check` | Prettier check only                                    |
| `npm run typecheck`    | `tsc --noEmit`                                         |

Git **pre-commit** runs **lint-staged** (ESLint + Prettier on staged files). Set `HUSKY=0` to skip hooks when needed.

## Environment variables

Copy `.env.example` to `.env.local`:

| Variable              | Purpose                                                |
| --------------------- | ------------------------------------------------------ |
| `NEXT_PUBLIC_APP_URL` | Canonical URL for `metadataBase` and absolute metadata |

## Folder structure

```text
src/
  app/                 # App Router: layouts, pages, route handlers, error UI
  components/          # Shared UI (providers, theme, shadcn under components/ui)
  features/            # Feature slices (routes, hooks, components) — grow here
  hooks/               # Shared React hooks
  lib/                 # App-specific libraries (query client, API helpers, utils)
  stores/              # Zustand stores
  types/               # Shared TypeScript types
  utils/               # Pure helpers (e.g. formatting)
```

- Prefer **Server Components** by default; add **`"use client"`** only where you need effects, subscriptions, or browser APIs.
- Colocate feature code under **`src/features/<feature>/`** as the app grows (pages can stay thin and import from features).

## shadcn/ui

- Config: **`components.json`**. Utilities: **`src/lib/utils.ts`** (`cn` = `clsx` + `tailwind-merge`). Variants use **`class-variance-authority`** (see `button.tsx`, `field.tsx`).
- This stack uses the **Nova** preset on **Radix** primitives. The CLI’s `form` entry may no-op on existing projects; **`Field`** primitives work well with **React Hook Form** and **Zod** (current shadcn v4 pattern).
- Add components:

  ```bash
  npx shadcn@latest add dialog
  npx shadcn@latest add table
  ```

- Inspect the setup:

  ```bash
  npx shadcn@latest info
  ```

## TanStack Query and SSR

- **`getQueryClient()`** in `src/lib/query/get-query-client.ts` uses React **`cache()`** so the same `QueryClient` is used for the current request on the server (prefetch + RSC) and a singleton on the client.
- When you add data fetching, prefetch in a **Server Component** with **`queryClient.prefetchQuery`**, then pass **`dehydrate(queryClient)`** into **`<HydrationBoundary>`** around client components that call **`useQuery`** with the same **`queryKey`** and **`queryFn`**.
- Keep shared **`queryKey`s** and fetchers in a small module (e.g. under `src/lib/api/`) so server and client stay aligned.

## Styling and themes

- **Tailwind v4** is wired through **`@tailwindcss/postcss`** and **`src/app/globals.css`** (including shadcn theme tokens and `@custom-variant dark`).
- **`next-themes`** uses the `class` strategy on `<html>` (see `layout.tsx` + `suppressHydrationWarning`). A ready-made toggle lives in **`src/components/theme/theme-toggle.tsx`** (not used on the blank homepage).

## Stack choices (short)

- **TanStack Query** — server state, caching, mutations, devtools in development only.
- **Zustand** — small client/UI state; keep server data in Query, not duplicated in global stores.
- **React Hook Form + Zod** — forms; Nova **Field** primitives pair cleanly with `register` and `FieldError`.
- **date-fns** — formatting (see `src/utils/format-date.ts`).

## Best practices baked in

- Strict TypeScript (`strict`, `skipLibCheck` in `tsconfig.json`).
- **ESLint** aligned with Next + TypeScript; **Prettier** last via **`eslint-config-prettier`** to avoid rule fights.
- **`app/error.tsx`**, **`app/loading.tsx`**, **`app/not-found.tsx`**, and **`app/global-error.tsx`** for basic UX and debugging hooks.
- **SEO-ready** `metadata` and **`viewport`** on the root layout; adjust `metadataBase` via `NEXT_PUBLIC_APP_URL`.

## Troubleshooting

- **`Internal Next.js error: Router action dispatched before initialization` (often E668)**  
  Usually a **hydration / Turbopack dev** ordering issue. This repo keeps a **browser-only** `QueryClient` in `AppProviders` (`useState(() => createQueryClient())`) so the provider does not reuse the server `cache()` client. If it still appears, try **`npm run dev:webpack`** or ensure `next.config` never sets **`deploymentId` to `""`** (use `undefined` when unset).

## Deploy

Deploy like any Next.js app (e.g. [Vercel](https://vercel.com/docs/frameworks/nextjs)). Set `NEXT_PUBLIC_APP_URL` to your production origin for correct metadata.

## License

Private project (`"private": true` in `package.json`). Add a license file if you open-source the repo.
