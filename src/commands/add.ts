import { type Dungeon as DBDungeon } from "@prisma/client"
import { command } from "jellycommands"
import { db } from "../db/client.js"
import { createEmbed } from "../discord/embed.js"
import { upperFirst } from "../utils/upperFirst.js"
import * as Dungeon from "../db/dungeon.js"

export default command({
  name: "add",
  description: "Register a new keystone",
  options: [
    {
      type: "STRING",
      name: "dungeon",
      description: "The dungeon to add.",
      required: true,
      choices: Dungeon.asArray.map((dungeon) => ({
        name: Dungeon.toDisplayName(dungeon),
        value: dungeon,
      })),
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
  defer: true,

  run: async ({ interaction, client }) => {
    if (!interaction.guild) {
      return await interaction.editReply({
        content: "Something went wrong with this request.",
      })
    }

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
    const dungeon = options.getString("dungeon", true) as DBDungeon

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

    const embed = await createEmbed({ interaction, client })

    return await interaction.editReply({
      content: `Added keystone for ${upperFirst(character)}.`,
      embeds: [embed],
    })
  },
})
