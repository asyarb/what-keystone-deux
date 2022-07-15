import { REST as DiscordREST } from "@discordjs/rest"
import { Routes as DiscordRoutes } from "discord-api-types/v10"
import { Commands } from "../commands/index.js"
import { DEV_GUILD_ID, DISCORD_TOKEN, DEV } from "../env.js"
import { Event } from "../discord/event.js"
import * as logger from "../logger.js"
import { getAuthDetails } from "../discord/token.js"

const discordApi = new DiscordREST({ version: "10" }).setToken(DISCORD_TOKEN)

export default new Event({
  name: "ready",
  run: async (client) => {
    logger.info("What Keystone bot started!")

    const cachedCommands = Array.from(
      client.application.commands.cache.values(),
    )
    const commands = Commands.all()

    // If every command is already registered, skip registering.
    if (
      commands.every((c) =>
        cachedCommands.some((cachedC) => cachedC.name === c.name),
      )
    ) {
      return logger.info("No new commands to register.")
    }

    logger.info("Found new commands! Registering...")

    const auth = getAuthDetails(client)
    const route = DEV
      ? DiscordRoutes.applicationGuildCommands(auth.clientId, DEV_GUILD_ID)
      : DiscordRoutes.applicationCommands(auth.clientId)

    const body = Commands.all().map((c) => c.toCommandData())

    await discordApi.put(route, { body })

    logger.info("Successfully registered commands!")
  },
})
