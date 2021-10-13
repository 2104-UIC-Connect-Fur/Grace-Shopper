const adminRouter = require("express").Router();
const { requireAdmin } = require("./utils");

adminRouter.use("*", requireAdmin);

adminRouter.get("/isAdmin", async (req, res, next) => {
  try {
    res.send({
      success: true,
      message: "Welcome!!",
      isAdmin: true,
    });
  } catch (error) {
    throw error;
  }
});
module.exports = adminRouter;
