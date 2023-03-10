import { css } from '@emotion/react'
import { Food } from '../../models/food'
import { Recipe } from '../../models/recipe'
import { StandardAdder } from '../standard-adder/StandardAdder'

type props = { foods: Food[]; recipes: Recipe[] }
export const IngredientModal: React.FC<props> = ({ foods, recipes }) => {
  const ingredientModal = css`
    margin: 0 auto;
    width: 90%;
  `

  return (
    <div css={ingredientModal}>
      <StandardAdder recipes={recipes} foods={foods} type="ingredient" />
    </div>
  )
}
