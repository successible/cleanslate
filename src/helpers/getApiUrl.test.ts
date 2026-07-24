// Define window globally BEFORE importing getApiUrl
Object.defineProperty(global, 'window', {
  value: {
    location: { hostname: 'localhost:3000' },
    localStorage: {},
  },
  writable: true,
  configurable: true,
})

import { getApiUrl } from './getApiUrl'

describe('getApiUrl', () => {
  beforeEach(() => {
    delete process.env.NEXT_PUBLIC_AUTH_HOST
  })

  it('should use NEXT_PUBLIC_CLIENT_HOST environment variable in Node.js', () => {
    const customHost = 'example.com'
    process.env.NEXT_PUBLIC_AUTH_HOST = customHost

    expect(getApiUrl()).toEqual([
      `https://${customHost}/v1/graphql`,
      `wss://${customHost}/v1/graphql`,
    ])
  })

  it('should use window.location.hostname when CLIENT_HOST is not set', () => {
    const result = getApiUrl()

    expect(result).toEqual([
      `https://localhost:3000/v1/graphql`,
      `wss://localhost:3000/v1/graphql`,
    ])
  })

  it('should return both https and wss URLs', () => {
    const result = getApiUrl()

    expect(result).toHaveLength(2)
    expect(result[0]).toMatch(/^https:\/\/.+\/v1\/graphql$/)
    expect(result[1]).toMatch(/^wss:\/\/.+\/v1\/graphql$/)
  })
})
