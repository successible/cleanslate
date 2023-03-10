export const baseGroups = [
  'Dairy',
  'Fat or sugar',
  'Fruit',
  'Grain',
  'Other',
  'Protein',
  'Vegetable',
] as const
export type BaseGroups = (typeof baseGroups)[number]

export const customGroups = ['Custom'] as const
export type CustomGroups = (typeof customGroups)[number]

export type Group = BaseGroups | CustomGroups

export const groups: Group[] = [...baseGroups, ...customGroups].sort(
  (groupA, groupB) => groupA.localeCompare(groupB)
) as Group[] // sort alphabetically
