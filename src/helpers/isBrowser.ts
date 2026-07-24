export const isBrowser = (): boolean => {
  // window.localStorage returns an object, so we explicitly conver to boolean
  // where it will return true if there is localStorage, otherwise false
  return typeof window !== 'undefined' && Boolean(window.localStorage)
}
