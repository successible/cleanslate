export type VolumeUnit = 'TBSP' | 'TSP' | 'CUP' | 'mL'
export type CountUnit = 'COUNT' | 'CONTAINER'
export type WeightUnit = 'GRAM' | 'LBS' | 'OZ'

export type Unit = VolumeUnit | CountUnit | WeightUnit

export const volumeUnits: Unit[] = ['CUP', 'TBSP', 'TSP', 'mL']

export const imperialUnits: Unit[] = ['OZ', 'LBS']

export const weightUnits: Unit[] = ['GRAM', ...imperialUnits]

export const countUnits: Unit[] = ['COUNT', 'CONTAINER']

export const units: Unit[] = [...weightUnits, ...volumeUnits]

export const allUnits: Unit[] = [...units, ...countUnits]

export const defaultContainer = 'container'

export const defaultCount = 'serving'
