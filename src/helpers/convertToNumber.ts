export const convertToNumber = (amount: string | number): number | null => {
  if (amount === '') {
    return null
  }

  let amountToUse = amount
  // Handle locales in which comma is used instead of a period
  if (typeof amountToUse === 'string') {
    amountToUse = amountToUse.replaceAll(',', '.')
  }

  const value = Number(amountToUse)
  if (Number.isNaN(value) || value === Number.POSITIVE_INFINITY) {
    return null
  }
  if (value === 0) {
    return 0
  }
  return value
}
