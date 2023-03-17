import { css } from '@emotion/react'
import { Food } from '../../models/food'
import { Profile } from '../../models/profile'
import { Recipe } from '../../models/recipe'
import { StandardAdder } from '../standard-adder/StandardAdder'

type props = { profile: Profile; foods: Food[]; recipes: Recipe[] }
export const IngredientModal: React.FC<props> = ({
  foods,
  profile,
  recipes,
}) => {
  return (
    <div
      css={css`
        margin: 0 auto;
        width: 90%;
      `}
    >
      <StandardAdder
        profile={profile}
        recipes={recipes}
        foods={foods}
        type="ingredient"
      />
    </div>
  )
}
