/* eslint-disable consistent-return */
/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-param-reassign */
/* eslint-disable no-useless-catch */
const { client } = require('./client');
const { createQuerySetString } = require('./utils');

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

async function getItemImages(id) {
  try {
    const placeHolderImage = {
      url: '/images/rareshit.png',
      description: 'This item is so rare and exclusive that we cannot even photograph it. Please accept this doggo pic instead.',
      alttext: 'woof',
    };
    const { rows: images } = await client.query(
      `
      SELECT url, description, alttext
      FROM itemsimages
      WHERE "itemId"=$1;
      `, [id],
    );
    if (!images.length) {
      images.push(placeHolderImage);
    }
    return images;
  } catch (error) {
    throw error;
  }
}

async function getItemsById(id) {
  try {
    console.log('input id: ', id);
    const { rows: [item] } = await client.query(
      `
        Select * from items
        WHERE id=$1; 
        `,
      [id],
    );
    item.images = await getItemImages(id);
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
      resultsPerPage = 25,
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
    for (const item of items) {
      const images = await getItemImages(item.id);
      item.images = images;
    }
    return items;
  } catch (error) {
    throw error;
  }
}

async function updateItem(updateObject) {
  const setString = createQuerySetString(updateObject);

  if (setString.length === 0) {
    return;
  }

  try {
    const {
      rows: [item],
    } = await client.query(
      `
            UPDATE items
            SET ${setString}
            WHERE id=${updateObject.id}
            Returning *;
        `,
      Object.values(updateObject),
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
  getItemImages,
};
