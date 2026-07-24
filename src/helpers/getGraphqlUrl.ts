export const getGraphqlUrl = (isProduction: boolean) => {
  var host = 'localhost:8080'
  if (process.env.HASURA_HOST) {
    host = process.env.HASURA_HOST
  } else if (isProduction) {
    host = 'graphql-engine:8080'
  }
  const graphqlHost = host
  return `http://${graphqlHost}/v1/graphql`
}
