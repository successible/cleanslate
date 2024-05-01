import { isBrowser } from './isBrowser'
import { isIpad } from './isIpad'

export const isMobile = () => {
  const UA = navigator.userAgent
  const toMatch = [
    /Android/i,
    /webOS/i,
    /iPhone/i,
    /iPad/i,
    /iPod/i,
    /BlackBerry/i,
    /Windows Phone/i,
  ]

  // iPad does not show up on the User Agent for Safari (13 or higher) on iPads
  // https://developer.apple.com/forums/thread/119186?page=2

  const isMobileDevice =
    isIpad() ||
    toMatch.some((toMatchItem) => {
      return isBrowser() ? UA.match(toMatchItem) : false
    })

  return isMobileDevice
}
