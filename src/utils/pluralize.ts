export function pluralize(str: string, condition: boolean) {
  return `${str}${condition ? "s" : ""}`
}
