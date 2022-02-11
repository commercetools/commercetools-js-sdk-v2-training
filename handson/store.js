const { storeApiRoot, myApiRoot, projectKey } = require("./client.js");

//TODO store and me endpoint

module.exports.getCustomersInStore = (storeKey) => {};

// Create an in-store cart using store api client
module.exports.createInStoreCart = (storeKey, customer) => {};

module.exports.getSelectionByKey = (key) => {};

module.exports.addProductsToSelection = async (
  selectionKey,
  arrayOfProductKeys
) => {};

module.exports.getProductsInASelection = (selectionKey) => {};

module.exports.getProductsInAStore = (storeKey) => {};

//use me endpoint with another client
module.exports.getMe = () => {};
