/* eslint-disable @typescript-eslint/no-var-requires */

const { execSync } = require('child_process')

const endpoint = 'http://localhost:8120'
const secret = `--admin-secret secret`
const auth = `--endpoint ${endpoint} ${secret}`

execSync(`npx hasura metadata apply ${auth}`)
execSync(`npx hasura migrate apply --all-databases ${auth}`)
execSync(`npx hasura metadata reload ${auth}`)
execSync(`hasura seed apply --file user.sql ${auth} --database-name default`)
