const bcrypt = require('bcrypt');

const saltRounds = 10;
const { client } = require('./client');

async function createUser({
  username,
  password,
  firstname,
  lastname,
  email,
  phonenumber,
  zipcode,
}) {
  try {
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const { rows: [user] } = await client.query(`
          INSERT INTO users(username, password, firstname, lastname, email, phonenumber, zipcode) 
          VALUES($1, $2, $3, $4, $5, $6, $7) 
          ON CONFLICT (username) DO NOTHING
          RETURNING *;
        `, [username, hashedPassword, firstname, lastname, email, phonenumber, zipcode]);
    delete user.password;
    return user;
  } catch (error) {
    throw error;
  }
}

async function createUserPayment({
  userId,
  cardname,
  nameoncard,
  billingaddress,
  ccnumber,
  ccsecuritycode,
  ccexpiration,
  zipcode,
}) {
  try {
    const { rows: [userpayment] } = await client.query(`
          INSERT INTO userspayments(
            "userId",
            cardname,
            nameoncard,
            billingaddress,
            ccnumber,
            ccsecuritycode,
            ccexpiration,
            zipcode
            ) 
          VALUES($1, $2, $3, $4, $5, $6, $7, $8) 
          ON CONFLICT (ccnumber) DO NOTHING
          RETURNING *;
        `, [
      userId,
      cardname,
      nameoncard,
      billingaddress,
      ccnumber,
      ccsecuritycode,
      ccexpiration,
      zipcode,
    ]);
    return userpayment;
  } catch (error) {
    throw error;
  }
}

async function createUserAddress({
  userId,
  street,
  apartment,
  city,
  state,
  zipcode,
}) {
  try {
    const { rows: [userAddress] } = await client.query(`
          INSERT INTO usersaddresses(
            "userId",
            street,
            apartment,
            city,
            state,
            zipcode
            ) 
          VALUES($1, $2, $3, $4, $5, $6) 
          RETURNING *;
        `, [
      userId,
      street,
      apartment,
      city,
      state,
      zipcode,
    ]);
    return userAddress;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  createUser,
  createUserPayment,
  createUserAddress,
};
