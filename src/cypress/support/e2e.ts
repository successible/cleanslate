import './commands'

beforeEach(() => {
  // implement node event listeners here
  const endpoint = 'http://localhost:8080'
  const secret = `--admin-secret secret`
  const auth = `--endpoint ${endpoint} ${secret}`
  cy.exec(`hasura seed apply --file user.sql ${auth} --database-name default`)
})
