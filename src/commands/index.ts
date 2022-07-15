import add from "./add.js"
import clear from "./clear.js"
import del from "./delete.js"
import list from "./list.js"
import { Command } from "../discord/command.js"

export const commands = new Map<string, Command>([
  [add.name, add],
  [clear.name, clear],
  [del.name, del],
  [list.name, list],
])
