/**
 * Capitalizes the first letter of the given string.
 * @param str - The string to capitialize
 *
 * @returns A new string containing the capitalized string
 */
export function upperFirst(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1)
}
