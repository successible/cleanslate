// Customize for each dummy food how much of the name is cut and replaced with tags
// The default is 2, but some look better with 1
export const getThreshold = (root: string) => {
  if (
    [
      'Beef',
      'Lettuce',
      'Noodles',
      'Pasta',
      'Protein powder',
      'Rice',
      'Ribs',
      'Vinegar',
    ].includes(root)
  ) {
    return 1
  }
  return 2
}
