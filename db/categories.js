const { client } = require("./client");

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

async function getItemsByCategoryName({ name }) {
  try {
    const {
      rows: [item],
    } = await client.query(
      `
          SELECT * FROM categories
          WHERE "name" = $1;
          `,
      [name]
    );

    return item;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  createCategories,
  getItemsByCategoryName,
};
