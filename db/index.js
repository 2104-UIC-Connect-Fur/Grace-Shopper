// Connect to DB
const { client } = require('./client');
const {
  createUser,
  createUserPayment,
  createUserAddress,
} = require('./users');
const {
  createOrder,
  getOrderById,
  getOrdersByUserId,
  getAllCompleteOrders,
  getAllIncompleteOrders,
} = require('./orders');
const {
  addItemToOrder,
  deleteItemFromOrder,
  updateItemQuantityOnOrder,
} = require('./ordersItems');

const { createItems, createItemImages, createCategories, getAllItems, getItemsByCategoryId, createItemsCategories } = require('./items');
// CREATE NEW DATABASE METHODS HERE AND EXPORT THEM IN THE MODULE EXPORT.
// PULL THEM INTO INIT_DB.JS TO SEED THE DB WITH FAKE DATA.

// export
module.exports = {
  client,
  createUser,
  createUserPayment,
  createUserAddress,
  createOrder,
  getOrderById,
  getOrdersByUserId,
  getAllCompleteOrders,
  getAllIncompleteOrders,
  addItemToOrder,
  deleteItemFromOrder,
  updateItemQuantityOnOrder,
  createItems,
  createItemImages,
  createCategories,
  getAllItems,
  getItemsByCategoryId,
  createItemsCategories,
  // db methods
};
