import { css } from '@emotion/react'
import Barcode from '../../../assets/common/barcode.svg'
import Calculator from '../../../assets/common/calculator.svg'
import Edit from '../../../assets/common/edit.svg'
import Runner from '../../../assets/common/exercise.svg'
import Rocket from '../../../assets/common/fast.svg'
import CustomFood from '../../../assets/common/food.svg'
import Food from '../../../assets/common/foodbowl.svg'
import Search from '../../../assets/common/magnify.svg'
import Mortarboard from '../../../assets/common/mortarboard.svg'
import CustomRecipe from '../../../assets/common/recipe.svg'
import Sunrise from '../../../assets/common/sunrise.svg'
import { isMobile } from '../../../helpers/isMobile'
import type { Profile } from '../../../models/profile'
import type { AllEvents } from '../../../store/store'
import type { Dispatch } from '../../../store/types'
import { useStoreon } from '../../../storeon'
import { colors } from '../../../theme'
import { md } from '../../../theme'
import { HiddenInput } from '../../buttons/HiddenInput'
import { Explanation } from '../../explanation/Explanation'
import { Image } from '../../image/Image'

type props = {
  profile: Profile
}
export const Shell: React.FC<props> = ({ profile }) => {
  const { dispatch }: { dispatch: Dispatch<AllEvents> } = useStoreon()

  const hour = +profile.startTime.split(':')[0] % 24
  const minute = profile.startTime.split(':')[1]
  const time = `${hour % 12 || 12}:${minute}${hour < 12 ? ' AM' : ' PM'}`

  const shell = css`
    margin-bottom: 50px;
    margin-top: 50px;
    width: 100%;
  `
  const section = css`
    margin-top: 50px;
    width: 95%;
  `
  const sectionHeader = css`
    margin-bottom: 10px;
    > button,
    a.button {
      border-radius: 5px;
      font-size: 14px;
      margin-left: 10px;
      padding: 7.5px 10px;
      position: relative;
    }
  `
  const buttons = css`
    width: 100%;
    button,
    a.button {
      border: 1px solid ${colors.lightgrey};
      flex: 1;
      font-size: 1rem;
      margin: 10px 5px;
      position: relative;

      @media (max-width: ${md}px) {
        min-width: 100%;
      }
    }
  `

  const explanationHeader = css`
    margin-right: 5px;
  `

  return (
    <div id="Shell" css={shell} className={'fcc'}>
      <Image width={70} height={70} src={Sunrise} alt="sun" />
      <div
        css={css`
          color: ${colors.black};
          font-size: 1.5rem;
          font-weight: 700;
          margin-top: 15px;
        `}
      >
        It{`'`}s a new day!
      </div>
      <div
        css={css`
          font-size: 1.2rem;
          font-weight: 300;
          margin-top: 10px;
        `}
      >
        Here are some things to do
      </div>

      {profile.showCalories && (
        <div css={section} className={'fc'}>
          <div css={sectionHeader} className={'fr'}>
            <Image width={40} height={40} src={Calculator} alt="Calculator" />
            <div className="ml15">Set calorie {'&'} protein goals</div>
            <button
              className="reset pink ml10"
              type="button"
              onClick={() => dispatch('openTargetModal')}
            >
              Here
            </button>
          </div>
          <Explanation color="background">
            <div className="fr">
              <strong css={explanationHeader}>Remember: </strong> Logs reset
              daily at {profile.startTime === '00:00:00' ? 'midnight' : time}.
            </div>
          </Explanation>
        </div>
      )}

      <div css={section} className={'fc'}>
        <div css={sectionHeader} className={'fr'}>
          <Image width={40} height={40} src={Food} alt="Food" />
          <div className="ml15">Add a log</div>
        </div>
        <div css={buttons} className={'fr wrap'}>
          <button
            type="button"
            onClick={() => {
              dispatch('openModal')
            }}
          >
            <Image width={30} height={30} src={Search} alt="search" />
            <HiddenInput />
            <div className="ml10">Search</div>
          </button>
          <button
            type="button"
            onClick={() => {
              dispatch('openBarcodeModal')
            }}
          >
            <Image width={30} height={30} src={Barcode} alt="Barcode" />
            <div className="ml10">Barcode</div>
          </button>
          {profile.showCalories && (
            <button
              type="button"
              onClick={() => {
                dispatch('openQuickAddModal')
              }}
            >
              <Image width={30} height={30} src={Rocket} alt="search" />
              <HiddenInput type="text" inputMode="decimal" />
              <div
                className="ml10"
                css={css`
                  white-space: nowrap;
                `}
              >
                Quick Add
              </div>
            </button>
          )}
          {profile.showCalories && (
            <button
              type="button"
              onClick={() => {
                dispatch('openExerciseModal', null)
              }}
            >
              <Image width={30} height={30} src={Runner} alt="search" />
              <div className="ml10">Exercise</div>
            </button>
          )}
        </div>
        {!isMobile() && (
          <div className="w100">
            <Explanation color="blue">
              <div>
                <strong>Tip:</strong> To log your food even faster, check out{' '}
                <button
                  type="button"
                  className="empty inline"
                  onClick={() => dispatch('openHelpModal')}
                >
                  <strong>
                    <u>our keyboard shortcuts</u>
                  </strong>
                  .
                </button>
              </div>
            </Explanation>
          </div>
        )}
        {profile.showCalories && (
          <Explanation color="green">
            <div>
              <strong>Tip: </strong> With{' '}
              <button
                type="button"
                className="empty inline mr5"
                onClick={() => dispatch('openQuickAddModal')}
              >
                <strong>Quick Add 🚀</strong>
              </button>
              you can add calories and protein directly.
            </div>
          </Explanation>
        )}
      </div>
      <div css={section} className={'fc'}>
        <div css={sectionHeader} className={'fr'}>
          <Image width={40} height={40} src={Edit} alt="Pencil" />
          <div className="ml15">Create a food or recipe</div>
        </div>
        <div css={buttons} className={'fr wrap'}>
          <button
            type="button"
            onClick={() => {
              dispatch('openFoodFormModal')
            }}
          >
            <Image width={30} height={30} src={CustomFood} alt="search" />
            <div className="ml10">Food</div>
          </button>
          <button
            type="button"
            onClick={() => {
              dispatch('openRecipeFormModal')
            }}
          >
            <Image width={30} height={30} src={CustomRecipe} alt="Recipe" />
            <div className="ml10">Recipe</div>
          </button>
        </div>
      </div>

      <div css={section} className={'fc'}>
        <div css={sectionHeader} className={'fr'}>
          <Image width={40} height={40} src={Mortarboard} alt="Mortarboard" />
          <div className="ml15">Improve your skills</div>
          <a
            href="https://cleanslate.sh/curriculum"
            target="_blank"
            className="pink button"
            rel="noreferrer"
          >
            Here
          </a>
        </div>
        <Explanation color="background">
          <div>Losing weight is a skill. Let our curriculum teach you how!</div>
        </Explanation>
      </div>
    </div>
  )
}
