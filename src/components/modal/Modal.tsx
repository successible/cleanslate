import { css } from '@emotion/react'
import { SerializedStyles } from '@emotion/react'
import FocusTrap from 'focus-trap-react'
import React from 'react'
import ReturnArrow from '../../assets/common/return-arrow.svg'
import { Modals } from '../../constants/modals'
import { getAnimationDuration } from '../../helpers/getAnimationDuration'
import { isMobile } from '../../helpers/isMobile'
import { colors } from '../../theme'
import { xlg } from '../../theme'
import { Image } from '../image/Image'
import { sidebarPresent } from './helpers/sidebarPresent'

type props = {
  id?: string
  styles?: SerializedStyles
  dialogStyles?: SerializedStyles
  children: React.ReactNode
  visible: boolean
  closeIcon?: boolean
  shouldPrompt?: boolean
  inTransition?: string
  outTransition?: string
  shellOutTransition?: string
  duration?: string
  // This function is executed when the modal is closed
  closeModal: () => void
  name: Modals
}

export const Modal: React.FC<props> = (props) => {
  const {
    children,
    closeIcon,
    closeModal,
    dialogStyles,
    duration,
    inTransition,
    name,
    outTransition,
    shellOutTransition,
    shouldPrompt,
    styles,
    visible,
  } = props

  // Ref
  const modalRef = React.useRef<HTMLDivElement>(null)
  const closeButton = React.useRef<HTMLButtonElement>(null)

  // State
  const [shouldRender, updateShouldRender] = React.useState(visible)
  const [isDirty, setIsDirty] = React.useState(false)

  // Animation configuration
  const IT = inTransition || (sidebarPresent() ? 'slideInLeft' : 'fadeIn')
  const OUT = outTransition || (sidebarPresent() ? 'slideOutLeft' : 'fadeOut')
  const d = duration || getAnimationDuration(visible ? IT : OUT)[0]

  const message = 'You may have unsaved changes that will be lost. Is that OK?'

  const close = () => {
    if (shouldPrompt && isDirty && window.confirm(message)) {
      closeModal()
    } else {
      closeModal()
    }
  }

  React.useEffect(() => {
    visible && updateShouldRender(true)
  }, [visible])

  const modalStyling = css`
    animation-duration: ${d};
    background: linear-gradient(rgba(1, 1, 1, 0.5), rgba(1, 1, 1, 0.5));
    min-height: 100%;
    > div:first-of-type {
      animation-duration: ${d};
      background-color: white;
      border-radius: 5px;
      margin: 20px auto;
      max-height: 80%;
      max-width: 900px;
      padding-bottom: 20px;
      width: 95%;
    }

    @media (max-width: ${xlg}px) {
      > div:first-of-type {
        border-radius: 0;
        height: auto;
        margin: 0;
        max-height: none;
        max-width: 100%;
        min-height: 100%;
        padding-bottom: 20px;
        padding-top: 10px;
        width: 100%;
      }
    }
  `

  const closeButtonStyling = css`
    background-color: white;
    border-color: transparent;
    border-radius: 5px 0 0 0;
    color: white;
    flex-shrink: 0;
    left: 5px;
    margin-right: auto;
    margin-top: 15px;
    padding: 0 10px;
    position: relative;
    width: 100%;

    &:active,
    &:hover,
    &:focus {
      background-color: white;
    }

    @media (min-width: ${xlg}px) {
      &:active,
      &:hover,
      &:focus {
        > img {
          outline: 1px solid ${colors.mediumgrey};
        }
      }
    }
  `
  const backgroundStyling = css`
    left: 0;
    min-height: 100%;
    position: absolute;
    top: 0;
    width: 100vw;
    z-index: -1;
  `

  const modalComponent = shouldRender ? (
    <div
      onKeyDown={(event) => {
        if (event.key === 'Escape') {
          close()
        } else {
          setIsDirty(true)
        }
      }}
      id={`modal-${name}`}
      css={[modalStyling, styles]}
      onAnimationEnd={() => !visible && updateShouldRender(false)}
      className={`absolute w100 h100 fcc scroll z1 animate ${
        visible ? '' : shellOutTransition || 'fadeOut'
      }`}
    >
      <div
        role="dialog"
        ref={modalRef}
        css={dialogStyles}
        className={`
            animate scroll fcs
            ${visible === true ? IT : OUT}
          `}
      >
        {(closeIcon === undefined || closeIcon) && (
          <button
            aria-label="close"
            css={closeButtonStyling}
            className={`fr ultra`}
            ref={closeButton}
            onClick={() => {
              close()
            }}
            type="button"
          >
            <Image
              height={30}
              width={20}
              alt="arrow point left"
              src={ReturnArrow}
            />
          </button>
        )}
        {children}
      </div>
      {/* This works because clicks do not propagate to the element below */}
      {/* The height is dynamically set with JavaScript depending on the height of the modal */}
      <div
        onClick={() => {
          close()
        }}
        css={backgroundStyling}
      ></div>
    </div>
  ) : (
    <div />
  )

  // Activating the focus trap on mobile causes a whole bunch of problems!
  if (isMobile()) {
    return modalComponent
  } else {
    return shouldRender ? (
      <FocusTrap>{modalComponent}</FocusTrap>
    ) : (
      modalComponent
    )
  }
}
