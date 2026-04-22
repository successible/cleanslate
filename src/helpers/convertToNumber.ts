import { evaluate } from 'mathjs'

export const convertToNumber = (amount: string | number): number | null => {
  if (amount === '') {
    return null;
  }
  if (typeof amount === 'number') {
    return amount;
  }
  try {
    const value = evaluate(amount);

    if (Number.isNaN(value) || value === Number.POSITIVE_INFINITY) {
      return null;
    }
    return value;
  } catch {
    return null;
  }
}
