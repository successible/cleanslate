import type { StoreonModule } from 'storeon'
import type { Food } from '../../models/food'
import type { Ingredient } from '../../models/ingredient'
import type { Recipe } from '../../models/recipe'

export type SelectedItem = Food | Recipe | null

export type EditorSlice = {
  editor: EditorState
}

export type EditorState = {
  ingredient: Ingredient | null
}

export type EditorEvents = {
  saveIngredient: Ingredient
  clearEditor: undefined
}

export type EditorModule = StoreonModule<EditorSlice, EditorEvents>
