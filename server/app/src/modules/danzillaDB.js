const express = require('express')
const cors = require('cors')
const Pool = require('pg-pool');

const app = express()
app.use(cors())

// Home
const Home = {
  host: 'localhost',
  port: '6543',
  database: 'danustanDB',
  user: 'danzilla',
  password: '1035621'
}



// App - Bling Blaw
// App Default - Database
const blingBlaw = {
  host: 'localhost',
  port: '6543',
  database: 'blingblaw',
  user: 'danzilla',
  password: '1035621'
}
// blingBlaw Connection info
// DB connection
const pool = new Pool(blingBlaw)
pool.on('error', (err, client) => {
  console.error("Unexpected error on idle client", err)
  process.exit(-1)
})


// Postgres - Default Connection info
const postgres = {
  host: 'localhost',
  port: '6543',
  database: 'postgres',
  user: 'danzilla',
  password: '1035621'
}
// DB connection
const postgresDefault = new Pool(postgres)
postgresDefault.on('error', (err, client) => {
  console.error("Unexpected error on idle client", err)
  process.exit(-1)
})

// blingBlaw - Default App
module.exports.pool = pool;
// postgres - Default DB
module.exports.postgresDefault = postgresDefault;
