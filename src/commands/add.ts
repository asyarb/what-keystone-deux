import { command } from "jellycommands"
import { db } from "../db/client.js"
import { IS_DEV } from "../env.js"

export default command({
  name: "add",
  description: "Register a new keystone",
  options: [
    {
      type: "STRING",
      name: "dungeon",
      description: "The dungeon to add.",
      required: true,
      choices: [
        { name: "Necrotic Wake", value: "necrotic_wake" },
        { name: "Plaguefall", value: "plaguefall" },
        { name: "Mists of Tirna Scithe", value: "mists_of_tirna_scithe" },
        { name: "Halls of Atonement", value: "halls_of_atonement" },
        { name: "Theater of Pain", value: "theater_of_pain" },
        { name: "De Other Side", value: "de_other_side" },
        { name: "Spires of Ascension", value: "spires_of_ascension" },
        { name: "Sanguine Depths", value: "sanguine_depths" },
      ],
    },
    {
      type: "INTEGER",
      name: "level",
      description: "The keystone level of the dungeon",
      required: true,
    },
    {
      type: "STRING",
      name: "character",
      description: "The character to tie the keystone to",
      required: true,
    },
  ],

  dev: IS_DEV,
  global: !IS_DEV,

  run: async ({ interaction }) => {
    const { guild: discordGuild } = interaction
    if (!discordGuild) {
      return await interaction.reply({
        content: "Something went wrong with this request.",
      })
    }

    await interaction.deferReply()

    const guild = await db.guild.upsert({
      create: {
        discordId: discordGuild.id,
        name: discordGuild.name,
      },
      update: {
        name: discordGuild.name,
      },
      where: { discordId: discordGuild.id },
    })

    console.log(guild)

    await interaction.editReply({ content: "Created guild!" })
  },
})
