/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-param-reassign */
const userRouter = require('express').Router();
const jwt = require('jsonwebtoken');
require('dotenv').config();
require('dotenv').config();
const {
  createUser,
  getUser,
  getUserByUsername,
  getUserCart,
  getItemImages,
  createOrder,
} = require('../db');
const { requireUser } = require('./utils');

const { JWT_SECRET = 'default' } = process.env;

userRouter.post('/register', async (req, res, next) => {
  try {
    const existingUser = await getUserByUsername(req.body.username);
    if (existingUser) {
      next({
        success: false,
        name: 'userAlreadyExistError',
        message: 'A user already exists by that name.',
      });
    }
    const userToCreate = req.body;
    const { id, username } = await createUser(userToCreate);
    const token = jwt.sign({ userId: id, username }, JWT_SECRET);
    res.cookie('token', token, { httpOnly: true });
    return res.send({
      success: true,
      message: `success! user created: ${username}`,
      loggedInUser: username,
    });
  } catch (error) {
    next(error);
  }
});

userRouter.post('/login', async (req, res, next) => {
  try {
    const userToLogin = req.body;
    const { id: userId, username } = await getUser(userToLogin);
    const expiration = userToLogin.rememberMe && { maxAge: 604800000 };
    if (userId) {
      const token = jwt.sign({ userId, username }, JWT_SECRET);
      res.cookie('token', token, expiration, { httpOnly: true });
      return res.send({
        success: true,
        loggedInUser: username,
      });
    }
  } catch (error) {
    next(error);
  }
});

userRouter.get('/logout', async (req, res, next) => {
  try {
    res.clearCookie('token');
    res.send({
      success: true,
      message: 'Logged out.',
    });
  } catch (error) {
    next(error);
  }
});

userRouter.get('/me', requireUser, async (req, res, next) => {
  try {
    const { id, username } = req.user;
    res.send({
      success: true,
      id,
      username,
    });
  } catch (error) {
    next({
      success: false,
      name: 'meLookupFail',
      message: 'user lookup failed',
    });
  }
});

userRouter.get('/cart', requireUser, async (req, res, next) => {
  try {
    const { id } = req.user;
    const cart = await getUserCart(id);
    const { items } = cart;
    for (const item of items) {
      item.images = await getItemImages(item.itemId);
    }
    res.send({
      success: true,
      cart,
    });
  } catch (error) {
    next({
      success: false,
      name: 'cartFail',
      message: 'cart lookup failed',
    });
  }
});

userRouter.post('/cart', requireUser, async (req, res, next) => {
  try {
    const { id } = req.user;
    const { rows: [cart] } = await createOrder({ userId: id });
    res.send({
      success: true,
      cart,
    });
  } catch (error) {
    console.log(error);
    next({
      success: false,
      name: 'cartCreationFail',
      message: 'cart creation failed',
    });
  }
});

module.exports = userRouter;
