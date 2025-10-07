<!-- .github/copilot-instructions.md - guidance for AI coding assistants -->

# Quick orientation

This is a TypeScript + Vite React portfolio starter primarily located under `client/`. It uses PNPM, TailwindCSS, Radix UI components and a small shared folder for types. The project is a front-end SPA (React Router v6) with optional express server support in the starter template; this particular repository is front-end focused and most runtime code lives in `client/`.

Key locations to read first:
- `client/` — React app (entry: `client/main.tsx`, route components in `client/pages/`, layout/components in `client/components/`)
- `client/App.tsx` — routing, global providers (React Query, Toaster, Sonner)
- `client/components/ui/` — shared UI primitives (uses `cn()` helper in `client/lib/utils.ts`)
- `shared/api.ts` — shared types used across client/server if server is added
- `package.json` — scripts (pnpm dev/build/preview/typecheck/test)
- `.github/workflows/deploy.yml` — GitHub Pages build pipeline; artifact served from `dist/spa`

# Programming contract (what changes should adhere to)
- Keep UI primitives in `client/components/ui/*` and prefer composing them rather than adding one-off styles across pages.
- Use the `cn()` utility (`client/lib/utils.ts`) to compose Tailwind classes and preserve prop `className` overrides.
- Routes belong in `client/App.tsx` and page components in `client/pages/`. Add routes above the catch-all `*` route.
- Shared runtime types belong in `shared/` and should be imported via path alias `@/..` (see `tsconfig.json`).

# Environment & build commands
- Local dev server: `pnpm dev` (runs Vite). The repo uses PNPM (see `package.json` and workflow). On Windows Powershell you can run:
```powershell
pnpm install
pnpm dev
```
- Production build: `pnpm build` (outputs Vite build into `dist/` — CI uploads `dist/spa` for GitHub Pages)
- Preview a production build locally: `pnpm preview` (runs `vite preview --open`)
- Typecheck: `pnpm typecheck` (runs `tsc --noEmit`)
- Tests: `pnpm test` (runs Vitest)

# Project-specific conventions and patterns
- Path aliases: `@/*` points to `client/*` (defined in `tsconfig.json`). Use imports like `import { Foo } from '@/components/foo'`.
- UI composition: Radix primitives + Tailwind utilities. The component library under `client/components/ui/` exposes wrappers around Radix and common patterns (e.g., `tooltip`, `toaster`, `dialog`). Inspect these components for idiomatic prop names and `className` handling.
- Error boundaries: The app wraps routes with `ErrorBoundary` (`client/components/ErrorBoundary.tsx`) — return lightweight fallback UI matching app styling.
- State & data fetching: Uses `@tanstack/react-query` (QueryClient in `client/App.tsx`). New data hooks should register with the shared `QueryClient` and use React Query patterns (keys, invalidation).

# Integration points & CI
- GitHub Actions deploys on `main` using Node 20 and PNPM (see `.github/workflows/deploy.yml`). CI expects `pnpm install --frozen-lockfile` and `pnpm build` to succeed.
- If you add server endpoints, adopt `/api/*` prefix and place shared types in `shared/api.ts` for type-safety.

# Examples (copy-paste friendly)
- Importing a component with alias and `cn()`:
```ts
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

<Button className={cn('px-4', condition && 'bg-accent')} />
```
- Adding a new route (in `client/App.tsx`):
```tsx
<Route path="/my-page" element={<MyPage />} />
// ensure route is added above the `*` catch-all
```

# What to avoid / common pitfalls
- Don't assume a backend exists—this repo's runtime is primarily frontend. There is no `server/` directory here; if you port server code from the starter, update the Vite config and scripts accordingly.
- When editing CSS, prefer updating `client/global.css` and `tailwind.config.ts` rather than sprinkling raw CSS.
- Keep `client/components/ui/` components generic; avoid page-specific markup there.

# Files to inspect for details
- `client/App.tsx` — providers, routing
- `client/main.tsx` — app bootstrapping
- `client/pages/Index.tsx` — home page example
- `client/components/layout/MainLayout.tsx` — layout patterns
- `client/components/ui/*` — component implementations
- `shared/api.ts` — shared types
- `package.json` — scripts & dependencies
- `.github/workflows/deploy.yml` — CI expectations

# If something is unclear
If you need deeper info (server integration, custom Vite config, or deployment subtleties), tell me which area to inspect and I will expand the instructions or merge additional docs from the repo.
