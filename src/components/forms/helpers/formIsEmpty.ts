export const formIsEmpty = (state: Record<string, any>) =>
  Object.keys(state).filter((key) => {
    const value = state[key]
    // Currently only needed for ingredients[]
    if (Array.isArray(value)) {
      return value.length > 0
    } else {
      return Boolean(value)
    }
  }).length > 0
