const apiRouter = require("express").Router();
const jwt = require("jsonwebtoken");
const itemsRouter = require("./items");
const userRouter = require("./users");
const adminRouter = require("./admin");
require("dotenv").config();
const { getUserById } = require("../db");
const ordersRouter = require("./orders");

const { JWT_SECRET = "default" } = process.env;
apiRouter.use(async (req, res, next) => {
  // this is where we're going to grab user data off the cookie if it exists
  // and attach it do the request so we can use it in downstream route functions

  console.log("IN HERE 1");
  try {
    const { token } = req.cookies;
    if (!token) {
      return next();
    }
    const { userId } = jwt.verify(token, JWT_SECRET);
    const user = await getUserById(userId);
    delete user.password;
    req.user = user;
    console.log("IN HERE POST 1");
    next();
  } catch (error) {
    next(error);
  }
});

apiRouter.use("/items", itemsRouter);
apiRouter.use("/users", userRouter);
apiRouter.use("/orders", ordersRouter);
apiRouter.use("/admin", adminRouter);

module.exports = apiRouter;
