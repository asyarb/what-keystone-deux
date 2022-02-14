import { type Guild, type Key } from "@prisma/client"
import { MessageEmbed } from "discord.js"
import { stripIndent } from "common-tags"
import { db } from "../db/client.js"
import { upperFirst } from "../utils/upperFirst.js"

interface CreateEmbedMessageArgs {
  guild: Guild
  sortedBy?: "dungeon" | "level"
}

function createCharacterList(keys: Key[]) {
  const characters = keys.map((key) => upperFirst(key.character)).join("\n")

  return characters || "None"
}

function createDungeonList(keys: Key[]) {
  return keys.map((key) => key.dungeon).join("\n") || "None"
}

function createLevelList(keys: Key[]) {
  return keys.map((key) => key.level).join("\n") || "None"
}

export async function createEmbed({
  guild,
  sortedBy = "level",
}: CreateEmbedMessageArgs): Promise<MessageEmbed> {
  //@ts-expect-error - Something weird with prisma types.
  const keys = (await db.key.findMany({
    where: { guildDiscordId: guild.discordId },
  })) as Key[]

  return new MessageEmbed()
    .setColor("BLUE")
    .setTitle(`Keystones for ${guild.name}`)
    .setDescription(
      stripIndent`
        Sorted by ${sortedBy}.

        Use the /list command to see this output with 
        different sort criteria.
      `,
    )
    .addFields([
      {
        name: "Character",
        value: createCharacterList(keys),
        inline: true,
      },
      {
        name: "Dungeon",
        value: createDungeonList(keys),
        inline: true,
      },
      {
        name: "Level",
        value: createLevelList(keys),
        inline: true,
      },
    ])
    .setFooter("What Keystone bot")
    .setTimestamp()
}
