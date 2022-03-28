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
) => 
  this.getProductSelectionByKey(productSelectionKey).then((productSelection) =>
    apiRoot.withProjectKey({projectKey})
    .productSelections()
    .withKey({key: productSelectionKey})
    .post({
      body: {
        version: productSelection.body.version,
        actions: arrayOfProductKeys.map((productKey) => {
          return {
            action: "addProduct",
            product: {key: productKey}
          }
        })
      }
    })
    .execute()
  )
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
 
