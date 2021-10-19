/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
const ordersRouter = require('express').Router();
require('dotenv').config();
const {
  updateItemQuantityOnOrder,
  deleteItemFromOrder,
  addItemToOrder,
  getUserCart,
  updateItem,
  completeOrder,
} = require('../db');
const { requireUser } = require('./utils');

ordersRouter.use('*', requireUser);

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

ordersRouter.post('/checkout', async (req, res, next) => {
  try {
    const completedOrder = {
      items: [],
      total: 0,
    };
    const orderData = req.body;
    const { id } = req.user;
    const { items, orderId } = await getUserCart(id);
    for (const item of items) {
      // if we can't fulfill the requested item amount
      // sell the current inventory quantity instead
      const {
        quantity, inventoryquantity, currentprice, itemId,
      } = item;
      const useInventoryQuantity = quantity > inventoryquantity;
      const amountToSell = useInventoryQuantity ? inventoryquantity : quantity;
      await updateItem({
        id: itemId,
        inventoryquantity: inventoryquantity - amountToSell,
      });
      await updateItemQuantityOnOrder({ orderId, itemId, quantity: amountToSell });
      completedOrder.items.push({
        itemId,
        amountSold: amountToSell,
        price: currentprice,
        couldNotFulfillCompletely: useInventoryQuantity,
      });
      completedOrder.total += currentprice * amountToSell;
    }
    const updatedOrder = await completeOrder({
      ...orderData,
      orderId,
      total: completedOrder.total,
    });
    res.send({
      success: true,
      data: {
        metaData: completedOrder,
        order: updatedOrder,
      },
    });
  } catch (error) {
    console.log(error);
    next({
      success: false,
      name: 'checkoutError',
      message: 'Unable to complete checkout.',
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
