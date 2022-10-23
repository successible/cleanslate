export const convertFractionToDecimal = (
  amount: React.ReactText
): React.ReactText => {
  if (typeof amount === 'string' && amount.includes('/')) {
    return amount
      .replace(/\s/g, '')
      .split('/')
      .reduce((a, b) => String(Number(a) / Number(b)))
  }
  return amount
}
