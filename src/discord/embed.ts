import { type Key as DBKey, type Dungeon as DBDungeon } from "@prisma/client"
import { type JellyCommands } from "jellycommands"
import {
  type CommandInteraction,
  MessageEmbed,
  EmbedFieldData,
} from "discord.js"
import { db } from "../db/client.js"
import { upperFirst } from "../utils/upperFirst.js"
import * as Dungeon from "../db/dungeon.js"
import { WKEmojis } from "./emoji.js"
import { times } from "../utils/times.js"

const EMPTY_FIELD: EmbedFieldData = {
  name: "\u200b",
  value: "\u200b",
  inline: true,
}

function createEmbedValue(keys: DBKey[]): string {
  if (keys.length <= 0) return "None\n\u200b"

  const value = keys
    .sort((a, b) => b.level - a.level)
    .map((key) => `\`${key.level}\` **${upperFirst(key.character)}** `)
    .join("\n")

  return value + "\n\u200b"
}

function dungeonEmbedField(
  guildKeys: DBKey[],
  dungeon: DBDungeon,
  emojis: WKEmojis,
): EmbedFieldData {
  const dungeonName = Dungeon.toDisplayName(dungeon)
  const emoji = emojis.getFromDungeon(dungeon)
  const keys = guildKeys.filter((key) => key.dungeon === dungeon)

  return {
    name: `${emoji} __**${dungeonName}**__`,
    value: createEmbedValue(keys),
    inline: true,
  }
}

interface CreateEmbedMessageArgs {
  isFullDelete?: boolean
  interaction: CommandInteraction
  client: JellyCommands
}

export async function createEmbed({
  isFullDelete = false,
  client,
  interaction,
}: CreateEmbedMessageArgs): Promise<MessageEmbed> {
  let keys: DBKey[] = []

  const guild = interaction.guild!
  const emojis = new WKEmojis(client)

  if (!isFullDelete) {
    // @ts-expect-error - Prisma weirdness
    keys = await db.key.findMany({
      where: { guildDiscordId: guild.id },
    })
  }

  // Helper for creating embed fields per dungeon
  const createEmbedField = (dungeon: DBDungeon) =>
    dungeonEmbedField(keys, dungeon, emojis)

  // Add empty fields to ensure that embed content columns are always aligned.
  const emptyFields = times(3 - (Dungeon.asArray.length % 3), () => EMPTY_FIELD)

  return new MessageEmbed()
    .setColor("BLUE")
    .setTitle(`Keystones for ${guild.name}`)
    .setDescription("Grouped by dungeon. Sorted by level.\n\u200b")
    .addFields(...Dungeon.asArray.map(createEmbedField), ...emptyFields)
    .setFooter({ text: "What Keystone Bot" })
    .setTimestamp()
}
