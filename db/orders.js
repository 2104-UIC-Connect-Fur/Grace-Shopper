const { client } = require('./client');

async function createOrder({
  userId,
  total,
  complete,
  street,
  apartment,
  city,
  state,
  zipcode,
  nameoncard,
  billingaddress,
  ccnumber,
  ccsecuritycode,
  ccexpiration,
  cczipcode,
  discountId,
}) {
  try {
    const {
      rows: [order],
    } = await client.query(
      `
            INSERT INTO orders(
                "userId",
                total,
                complete,
                street,
                apartment,
                city,
                state,
                zipcode,
                nameoncard,
                billingaddress,
                ccnumber,
                ccsecuritycode,
                ccexpiration,
                cczipcode,
                "discountId"
            )
            VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15)
            RETURNING *;
        `,
      [
        userId,
        total,
        complete,
        street,
        apartment,
        city,
        state,
        zipcode,
        nameoncard,
        billingaddress,
        ccnumber,
        ccsecuritycode,
        ccexpiration,
        cczipcode,
        discountId,
      ],
    );
    return order;
  } catch (error) {
    throw error;
  }
}

async function getOrderById({ id }) {
  try {
    const {
      rows: [order],
    } = await client.query(
      `
            SELECT *
            FROM orders
            WHERE id=$1;
        `,
      [id],
    );
    return order;
  } catch (error) {
    throw error;
  }
}

async function getOrdersByUserId({ userId }) {
  try {
    const { rows: orders } = await client.query(
      `
        SELECT *
        FROM orders
        WHERE "userId"=$1;
    `,
      [userId],
    );
    return orders;
  } catch (error) {
    throw error;
  }
}

async function getAllIncompleteOrders() {
  try {
    const { rows: orders } = await client.query(`
            SELECT *
            FROM orders
            WHERE complete=false;
        `);
    return orders;
  } catch (error) {
    throw (error);
  }
}

async function getAllCompleteOrders() {
  try {
    const { rows: orders } = await client.query(`
              SELECT *
              FROM orders
              WHERE complete=true;
          `);
    return orders;
  } catch (error) {
    throw (error);
  }
}

module.exports = {
  createOrder,
  getOrderById,
  getOrdersByUserId,
  getAllIncompleteOrders,
  getAllCompleteOrders,
};
