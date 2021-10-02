/* eslint-disable global-require */

module.exports = {
  ...require("./client"),
  ...require("./users"),
  ...require("./orders"),
  ...require("./ordersItems"),
  ...require("./items"),
  ...require("./reviews"),
  ...require("./discounts"),
  ...require("./categories"),
  ...require("./images"),
};
