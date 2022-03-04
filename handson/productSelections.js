const { apiRoot, projectKey } = require("./client.js");

//TODO Product Selections

module.exports.getProductSelectionByKey = (key) =>
  apiRoot.withProjectKey({ projectKey })
    .productSelections()
    .withKey({ key })
    .get()
    .execute();

module.exports.createProductSelection = (key,name) =>
  apiRoot.withProjectKey({ projectKey })
    .productSelections()
    .post({
        body: {
          key: key,
          name: {"en":name}
        }
      }
    )
    .execute();

module.exports.addProductsToProductSelection = async (
  productSelectionKey,
  arrayOfProductKeys
) => {
  const prdoductSelection = await this.getProductSelectionByKey(productSelectionKey);
  const actions = arrayOfProductKeys.map((key) => {
    return {
      action: "addProduct",
      product: {
        typeId: "product",
        key,
      },
    };
  });
  return apiRoot.withProjectKey({ projectKey })
    .productSelections()
    .withKey({ key: productSelectionKey })
    .post({
      body: {
        version: prdoductSelection.body.version,
        actions,
      },
    })
    .execute();
};

module.exports.getProductsInProductSelection = (productSelectionKey) =>
  apiRoot.withProjectKey({ projectKey })
    .productSelections()
    .withKey({ key: productSelectionKey })
    .products()
    .get({
      queryArgs:{
        expand:'product'
      }
    })
    .execute();
 
