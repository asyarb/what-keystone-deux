/*
  Warnings:

  - A unique constraint covering the columns `[character,guildDiscordId]` on the table `keys` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "keys_character_guildDiscordId_key" ON "keys"("character", "guildDiscordId");
