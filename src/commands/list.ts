import { command } from "jellycommands"
import { createEmbed } from "../discord/embed.js"

export default command({
  name: "list",
  description: "Display the list of keystones.",
  options: [
    {
      type: "STRING",
      name: "sort",
      description: "The criteria to sort by.",
      required: true,
      choices: [
        { name: "Level", value: "level" },
        { name: "Dungeon", value: "dungeon" },
      ],
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
    const sort = options.getString("sort", true) as "dungeon" | "level"

    const embed = await createEmbed({
      guildDiscordId: interaction.guild.id,
      guildName: interaction.guild?.name,
      sortedBy: sort,
    })

    return await interaction.editReply({ embeds: [embed] })
  },
})
