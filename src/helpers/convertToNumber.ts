export const convertToNumber = (amount: string | number): number | null => {
  if (amount === "") {
    return null;
  }
  const value = Number(amount);
  if (Number.isNaN(value) || value === Number.POSITIVE_INFINITY) {
    return null;
  }
  if (value === 0) {
    return 0;
  }
  return value;
};
