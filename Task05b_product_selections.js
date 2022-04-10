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
const productSelectionKey = "ff-berlin-store-selection";

 createProductSelection(productSelectionKey,"FF Berlin Store Selection").then(log).catch(log);

// getProductSelectionByKey(productSelectionKey).then(log).catch(log);

// addProductsToProductSelection(productSelectionKey,['tulip-seed-product']).then(log).catch(log);

// addProductSelectionToStore("berlin-store",productSelectionKey).then(log).catch(log);

// getProductsInProductSelection(productSelectionKey).then(log).catch(log);

// getProductsInStore("berlin-store").then(log).catch(log);
