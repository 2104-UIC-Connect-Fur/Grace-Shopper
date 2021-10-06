const { client } = require("./client");

async function createItemImages({ itemId, url, description, alttext }) {
  try {
    const {
      rows: [image],
    } = await client.query(
      `INSERT INTO itemsimages("itemId", url, description,alttext) 
       VALUES($1, $2, $3, $4) 
       RETURNING *;`,
      [itemId, url, description, alttext]
    );
    return image;
  } catch (error) {
    throw error;
  }
}

async function itemsMissingImages() {
  try {
    const {
      rows: [item],
    } = await client.query(
      `
          SELECT * from itemsimages
          WHERE url = '';
          `
    );
    return item;
  } catch (error) {
    throw error;
  }
}

async function getImagesByItemId({ itemId }) {
  try {
    const {
      rows: [images],
    } = await client.query(
      `
        SELECT * FROM itemsimages
        WHERE "itemId" = $1;
        `,
      [itemId]
    );

    return images;
  } catch (error) {
    throw error;
  }
}

async function getAllImages() {
  try {
    const { rows: items } = await client.query(
      `
          SELECT * FROM itemsimages
          WHERE URL is not null
          and URL not in ('');`
    );
    return items;
  } catch (error) {
    throw error;
  }
}

/* POSSIBLE Additional Methods */
// getImagesByCategory;
// updateImages;
// addImagesToItems;

module.exports = {
  getImagesByItemId,
  createItemImages,
  itemsMissingImages,
  getAllImages,
};
