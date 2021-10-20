const { Client } = require("pg");
const { dbName, dbPort } = require("../config");

const DB_URL =
  process.env.DATABASE_URL || `postgres://localhost:${dbPort}/${dbName}`;
let client;
if (!process.env.DATABASE_URL) {
  client = new Client(DB_URL);
} else {
  client = new Client({
    connectionString: DB_URL,
    ssl: {
      rejectUnauthorized: false,
    },
  });
}

module.exports = {
  client,
};
