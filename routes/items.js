const itemsRouter = require("express").Router();
const {
  getAllItems,
  createItems,
  getItemsByCategoryId,
  getItemsFromQuery,
  getAllCategories,
  getItemsById,
  updateItem,
  deleteItemFromDb,
} = require("../db");

const { requireUser } = require("./utils");

itemsRouter.get("/", requireUser, async (req, res, next) => {
  try {
    const items = await getAllItems();
    res.send(items);
  } catch (error) {
    next(error);
  }
});

itemsRouter.get("/bycategory/:categoryId", async (req, res, next) => {
  try {
    const { categoryId } = req.params;
    const items = await getItemsByCategoryId(categoryId);
    console.log(`items for category id ${categoryId}:`, items);
    res.send(items);
  } catch (error) {
    next(error);
  }
});

itemsRouter.get("/byItemId/:itemId", async (req, res, next) => {
  try {
    console.log("in item id route");
    const { itemId } = req.params;
    const item = await getItemsById(itemId);
    res.send({
      success: true,
      item,
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

itemsRouter.post("/search", async (req, res, next) => {
  try {
    const queryObject = req.body;
    if (!queryObject.resultsPerPage) queryObject.resultsPerPage = 12;
    // console.log('search query: ', queryObject);
    const items = await getItemsFromQuery(queryObject);
    // console.log(`items from search ${queryObject}:`, items);
    if (items.length > 0) {
      const totalResults = Number(items[0].totalresults);
      const pages = Math.ceil(totalResults / queryObject.resultsPerPage);
      return res.send({
        success: true,
        totalResults,
        pages,
        items,
      });
    }
    return res.send({
      success: true,
      totalResults: 0,
    });
  } catch (error) {
    next(error);
  }
});

// make this require authentication
itemsRouter.post("/createItem", async (req, res, next) => {
  try {
    const itemToCreate = req.body;
    const item = await createItems(itemToCreate);
    return res.send(`success! item created: ${item.title}`);
  } catch (error) {
    console.log(error);
    next({
      name: "itemCreationError",
      message:
        "something went wrong. please check your item information and try again.",
    });
  }
});

itemsRouter.get("/categories", async (req, res, next) => {
  try {
    const categories = await getAllCategories();
    res.send({
      success: true,
      categories,
    });
  } catch (error) {
    next(error);
  }
});

itemsRouter.post("/updateItem/:itemId", async (req, res, next) => {
  try {
    console.log("IN HERE 2 Sending updated Item");
    const { itemId } = req.params;
    const item = await updateItem(itemId, req.body);
    res.send({
      success: true,
      item,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
});

itemsRouter.patch("/setItemToInactive/:itemId", async (req, res, next) => {
  try {
    console.log("IN HERE 3 Sending Deleted Item");
    const { itemId } = req.params;
    const item = await deleteItemFromDb(itemId);
    res.send({
      success: true,
      inactiveItem: item,
    });
  } catch (error) {
    next({
      succes: false,
      name: "itemNotSetToInactive",
      message: "Unable to deactivate item from database.",
    });
  }
});

module.exports = itemsRouter;
