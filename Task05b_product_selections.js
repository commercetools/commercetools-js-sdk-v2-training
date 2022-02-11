const {
  getProductsInASelection,
  addProductsToSelection,
  getSelectionByKey,
  getProductsInAStore,
  getProductsInAStoreAdmin
} = require("./handson/store");
const { log } = require("./logger");

//getSelectionByKey('ff-selection-1').then(log).catch(log);

//addProductsToSelection('ff-selection-2',['garlic-press']).then(log).catch(log);

//getProductsInASelection("ff-selection-2").then(log).catch(log);

getProductsInAStore("berlin-store").then(log).catch(log);
