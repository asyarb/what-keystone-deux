import { type Key } from "@prisma/client"
import { MessageEmbed } from "discord.js"
import { stripIndent } from "common-tags"
import { db } from "../db/client.js"
import { upperFirst } from "../utils/upperFirst.js"
import { getDungeonName } from "../db/dunegon.js"

interface CreateEmbedMessageArgs {
  guildName: string
  guildDiscordId: string
  sortedBy?: "dungeon" | "level"
  sortDirection?: "asc" | "desc"
}

function createCharacterList(keys: Key[]) {
  const characters = keys.map((key) => upperFirst(key.character)).join("\n")

  return characters || "None"
}

function createDungeonList(keys: Key[]) {
  return keys.map((key) => getDungeonName(key.dungeon)).join("\n") || "None"
}

function createLevelList(keys: Key[]) {
  return keys.map((key) => key.level).join("\n") || "None"
}

export async function createEmbed({
  guildName,
  guildDiscordId,
  sortedBy = "level",
  sortDirection = "desc",
}: CreateEmbedMessageArgs): Promise<MessageEmbed> {
  //@ts-expect-error - Something weird with prisma types.
  const keys = (await db.key.findMany({
    where: { guildDiscordId: guildDiscordId },
    orderBy: { [sortedBy]: sortDirection },
  })) as Key[]

  return new MessageEmbed()
    .setColor("BLUE")
    .setTitle(`Keystones for ${guildName}`)
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
    .setFooter({ text: "What Keystone Bot" })
    .setTimestamp()
}
