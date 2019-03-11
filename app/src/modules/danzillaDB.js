const express = require('express')
const cors = require('cors')
const Pool = require('pg-pool');

const app = express()
app.use(cors())

// postgresql Connection info
const connection_config = ({
  host: 'localhost',
  port: '6543',
  database: 'blingBlaw',
  user: 'danzilla',
  password: '1035621'
})

// DB connection
const pool = new Pool(connection_config)
pool.on('error', (err, client) => {
  console.error("Unexpected error on idle client", err)
  process.exit(-1)
})

module.exports.pool = pool;
