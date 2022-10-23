import { capitalize } from '../../../helpers/utility/capitalize'
import { DummyFoods } from '../constants/dummyFoods'

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
