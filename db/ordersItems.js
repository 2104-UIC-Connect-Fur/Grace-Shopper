/* eslint-disable no-useless-catch */
const { client } = require('./client');

async function addItemToOrder({
  orderId, itemId, quantity, priceatpurchase,
}) {
  try {
    const { rows: [item] } = await client.query(`
              INSERT INTO ordersitems("orderId", "itemId", quantity, priceatpurchase)
              VALUES($1, $2, $3, $4)
              RETURNING *;
          `, [orderId, itemId, quantity, priceatpurchase]);
    return item;
  } catch (error) {
    throw (error);
  }
}

async function deleteItemFromOrder({ orderId, itemId }) {
  try {
    const { rows: [item] } = await client.query(`
        DELETE FROM ordersitems
        WHERE "orderId"=$1 AND "itemId"=$2
        RETURNING *;
    `, [orderId, itemId]);
    return item;
  } catch (error) {
    throw (error);
  }
}

async function updateItemQuantityOnOrder({ orderId, itemId, quantity }) {
  try {
    const { rows: [item] } = await client.query(`
            UPDATE ordersitems
            SET quantity=$3
            WHERE "orderId"=$1 AND "itemId"=$2
            RETURNING *;
        `, [orderId, itemId, quantity]);
    return item;
  } catch (error) {
    throw (error);
  }
}

async function updatePriceAtPurchase({ orderId, itemId, priceatpurchase }) {
  try {
    const { rows: [item] } = await client.query(`
            UPDATE ordersitems
            SET priceatpurchase=$3
            WHERE "orderId"=$1 AND "itemId"=$2;
        `, [orderId, itemId, priceatpurchase]);
    return item;
  } catch (error) {
    throw (error);
  }
}

module.exports = {
  addItemToOrder,
  deleteItemFromOrder,
  updateItemQuantityOnOrder,
  updatePriceAtPurchase,
};
