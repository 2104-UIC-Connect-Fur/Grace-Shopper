const ordersRouter = require('express').Router();
const jwt = require('jsonwebtoken');
require('dotenv').config();
const {
  updateItemQuantityOnOrder,
} = require('../db');
const { requireUser } = require('./utils');

const { JWT_SECRET = 'default' } = process.env;

ordersRouter.patch('/items', async (req, res, next) => {
  try {
    console.log(`what is on the req body: ${req.body.itemId}`);
    const item = await updateItemQuantityOnOrder(req.body);
    console.log(`in the updateItemQuantityOnOrder route: ${item}`);
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

module.exports = ordersRouter;
