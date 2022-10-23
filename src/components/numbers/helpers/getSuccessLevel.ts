export const getSuccessLevel = (calorieDifference: number): string => {
  if (calorieDifference >= 1000) {
    return 'completed success-high'
  } else if (calorieDifference >= 500) {
    return 'completed success-medium'
  } else if (calorieDifference >= 0) {
    return 'completed success-low'
  } else {
    return 'try-again'
  }
}
