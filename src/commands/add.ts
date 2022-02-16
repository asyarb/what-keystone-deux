import { type Dungeon } from "@prisma/client"
import { command } from "jellycommands"
import { db } from "../db/client.js"
import { createEmbed } from "../discord/embed.js"

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
        { name: "Necrotic Wake", value: "NECROTIC_WAKE" },
        { name: "Plaguefall", value: "PLAGUEFALL" },
        { name: "Mists of Tirna Scithe", value: "MISTS_OF_TIRNA_SCITHE" },
        { name: "Halls of Atonement", value: "HALLS_OF_ATONEMENT" },
        { name: "Theater of Pain", value: "THEATER_OF_PAIN" },
        { name: "De Other Side", value: "DE_OTHER_SIDE" },
        { name: "Spires of Ascension", value: "SPIRES_OF_ASCENSION" },
        { name: "Sanguine Depths", value: "SANGUINE_DEPTHS" },
        { name: "Tazavesh Upper (Placeholder)", value: "TAZAVESH_UPPER" },
        { name: "Tazavesh Lower (Placeholder)", value: "TAZAVESH_LOWER" },
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

  global: true,

  run: async ({ interaction }) => {
    if (!interaction.guild) {
      return await interaction.reply({
        content: "Something went wrong with this request.",
      })
    }

    await interaction.deferReply()

    const guild = await db.guild.upsert({
      create: {
        discordId: interaction.guild.id,
        name: interaction.guild.name,
      },
      update: {
        name: interaction.guild.name,
      },
      where: { discordId: interaction.guild.id },
    })

    const options = interaction.options
    const character = options.getString("character", true).toLowerCase()
    const level = options.getInteger("level", true)
    const dungeon = options.getString("dungeon", true) as Dungeon

    await db.key.upsert({
      create: {
        character,
        dungeon,
        level,
        guildDiscordId: guild.discordId,
      },
      update: {
        dungeon,
        level,
      },
      where: {
        character_guildDiscordId: {
          character,
          guildDiscordId: guild.discordId,
        },
      },
    })

    const embed = await createEmbed({
      guildDiscordId: guild.discordId,
      guildName: guild.name,
      sortedBy: "level",
    })

    return await interaction.editReply({
      content: `Added keystone for ${character}.`,
      embeds: [embed],
    })
  },
})
