import { Dungeon } from "@prisma/client"
import { type GuildEmoji, type Client } from "discord.js"
import { DEV_GUILD_ID, EMOJI_GUILD_ID } from "../env.js"

type WKEmojiNames =
  | "de_other_side"
  | "death_knight"
  | "demon_hunter"
  | "druid"
  | "halls_of_atonement"
  | "hunter"
  | "mage"
  | "mists"
  | "monk"
  | "paladin"
  | "plaguefall"
  | "priest"
  | "rogue"
  | "sanguine_depths"
  | "shaman"
  | "spires_of_ascension"
  | "the_necrotic_wake"
  | "theatre_of_pain"
  | "warlock"
  | "warrior"
  | "tazavesh_soleah"
  | "tazavesh_streets"

const DUNGEON_EMOJIS: Record<Dungeon, WKEmojiNames> = {
  DE_OTHER_SIDE: "de_other_side",
  HALLS_OF_ATONEMENT: "halls_of_atonement",
  MISTS_OF_TIRNA_SCITHE: "mists",
  NECROTIC_WAKE: "the_necrotic_wake",
  PLAGUEFALL: "plaguefall",
  SANGUINE_DEPTHS: "sanguine_depths",
  SPIRES_OF_ASCENSION: "spires_of_ascension",
  TAZAVESH_STREETS_OF_WONDER: "tazavesh_streets",
  TAZAVESH_SOLEAHS_GAMBIT: "tazavesh_soleah",
  THEATER_OF_PAIN: "theatre_of_pain",
}

export class WKEmojis {
  #emojis: Record<WKEmojiNames, GuildEmoji>

  constructor(client: Client) {
    const emojiGuild = client.guilds.cache.get(EMOJI_GUILD_ID ?? DEV_GUILD_ID)
    if (!emojiGuild) {
      throw new Error("Unable to find server that stores our Emojis!")
    }

    // { [randomId]: emoji } => { de_other_side: emoji }
    this.#emojis = emojiGuild.emojis.cache.reduce((acc, curr) => {
      if (!curr.name) return acc

      acc[curr.name as WKEmojiNames] = curr

      return acc
    }, {} as Record<WKEmojiNames, GuildEmoji>)
  }

  get(name: WKEmojiNames): GuildEmoji {
    return this.#emojis[name]
  }

  getFromDungeon(dungeon: Dungeon): GuildEmoji {
    const emojiName = DUNGEON_EMOJIS[dungeon]

    return this.get(emojiName)
  }
}
