import type { Awaitable, ClientEvents } from "discord.js"

interface EventArgs<K extends keyof ClientEvents> {
  name: K
  run: (...args: ClientEvents[K]) => Awaitable<void>
}

export class Event<K extends keyof ClientEvents> {
  name: EventArgs<K>["name"]
  run: EventArgs<K>["run"]

  constructor(args: EventArgs<K>) {
    this.name = args.name
    this.run = args.run
  }
}
