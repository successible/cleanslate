export const otherMet = {
  Baseball: 5,
  Basketball: 8,
  Boxing: 6,
  Cricket: 5,
  Dance: 6,
  'Field hockey': 8,
  Football: 9,
  Golf: 4.5,
  Hiking: 6,
  'Horseback riding': 4,
  'Ice hockey': 8,
  'Ice skating': 7,
  'Jumping rope': 10,
  Lacrosse: 8,
  'Martial arts': 10,
  Racquetball: 7,
  'Roller skating': 7,
  Rugby: 10,
  Skateboarding: 5,
  Skiing: 7,
  Soccer: 7,
  Softball: 5,
  Squash: 7,
  'Tennis (doubles)': 6,
  'Tennis (singles)': 8,
  Volleyball: 3,
  'Water polo': 10,
  Wrestling: 6,
} as const

export type OtherMET = typeof otherMet
export type OtherActivity = keyof OtherMET

export const swimmingMET = {
  Backstroke: 8,
  Breaststroke: 10,
  Butterfly: 11,
  Freestyle: 9,
} as const

export type SwimmingMET = typeof swimmingMET
export type SwimmingActivity = keyof SwimmingMET

export const liftingMET = {
  'Free Weights': 5,
  Machines: 3.5,
} as const

export type LiftingMET = typeof liftingMET
export type LiftingActivity = keyof LiftingMET
