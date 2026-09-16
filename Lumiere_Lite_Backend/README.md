# Lumiere API

ASP.NET Core 10 API for event resource planning. Executives open events. Planners reserve assets. Warehouse staff dispatch. Crew reports damage. The intended store is one Postgres database owned by EF Core.

This repository is the product home for requirements and ops docs. The Vite SPA lives in [Shunrenn/Lumiere-UI](https://github.com/Shunrenn/Lumiere-UI). Login JSON fields match today. Create Event and damage create fields do not. See [docs/contracts-fe-be.md](docs/contracts-fe-be.md).

## Run locally

1. Install .NET SDK 10.0.103 (`global.json`).
2. Optional: Postgres on `127.0.0.1:5432` database `lumiere_db`. If the ping fails, the API still starts on InMemory and seeds demo users. Data vanishes on restart.
3. `dotnet restore Lumiere.slnx`
4. `dotnet run --project Lumiere.API/Lumiere.API.csproj`
5. Confirm the console mapped `POST /api/auth/login`.

Default port is 8080 (`PORT`). Demo password is `lumiere2026`. Seeded emails include `admin@lumiere.com` and `warehouseops@lumiere.com`.

Do not use `nixpacks.toml` for Railway. Use `Dockerfile`.

## Tools

Canonical list: [docs/build-lumiere.md](docs/build-lumiere.md) §7 and [AGENTS.md](AGENTS.md).

- `dotnet` restore, run, test
- `railway` deploy, logs, variables, rollback. Railway how-to: [docs/howto-deploy-railway.md](docs/howto-deploy-railway.md). There is no Railway MCP.
- `supabase` project link, status, Storage. Do not apply `supabase/migrations` at runtime. EF owns schema.
- `gh` pull requests
- Vercel MCP `plugin-vercel-vercel` and Supabase MCP `plugin-supabase-supabase` when authenticated. Never dump secrets. Never put JWT or `BackgroundRemoval__ApiKey` in Vercel env.

## Docs

Index: [docs/index.md](docs/index.md). Start at [docs/state.md](docs/state.md). Agents: [AGENTS.md](AGENTS.md).
