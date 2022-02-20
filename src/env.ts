import "dotenv/config"

export const DISCORD_TOKEN = process.env.DISCORD_TOKEN!
if (!DISCORD_TOKEN) throw new Error("DISCORD_TOKEN not defined in .env!")

export const DEV_GUILD_ID = process.env.DEV_GUILD_ID!
if (!DEV_GUILD_ID) throw new Error("DEV_GUILD_ID not defined in .env!")

export const EMOJI_GUILD_ID = process.env.EMOJI_GUILD_ID

export const DEBUG = process.env.DEBUG === "true"
export const IS_DEV = process.env.NODE_ENV === "development"
