import { command } from "jellycommands"
import { createEmbed } from "../discord/embed.js"

export default command({
  name: "list",
  description: "Display the list of keystones.",

  defer: true,
  global: true,

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
