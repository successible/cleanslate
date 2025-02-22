/** Adjust the number of items on each page by the height of the webpage */
export const getNumberOfItems = (
  containerRef: React.RefObject<HTMLDivElement | null>,
  firstItem: React.RefObject<HTMLDivElement | null>
) => {
  // Get the height of the list and divide it by the height of item, to get the maximum number
  // of items that can fit on a page. For example, an iPad Pro can take about 15 items,
  // whereas an iPhone 6 can only take about 5
  const containerHeight = containerRef.current?.getBoundingClientRect().height
  const itemHeight = firstItem.current?.getBoundingClientRect().height

  if (containerHeight && itemHeight) {
    // Always round and subtract by 1 to make sure we don't overflow the container!
    const numberOfItems = Math.ceil(containerHeight / itemHeight)
    return numberOfItems
  }
  return null
}
