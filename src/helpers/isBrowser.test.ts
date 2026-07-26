/// <reference types="@jest/globals" />

import { isBrowser } from './isBrowser'

describe('isBrowser', () => {
  it('should return true when window and localStorage exist (browser environment)', () => {
    Object.defineProperty(global, 'window', {
      value: { localStorage: {} },
      writable: true,
      configurable: true,
    })

    expect(isBrowser()).toBe(true)
  })

  it('should return false when window is undefined (Node.js environment)', () => {
    Object.defineProperty(global, 'window', {
      value: undefined,
      writable: true,
      configurable: true,
    })

    console.log(`TEST ${isBrowser()}`)

    expect(isBrowser()).toBe(false)
  })

  it('should return false when window exists but localStorage is missing', () => {
    const mockWindow = {} as Window & typeof globalThis
    Object.defineProperty(global, 'window', {
      value: mockWindow,
      writable: true,
      configurable: true,
    })

    expect(isBrowser()).toBe(false)
  })

  it('should return false when localStorage is null', () => {
    Object.defineProperty(global, 'window', {
      value: { localStorage: null },
      writable: true,
      configurable: true,
    })

    expect(isBrowser()).toBe(false)
  })
})
