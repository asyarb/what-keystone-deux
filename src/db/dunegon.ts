import { type Dungeon } from "@prisma/client"

const DUNGEON_NAMES: Record<Dungeon, string> = {
  DE_OTHER_SIDE: "De Other Side",
  HALLS_OF_ATONEMENT: "Halls of Atonement",
  MISTS_OF_TIRNA_SCITHE: "Mists of Tirna Schithe",
  NECROTIC_WAKE: "Necrotic Wake",
  PLAGUEFALL: "Plaguefall",
  SANGUINE_DEPTHS: "Sanguine Depths",
  SPIRES_OF_ASCENSION: "Spires of Ascension",
  TAZAVESH_LOWER: "Tazavesh Lower (Beta)",
  TAZAVESH_UPPER: "Tazavesh Upper (Beta)",
  THEATER_OF_PAIN: "Theater of Pain",
}

export function getDungeonName(dungeon: Dungeon): string {
  return DUNGEON_NAMES[dungeon]
}
