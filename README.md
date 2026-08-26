<p align="center">
  <img src="apps/web/public/favicon.svg" width="64" height="64" alt="web-portfolio logo">
</p>

<h1 align="center">web-portfolio</h1>

<p align="center">
  A personal portfolio site with a self-hosted CMS: a React + Three.js frontend backed by a NestJS API,
  managed through a GitHub-authenticated admin panel.
</p>

## About

This is the source for my personal portfolio: a home page, work/project showcase, template gallery,
blog, and achievements timeline, all served by a NestJS + PostgreSQL backend. Content isn't hardcoded —
projects, blog posts, templates, experience, achievements, toolbox tags, and site sections are all rows
in a database, edited through an `/admin` CMS that only I can sign in to (GitHub OAuth, gated to a single
owner account).

It's a [pnpm](https://pnpm.io) + [Turborepo](https://turbo.build/repo) monorepo with two apps:

| App | Description |
| --- | --- |
| [`apps/web`](apps/web) | React 19 + Vite frontend: public site, blog with a Tiptap WYSIWYG editor, and the `/admin` CMS. Styled with Tailwind CSS 4, with a React Three Fiber scene on the home page. |
| [`apps/server`](apps/server) | NestJS API backed by PostgreSQL via Drizzle ORM. Exposes REST resources for content and a GitHub OAuth + JWT-cookie session for the admin.|

## Features

- **Public site** — home, work, templates, blog, and achievements pages, each backed by a live API resource.
- **Admin CMS** (`/admin`) — generic list/form views over every resource (projects, blog posts, templates,
  experience, achievements, toolbox groups, site sections, contact info), plus a dedicated blog post editor.
- **GitHub OAuth admin auth** — sign-in is restricted to a single owner GitHub account (`OWNER_GITHUB_ID`),
  with sessions stored as signed, HTTP-only JWT cookies.
- **WYSIWYG blog editor** — built on [Tiptap](https://tiptap.dev), for writing and formatting posts.
- **Type-safe data layer** — [Drizzle ORM](https://orm.drizzle.team) schemas and generated SQL migrations
  in [`apps/server/drizzle`](apps/server/drizzle).

## Architecture

```
┌─────────────┐        REST + cookies        ┌──────────────┐        ┌────────────┐
│  apps/web   │ ───────────────────────────▶ │ apps/server  │ ─────▶ │ PostgreSQL │
│  (Vite/SPA) │ ◀─────────────────────────── │  (NestJS)    │        │            │
└─────────────┘                               └──────────────┘        └────────────┘
   public site + /admin                     one module per resource      Drizzle ORM
```

Each backend resource (projects, blog posts, templates, experience, achievements, toolbox groups, site
sections, contact) is its own NestJS module with a controller, service, Zod-validated DTO, and Vitest spec.
The frontend mirrors this under `apps/web/src/features`, with a `shared/api` layer for fetching and an
`admin/resources` layer that renders CRUD screens generically from a config per resource type.

## Getting started

### Prerequisites

- [Node.js](https://nodejs.org) 20+
- [pnpm](https://pnpm.io) 11 (`corepack enable` will pick up the version pinned in [package.json](package.json))
- [Docker](https://www.docker.com) (for the local PostgreSQL instance), or your own Postgres database

### Setup

1. Install dependencies:

   ```bash
   pnpm install
   ```

2. Start PostgreSQL:

   ```bash
   docker compose up -d
   ```

3. Configure environment variables:

   ```bash
   cp apps/server/.env.example apps/server/.env.local
   cp apps/web/.env.example apps/web/.env
   ```

   Fill in `apps/server/.env.local` — at minimum a `JWT_SECRET` and a GitHub OAuth app's
   `GITHUB_CLIENT_ID`/`GITHUB_CLIENT_SECRET`/`OWNER_GITHUB_ID` if you want to use the admin CMS locally.
   The default `DATABASE_URL` already points at the Docker Compose Postgres instance.

   > [!NOTE]
   > You can create a GitHub OAuth app at https://github.com/settings/developers, and find your numeric
   > GitHub user ID at `https://api.github.com/users/<your-username>`.

4. Run database migrations:

   ```bash
   pnpm --filter server db:migrate
   ```

5. Start both apps in dev mode:

   ```bash
   pnpm dev
   ```

   The web app runs at `http://localhost:5173` and the API at `http://localhost:3001`.

### Useful scripts

Run from the repo root with Turborepo, or scope to one app with `--filter`:

| Command | Description |
| --- | --- |
| `pnpm dev` | Run both apps in watch mode |
| `pnpm dev:web` / `pnpm dev:server` | Run only the web app or only the API |
| `pnpm build` | Build both apps |
| `pnpm lint` | Lint both apps |
| `pnpm test` | Run both apps' test suites (Vitest) |
| `pnpm --filter server db:generate` | Generate a Drizzle migration from schema changes |
| `pnpm --filter server db:migrate` | Apply pending migrations |

> [!TIP]
> Server tests run against a separate test database, loaded from `.env.test`. Run
> `pnpm --filter server db:migrate:test` once to set it up.

## Tech stack

- **Frontend**: React 19, React Router, Vite, Tailwind CSS 4, React Three Fiber / Three.js, Tiptap
- **Backend**: NestJS 11, Drizzle ORM, PostgreSQL, Passport (GitHub OAuth), JWT sessions, Zod
- **Tooling**: pnpm workspaces, Turborepo, Vitest, ESLint

## Project structure

```
apps/
  web/                  React + Vite frontend
    src/app/            Routing and layout
    src/features/       Page-level features (home, work, templates, blog, admin, ...)
    src/shared/         Shared API client, components, hooks, styles, Three.js scene
  server/                NestJS API
    src/db/schema/       Drizzle table definitions
    src/<resource>/       One module per resource (controller, service, DTO, spec)
    drizzle/              Generated SQL migrations
docker-compose.yml        Local PostgreSQL for development
```

## License

MIT — see [LICENSE](LICENSE).
