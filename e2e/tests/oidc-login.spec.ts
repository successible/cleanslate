import { test, expect } from '@playwright/test'

const AUTH_SERVER = 'http://localhost:3001'
const AUTHELIA_URL = 'https://auth.localhost:9091'

test.describe('OIDC Authentication Flow', () => {
  test('health check - auth server is running', async ({ request }) => {
    const response = await request.get(`${AUTH_SERVER}/auth`)
    expect(response.ok()).toBeTruthy()
    const body = await response.text()
    expect(body).toContain('healthy')
  })

  test('health check - Authelia OIDC discovery is available', async ({ request }) => {
    const response = await request.get(
      `${AUTHELIA_URL}/.well-known/openid-configuration`
    )
    expect(response.ok()).toBeTruthy()
    const config = await response.json()
    expect(config.issuer).toContain('auth.localhost:9091')
    expect(config.authorization_endpoint).toBeTruthy()
    expect(config.token_endpoint).toBeTruthy()
  })

  test('/auth/oidc/login redirects to Authelia', async ({ page }) => {
    await page.goto(`${AUTH_SERVER}/auth/oidc/login`)
    await page.waitForURL(/auth\.localhost:9091/, { timeout: 10000 })
    const url = page.url()
    expect(url).toContain('auth.localhost:9091')
  })

  test('full OIDC login flow with Authelia', async ({ page, request }) => {
    // Capture the redirect URL with the authorization code
    let codeUrl = ''
    page.on('request', (req) => {
      const reqUrl = req.url()
      if (reqUrl.includes('localhost:3000') && reqUrl.includes('code=')) {
        codeUrl = reqUrl
      }
    })

    // Step 1: Start the OIDC login flow
    await page.goto(`${AUTH_SERVER}/auth/oidc/login`)

    // Step 2: Should be redirected to Authelia login page
    await page.waitForURL(/auth\.localhost:9091/, { timeout: 10000 })

    // Step 3: Fill in Authelia login credentials
    await page.waitForSelector('input#username-textfield', { timeout: 10000 })
    await page.fill('input#username-textfield', 'testuser')
    await page.fill('input#password-textfield', 'testpassword')
    await page.click('button#sign-in-button')

    // Step 4: Handle consent screen
    const acceptButton = page.locator('button:has-text("Accept")')
    await acceptButton.waitFor({ timeout: 15000 })
    await acceptButton.click()

    // Step 5: Wait for the redirect with the authorization code
    await page.waitForTimeout(5000)
    expect(codeUrl).toContain('code=')

    // Step 6: Extract the code and exchange it for a JWT via POST
    const url = new URL(codeUrl)
    const code = url.searchParams.get('code')
    expect(code).toBeTruthy()

    // The code should NOT be a JWT (security fix verification)
    expect(code!.split('.').length).not.toBe(3)

    const tokenResponse = await request.post(`${AUTH_SERVER}/auth/oidc/token`, {
      headers: { 'Content-Type': 'application/json' },
      data: { code },
    })
    expect(tokenResponse.ok()).toBeTruthy()
    const tokenData = await tokenResponse.json()
    expect(tokenData.jwt).toBeTruthy()

    // Validate the JWT
    const jwt = tokenData.jwt
    const parts = jwt.split('.')
    expect(parts.length).toBe(3)

    const payload = JSON.parse(Buffer.from(parts[1], 'base64url').toString())
    expect(payload['https://hasura.io/jwt/claims']).toBeTruthy()
    expect(
      payload['https://hasura.io/jwt/claims']['x-hasura-user-id']
    ).toMatch(/^oidc:/)
    expect(
      payload['https://hasura.io/jwt/claims']['x-hasura-default-role']
    ).toBe('user')
  })

  test('authorization code is single-use', async ({ page, request }) => {
    let codeUrl = ''
    page.on('request', (req) => {
      const reqUrl = req.url()
      if (reqUrl.includes('localhost:3000') && reqUrl.includes('code=')) {
        codeUrl = reqUrl
      }
    })

    await page.goto(`${AUTH_SERVER}/auth/oidc/login`)
    await page.waitForURL(/auth\.localhost:9091/, { timeout: 10000 })

    await page.waitForSelector('input#username-textfield', { timeout: 10000 })
    await page.fill('input#username-textfield', 'testuser')
    await page.fill('input#password-textfield', 'testpassword')
    await page.click('button#sign-in-button')

    const acceptButton = page.locator('button:has-text("Accept")')
    await acceptButton.waitFor({ timeout: 15000 })
    await acceptButton.click()

    await page.waitForTimeout(5000)
    const url = new URL(codeUrl)
    const code = url.searchParams.get('code')

    // First exchange should succeed
    const first = await request.post(`${AUTH_SERVER}/auth/oidc/token`, {
      headers: { 'Content-Type': 'application/json' },
      data: { code },
    })
    expect(first.ok()).toBeTruthy()

    // Second exchange with the same code should be rejected
    const second = await request.post(`${AUTH_SERVER}/auth/oidc/token`, {
      headers: { 'Content-Type': 'application/json' },
      data: { code },
    })
    expect(second.status()).toBe(403)
  })

  test('JWT from OIDC flow is accepted by Hasura', async ({ page, request }) => {
    let codeUrl = ''
    page.on('request', (req) => {
      const reqUrl = req.url()
      if (reqUrl.includes('localhost:3000') && reqUrl.includes('code=')) {
        codeUrl = reqUrl
      }
    })

    await page.goto(`${AUTH_SERVER}/auth/oidc/login`)
    await page.waitForURL(/auth\.localhost:9091/, { timeout: 10000 })

    await page.waitForSelector('input#username-textfield', { timeout: 10000 })
    await page.fill('input#username-textfield', 'testuser')
    await page.fill('input#password-textfield', 'testpassword')
    await page.click('button#sign-in-button')

    const acceptButton = page.locator('button:has-text("Accept")')
    await acceptButton.waitFor({ timeout: 15000 })
    await acceptButton.click()

    await page.waitForTimeout(5000)
    const url = new URL(codeUrl)
    const code = url.searchParams.get('code')

    const tokenResponse = await request.post(`${AUTH_SERVER}/auth/oidc/token`, {
      headers: { 'Content-Type': 'application/json' },
      data: { code },
    })
    const { jwt } = await tokenResponse.json()

    // Use the JWT to query Hasura's GraphQL API
    const hasuraResponse = await request.post('http://localhost:8080/v1/graphql', {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${jwt}`,
      },
      data: {
        query: '{ profiles { authId } }',
      },
    })

    expect(hasuraResponse.ok()).toBeTruthy()
    const result = await hasuraResponse.json()
    expect(result.data).toBeTruthy()
    expect(result.data.profiles).toBeTruthy()
    expect(result.data.profiles.length).toBeGreaterThanOrEqual(1)

    const oidcProfile = result.data.profiles.find((p: any) =>
      p.authId.startsWith('oidc:')
    )
    expect(oidcProfile).toBeTruthy()
  })
})
