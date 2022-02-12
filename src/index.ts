import { JellyCommands } from "jellycommands"
import { Intents } from "discord.js"
import { DEBUG, DEV_GUILD_ID, DISCORD_TOKEN, IS_DEV } from "./env.js"

const client = new JellyCommands({
  commands: "dist/commands",
  clientOptions: {
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
  },

  dev: {
    global: IS_DEV,
    guilds: [DEV_GUILD_ID],
  },

  debug: DEBUG,
  cache: !IS_DEV,
})

client.login(DISCORD_TOKEN)
