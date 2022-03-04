const {
  getProductsInStore,
  addProductSelectionToStore
} = require("./handson/store");
const {
  getProductSelectionByKey,
  createProductSelection,
  addProductsToProductSelection,
  getProductsInProductSelection
} = require("./handson/productSelections");

const { log } = require("./logger");

// createProductSelection("berlin-store-selection","Berlin Store Selection").then(log).catch(log);

// getProductSelectionByKey('berlin-store-selection').then(log).catch(log);

// addProductsToProductSelection('berlin-store-selection',['tulip-seed-product']).then(log).catch(log);

// addProductSelectionToStore("berlin-store","berlin-store-selection").then(log).catch(log);

// getProductsInProductSelection("berlin-store-selection").then(log).catch(log);

getProductsInStore("berlin-store").then(log).catch(log);
