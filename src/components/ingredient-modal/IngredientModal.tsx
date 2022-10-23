import { css } from '@emotion/react'
import { Food } from '../../models/Food/model'
import { StandardEditor } from '../standard-editor/StandardEditor'

type props = { foods: Food[] }
export const IngredientModal: React.FC<props> = ({ foods }) => {
  const ingredientModal = css`
    margin: 0 auto;
    width: 90%;
  `

  return (
    <div css={ingredientModal}>
      <StandardEditor foods={foods} type="ingredient" />
    </div>
  )
}
