export const createAlphabetDictionary = (): Record<string, null | number> => {
  const alphabet = 'abcdefghijklmnopqrstuvwxyz'
  const alphabetDictionary: Record<string, null | number> = {}
  alphabet.split('').forEach((letter) => {
    alphabetDictionary[letter.toUpperCase()] = null
  })
  return alphabetDictionary
}
