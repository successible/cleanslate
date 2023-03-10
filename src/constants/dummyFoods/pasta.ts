import { capitalize } from '../../helpers/capitalize'
import { DummyFoods } from './dummyFoods'

export const createDynamicDummyFoods = (
  category: string,
  names: string[],
  createEntry: (name: string) => DummyFoods
): DummyFoods => {
  const dummyFoods = names.reduce((acc, name) => {
    const entry = createEntry(name)
    // @ts-ignore. TypeScript not smart enough to know the key exists
    acc[name] = entry
    return acc
  }, {} as Record<string, string>)

  // @ts-ignore
  return {
    [capitalize(category)]: dummyFoods,
  }
}

const names = [
  'Angel hair',
  'Cannelloni',
  'Capellini',
  'Conchiglie',
  'Ditalini',
  'Elbow macaroni',
  'Farfalle',
  'Fettuccine',
  'Fusilli',
  'Lasagna',
  'Linguine',
  'Manicotti',
  'Orecchiette',
  'Orzo',
  'Pappardelle',
  'Pastina',
  'Penne',
  'Radiatore',
  'Rigatoni',
  'Rotelle',
  'Rotini',
  'Spaghetti',
  'Tagliatelle',
  'Torchio',
  'Vermicelli',
  'Ziti',
]

export const pasta = createDynamicDummyFoods('Pasta', names, (name: string) => {
  return {
    White: {
      Cooked: [`White pasta (cooked) [${name}]`],
      Dry: [`White pasta (dry) [${name}]`],
    },
    'Whole wheat': {
      Cooked: [`Whole wheat pasta (cooked) [${name}]`],
      Dry: [`Whole wheat pasta (dry) [${name}]`],
    },
  }
})
