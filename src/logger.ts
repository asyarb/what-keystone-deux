import kleur from "kleur"

export function info(...messages: unknown[]): void {
  console.info(kleur.bold().blue("[INFO]: " + messages))
}
