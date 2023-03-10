export const convertFractionToDecimal = (
  amount: string | number
): string | number => {
  if (typeof amount === 'string' && amount.includes('/')) {
    return amount
      .replace(/\s/g, '')
      .split('/')
      .reduce((a, b) => String(Number(a) / Number(b)))
  }
  return amount
}
