import { isBrowser } from './isBrowser'

export const isPWA = () => {
  if (isBrowser()) {
    const displayMode = ['fullscreen', 'standalone', 'minimal-ui'].some(
      (displayMode) =>
        window.matchMedia(`(display-mode: ${displayMode})`).matches
    )
    return (
      displayMode ||
      // @ts-ignore - window.navigator.standalone only exists on iOS
      (window.navigator.standalone as boolean) ||
      document.referrer.includes('android-app://')
    )
  }
  return false
}
