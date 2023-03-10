import { capitalize } from '../../../helpers/capitalize'

/**
 * Use this to remove the name of the level from the food. For example

 * "Turkey" in turkey breast

 * "Breast" in turkey breast

 * And so on...

 * Also remove parentheses and capitalize the name
 */
export const formatName = (name: string, keys: string[]) => {
  for (const key of keys) {
    const categoryRegex = new RegExp(`${key}`, 'gi')
    name = capitalize(
      name
        .replace(categoryRegex, '')
        // Special exception for ground meat
        .replace('Ground', '')
        .replace(')', '')
        .replace('(', '')
        .trim()
    )
  }
  return name
}
