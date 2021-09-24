// Connect to DB
const { client } = require('./client');
const {
  createUser,
  createUserPayment,
  createUserAddress,
} = require('./users');

// CREATE NEW DATABASE METHODS HERE AND EXPORT THEM IN THE MODULE EXPORT.
// PULL THEM INTO INIT_DB.JS TO SEED THE DB WITH FAKE DATA.

// export
module.exports = {
  client,
  createUser,
  createUserPayment,
  createUserAddress,
  // db methods
};
