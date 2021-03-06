import { ApplicationCommandOptionType } from "discord-api-types/v10"
import { Command } from "../discord/command.js"
import { db } from "../db/client.js"
import { createEmbed } from "../discord/embed.js"
import { noop } from "../utils/noop.js"
import { upperFirst } from "../utils/upperFirst.js"

export default new Command({
  name: "delete",
  description: "Delete a Keystone.",
  options: [
    {
      type: ApplicationCommandOptionType.String,
      name: "character",
      description: "The character whose keystone to delete.",
      required: true,
    },
  ],

  defer: true,

  run: async ({ interaction, client }) => {
    if (!interaction.guild) {
      return await interaction.editReply({
        content: "Something went wrong with this request.",
      })
    }

    const options = interaction.options
    const character = options.getString("character", true).toLowerCase()

    const key = await db.key
      .delete({
        where: {
          character_guildDiscordId: {
            character,
            guildDiscordId: interaction.guild.id,
          },
        },
      })
      .catch(noop)

    if (!key) {
      return await interaction.editReply({
        content: `No keystone for ${character} was found.`,
      })
    }

    const embed = await createEmbed({ interaction, client })

    return await interaction.editReply({
      content: `Deleted ${upperFirst(character)}'s keystone!`,
      embeds: [embed],
    })
  },
})
