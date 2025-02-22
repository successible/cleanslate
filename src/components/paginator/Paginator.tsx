import { css } from '@emotion/react'
import type React from 'react'
import leftArrow from '../../assets/common/leftArrow.svg'
import rightArrow from '../../assets/common/rightArrow.svg'
import { colors } from '../../theme'
import { Image } from '../image/Image'

type props = {
  // Items is an array of pages, which is page, in turn, containing a number of items
  items: unknown[][]
  handleClick: (number: number) => void
  activePage: number
}

export const Paginator: React.FC<props> = ({
  activePage,
  handleClick,
  items,
}) => {
  const paginator = css`
    margin-bottom: 5px;
    margin-top: 20px;
  `

  const noHover = css`
    &:hover,
    &:focus {
      background-color: transparent;
      outline: 1px solid ${colors.black};
    }
  `

  return (
    <div css={paginator} className={'fec w100 h100 expand ai-fe'}>
      <div className="frc w100">
        <button
          onClick={(event) => {
            event.preventDefault()
            handleClick(0)
          }}
          type="button"
          className="background"
        >
          Start
        </button>
        <div className="fr">
          {/* The move left arrow */}
          <button
            css={noHover}
            onClick={(event) => {
              event.preventDefault()
              if (activePage > 0) {
                handleClick(activePage - 1)
              }
            }}
            type="button"
          >
            <Image
              width={15}
              height={15}
              alt="arrow pointing left"
              src={leftArrow}
            />
          </button>

          {/* The list itself */}
          <div>
            {activePage + 1} / {items.length}
          </div>

          {/* The move right arrow */}
          <button
            css={noHover}
            onClick={(event) => {
              event.preventDefault()
              if (activePage + 1 < items.length) {
                handleClick(activePage + 1)
              }
            }}
            type="button"
          >
            <Image
              width={15}
              height={15}
              alt="arrow pointing right"
              src={rightArrow}
            />
          </button>
        </div>

        <button
          onClick={(event) => {
            event.preventDefault()
            handleClick(items.length - 1)
          }}
          className="background"
          type="button"
        >
          End
        </button>
      </div>
    </div>
  )
}
