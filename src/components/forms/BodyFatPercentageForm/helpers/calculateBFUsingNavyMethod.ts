import type { Sex } from '../../../../store/navbar/types'

// Reference: https://fitties.com/fat-caliper-plus/body-fat-calculation-methods/us-navy/
export const calculateBFUsingNavyMethod = (
  sex: Sex,
  height: number,
  waist: number,
  neck: number,
  hip: number
) => {
  if (sex === 'male') {
    return (
      86.01 * Math.log10(waist - neck) - 70.041 * Math.log10(height) + 36.76
    )
  }
  if (sex === 'female') {
    return (
      163.205 * Math.log10(waist + hip - neck) -
      97.684 * Math.log10(height) -
      78.387
    )
  }
  throw Error(
    `Error: calculateBFUsingNavyMethod: ${JSON.stringify({
      height,
      hip,
      neck,
      sex,
      waist,
    })}`
  )
}
