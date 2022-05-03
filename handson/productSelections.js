const { projectApiRoot } = require("./client");

//TODO Product Selections

module.exports.getProductSelectionByKey = (key) =>
  projectApiRoot
    .productSelections()
    .withKey({ key })
    .get()
    .execute();

module.exports.createProductSelection = (key, name) =>
  projectApiRoot
    .productSelections()
    .post({
      body: {
        key: key,
        name: { "en": name }
      }
    }
    )
    .execute();

module.exports.addProductsToProductSelection = async (
  productSelectionKey,
  arrayOfProductKeys
) =>
  this.getProductSelectionByKey(productSelectionKey).then((productSelection) =>
    projectApiRoot
      .productSelections()
      .withKey({ key: productSelectionKey })
      .post({
        body: {
          version: productSelection.body.version,
          actions: arrayOfProductKeys.map((productKey) => {
            return {
              action: "addProduct",
              product: {
                typeId: "product",
                key: productKey
              }
            }
          })
        }
      })
      .execute()
  )
module.exports.getProductsInProductSelection = (productSelectionKey) =>
  projectApiRoot
    .productSelections()
    .withKey({ key: productSelectionKey })
    .products()
    .get({
      queryArgs: {
        expand: "product"
      }
    })
    .execute();
