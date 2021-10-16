const ordersRouter = require('express').Router();
require('dotenv').config();
const {
  updateItemQuantityOnOrder,
  deleteItemFromOrder,
  addItemToOrder,
} = require('../db');

ordersRouter.patch('/items', async (req, res, next) => {
  try {
    const item = await updateItemQuantityOnOrder(req.body);
    res.send({
      success: true,
      orderItem: item,
    });
  } catch (error) {
    console.log(error);
    next({
      success: false,
      name: 'itemQuanityChangeError',
      message: 'Unable to update item quantity.',
    });
  }
});

ordersRouter.post('/items', async (req, res, next) => {
  try {
    const orderItem = await addItemToOrder(req.body);
    console.log('add item:', orderItem);
    res.send({
      success: true,
      orderItem,
    });
  } catch (error) {
    console.log(error);
    next({
      success: false,
      name: 'itemAddError',
      message: 'Unable to add item to order.',
    });
  }
});

ordersRouter.delete('/items', async (req, res, next) => {
  try {
    const item = await deleteItemFromOrder(req.body);
    res.send({
      success: true,
      deletedItem: item,
    });
  } catch (error) {
    next({
      success: false,
      name: 'itemDeleteError',
      message: 'Unable to delete item from order.',
    });
  }
});

module.exports = ordersRouter;
