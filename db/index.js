// Connect to DB
const { Client } = require('pg');
const { dbName, dbPort } = require('../config');

const DB_URL = process.env.DATABASE_URL || `postgres://localhost:${dbPort}/${dbName}`;
const client = new Client(DB_URL);

// database methods

// export
module.exports = {
  client,
  // db methods
};
