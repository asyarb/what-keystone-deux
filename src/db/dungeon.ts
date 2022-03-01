import { type Dungeon as DBDungeon } from "@prisma/client"

const DUNGEON_DISPLAY_NAMES: Record<DBDungeon, string> = {
  DE_OTHER_SIDE: "De Other Side",
  HALLS_OF_ATONEMENT: "Halls of Atonement",
  MISTS_OF_TIRNA_SCITHE: "Mists of Tirna Scithe",
  NECROTIC_WAKE: "Necrotic Wake",
  PLAGUEFALL: "Plaguefall",
  SANGUINE_DEPTHS: "Sanguine Depths",
  SPIRES_OF_ASCENSION: "Spires of Ascension",
  TAZAVESH_STREETS_OF_WONDER: "Tazavesh: Streets of Wonder",
  TAZAVESH_SOLEAHS_GAMBIT: "Tazavesh: So'leah's Gambit",
  THEATER_OF_PAIN: "Theater of Pain",
}

export const asArray = Object.keys(DUNGEON_DISPLAY_NAMES) as DBDungeon[]

export function toDisplayName(dungeon: DBDungeon): string {
  return DUNGEON_DISPLAY_NAMES[dungeon]
}
