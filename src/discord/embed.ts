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
  isFullDelete?: boolean
}

function createCharacterList(keys: Key[]) {
  return keys.map((key) => upperFirst(key.character)).join("\n") || "None"
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
  isFullDelete = false,
}: CreateEmbedMessageArgs): Promise<MessageEmbed> {
  let keys: Key[] = []

  if (!isFullDelete) {
    //@ts-expect-error - Prisma weirdness
    keys = await db.key.findMany({
      where: { guildDiscordId: guildDiscordId },
      orderBy: { [sortedBy]: sortDirection },
    })
  }

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
