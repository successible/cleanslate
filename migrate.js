const { execSync } = require('node:child_process')

const endpoint = 'http://localhost:8080'
const secret = '--admin-secret secret'
const auth = `--endpoint ${endpoint} ${secret}`

execSync(`hasura metadata apply ${auth}`)
execSync(`hasura migrate apply --all-databases ${auth}`)
execSync(`hasura metadata reload ${auth}`)
execSync(`hasura seed apply --file user.sql ${auth} --database-name default`)
