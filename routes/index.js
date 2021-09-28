const apiRouter = require('express').Router();
const jwt = require('jsonwebtoken');
const itemsRouter = require('./items');
require('dotenv').config();
const { getUserById } = require('../db');

const { JWT_SECRET = 'default' } = process.env;
apiRouter.use(async (req, res, next) => {
// this is where we're going to grab user data off the cookie if it exists
// and attach it do the request so we can use it in downstream route functions
  try {
    const { token } = req.cookies;
    if (!token) {
      return next();
    }
    const { userId } = jwt.verify(token, JWT_SECRET);
    const user = await getUserById(userId);
    delete user.password;
    req.user = user;
    console.log(' request user: ', req.user);
    next();
  } catch (error) {
    console.log(error);
  }
});

apiRouter.get('/cookie', (req, res) => {
  const token = jwt.sign({ userId: 2 }, JWT_SECRET);
  res.cookie('token', token, { httpOnly: true });
  res.json('you got cookie?');
});

apiRouter.use('/items', itemsRouter);

module.exports = apiRouter;
