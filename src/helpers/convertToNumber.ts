export const convertToNumber = (amount: string | number): number | null => {
  if (amount === '') {
    return null
  } else {
    const value = Number(amount)
    if (isNaN(value) || value === Infinity) {
      return null
    } else if (value === 0) {
      return 0
    } else {
      return value
    }
  }
}
