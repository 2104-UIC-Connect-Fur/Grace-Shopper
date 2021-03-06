/* eslint-disable consistent-return */
/* eslint-disable no-useless-catch */
const { client } = require('./client');
const { createQueryInsertString, createQueryValuesString } = require('./utils');

async function createOrder(orderObj) {
  const queryInsertString = createQueryInsertString(orderObj);
  const queryValuesString = createQueryValuesString(orderObj);

  if (queryInsertString.length === 0) {
    return;
  }

  try {
    const {
      rows: [order],
    } = await client.query(
      `
            INSERT INTO orders(${queryInsertString})
            VALUES(${queryValuesString})
            RETURNING *;
        `,
      Object.values(orderObj),
    );
    return order;
  } catch (error) {
    throw error;
  }
}

async function getOrderById(id) {
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

async function getOrdersByUserId(userId) {
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
    throw error;
  }
}

async function getIncompleteOrdersByUserId(userId) {
  try {
    const { rows: orders } = await client.query(
      `
            SELECT *
            FROM orders
            WHERE "userId"=$1 AND complete=false;
        `,
      [userId],
    );
    return orders;
  } catch (error) {
    throw error;
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
    throw error;
  }
}

async function getCompleteOrdersByUserId(userId) {
  try {
    const { rows: orders } = await client.query(
      `
            SELECT *
            FROM orders
            WHERE "userId"=$1 AND complete=true;
        `,
      [userId],
    );
    return orders;
  } catch (error) {
    throw error;
  }
}

/* Currently returns all fields from matching items. Complete and purchaseprice fields
    update as they should. What other changes should happen when a customer completes
    their order?
*/
async function completeOrder({
  orderId,
  orderStreet,
  orderApartment = null,
  orderCity,
  orderState,
  orderZip,
  nameOnCard,
  ccNumber,
  ccSecurityCode,
  ccExpiration,
  ccZip,
  total,
}) {
  try {
    const {
      rows: [order],
    } = await client.query(
      `
            UPDATE orders
            SET complete = true, street = $2, apartment = $3, city = $4, state = $5, zipcode = $6, nameoncard = $7, ccnumber = $8, ccsecuritycode = $9, ccexpiration = $10, cczipcode = $11, total = $12
            WHERE id = $1
            RETURNING *;
        `,
      [
        orderId,
        orderStreet,
        orderApartment,
        orderCity,
        orderState,
        orderZip,
        nameOnCard,
        ccNumber,
        ccSecurityCode,
        ccExpiration,
        ccZip,
        total,
      ],
    );
    const { rows: ordersitems } = await client.query(
      `
            UPDATE ordersitems
            SET priceatpurchase = items.price
            FROM items
            WHERE "orderId" = $1 AND ordersitems."itemId" = items.id
            RETURNING *;
        `,
      [orderId],
    );
    order.items = ordersitems;
    return order;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  createOrder,
  getOrderById,
  getOrdersByUserId,
  getAllIncompleteOrders,
  getAllCompleteOrders,
  getIncompleteOrdersByUserId,
  getCompleteOrdersByUserId,
  completeOrder,
};
