// Connect to DB
const { client } = require("./client");
const { createUser, createUserPayment, createUserAddress } = require("./users");
const {
  createOrder,
  getOrderById,
  getOrdersByUserId,
  getAllCompleteOrders,
  getAllIncompleteOrders,
} = require("./orders");
const {
  addItemToOrder,
  deleteItemFromOrder,
  updateItemQuantityOnOrder,
} = require("./ordersItems");

const {
  createItems,
  getItemsById,
  getAllItems,
  updateItem,
} = require("./items");

const {
  createItemImages,
  itemsMissingImages,
  getImagesByItemId,
  getAllImages,
} = require("./images");

const { createCategories, getItemsByCategoryName } = require("./categories");

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
  getItemsById,
  getAllItems,
  createItemImages,
  createCategories,
  itemsMissingImages,
  getImagesByItemId,
  getAllImages,
  updateItem,
  getItemsByCategoryName,
  // db methods
};
