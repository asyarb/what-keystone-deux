import add from "./add.js"
import clear from "./clear.js"
import _delete from "./delete.js"
import list from "./list.js"
import { Command } from "../discord/command.js"

const COMMANDS = [add, clear, _delete, list]

const commands = COMMANDS.reduce((acc, curr) => {
  acc[curr.name] = curr

  return acc
}, {} as Record<string, Command>)

export class Commands {
  static get(name: string): Command | undefined {
    return commands[name]
  }

  static all() {
    return COMMANDS
  }
}
