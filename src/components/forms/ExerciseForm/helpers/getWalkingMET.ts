import { round } from '../../../../helpers/round'

export const getWalkingMET = (mph: number, incline: number): number => {
  const speed = 26.8 * mph
  const horizontalComponent = speed * 0.1
  const verticalComponent = speed * 1.8 * (incline / 100)
  const vo2 = horizontalComponent + verticalComponent + 3.5
  const MET = vo2 / 3.5
  return round(MET, 2)
}
