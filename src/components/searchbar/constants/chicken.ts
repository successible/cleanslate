import { DummyFoods } from './dummyFoods'

// Source: https://cooking.stackexchange.com/questions/75391/what-percentage-of-my-chicken-legs-are-bone

export const chicken: DummyFoods = {
  Chicken: {
    Breast: {
      'With skin': [
        'Chicken breast with skin (raw)',
        'Chicken breast with skin (cooked)',
      ],
      'Without skin': [
        'Chicken breast without skin (raw)',
        'Chicken breast without skin (cooked)',
      ],
    },
    Drumstick: {
      'With skin': {
        'With bone': [
          'Chicken drumstick with skin with bone (raw)',
          'Chicken drumstick with skin with bone (cooked)',
        ],
        'Without bone': [
          'Chicken drumstick with skin without bone (raw)',
          'Chicken drumstick with skin without bone (cooked)',
        ],
      },
      'Without skin': {
        'With bone': [
          'Chicken drumstick without skin with bone (raw)',
          'Chicken drumstick without skin with bone (cooked)',
        ],
        'Without bone': [
          'Chicken drumstick without skin without bone (raw)',
          'Chicken drumstick without skin without bone (cooked)',
        ],
      },
    },
    Tenderloin: {
      Cooked: ['Chicken tenderloin (cooked)'],
      Raw: ['Chicken tenderloin (raw)'],
    },
    Thigh: {
      'With skin': {
        'With bone': [
          'Chicken thigh with skin with bone (raw)',
          'Chicken thigh with skin with bone (cooked)',
        ],
        'Without bone': [
          'Chicken thigh with skin without bone (raw)',
          'Chicken thigh with skin without bone (cooked)',
        ],
      },
      'Without skin': {
        'With bone': [
          'Chicken thigh without skin with bone (raw)',
          'Chicken thigh without skin with bone (cooked)',
        ],
        'Without bone': [
          'Chicken thigh without skin without bone (raw)',
          'Chicken thigh without skin without bone (cooked)',
        ],
      },
    },
    Wing: {
      'With skin': {
        'With bone': [
          'Chicken wing with skin with bone (raw)',
          'Chicken wing with skin with bone (cooked)',
        ],
        'Without bone': [
          'Chicken wing with skin without bone (raw)',
          'Chicken wing with skin without bone (cooked)',
        ],
      },
      'Without skin': {
        'With bone': [
          'Chicken wing without skin with bone (raw)',
          'Chicken wing without skin with bone (cooked)',
        ],
        'Without bone': [
          'Chicken wing without skin without bone (raw)',
          'Chicken wing without skin without bone (cooked)',
        ],
      },
    },
  },
}
