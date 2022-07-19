import { Intents, Client } from "discord.js"
import { stripIndents } from "common-tags"
import { DISCORD_TOKEN } from "./env.js"
import { commands } from "./commands/index.js"
import { events } from "./events/index.js"
import * as logger from "./logger.js"

const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
})

events.forEach((event) => client.on(event.name, event.run))

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isCommand()) return

  logger.info(stripIndents`
    Received interaction: ${interaction.commandName}
    Interaction data:     ${JSON.stringify(interaction.options.data ?? [])}
  `)

  const command = commands.get(interaction.commandName)

  if (!command) {
    return await interaction.reply({ content: "Did not receive a command!" })
  }

  if (command.defer) {
    await interaction.deferReply()
  }

  try {
    await command.run({ client, interaction })
  } catch (error) {
    const reply = interaction.deferred
      ? interaction.editReply
      : interaction.reply

    logger.error(error)

    await reply({ content: "Something went wrong. Please try again." })
  }
})

client.login(DISCORD_TOKEN)
