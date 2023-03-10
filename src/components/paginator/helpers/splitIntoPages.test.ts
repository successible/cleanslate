import { splitIntoPages } from './splitIntoPages'

const data = ['a', 'b', 'c', 'd', 'f', 'g', 'h', 'i']
test('splitIntoPages works correctly with group of 2', () => {
  const result = splitIntoPages(data, 2)
  expect(result).toStrictEqual([
    ['a', 'b'],
    ['c', 'd'],
    ['f', 'g'],
    ['h', 'i'],
  ])
})

test('splitIntoPages works correctly with group of 3', () => {
  const result = splitIntoPages(data, 3)
  expect(result).toStrictEqual([
    ['a', 'b', 'c'],
    ['d', 'f', 'g'],
    ['h', 'i'],
  ])
})

test('splitIntoPages works correctly with group of 4', () => {
  const result = splitIntoPages(data, 4)
  expect(result).toStrictEqual([
    ['a', 'b', 'c', 'd'],
    ['f', 'g', 'h', 'i'],
  ])
})
