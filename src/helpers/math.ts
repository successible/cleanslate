import { all, create } from 'mathjs'

const math = create(all)

// Save evaluate before disabling parse - math.evaluate closes over the
// original parse, so the saved reference keeps working after the override.
const limitedEvaluate = math.evaluate

math.import(
  {
    // most important (hardly any functional impact)
    import: function () {
      throw new Error('Function import is disabled')
    },
    createUnit: function () {
      throw new Error('Function createUnit is disabled')
    },
    reviver: function () {
      throw new Error('Function reviver is disabled')
    },

    // extra (has functional impact) - evaluate left enabled per request
    parse: function () {
      throw new Error('Function parse is disabled')
    },
    simplify: function () {
      throw new Error('Function simplify is disabled')
    },
    derivative: function () {
      throw new Error('Function derivative is disabled')
    },
    resolve: function () {
      throw new Error('Function resolve is disabled')
    },
  },
  { override: true }
)

export const evaluate = limitedEvaluate
