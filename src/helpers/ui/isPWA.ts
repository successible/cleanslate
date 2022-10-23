import { isBrowser } from '../data/isBrowser'

export const isPWA = () =>
  isBrowser()
    ? window.matchMedia('(display-mode: standalone)').matches ||
      // @ts-ignore
      window.navigator.standalone ||
      document.referrer.includes('android-app://')
    : false
