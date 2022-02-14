import kleur from "kleur"

export function info(...messages: string[]): void {
  console.info(kleur.bold().blue("[INFO]: " + messages))
}
