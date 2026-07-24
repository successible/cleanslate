import { zipObject } from './zipObject'

describe('zipObject', () => {
  it('Zips two lists into one object', () => {
    const listOne = ['a', 'b']
    const listTwo = [1, 2]
    const expectedObject = { a: 1, b: 2 }

    expect(zipObject(listOne, listTwo)).toEqual(expectedObject)
  })
})
