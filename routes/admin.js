const adminRouter = require('express').Router();
const { requireAdmin } = require('./utils');

adminRouter.use('*', requireAdmin);

adminRouter.get('/isAdmin', (req, res, next) => {
  res.send({
    success: true,
    isAdmin: true,
  });
});

module.exports = adminRouter;
