const { Client } = require('pg');
const { dbName, dbPort } = require('../config');

const DB_URL = process.env.DATABASE_URL || `postgres://localhost:${dbPort}/${dbName}`;
const client = new Client(DB_URL);

module.exports = {
  client,
};
