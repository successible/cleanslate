// Define window globally BEFORE importing getApiUrl
Object.defineProperty(global, 'window', {
  value: {
    location: { hostname: 'localhost:3000' },
    localStorage: {},
  },
  writable: true,
  configurable: true,
})

describe('getAuthenticationUrl', () => {
  beforeEach(() => {
    delete process.env.NEXT_PUBLIC_AUTH_HOST
  })

  it('should use NEXT_PUBLIC_AUTH_HOST environment variable in Node.js', () => {
    const customHost = 'example.com'
    process.env.NEXT_PUBLIC_AUTH_HOST = customHost

    expect(
      require('./getAuthenticationServerUrl').getAuthenticationUrl()
    ).toEqual(`https://${customHost}/auth`)
  })

  it('should use window.location.hostname when AUTH_HOST is not set', () => {
    expect(
      require('./getAuthenticationServerUrl').getAuthenticationUrl()
    ).toEqual(`https://localhost:3000/auth`)
  })
})
