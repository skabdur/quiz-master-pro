# Who Designed That? — Design History Quiz

An interactive dark-mode quiz app about the hidden design history of everyday objects, built for NID and UCEED students.

## Run & Operate

- `pnpm --filter @workspace/design-quiz run dev` — run the quiz frontend (port 21981)
- `pnpm --filter @workspace/api-server run dev` — run the API server (port 8080)
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- Frontend: React 19 + Vite + Tailwind CSS
- Animations: CSS keyframes, Framer Motion available
- No backend needed — all quiz data is static

## Where things live

- `artifacts/design-quiz/src/pages/QuizPage.tsx` — main quiz UI
- `artifacts/design-quiz/src/data/questions.ts` — all 20 quiz questions with options, answers, stories, and facts
- `artifacts/design-quiz/src/index.css` — dark mode glassmorphism theme + animation utilities
- `lib/api-spec/openapi.yaml` — API spec (health only)

## Architecture decisions

- Fully static frontend — no backend or DB needed for the quiz
- Answer options are shuffled on each question load (correct answer is never always option A)
- Questions are shuffled when a filter is applied or the quiz restarts
- Glassmorphism dark theme with CSS custom properties for consistent styling
- Category filter chips with per-category color coding and glow effects

## Product

- 20 design history questions across 6 categories: Everyday objects, Digital life, Indian things, Streets & signs, On your body, At home
- Dark glassmorphism UI with smooth animations, hover effects, and confetti on correct answers
- Circular progress score screen with grade and message
- Hint system, reveal panel with story + facts after answering
- Fully mobile responsive

## User preferences

_Populate as you build — explicit user instructions worth remembering across sessions._

## Gotchas

- Use `restartWorkflow("artifacts/design-quiz: web")` via code_execution to restart (not restart_workflow tool — it times out)
- Vite runs on port 21981 as set by artifact.toml

## Pointers

- See the `pnpm-workspace` skill for workspace structure
- See the `react-vite` skill for frontend conventions
