const { client } = require('./client');

async function createDiscount({
  name, type, description, amount,
}) {
  try {
    const { rows: [discount] } = await client.query(`
            INSERT INTO discounts (name, type, description, amount)
            VALUES ($1, $2, $3, $4)
            RETURNING *;
        `, [name, type, description, amount]);
    return discount;
  } catch (error) {
    throw error;
  }
}

async function updateDiscount({
  id, name, type, description, amount,
}) {
  try {
    const { rows: [discount] } = await client.query(`
                UPDATE discounts (name, type, description, amount)
                SET name = $2, type = $3, description = $4, amount = $5
                WHERE id = $1
                RETURNING *;
            `, [id, name, type, description, amount]);
    return discount;
  } catch (error) {
    throw error;
  }
}

async function getDiscountById(id) {
  try {
    const { rows: [discount] } = await client.query(`
            SELECT *
            FROM discounts
            WHERE id = $1;
        `, [id]);
    return discount;
  } catch (error) {
    throw error;
  }
}

async function getAllDiscounts() {
  try {
    const { rows: discounts } = await client.query(`
                SELECT *
                FROM discounts
            `);
    return discounts;
  } catch (error) {
    throw error;
  }
}

async function deleteDiscount(id) {
  try {
    const { rows: [discount] } = await client.query(`
            DELETE FROM discounts
            WHERE id = $1
            RETURNING *;
        `, [id]);
    return discount;
  } catch (error) {
    throw error;
  }
}

async function addDiscountToOrder({ orderId, discountId }) {
  try {
    const { rows: [order] } = await client.query(`
              UPDATE orders
              SET "dicountId" = $2
              WHERE id = $1;
          `, [orderId, discountId]);
    return order;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  createDiscount,
  updateDiscount,
  getDiscountById,
  deleteDiscount,
  getAllDiscounts,
  addDiscountToOrder,
};
