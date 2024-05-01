import type { DummyFoods } from './dummyFoods'

// Source: https://cooking.stackexchange.com/questions/75391/what-percentage-of-my-chicken-legs-are-bone

export const chicken: DummyFoods = {
  Chicken: {
    Breast: {
      'With skin': {
        Cooked: ['Chicken breast with skin (cooked)'],
        Raw: ['Chicken breast with skin (raw)'],
      },
      'Without skin': {
        Cooked: ['Chicken breast without skin (cooked)'],
        Raw: ['Chicken breast without skin (raw)'],
      },
    },
    Drumstick: {
      'With skin': {
        'With bone': {
          Cooked: ['Chicken drumstick with skin with bone (cooked)'],
          Raw: ['Chicken drumstick with skin with bone (raw)'],
        },
        'Without bone': {
          Cooked: ['Chicken drumstick with skin without bone (cooked)'],
          Raw: ['Chicken drumstick with skin without bone (raw)'],
        },
      },
      'Without skin': {
        'With bone': {
          Cooked: ['Chicken drumstick without skin with bone (cooked)'],
          Raw: ['Chicken drumstick without skin with bone (raw)'],
        },
        'Without bone': {
          Cooked: ['Chicken drumstick without skin without bone (cooked)'],
          Raw: ['Chicken drumstick without skin without bone (raw)'],
        },
      },
    },
    Tenderloin: {
      Cooked: ['Chicken tenderloin (cooked)'],
      Raw: ['Chicken tenderloin (raw)'],
    },
    Thigh: {
      'With skin': {
        'With bone': {
          Cooked: ['Chicken thigh with skin with bone (cooked)'],
          Raw: ['Chicken thigh with skin with bone (raw)'],
        },
        'Without bone': {
          Cooked: ['Chicken thigh with skin without bone (cooked)'],
          Raw: ['Chicken thigh with skin without bone (raw)'],
        },
      },
      'Without skin': {
        'With bone': {
          Cooked: ['Chicken thigh without skin with bone (cooked)'],
          Raw: ['Chicken thigh without skin with bone (raw)'],
        },
        'Without bone': {
          Cooked: ['Chicken thigh without skin without bone (cooked)'],
          Raw: ['Chicken thigh without skin without bone (raw)'],
        },
      },
    },
    Wing: {
      'With skin': {
        'With bone': {
          Cooked: ['Chicken wing with skin with bone (cooked)'],
          Raw: ['Chicken wing with skin with bone (raw)'],
        },
        'Without bone': {
          Cooked: ['Chicken wing with skin without bone (cooked)'],
          Raw: ['Chicken wing with skin without bone (raw)'],
        },
      },
      'Without skin': {
        'With bone': {
          Cooked: ['Chicken wing without skin with bone (cooked)'],
          Raw: ['Chicken wing without skin with bone (raw)'],
        },
        'Without bone': {
          Cooked: ['Chicken wing without skin without bone (cooked)'],
          Raw: ['Chicken wing without skin without bone (raw)'],
        },
      },
    },
  },
}
