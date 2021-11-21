/* eslint-disable no-useless-catch */
const { client } = require('./client');

async function createReview({
  itemId, userId, title, bodytext,
}) {
  try {
    const { rows: [review] } = await client.query(`
        INSERT INTO reviews("itemId", "userId", title, bodytext)
        VALUES($1, $2, $3, $4)
        RETURNING *;
        `, [itemId, userId, title, bodytext]);
    return review;
  } catch (error) {
    throw error;
  }
}

async function getReviewsByItem(itemId) {
  try {
    const { rows: reviews } = await client.query(`
         SELECT *
         FROM reviews
         WHERE "itemId" = $1;
        `, [itemId]);
    return reviews;
  } catch (error) {
    throw error;
  }
}

async function getReviewsByUser(userId) {
  try {
    const { rows: reviews } = await client.query(`
             SELECT *
             FROM reviews
             WHERE "userId" = $1;
            `, [userId]);
    return reviews;
  } catch (error) {
    throw error;
  }
}

async function deleteReview(id) {
  try {
    const { rows: [review] } = await client.query(`
            DELETE FROM reviews
            WHERE id = $1
            RETURNING *;
        `, [id]);
    return review;
  } catch (error) {
    throw error;
  }
}

async function updateReview(id, title, bodytext) {
  try {
    const { rows: [review] } = await client.query(`
            UPDATE reviews
            SET title = $2, bodytext = $3
            WHERE id = $1
            RETURNING *;
        `, [id, title, bodytext]);
    return review;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  createReview,
  getReviewsByItem,
  getReviewsByUser,
  deleteReview,
  updateReview,
};
