# AI Agent Instructions for ea_erp

This document provides essential context for AI agents working with the ea_erp codebase.

## Project Overview

- Next.js 14 application with TypeScript for ERP functionality
- Full-stack application with Prisma ORM and PostgreSQL
- Implements OpenTelemetry for observability
- Uses TailwindCSS for styling with custom components
- Internationalization support with i18next
- Authentication handled via NextAuth

## Key Architecture Patterns

### 1. File Structure

- `/src/app` - Next.js App Router pages and API routes
- `/src/components` - React components organized in atomic design:
  - `/organisms` - Complex components like navigation
  - `/templates` - Page layouts
  - `/ui` - Reusable UI components
- `/prisma` - Database schema and migrations
- `/src/providers` - React context providers (auth, i18n, etc.)

### 2. Data Flow

- Prisma Client for database operations
- API Routes in `/src/app/api` handle server-side logic
- React Query for client-side data fetching and caching
- OpenTelemetry for distributed tracing (see `src/app/tracing.ts`)

### 3. Authentication

- NextAuth.js for authentication flow
- Protected routes and API endpoints
- User roles defined in Prisma schema (admin, client, employee, manager)

## Development Workflow

### Setup

```bash
npm install
npx prisma migrate dev
npx prisma generate
npm run dev
```

### Docker Support

```bash
docker compose up
```

### Testing

- Vitest for unit and integration tests
- Run tests with `npm test`
- Test files should be co-located with source files (\*.spec.tsx)

## Project-Specific Conventions

### Database

- UUIDs for primary keys (auto-generated)
- Timestamps with timezone (Postgres TIMESTAMPTZ)
- Soft deletion pattern using status fields

### Component Patterns

- Use atomic design principles
- Suffix view components with `.view.tsx`
- Implement responsive design with TailwindCSS
- Use custom hooks from `/src/hooks` for shared logic

### Observability

- OpenTelemetry integration for tracing
- Structured logging with Pino
- Metrics exported to Prometheus

## Key Integration Points

- PagSeguro payment integration (see RootLayout script)
- i18next for internationalization
- OpenTelemetry collector
- PostgreSQL database

## Common Gotchas

- Always run `prisma generate` after schema changes
- Handle both client and server components correctly (use "use client" directive)
- Consider timezone handling in dates (using TIMESTAMPTZ)
- Check authentication state in protected routes
