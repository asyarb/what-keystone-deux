import add from "./add.js"
import clear from "./clear.js"
import _delete from "./delete.js"
import list from "./list.js"
import { Command } from "../discord/command.js"

const _commands = [add, clear, _delete, list]

export const commands = new Map<string, Command>()
_commands.forEach((c) => commands.set(c.name, c))
