import { createDynamicDummyFoods } from '../helpers/createDynamicDummyFoods'

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
