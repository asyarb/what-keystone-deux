import { command } from "jellycommands"
import { IS_DEV } from "../env.js"

export default command({
  name: "add",
  description: "Register a new keystone",
  options: [
    {
      type: "STRING",
      name: "dungeon",
      description: "The dungeon to add.",
      required: true,
      choices: [
        { name: "Necrotic Wake", value: "necrotic_wake" },
        { name: "Plaguefall", value: "plaguefall" },
        { name: "Mists of Tirna Scithe", value: "mists_of_tirna_scithe" },
        { name: "Halls of Atonement", value: "halls_of_atonement" },
        { name: "Theater of Pain", value: "theater_of_pain" },
        { name: "De Other Side", value: "de_other_side" },
        { name: "Spires of Ascension", value: "spires_of_ascension" },
        { name: "Sanguine Depths", value: "sanguine_depths" },
      ],
    },
    {
      type: "INTEGER",
      name: "level",
      description: "The keystone level of the dungeon",
      required: true,
    },
    {
      type: "STRING",
      name: "character",
      description: "The character to tie the keystone to",
      required: true,
    },
  ],

  dev: IS_DEV,
  global: !IS_DEV,

  run: async ({ interaction }) => {
    await interaction.reply({ content: "hello" })
  },
})
