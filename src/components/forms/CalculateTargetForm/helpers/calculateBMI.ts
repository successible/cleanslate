export const calculateBMI = (weightInLbs: number, heightInInches: number) => {
  return (703 * weightInLbs) / heightInInches ** 2
}
