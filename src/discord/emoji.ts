// import { type CommandInteraction } from "discord.js"
import { type JellyCommands } from "jellycommands"
import { DEV_GUILD_ID, EMOJI_GUILD_ID } from "../env.js"

function emojiServerGuildId(): string {
  return EMOJI_GUILD_ID ?? DEV_GUILD_ID
}

export function getWowEmojis(client: JellyCommands) {
  const emojiGuild = client.guilds.cache.get(emojiServerGuildId())
  if (!emojiGuild) {
    throw new Error("Unable to find server that stores our Emojis!")
  }

  emojiGuild.emojis.cache.reduce(() => {}, {})
}
