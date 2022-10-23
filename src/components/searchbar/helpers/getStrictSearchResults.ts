/** Example: If a list has the ['action', 'cake', 'cheese'], it only returns cake and cheese because the words start with c*/
export const getStrictSearchResults = (
  text: string,
  items: string[]
): string[] => {
  if (text) {
    // Limit everything to start with the letter
    const subset = items.filter((item) => {
      return item.toLowerCase().startsWith(text.toLowerCase())
    })
    return subset
  } else {
    return items
  }
}
