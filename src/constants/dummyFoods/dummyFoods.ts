import { createDummyFood } from '../../components/standard-adder/helpers/createDummyFood'
import { bean } from './bean'
import { beef } from './beef'
import { bread } from './bread'
import { cheese } from './cheese'
import { chicken } from './chicken'
import { dairy } from './dairy'
import { dough } from './dough'
import { driedFruit } from './driedFruit'
import { driedHerb } from './driedHerb'
import { flour } from './flour'
import { wholeGrains } from './grains'
import { groundMeat } from './groundMeat'
import { jerky } from './jerky'
import { lamb } from './lamb'
import { lentils } from './lentils'
import { lettuce } from './lettuce'
import { noodles } from './noodles'
import { nutMilk } from './nutMilk'
import { organMeat } from './organMeat'
import { pasta } from './pasta'
import { pea } from './pea'
import { pepper } from './pepper'
import { pork } from './pork'
import { proteinPowder } from './proteinPowder'
import { ribs } from './ribs'
import { rice } from './rice'
import { tortilla } from './tortilla'
import { turkey } from './turkey'
import { vinegar } from './vinegar'
import { wine } from './wine'

export interface DummyFoods {
  [key: string]: DummyFoods | string[]
}

export const dummyFoods: DummyFoods = {
  ...bean,
  ...beef,
  ...bread,
  ...cheese,
  ...chicken,
  ...dairy,
  ...dough,
  ...driedFruit,
  ...driedHerb,
  ...flour,
  ...groundMeat,
  ...jerky,
  ...lamb,
  ...lentils,
  ...lettuce,
  ...noodles,
  ...nutMilk,
  ...organMeat,
  ...pasta,
  ...pea,
  ...pepper,
  ...pork,
  ...proteinPowder,
  ...ribs,
  ...rice,
  ...tortilla,
  ...turkey,
  ...vinegar,
  ...wholeGrains,
  ...wine,
}

export const foodsToAdd = Object.keys(dummyFoods).map((name) =>
  createDummyFood(name)
)
