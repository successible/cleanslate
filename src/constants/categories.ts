import type { Group } from './groups'

export const customCategories = ['Food', 'Recipe'] as const
export type CustomCategories = (typeof customCategories)[number]

export const dairyCategories = [
  'Cheese',
  'Cottage cheese',
  'Dairy',
  'Milk',
  'Nut milk',
  'Quark',
  'Yogurt',
] as const
export type DairyCategories = (typeof dairyCategories)[number]

export const fatsAndSugarsCategories = [
  'Baked food',
  'Butter',
  'Candy',
  'Cream',
  'Ice cream',
  'Mayonnaise',
  'Nut',
  'Oil',
  'Seed',
  'Snack',
  'Sour cream',
  'Sweetener',
] as const

export type FatsAndSugarsCategories = (typeof fatsAndSugarsCategories)[number]

export const fruitCategories = ['Dried fruit', 'Fruit'] as const
export type FruitCategories = (typeof fruitCategories)[number]

export const grainCategories = [
  'Bagel',
  'Bread',
  'Dough',
  'Flour',
  'Muffin',
  'Noodles',
  'Pasta',
  'Rice',
  'Tortilla',
  'Whole grain',
] as const
export type GrainCategories = (typeof grainCategories)[number]

export const otherCategories = [
  'Alcohol',
  'Beverage',
  'Prepared food',
  'Sauce',
  'Stock',
  'Vinegar',
  'Wine',
] as const
export type OtherCategories = (typeof otherCategories)[number]

export const proteinCategories = [
  'Bean',
  'Beef',
  'Chicken',
  'Chickpea',
  'Cold cut',
  'Edamame',
  'Eggs',
  'Fish',
  'Gluten',
  'Goat',
  'Ground meat',
  'Jerky',
  'Lamb',
  'Lentil',
  'Lentils',
  'Organ meat',
  'Pea',
  'Pork',
  'Protein powder',
  'Ribs',
  'Salmon',
  'Shellfish',
  'Soy',
  'Turkey',
] as const
export type ProteinCategories = (typeof proteinCategories)[number]

export const vegetableCategories = [
  'Dried herb',
  'Herb',
  'Leafy green',
  'Lettuce',
  'Pea',
  'Pepper',
  'Spice',
  'Vegetable',
] as const
export type VegetableCategories = (typeof vegetableCategories)[number]

// Both the type and the array are assembled from the types above, eliminating errors :)
export type Category =
  | CustomCategories
  | DairyCategories
  | FatsAndSugarsCategories
  | FruitCategories
  | GrainCategories
  | OtherCategories
  | ProteinCategories
  | VegetableCategories

export const categories: Category[] = [
  ...customCategories,
  ...dairyCategories,
  ...fatsAndSugarsCategories,
  ...fruitCategories,
  ...grainCategories,
  ...otherCategories,
  ...proteinCategories,
  ...vegetableCategories,
].sort((categoryA, categoryB) =>
  categoryA.localeCompare(categoryB)
) as Category[] // sort alphabetically

export const secondaryCategories: Category[] = [
  ...otherCategories,
  'Sweetener',
  'Herb',
  'Spice',
  'Nut milk',
]

// Helper functions //

export const mapGroupToCategories = (group: Group): Category[] => {
  const map = {
    Custom: customCategories,
    Dairy: dairyCategories,
    'Fat or sugar': fatsAndSugarsCategories,
    Fruit: fruitCategories,
    Grain: grainCategories,
    Other: otherCategories,
    Protein: proteinCategories,
    Vegetable: vegetableCategories,
  }
  return map[group] as unknown as Category[]
}

export const mapCategoryToGroup = (category: Category): Group | null => {
  if ((customCategories as unknown as Category[]).includes(category)) {
    return 'Custom'
  }
  if ((dairyCategories as unknown as Category[]).includes(category)) {
    return 'Dairy'
  }
  if ((fatsAndSugarsCategories as unknown as Category[]).includes(category)) {
    return 'Fat or sugar'
  }
  if ((fruitCategories as unknown as Category[]).includes(category)) {
    return 'Fruit'
  }
  if ((grainCategories as unknown as Category[]).includes(category)) {
    return 'Grain'
  }
  if ((otherCategories as unknown as Category[]).includes(category)) {
    return 'Other'
  }
  if ((proteinCategories as unknown as Category[]).includes(category)) {
    return 'Protein'
  }
  if ((vegetableCategories as unknown as Category[]).includes(category)) {
    return 'Vegetable'
  }
  return null
}
