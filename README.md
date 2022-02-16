# What Keystone

Discord bot for managing Mythic+ keystones. Written primarily for usage within
GnM, but could be used by other guilds if desired.

## Requirements

- Node v17
- Postgres

## Documentation

Click on the links below to view the documentation on various parts of the bot's
techstack:

- [TypeScript](https://www.typescriptlang.org/) – Language
- [DiscordJS](https://discord.js.org/#/) – OO Discord Library
- [JellyCommands](https://ghostdevbusiness.gitbook.io/jellycommands/) – Easy
  Slash Command Registration w/ DiscordJS
- [tsup](https://tsup.egoist.sh/) – Bundler/Transpiler
- [Prisma](https://www.prisma.io/docs/) – Database tooling (ORM, Migrations)
- [Railway](https://docs.railway.app/) – Hosting

## Getting Started

The following are ran from the root of the project.

```bash
# Define environment variables.
cp .env.example .env

# Install deps
npm i

# Transpile Code
pnpm build

# To run in "Development Mode"
npm run dev

# To run in productoin
npm run start
```

### Database

Currently, the What Keystone bot (that I run, anyway) is hosted on Railway and
utilizes their Postgres plugin to enable a managed database.

Set the `DATABASE_URL` in `.env` with the connection string Railway provides, or
supply your own local Postgres instance.

#### Migrations

Migrations are managed using
[Prisma Migrate](https://www.prisma.io/docs/concepts/components/prisma-migrate).
Refer to their docs for more information, but the upshot is:

```bash
# In a development environment, run the following to migrate a local database
# up:
npm run prisma migrate dev
```

Refer to Prisma's docs for information on migrating a production database.
