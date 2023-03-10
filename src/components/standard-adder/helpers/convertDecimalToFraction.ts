import { convertFractionToDecimal } from './convertFractionToDecimal'

export const convertDecimalToFraction = (
  amount: number | null | undefined
): string => {
  // If no amount is passed, return any empty string
  if (!amount) {
    return ''
  }
  // Don't use fractions if the decimal is above 1 or below 0
  else if (typeof amount === 'number' && (amount > 1 || amount < 0)) {
    return String(amount)
  } else {
    // Source: https://jonisalonen.com/2012/converting-decimal-numbers-to-ratios/
    const tolerance = 1.0e-6
    let h1 = 1
    let h2 = 0
    let k1 = 0
    let k2 = 1
    let b = amount
    do {
      const a = Math.floor(b)
      let aux = h1
      h1 = a * h1 + h2
      h2 = aux
      aux = k1
      k1 = a * k1 + k2
      k2 = aux
      b = 1 / (b - a)
    } while (Math.abs(amount - h1 / k1) > amount * tolerance)
    const fraction = h1 + '/' + k1
    // This library will return 1/1, so I choose to return
    if (convertFractionToDecimal(fraction) === '1') {
      return '1'
    } else {
      return fraction
    }
  }
}
