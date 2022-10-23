export type QuickAddUnit = 'CALORIE' | 'PROTEIN' | 'EXERCISE'
export type VolumeUnit = 'TBSP' | 'TSP' | 'CUP'
export type CountUnit = 'COUNT' | 'CONTAINER'
export type WeightUnit = 'GRAM' | 'LBS' | 'OZ'

export type Unit = QuickAddUnit | VolumeUnit | CountUnit | WeightUnit

export interface LogSubmission {
  food: string | null
  amount: number
  unit: string | Unit | null
}

export interface RecipeLogSubmission {
  recipe: string | null
  amount: number
  unit: 'GRAM' | 'LBS' | 'OZ' | 'COUNT' | 'CONTAINER'
}

export const defaultCount = 'serving'
export const defaultContainer = 'container'
