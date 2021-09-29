const userRouter = require('express').Router();
const jwt = require('jsonwebtoken');
require('dotenv').config();
const {
  createUser, getUser, getUserByUsername, getUserById,
} = require('../db');
const { requireUser } = require('./utils');

const { JWT_SECRET = 'default' } = process.env;

userRouter.post('/register', async (req, res, next) => {
  try {
    const existingUser = await getUserByUsername(req.body.username);
    if (existingUser) {
      next({
        name: 'userAlreadyExistError',
        message: 'A user already exists by that name.',
      });
    }
    const userToCreate = req.body;
    const { id, username } = await createUser(userToCreate);
    const token = jwt.sign({ userId: id, username }, JWT_SECRET);
    res.cookie('token', token, { httpOnly: true });
    return res.send(`success! user created: ${username}`);
  } catch (error) {
    next(error);
  }
});

userRouter.post('/login', async (req, res, next) => {
  try {
    const userToLogin = req.body;
    const { id: userId, username } = await getUser(userToLogin);
    if (userId) {
      const token = jwt.sign({ userId, username }, JWT_SECRET);
      res.cookie('token', token, { httpOnly: true });
      return res.send({
        success: true,
        message: 'Login successful!',
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
      successs: true,
      id,
      username,
    });
  } catch (error) {
    next({
      successs: false,
      name: 'meLookupFail',
      message: 'user lookup failed',
    });
  }
});

module.exports = userRouter;
