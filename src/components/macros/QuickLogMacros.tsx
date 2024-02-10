import React from 'react'
import CalMini from '../../assets/common/calmini.svg'
import ProteinMini from '../../assets/common/proteinmini.svg'
import { Image } from '../image/Image'
import { macros } from './Macros'

type props = {
  calories: number | null
  protein: number | null
  showProtein: boolean
}

export const QuickLogMacros: React.FC<props> = ({
  calories,
  protein,
  showProtein,
}) => {
  const showTitles = false
  return (
    <div className="mt10" id="macros" css={macros}>
      <div className="fr">
        <div id="MacrosCalories" className="fr">
          <Image width={10} height={10} alt="Fire" src={CalMini} />
          {showTitles && <div className="mr5">Calories:</div>}
          <span>{calories}</span>
        </div>
        {showProtein && (
          <div id="MacrosProtein" className={`fr ${showTitles ? 'ml5' : ''}`}>
            <Image
              width={10}
              height={10}
              alt="Strong arm flexing"
              src={ProteinMini}
            />
            {showTitles && <div className="mr5">Protein:</div>}
            <span>{protein}</span>
          </div>
        )}
      </div>
    </div>
  )
}
