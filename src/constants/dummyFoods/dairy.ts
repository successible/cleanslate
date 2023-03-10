import { DummyFoods } from './dummyFoods'

export const cottageCheese: DummyFoods = {
  'Cottage cheese': {
    '1%': ['Cottage cheese (1%)'],
    '2%': ['Cottage cheese (2%)'],
  },
}

export const mayonnaise: DummyFoods = {
  Mayonnaise: {
    'Full fat': ['Mayonnaise (full-fat)'],
    Light: ['Mayonnaise (light)'],
  },
}

export const milk: DummyFoods = {
  Milk: {
    '1%': ['Milk (1%)'],
    '2%': ['Milk (2%)'],
    Skim: ['Skim milk'],
    Whole: ['Whole milk'],
  },
}

export const sourCream: DummyFoods = {
  'Sour cream': {
    'Full fat': ['Sour cream (full-fat)'],
    Light: ['Sour cream (light)'],
  },
}

export const yogurt: DummyFoods = {
  Yogurt: {
    Greek: {
      '2%': ['Greek yogurt (2%)'],
      'Non-fat': ['Greek yogurt (non-fat)'],
      Whole: ['Greek yogurt (whole)'],
    },
    Plain: {
      'Low-fat': ['Plain yogurt (low-fat)'],
      'Non-fat': ['Plain yogurt (non-fat)'],
      Whole: ['Plain yogurt (whole)'],
    },
  },
}

export const dairy = {
  ...cottageCheese,
  ...mayonnaise,
  ...milk,
  ...sourCream,
  ...yogurt,
}

export const validDairy = Object.keys(dairy)
