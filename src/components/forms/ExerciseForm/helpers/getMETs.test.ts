import { expect } from '@jest/globals'
import { getCyclingMET } from './getCyclingMET'
import { getMETsFromInput } from './getMETsFromInput'
import { getRowingMET } from './getRowingMET'
import { getRunningMET } from './getRunningMET'
import { getWalkingMET } from './getWalkingMET'

test('getRunningMET works as expected', () => {
  expect(getRunningMET(3)).toBe(5.14)
  expect(getRunningMET(5)).toBe(8.36)
  expect(getRunningMET(8)).toBe(13.19)
  expect(getRunningMET(8.02)).toBe(13.22)
  expect(getRunningMET(8.1)).toBe(13.35)
  expect(getRunningMET(8.3)).toBe(13.67)
})

test('getCycling works as expected', () => {
  expect(getCyclingMET(8)).toBe(2.45)
  expect(getCyclingMET(15)).toBe(10.15)
  expect(getCyclingMET(19)).toBe(14.56)
  expect(getCyclingMET(20)).toBe(16)
})

test('getWalking works as expected', () => {
  expect(getWalkingMET(3, 1)).toBe(3.71)
  expect(getWalkingMET(3.02, 1)).toBe(3.72)
  expect(getWalkingMET(3, 1.5)).toBe(3.91)
  // Reference: https://www.depts.ttu.edu/ksm/_documents/grad/acsm_comps/6c-23-2013_HFI_Metabolic_Calculations.pdf
  expect(getWalkingMET(2.5, 6)).toBe(4.98)
})

test('getRowing works as expected', () => {
  expect(getRowingMET(50)).toBe(3.5)
  expect(getRowingMET(100)).toBe(7)
  expect(getRowingMET(125)).toBe(7.6)
  expect(getRowingMET(150)).toBe(8.5)
  expect(getRowingMET(200)).toBe(12)
  expect(getRowingMET(205)).toBe(11.44)
})

test('getMetFromInput works correctly', () => {
  expect(
    getMETsFromInput('Cycling', 'Baseball', 'Backstroke', 'Machines', 10, 0, 0)
  ).toBe(4)
  expect(
    getMETsFromInput('Running', 'Baseball', 'Backstroke', 'Machines', 10, 0, 0)
  ).toBe(16.4)
  expect(
    getMETsFromInput('Swimming', 'Baseball', 'Backstroke', 'Machines', 0, 10, 0)
  ).toBe(8)
  expect(
    getMETsFromInput('Lifting', 'Baseball', 'Backstroke', 'Machines', 10, 0, 0)
  ).toBe(3.5)
  expect(
    getMETsFromInput('Other', 'Baseball', 'Backstroke', 'Machines', 0, 0, 10)
  ).toBe(5)
  expect(
    getMETsFromInput(
      'Other',
      'Horseback riding',
      'Backstroke',
      'Machines',
      0,
      0,
      0
    )
  ).toBe(4)
  expect(
    getMETsFromInput(
      'Rowing',
      'Horseback riding',
      'Backstroke',
      'Machines',
      10,
      0,
      100
    )
  ).toBe(7)
  expect(
    getMETsFromInput(
      'Walking',
      'Horseback riding',
      'Backstroke',
      'Machines',
      3,
      1,
      100
    )
  ).toBe(3.71)
  expect(
    getMETsFromInput(
      'Walking',
      'Horseback riding',
      'Backstroke',
      'Machines',
      3,
      0,
      100
    )
  ).toBe(3.29)
})
