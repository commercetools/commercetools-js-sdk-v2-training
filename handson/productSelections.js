const { apiRoot, projectKey } = require("./client.js");

//TODO Product Selections

module.exports.getProductSelectionByKey = (key) =>
  apiRoot.withProjectKey({ projectKey })
    .productSelections()
    .withKey({ key })
    .get()
    .execute();

module.exports.createProductSelection = (key, name) => {}

module.exports.addProductsToProductSelection = async (
  productSelectionKey,
  arrayOfProductKeys
) => {}

module.exports.getProductsInProductSelection = (productSelectionKey) => {}