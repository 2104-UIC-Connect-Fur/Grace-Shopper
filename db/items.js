/* eslint-disable no-useless-catch */
const { client } = require('./client');

async function createItems({
  title, description, price, inventoryquantity,
}) {
  try {
    const {
      rows: [item],
    } = await client.query(
      `
            INSERT INTO items(title, description, price,inventoryquantity) 
            VALUES($1, $2, $3, $4) 
            RETURNING *;
          `,
      [title, description, price, inventoryquantity],
    );
    return item;
  } catch (error) {
    throw error;
  }
}

async function getItemsById({ id }) {
  try {
    const { item } = await client.query(
      `
        Select * from items
        WHERE id=$1; 
        `,
      [id],
    );
    return item;
  } catch (error) {
    throw error;
  }
}

async function getAllItems() {
  try {
    const { rows: items } = await client.query('SELECT * FROM ITEMS;');
    return items;
  } catch (error) {
    throw error;
  }
}

async function getItemsFromQuery(queryObject) {
  try {
    const {
      priceLow,
      priceHigh,
      searchString,
      categoryIds = [],
      page = 1,
      resultsPerPage,
    } = queryObject;
    const whereConditions = priceLow || priceHigh || searchString;
    const joinedCategories = categoryIds.join(',');
    const categoryString = `JOIN itemscategories ON itemscategories."categoryId" IN (${joinedCategories})
    AND itemscategories."itemId"=items.id
    `;
    const searchStringforQuery = `
      (items.title iLIKE '%${searchString}%' OR
      items.description iLIKE '%${searchString}%')
    `;
    const rowsToSkip = (page - 1) * resultsPerPage;
    const queryString = `
    SELECT DISTINCT items.title, items.description, items.price, items.inventoryquantity, items.id, COUNT(items.id) OVER() as totalresults
    FROM ITEMS
    ${categoryIds.length ? categoryString : ''}
    ${whereConditions ? 'WHERE' : ''}
    ${priceLow ? `price >= ${priceLow}` : ''}
    ${(priceLow && priceHigh) ? 'AND' : ''}
    ${priceHigh ? `price <= ${priceHigh}` : ''}
    ${(priceLow || priceHigh) && searchString ? 'AND' : ''}
    ${searchString ? `${searchStringforQuery}` : ''}
    OFFSET ${rowsToSkip} ROWS
    FETCH NEXT ${resultsPerPage} ROWS ONLY;
    ;
    `;
    const { rows: items } = await client.query(queryString);
    return items;
  } catch (error) {
    throw error;
  }
}

async function updateItem({ id, price, inventoryquantity }) {
  try {
    const {
      rows: [item],
    } = await client.query(
      `
            UPDATE items
            SET price=$2, inventoryquantity=$3
            WHERE id=$1
            Returning *;
        `,
      [id, price, inventoryquantity],
    );
    return item;
  } catch (error) {
    throw error;
  }
}

async function createItemsCategories({ itemId, categoryId }) {
  try {
    const {
      rows: [itemcategory],
    } = await client.query(
      `
                INSERT INTO itemscategories("itemId", "categoryId") 
                VALUES($1, $2) 
                RETURNING *;
              `,
      [itemId, categoryId],
    );
    return itemcategory;
  } catch (error) {
    throw error;
  }
}

async function getAllCategories() {
  try {
    const {
      rows,
    } = await client.query(
      `
      SELECT categories.name, categories.id
      FROM categories;
      `,
    );
    return rows;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  createItems,
  getItemsById,
  getAllItems,
  updateItem,
  createItemsCategories,
  getItemsFromQuery,
  getAllCategories,
};
