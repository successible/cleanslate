import { all, create } from 'mathjs'

const math = create(all)

// Save evaluate before disabling parse - math.evaluate closes over the
// original parse, so the saved reference keeps working after the override.
const limitedEvaluate = math.evaluate

math.import(
  {
    // most important (hardly any functional impact)
    import: () => {
      throw new Error('Function import is disabled')
    },
    createUnit: () => {
      throw new Error('Function createUnit is disabled')
    },
    reviver: () => {
      throw new Error('Function reviver is disabled')
    },

    // extra (has functional impact) - evaluate left enabled per request
    parse: () => {
      throw new Error('Function parse is disabled')
    },
    simplify: () => {
      throw new Error('Function simplify is disabled')
    },
    derivative: () => {
      throw new Error('Function derivative is disabled')
    },
    resolve: () => {
      throw new Error('Function resolve is disabled')
    },
  },
  { override: true }
)

export const evaluate = limitedEvaluate
