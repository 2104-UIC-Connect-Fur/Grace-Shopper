const adminRouter = require('express').Router();
const { requireAdmin } = require('./utils');
const { getAllUsers } = require('../db');

adminRouter.use('*', requireAdmin);

adminRouter.get('/isAdmin', async (req, res, next) => {
  try {
    res.send({
      success: true,
      message: 'Welcome!!',
      isAdmin: true,
    });
  } catch (error) {
    throw error;
  }
});

adminRouter.get('/users', async (req, res, next) => {
  try {
    const allUsers = await getAllUsers();
    res.send({
      success: true,
      users: allUsers,
    });
  } catch (error) {
    next({
      success: false,
      name: 'usersLookupError',
      message: 'Failed to retrieve data for all users',
    });
  }
});

module.exports = adminRouter;

adminRouter.post("/search", async (req, res, next) => {
  try {
    const items = await getAllItems();
    console.log(items);
  } catch (error) {
    next(error);
  }
});
