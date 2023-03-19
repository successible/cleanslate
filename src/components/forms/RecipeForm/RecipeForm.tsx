import { css } from '@emotion/react'
import { curry } from '@typed/curry'
import React, { useEffect } from 'react'
import { useStoreon } from 'storeon/react'
import { Food } from '../../../models/food'
import { Ingredient } from '../../../models/ingredient'
import { Profile } from '../../../models/profile'
import { Recipe } from '../../../models/recipe'
import { EditorState } from '../../../store/editor/types'
import { AllEvents } from '../../../store/store'
import { Dispatch } from '../../../store/types'
import { IngredientList } from '../../list/Ingredient/IngredientList'
import { Macros } from '../../macros/Macros'
import { upsertItem } from '../helpers/upsertItem'
import { createRecipeLog } from './helpers/createRecipeLog'
import { submitRecipe } from './helpers/submitRecipe'

type props = { recipe: Recipe | null; foods: Food[]; profile: Profile }

export type RecipeFormData = {
  name: string
  countName: string
  ingredients: Ingredient[]
}

export const RecipeForm: React.FC<props> = ({ profile, recipe }) => {
  const {
    dispatch,
    editor,
  }: { dispatch: Dispatch<AllEvents>; editor: EditorState } =
    useStoreon('editor')

  const [name, updateName] = React.useState(recipe?.name || '')
  const [countName, updateCountName] = React.useState(recipe?.countName || '')
  const remoteIngredients = recipe?.ingredients || ([] as Ingredient[])
  const [ingredients, setIngredients] = React.useState(remoteIngredients)
  const { ingredient } = editor

  const data = {
    countName,
    ingredients,
    name,
  }

  // Make sure the form is filled with "late" data
  React.useEffect(() => {
    updateName(recipe?.name || '')
    updateCountName(recipe?.countName || '')
    setIngredients(remoteIngredients)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [recipe])

  // Helpers

  const updateIngredients = (
    ingredients: Ingredient[],
    updatedIngredient: Ingredient
  ) => {
    const updatedIngredients = upsertItem(ingredients, updatedIngredient)
    setIngredients(updatedIngredients)
  }

  const deleteIngredient = (id: string) => {
    const updatedIngredients = ingredients.filter(
      (ingredient) => ingredient.id !== id
    )
    setIngredients(updatedIngredients)
  }

  useEffect(() => {
    if (ingredient !== null) {
      updateIngredients(ingredients, ingredient)
      dispatch('saveIngredient', null)
      dispatch('closeAddIngredientModal', true)
    }
  }, [dispatch, ingredient, ingredients])

  const addIngredientStyling = css`
    font-size: 0.8rem;
    font-weight: 300;
    position: relative;
  `

  const fields = () => {
    return (
      <div className="group">
        <div className="w60">
          <label htmlFor="nameRecipe">Name</label>
          <input
            placeholder="Chili"
            required
            id="nameRecipe"
            onChange={(event) => {
              updateName(event.target.value)
            }}
            value={data.name}
            type="text"
            autoCapitalize={'on'}
            autoComplete={'off'}
            autoCorrect={'off'}
          />
        </div>
        <div className="w40">
          <label htmlFor="countNameRecipe">Label</label>
          <input
            required
            id="countNameRecipe"
            onChange={(event) => {
              updateCountName(event.target.value)
            }}
            value={countName}
            type="text"
            placeholder="bowl"
            autoCapitalize={'off'}
            autoComplete={'off'}
            autoCorrect={'off'}
          />
        </div>
      </div>
    )
  }

  return (
    <form
      className="fcs expand"
      onSubmit={(event) => {
        event.preventDefault()
        submitRecipe(
          data,
          ingredients,
          remoteIngredients,
          recipe,
          dispatch,
          true
        )
      }}
    >
      {fields()}

      <div className="fr w100 mt20 mb25">
        <button
          onClick={() => dispatch('openAddIngredientModal', recipe?.id)}
          type="button"
          css={addIngredientStyling}
          className={`blue`}
        >
          Add Ingredient +
        </button>

        {ingredients.length > 0 && (
          <div className="background end pbutton-large rounded nohover">
            <Macros log={createRecipeLog(ingredients)} profile={profile} />
          </div>
        )}
      </div>

      <IngredientList
        recipe={recipe}
        ingredients={ingredients}
        updateIngredient={curry(updateIngredients)(ingredients)}
        deleteIngredient={deleteIngredient}
      />
      <button type="submit" className="purple bold mt20 end">
        {recipe ? 'Update Recipe' : 'Create Recipe'}
      </button>
    </form>
  )
}
