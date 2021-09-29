const userRouter = require('express').Router();
const { createUser } = require('../db');

userRouter.post('/', async (req, res, next) => {
  try {
    const userToCreate = req.body;
    console.log('create user request: ', req);
    const createdUser = await createUser(userToCreate);
    return res.send(`success! user created: ${createdUser.username}`);
  } catch (error) {
    console.log(error);
    next({
      name: 'userCreationError',
      message: 'something went wrong. please check your user information and try again.',
    });
  }
});

module.exports = userRouter;
