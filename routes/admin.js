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

adminRouter.post("/search", async (req, res, next) => {
  try {
    const items = await getAllItems();
    console.log(items);
  } catch (error) {
    next(error);
  }
});
