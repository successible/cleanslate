/** Given a collection (ingredients of components) and a new item, either update the collection with the revised item or insert the item into the collection */
export const upsertItem = <Item extends { id: string }>(
  items: Item[],
  updatedItem: Item
): Item[] => {
  // Try to match the id of the item (Ingredient or Component) to update and an existing item
  // If one exists, we need to update an item, not create a new one
  const existingIngredient = items.find((item) => item.id === updatedItem.id)
  if (existingIngredient !== undefined) {
    // Replace the item at the old id with the new item
    return items.map((item) =>
      item.id === existingIngredient.id ? updatedItem : item
    )
  } else {
    console.log([...items, updatedItem])
    return [...items, updatedItem]
  }
}
