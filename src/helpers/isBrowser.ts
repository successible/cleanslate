export const isBrowser = () => {
  return typeof window !== 'undefined' && window.localStorage
}
