/* eslint-disable @typescript-eslint/no-unused-vars */
import { Unit } from '../../../constants/units'
import { CommonItem } from '../types'

const defaultOnDelete = (id?: string) => {}
const defaultOnUpdate = (
  id: string | null,
  unit: Unit | null,
  amount: number | null
) => undefined

export const createDefaultItem = (unit?: Unit): CommonItem => {
  return {
    alias: null,
    amount: null,
    barcode: null,
    childRecipe: null,
    createdAt: null,
    food: null,
    id: '',
    name: '',
    onDelete: defaultOnDelete,
    onUpdate: defaultOnUpdate,
    profile: null,
    recipe: null,
    src: '',
    type: 'log',
    unit: unit || 'GRAM',
  }
}
