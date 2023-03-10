import { css } from '@emotion/react'
import { Food } from '../../../models/food'
import { Recipe } from '../../../models/recipe'
import { colors } from '../../../theme'

type props = { path: string[]; dummyFood: Food | Recipe }
export const Breadcrumbs: React.FC<props> = ({ dummyFood, path }) => {
  return (
    <div
      css={css`
        padding: 0px 20px;
        font-size: 0.9rem;
        font-weight: 400;
        padding: 15px 20px;
        color: ${colors.text};
      `}
    >
      {path.slice(1).map((p) => (
        <span
          key={p}
          css={css`
            margin-right: 5px;
          `}
        >
          {p.replace(dummyFood.name || '', '')} {'>'}
        </span>
      ))}
    </div>
  )
}
