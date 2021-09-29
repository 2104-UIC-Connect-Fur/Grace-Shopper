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

// What other fields should be included on the cart?

async function getUserCart(userId) {
  try {
    const { rows: [userCart] } = await client.query(`
      SELECT users.id AS "userId", users.username, orders.id AS "orderId", orders.total, orders.complete
      FROM users
      JOIN orders ON users.id = orders."userId"
      WHERE users.id = $1 AND orders.complete = false;
    `, [userId]);
    const { rows: ordersitems } = await client.query(`
      SELECT ordersitems."itemId", ordersitems.quantity, ordersitems.priceatpurchase, items.title, items.price AS "currentprice"
      FROM ordersitems
      JOIN items ON ordersitems."itemId" = items.id
      WHERE ordersitems."orderId" = ${userCart.orderId};
    `);
    userCart.items = ordersitems;
    return userCart;
  } catch (error) {
    throw (error);
  }
}

module.exports = {
  createUser,
  createUserPayment,
  createUserAddress,
  getUserCart,
};
