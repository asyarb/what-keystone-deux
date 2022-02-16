import { MessageActionRow, MessageButton } from "discord.js"
import { command } from "jellycommands"
import { db } from "../db/client.js"
import { createEmbed } from "../discord/embed.js"
import { pluralize } from "../utils/pluralize.js"

const ONE_MINUTE = 60 * 1000

const ButtonAction = {
  Clear: "clear",
  Cancel: "cancel",
}

const CLEAR_BUTTON = new MessageButton()
  .setCustomId(ButtonAction.Clear)
  .setLabel("Clear")
  .setStyle("DANGER")
const CANCEL_BUTTON = new MessageButton()
  .setCustomId(ButtonAction.Cancel)
  .setLabel("Cancel")
  .setStyle("SECONDARY")
const BUTTON_ROW = new MessageActionRow().addComponents(
  CLEAR_BUTTON,
  CANCEL_BUTTON,
)

export default command({
  name: "clear",
  description: "Delete all Keystones for your guild.",

  global: true,

  run: async ({ interaction }) => {
    if (!interaction.guild) {
      return await interaction.reply({
        content: "Something went wrong with this request.",
      })
    }

    await interaction.reply({
      content: "Are you sure you want to delete all Keystones?",
      components: [BUTTON_ROW],
      ephemeral: true,
    })

    const msgInteraction = await interaction.channel?.awaitMessageComponent({
      componentType: "BUTTON",
      time: ONE_MINUTE,
    })

    if (msgInteraction?.customId === ButtonAction.Cancel) {
      return await msgInteraction.update({
        content: "Cancelled command.",
        components: [],
      })
    }

    await msgInteraction?.update({ content: "Confirmed!", components: [] })

    const result = await db.key.deleteMany({
      where: { guildDiscordId: interaction.guild.id },
    })

    const embed = await createEmbed({
      guildDiscordId: interaction.guild.id,
      guildName: interaction.guild?.name,
      isFullDelete: true,
    })

    const user = interaction.user.username
    const keysDeleted = result.count
    const keystoneOrKeystones = pluralize("keystone", keysDeleted > 1)

    return await interaction.followUp({
      content: `${user} cleared ${keysDeleted} ${keystoneOrKeystones}!`,
      embeds: [embed],
    })
  },
})
