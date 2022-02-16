import { command } from "jellycommands"
import { db } from "../db/client.js"
import { createEmbed } from "../discord/embed.js"
import { noop } from "../utils/noop.js"
import { upperFirst } from "../utils/upperFirst.js"

export default command({
  name: "delete",
  description: "Delete a Keystone.",
  options: [
    {
      type: "STRING",
      name: "character",
      description: "The character whose keystone to delete.",
      required: true,
    },
  ],

  defer: true,
  global: true,

  run: async ({ interaction }) => {
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

    const embed = await createEmbed({
      guildDiscordId: interaction.guild.id,
      guildName: interaction.guild?.name,
    })

    return await interaction.editReply({
      content: `Deleted ${upperFirst(character)}'s keystone!`,
      embeds: [embed],
    })
  },
})
