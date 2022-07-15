import { Command } from "../discord/command.js"
import { createEmbed } from "../discord/embed.js"

export default new Command({
  name: "list",
  description: "Display the list of keystones.",

  defer: true,

  run: async ({ interaction, client }) => {
    if (!interaction.guild) {
      return await interaction.editReply({
        content: "Something went wrong with this request.",
      })
    }

    const embed = await createEmbed({
      interaction,
      client,
    })

    return await interaction.editReply({ embeds: [embed] })
  },
})
