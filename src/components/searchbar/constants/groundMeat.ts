import { DummyFoods } from './dummyFoods'

export const groundMeat: DummyFoods = {
  'Ground meat': {
    Beef: {
      '70/30': ['Ground beef (70/30) (raw)', 'Ground beef (70/30) (cooked)'],
      '80/20': ['Ground beef (80/20) (raw)', 'Ground beef (80/20) (cooked)'],
      '90/10': ['Ground beef (90/10) (raw)', 'Ground beef (90/10) (cooked)'],
    },
    Lamb: {
      Cooked: ['Ground lamb (cooked)'],
      Raw: ['Ground lamb (raw)'],
    },
    Pork: {
      '84/16': ['Ground pork (84/16) (raw)', 'Ground pork (84/16) (cooked)'],
      '96/4': ['Ground pork (96/4) (raw)', 'Ground pork (96/4) (cooked)'],
    },
    Turkey: {
      '85/15': [
        'Ground turkey (85/15) (raw)',
        'Ground turkey (85/15) (cooked)',
      ],
      '93/7': ['Ground turkey (93/7) (raw)', 'Ground turkey (93/7) (cooked)'],
    },
  },
}
