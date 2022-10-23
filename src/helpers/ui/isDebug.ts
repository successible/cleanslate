import { isProduction } from './isProduction'

const debug = false
export const isDebug = () => {
  return isProduction() === false && debug
}
