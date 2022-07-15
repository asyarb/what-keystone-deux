import { Intents, Client } from "discord.js"
import { DISCORD_TOKEN } from "./env.js"
import { commands } from "./commands/index.js"
import { events } from "./events/index.js"
import { WhatKeystoneError } from "./error.js"

const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
})

events.forEach((event) => client.on(event.name, event.run))

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isCommand()) return

  const command = commands.get(interaction.commandName)
  if (!command) return

  if (command.defer) {
    await interaction.deferReply()
  }

  try {
    await command.run({ client, interaction })
  } catch (error) {
    const reply = interaction.deferred
      ? interaction.editReply
      : interaction.reply

    if (error instanceof WhatKeystoneError) {
      console.error(error.stack)
      await reply({ content: error.message })

      return
    }

    console.error(error)

    await reply({ content: "Something went wrong. Please try again." })
  }
})

client.login(DISCORD_TOKEN)
