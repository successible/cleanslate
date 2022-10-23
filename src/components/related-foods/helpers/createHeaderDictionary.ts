import { createAlphabetDictionary } from './createAlphabetDictionary'

export const createHeaderDictionary = (nextLevel: string[]) => {
  const alphabetDictionary = createAlphabetDictionary()
  // Create { A: 0, B: 1, C: 4, D: null, E: 10 }
  // Then, when iterating through each name, if the index matches the letter it should have a letter header
  // Otherwise, it should not have one. This prevents two scenarios:
  // Creating a letter header when no foods match it
  // Create multiple, identical letter headers. For example, multiple cheeses start with the letter C
  nextLevel
    .sort((a, b) => a.localeCompare(b))
    .forEach((name, index) => {
      const firstLetter = name.slice(0, 1)
      if (alphabetDictionary[firstLetter] !== null) {
        // Do nothing
      } else {
        alphabetDictionary[firstLetter] = index
      }
    })
  return alphabetDictionary
}
