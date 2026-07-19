describe('getGraphqlUrl', () => {
  beforeEach(() => {
    delete process.env.HASURA_HOST
  })

  it('should use HASURA_HOST environment variable when set', () => {
    const customHost = 'example.com'
    process.env.HASURA_HOST = customHost

    expect(require('./getGraphqlUrl').getGraphqlUrl(true)).toEqual(
      `http://${customHost}/v1/graphql`
    )
  })

  it('should use production URL when in production and HASURA_HOST is not set', () => {
    expect(require('./getGraphqlUrl').getGraphqlUrl(true)).toEqual(
      `http://graphql-engine:8080/v1/graphql`
    )
  })

  it('should use localhost when in development and HASURA_HOST is not set', () => {
    expect(require('./getGraphqlUrl').getGraphqlUrl(false)).toEqual(
      `http://localhost:8080/v1/graphql`
    )
  })
})
