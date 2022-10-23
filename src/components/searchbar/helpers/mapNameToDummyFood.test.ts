import { mapNameToDummyFood } from './mapNameToDummyFood'

test('mapSearchResultsToDummyFood works correctly', () => {
  const resultA = mapNameToDummyFood('Ground turkey (93/7) (raw)')
  expect(resultA).toBe('Ground meat')

  const resultB = mapNameToDummyFood('Skirt steak (raw)')
  expect(resultB).toBe('Beef')

  const resultC = mapNameToDummyFood('Skirt steakz (raw)')
  expect(resultC).toBe(null)

  const resultD = mapNameToDummyFood('Monterey jack cheese')
  expect(resultD).toBe('Cheese')
})
