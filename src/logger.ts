import kleur from "kleur"

export function info(...messages: unknown[]): void {
  console.info(kleur.bold().blue("[INFO]: " + messages))
}

export function warn(...messages: unknown[]): void {
  console.warn(kleur.bold().yellow("[WARN]: " + messages))
}

export function error(...messages: unknown[]): void {
  console.error(kleur.bold().red("[ERROR]: " + messages))
}

export function debug(...messages: unknown[]): void {
  console.debug(kleur.bold().magenta("[DEBUG]: " + messages))
}
