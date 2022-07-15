import type {
  APIApplicationCommandOption,
  RESTPostAPIApplicationCommandsJSONBody,
} from "discord-api-types/v10"
import type { Client, CommandInteraction, Awaitable } from "discord.js"

export interface CommandArgs {
  name: string
  description: string
  options?: APIApplicationCommandOption[]
  defer?: boolean
  run: (args: {
    client: Client
    interaction: CommandInteraction
  }) => Awaitable<unknown>
}

export class Command {
  name: CommandArgs["name"]
  description: CommandArgs["description"]
  options: CommandArgs["options"]
  defer: CommandArgs["defer"] = false
  run: CommandArgs["run"]

  constructor(args: CommandArgs) {
    this.name = args.name
    this.description = args.description
    this.options = args.options
    this.defer = args.defer
    this.run = args.run
  }

  toCommandData(): RESTPostAPIApplicationCommandsJSONBody {
    return {
      name: this.name,
      description: this.description,
      options: this.options,
    }
  }
}
