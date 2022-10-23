import { isBrowser } from '../data/isBrowser'

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
  return (
    // iPad does not show up on the User Agent for Safari (13 or more) on iPads
    // https://developer.apple.com/forums/thread/119186?page=2
    (UA.includes('Mac') && 'ontouchend' in document) ||
    toMatch.some((toMatchItem) => {
      return isBrowser() ? UA.match(toMatchItem) : false
    })
  )
}
