-- CreateEnum
CREATE TYPE "Dungeon" AS ENUM ('NECROTIC_WAKE', 'PLAGUEFALL', 'MISTS_OF_TIRNA_SCITHE', 'HALLS_OF_ATONEMENT', 'THEATER_OF_PAIN', 'DE_OTHER_SIDE', 'SPIRES_OF_ASCENSION', 'SANGUINE_DEPTHS', 'TAZAVESH_UPPER', 'TAZAVESH_LOWER');

-- CreateTable
CREATE TABLE "guilds" (
    "name" TEXT NOT NULL,
    "discord_id" TEXT NOT NULL,

    CONSTRAINT "guilds_pkey" PRIMARY KEY ("discord_id")
);

-- CreateTable
CREATE TABLE "keys" (
    "id" TEXT NOT NULL,
    "character" TEXT NOT NULL,
    "dungeon" "Dungeon" NOT NULL,
    "level" INTEGER NOT NULL,
    "guildDiscordId" TEXT NOT NULL,

    CONSTRAINT "keys_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "guilds_discord_id_key" ON "guilds"("discord_id");

-- AddForeignKey
ALTER TABLE "keys" ADD CONSTRAINT "keys_guildDiscordId_fkey" FOREIGN KEY ("guildDiscordId") REFERENCES "guilds"("discord_id") ON DELETE RESTRICT ON UPDATE CASCADE;
