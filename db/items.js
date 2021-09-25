const { client } = require("./client");

async function createItems({ title, description, price, inventoryquantity }) {
  try {
    const {
      rows: [item],
    } = await client.query(
      `
            INSERT INTO items(title, description, price,inventoryquantity) 
            VALUES($1, $2, $3, $4) 
            RETURNING *;
          `,
      [title, description, price, inventoryquantity]
    );
    return item;
  } catch (error) {
    throw error;
  }
}

async function createItemImages({ itemId, url, description, alttext }) {
  try {
    const {
      rows: [image],
    } = await client.query(
      `
              INSERT INTO itemsimages("itemId", url, description,alttext) 
              VALUES($1, $2, $3, $4) 
              RETURNING *;
            `,
      [itemId, url, description, alttext]
    );
    return image;
  } catch (error) {
    throw error;
  }
}

async function createCategories({ name, description }) {
  try {
    const {
      rows: [categories],
    } = await client.query(
      `
                INSERT INTO categories(name, description) 
                VALUES($1, $2) 
                RETURNING *;
              `,
      [name, description]
    );
    return categories;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  createItems,
  createItemImages,
  createCategories,
};
