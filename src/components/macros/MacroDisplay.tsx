import { css } from '@emotion/react'
import type React from 'react'
import CalMini from '../../assets/common/calmini.svg'
import Density from '../../assets/common/density.svg'
import ProteinMini from '../../assets/common/proteinmini.svg'
import { round } from '../../helpers/round'
import type { Profile } from '../../models/profile'
import type { AllEvents } from '../../store/store'
import type { Dispatch } from '../../store/types'
import { useStoreon } from '../../storeon'
import { Image } from '../image/Image'

export const macros = css`
  font-size: 12px;
  margin-left: auto;
  white-space: nowrap;
  margin-top: 3px;

  img {
    margin: 0px 6px;
    margin-left: 0px;
  }

  span {
    margin-right: 6px;
  }
`
type props = {
  calories: number
  protein: number
  showTitles: boolean
  densities: [number, number, number]
  profile: Profile
}
export const MacroDisplay: React.FC<props> = ({
  showTitles,
  calories,
  protein,
  densities,
  profile,
}) => {
  const { dispatch }: { dispatch: Dispatch<AllEvents> } = useStoreon()
  const [caloricDensity, proteinDensity, combinedDensity] = densities

  return (
    <div id="macros" css={macros}>
      <div className="fr">
        <div id="MacrosCalories" className="fr">
          <Image width={10} height={10} alt="Fire" src={CalMini} />
          {showTitles && <div className="mr5">Calories:</div>}
          <span>{round(calories, 0)}</span>
        </div>
        <div id="MacrosProtein" className={`fr ${showTitles ? 'ml5' : ''}`}>
          <Image
            width={10}
            height={10}
            alt="Strong arm flexing"
            src={ProteinMini}
          />
          {showTitles && <div className="mr5">Protein:</div>}
          <span>{round(protein, 0)}</span>
        </div>
        {densities && profile.showDensities && (
          <div
            onClick={() =>
              dispatch(
                'openInformationModal',
                <div>
                  <strong>
                    {caloricDensity}/{proteinDensity}
                  </strong>{' '}
                  stands for caloric density ({caloricDensity}) and protein
                  density ({proteinDensity}). To learn more about them, first
                  navigate to{' '}
                  <a
                    href="https://cleanslate.sh/weight-loss"
                    target="_blank"
                    rel="noreferrer"
                  >
                    here
                  </a>
                  . Then, read the third and fourth sections.
                  <br />
                  <br />
                  If you would like to see a table of all basic foods by caloric
                  and protein density, navigate to{' '}
                  <a
                    href="#"
                    rel="noreferrer"
                    onClick={() => {
                      dispatch('openDensityModal')
                    }}
                  >
                    here
                  </a>
                  .
                </div>
              )
            }
          >
            <div id="MacrosDensity" className={`fr ${showTitles ? 'ml5' : ''}`}>
              <Image
                css={css`
                  position: relative;
                  top: 1px;
                `}
                width={10}
                height={10}
                alt="Little balls pressed together"
                src={Density}
              />
              {showTitles && <div className="mr5">Density:</div>}
              <span>
                {caloricDensity}/{proteinDensity}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
