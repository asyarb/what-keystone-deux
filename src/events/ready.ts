import { REST as DiscordREST } from "@discordjs/rest"
import { Routes as DiscordRoutes } from "discord-api-types/v10"
import { commands } from "../commands/index.js"
import { DEV_GUILD_ID, DISCORD_TOKEN, DEV } from "../env.js"
import { Event } from "../discord/event.js"
import * as logger from "../logger.js"
import { getAuthDetails } from "../discord/token.js"

const discordApi = new DiscordREST({ version: "10" }).setToken(DISCORD_TOKEN)

export default new Event({
  name: "ready",
  run: async (client) => {
    logger.info("What Keystone bot started!")

    const allCommands = Array.from(commands.values())
    const discordCommands = await client.application.commands.fetch()

    // If every command is already registered, skip registering.
    if (
      allCommands.every((c) => discordCommands.some((ec) => ec.name === c.name))
    ) {
      logger.info("No new commands to register.")

      return
    }

    logger.info("Found new commands! Registering...")

    const auth = getAuthDetails(client)
    const route = DEV
      ? DiscordRoutes.applicationGuildCommands(auth.clientId, DEV_GUILD_ID)
      : DiscordRoutes.applicationCommands(auth.clientId)

    const body = allCommands.map((c) => c.toCommandData())

    await discordApi.put(route, { body })

    logger.info("Successfully registered commands!")
  },
})
