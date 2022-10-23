import { Unit } from './types'

export const volumeUnits: Unit[] = ['CUP', 'TBSP', 'TSP']

export const imperialUnits: Unit[] = ['OZ', 'LBS']

export const weightUnits: Unit[] = ['GRAM', ...imperialUnits]

export const quickAddUnits: Unit[] = ['CALORIE', 'PROTEIN', 'EXERCISE']

export const countUnits: Unit[] = ['COUNT', 'CONTAINER']

export const units: Unit[] = [...weightUnits, ...volumeUnits, ...quickAddUnits]

export const allUnits: Unit[] = [...units, ...countUnits]
