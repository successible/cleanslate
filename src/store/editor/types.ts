import { StoreonModule } from 'storeon'
import { Food } from '../../models/Food/model'
import { Ingredient } from '../../models/Ingredient/model'
import { Recipe } from '../../models/Recipes/model'

export type SearchResult = Food | Recipe | null

export type EditorSlice = {
  editor: EditorState
}

export type EditorState = {
  searchResult: SearchResult
  dummyFood: SearchResult
  ingredient: Ingredient | null
}

export type EditorEvents = {
  saveSearchResult: SearchResult
  saveDummyFood: SearchResult
  saveIngredient: Ingredient
  clearEditor: undefined
}

export type EditorModule = StoreonModule<EditorSlice, EditorEvents>
