/*
  Warnings:

  - The values [TAZAVESH_UPPER,TAZAVESH_LOWER] on the enum `Dungeon` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Dungeon_new" AS ENUM ('NECROTIC_WAKE', 'PLAGUEFALL', 'MISTS_OF_TIRNA_SCITHE', 'HALLS_OF_ATONEMENT', 'THEATER_OF_PAIN', 'DE_OTHER_SIDE', 'SPIRES_OF_ASCENSION', 'SANGUINE_DEPTHS', 'TAZAVESH_STREETS_OF_WONDER', 'TAZAVESH_SOLEAHS_GAMBIT');
ALTER TABLE "keys" ALTER COLUMN "dungeon" TYPE "Dungeon_new" USING ("dungeon"::text::"Dungeon_new");
ALTER TYPE "Dungeon" RENAME TO "Dungeon_old";
ALTER TYPE "Dungeon_new" RENAME TO "Dungeon";
DROP TYPE "Dungeon_old";
COMMIT;
