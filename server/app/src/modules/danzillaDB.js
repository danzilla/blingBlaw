const express = require('express')
const cors = require('cors')
const Pool = require('pg-pool');

const app = express()
app.use(cors())

// Databases 
const dbName = require('../../config/app.db');

// App - blingBlaw
// init - DB connection
const pool = new Pool(dbName.blingBlaw)
pool.on('error', (err, client) => {
  console.error("Unexpected error on idle client", err)
  process.exit(-1)
})

// App - blingBlaw - FannyPack
// init - DB connection
const fannyPack = new Pool(dbName.fannyPack)
fannyPack.on('error', (err, client) => {
  console.error("Unexpected error on idle client", err)
  process.exit(-1)
})

// Default - postgres
// init - DB connection
const postgresDefault = new Pool(dbName.postgres)
postgresDefault.on('error', (err, client) => {
  console.error("Unexpected error on idle client", err)
  process.exit(-1)
})


// Export databases
module.exports.pool = pool;
module.exports.fannyPack = fannyPack;
module.exports.postgresDefault = postgresDefault;