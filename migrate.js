/* eslint-disable @typescript-eslint/no-var-requires */

const { execSync } = require('child_process')
const csv = require('csv-parser')
const fs = require('fs')
const { Client } = require('pg')
const format = require('pg-format')

const isProduction = process.env.NODE_ENV === 'production'
const domain = process.env.DOMAIN
const adminSecret = process.env.HASURA_GRAPHQL_ADMIN_SECRET || 'secret'

const endpoint = isProduction
  ? `https://api.${domain}`
  : 'http://localhost:8120'

const secret = `--admin-secret ${adminSecret}`
const auth = `--endpoint ${endpoint} ${secret}`

// Apply the metadata, then the migrations

execSync(`npx hasura metadata apply ${auth}`)
execSync(`npx hasura migrate apply --all-databases ${auth}`)
execSync(`npx hasura metadata reload ${auth}`)

// Sync the basic foods

const syncBasicFoods = async (results) => {
  const client = new Client({
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
    // Your production host (like Render) will may use self-signed certificates
    // Hence, we want to give people the option to enable support for them.
    ssl: isProduction
      ? {
          rejectUnauthorized: !(process.env.SELF_SIGNED_CERTS_OK === 'true'),
        }
      : false,
    user: process.env.DB_USER,
  })

  await client.connect()

  // Use one statement with multiple inserts to improve performance
  const query = format(
    `
INSERT INTO "foods" ("basicFoodId", "name", "countName", "groupName", "category", "alias", "caloriesPerGram", "proteinPerGram", "countToGram", "tbspToGram") 
VALUES %L 
ON CONFLICT ("basicFoodId") DO UPDATE
SET "basicFoodId" = EXCLUDED."basicFoodId",
"name" = EXCLUDED."name",
"countName" = EXCLUDED."countName",
"groupName" = EXCLUDED."groupName",
"category" = EXCLUDED."category",
"alias" = EXCLUDED."alias",
"caloriesPerGram" = EXCLUDED."caloriesPerGram",
"proteinPerGram" = EXCLUDED."proteinPerGram",
"countToGram" = EXCLUDED."countToGram",
"tbspToGram" = EXCLUDED."tbspToGram";
`,
    results
  )
  await client.query(query)
  await client.end()
}

console.log('Starting to sync the basic foods...')

const results = []
fs.createReadStream('./src/basicFoods.csv')
  .pipe(csv())
  .on('data', (data) => {
    if (data['countToGram'] === '') {
      data['countToGram'] = null
    }
    if (data['tbspToGram'] === '') {
      data['tbspToGram'] = null
    }
    data['groupName'] = data['group']
    data['caloriesPerGram'] = data['caloriesPer100Gram'] / 100
    data['proteinPerGram'] = data['proteinPer100Gram'] / 100
    results.push([
      data['basicFoodId'],
      data['name'],
      data['countName'],
      data['groupName'],
      data['category'],
      data['alias'],
      data['caloriesPerGram'],
      data['proteinPerGram'],
      data['countToGram'],
      data['tbspToGram'],
    ])
  })
  .on('end', async () => {
    await syncBasicFoods(results)
    console.log('Synced the basic foods!')
  })
