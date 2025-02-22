import { css } from '@emotion/react'
import type { Meal } from '../../models/log'
import { colors } from '../../theme'
import { Tabs } from '../tabs/Tabs'

type props = { meal: Meal; setMeal: (meal: Meal) => void }
export const MealInput: React.FC<props> = ({ meal, setMeal }) => {
  return (
    <div className="mt10 w100 mb10">
      <Tabs
        css={css`
          flex-wrap: nowrap;
          button {
            &.active {
              background-color: ${colors.pink} !important;
              border-color: ${colors.pink} !important;
            }
          }
          button > div {
            font-size: 0.8rem !important;
          }
        `}
        selected={meal}
        tabs={{
          Breakfast: {
            image: '',
            title: 'Breakfast',
          },
          Lunch: {
            image: '',
            title: 'Lunch',
          },
          Dinner: {
            image: '',
            title: 'Dinner',
          },
          Snack: {
            image: '',
            title: 'Snack',
          },
        }}
        onSelect={(tab) => {
          setMeal(tab as Meal)
        }}
      />
    </div>
  )
}
