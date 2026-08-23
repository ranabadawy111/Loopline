# Loopline — Team Task Board

A Kanban-style project management tool built as a portfolio piece, in **TypeScript**, with real drag-and-drop, a mock authentication flow, and unit tests — deliberately closer to the shape of real enterprise dashboard work than a marketing site or booking flow.

## 🚀 Live Demo

[Live demo →](https://vercel.com/ranabadawy111s-projects/loopline)

## What it does

- **Login** — a mock auth screen; any email/password signs you in and gates the board behind a protected route
- **Board** — four columns (Backlog, In Progress, Review, Done), drag any card between them with real pointer-based drag-and-drop
- **Tasks** — add, edit, and delete tasks with title, description, priority, assignee, and due date, through a modal form
- **Search** — filter visible cards by title live as you type
- Signing out clears the session and redirects back to login

## Why these choices

- **TypeScript throughout**, not just typed props — the Redux state, RTK Query response shape, and every component prop are typed, matching real day-to-day frontend work rather than a JS-only side project.
- **`@dnd-kit`** for drag-and-drop — a modern, actively maintained library (unlike the now-archived `react-beautiful-dnd`), with pointer sensors and a drag overlay for a polished feel.
- **RTK Query + a plain Redux Toolkit slice, split by responsibility** — the initial board fetch goes through `createApi`, while ongoing task mutations (move, add, edit, delete) live in a `createSlice` reducer, since drag-and-drop needs synchronous local updates that don't map cleanly to a request/response cache.
- **Real unit tests with Vitest** — the reducer logic (`boardSlice.test.ts`) and a UI component (`PriorityTag.test.tsx`) are actually tested, not just described in a README. Run them with `npm test`.
- **A mock but structurally real auth flow** — `ProtectedRoute` checks Redux state and redirects, the same pattern used with real JWT/session auth, just swapping the verification step for a stub.

## Stack

- React 19 + TypeScript + Vite
- Tailwind CSS
- Redux Toolkit (RTK Query + a plain slice for board state, another for auth)
- React Router
- @dnd-kit (core, sortable, utilities)
- Vitest + React Testing Library
- Framer Motion
- Lucide icons

## Running locally

```bash
npm install
npm run dev
```

Run the test suite:

```bash
npm test
```

Build for production:

```bash
npm run build
```

## Project structure

```
src/
  app/store.ts               Redux store
  app/boardSlice.ts          Task state: move, add, update, delete
  app/authSlice.ts           Mock auth state
  app/hooks.ts                Typed useAppDispatch / useAppSelector
  services/api.ts             RTK Query: initial board fetch
  data/types.ts                Shared TypeScript types
  data/mockDb.ts               Seed tasks, columns, team members
  components/ui/               Button, Card, Input, Modal, PriorityTag, Avatar...
  components/board/            BoardColumn, TaskCard, TaskModal
  components/auth/             ProtectedRoute
  pages/                        Login, Board
  test/                         Vitest unit + component tests
```
