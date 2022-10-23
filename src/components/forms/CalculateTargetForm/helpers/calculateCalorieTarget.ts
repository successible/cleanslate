export const CALORIC_DEFICIT = 0.25
export const CALORIC_SURPLUS = 0.1

export type Objective = 'lose' | 'maintain' | 'gain'

/** Given your BMR and your body composition objective, calculate your caloric target */
export const calculateCalorieTarget = (
  BMR: number,
  objective: Objective = 'maintain'
) => {
  if (objective === 'lose') {
    return BMR * (1 - CALORIC_DEFICIT)
  } else if (objective === 'gain') {
    return BMR * (1 + CALORIC_SURPLUS)
  } else {
    return BMR
  }
}
