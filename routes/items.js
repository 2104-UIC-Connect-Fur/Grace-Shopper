const itemsRouter = require('express').Router();
const {
  getAllItems,
  createItems,
  getItemsByCategoryId,
  getItemsFromQuery,
} = require('../db');

const { requireUser } = require('./utils');

itemsRouter.get('/', requireUser, async (req, res, next) => {
  try {
    const items = await getAllItems();
    res.send(items);
  } catch (error) {
    next(error);
  }
});

itemsRouter.get('/bycategory/:categoryId', async (req, res, next) => {
  try {
    const { categoryId } = req.params;
    const items = await getItemsByCategoryId(categoryId);
    console.log(`items for category id ${categoryId}:`, items);
    res.send(items);
  } catch (error) {
    next(error);
  }
});

itemsRouter.post('/search', async (req, res, next) => {
  try {
    const { body: queryObject } = req.body;
    console.log('search query: ', queryObject);
    const items = await getItemsFromQuery(queryObject);
    console.log(`items from search ${queryObject}:`, items);
    res.send(items);
  } catch (error) {
    next(error);
  }
});

// make this require authentication
itemsRouter.post('/', async (req, res, next) => {
  try {
    const itemToCreate = req.body;
    const item = await createItems(itemToCreate);
    return res.send(`success! item created: ${item.title}`);
  } catch (error) {
    console.log(error);
    next({
      name: 'itemCreationError',
      message: 'something went wrong. please check your item information and try again.',
    });
  }
});

module.exports = itemsRouter;
