const { projectApiRoot, projectStoreApiRoot } = require("./client");

//TODO store and productSelection endpoint

module.exports.getStoreByKey = (key) =>
  projectApiRoot
    .stores()
    .withKey({ key })
    .get()
    .execute();

module.exports.getCustomersInStore = (storeKey) =>
  projectStoreApiRoot
    .inStoreKeyWithStoreKeyValue({ storeKey })
    .customers()
    .get()
    .execute();

module.exports.addProductSelectionToStore = (storeKey, productSelectionKey) =>
  this.getStoreByKey(storeKey).then((store) =>
    projectApiRoot
      .stores()
      .withKey({ key: storeKey })
      .post({
        body: {
          version: store.body.version,
          actions: [
            {
              action: "addProductSelection",
              productSelection: {
                typeId: "product-selection",
                key: productSelectionKey
              },
              active: true
            }
          ]
        }
      })
      .execute()
  )

module.exports.getProductsInStore = (storeKey) =>
  projectApiRoot
    .inStoreKeyWithStoreKeyValue({ storeKey })
    .productSelectionAssignments()
    .get({
      queryArgs: {
        expand: ["product", "productSelection"]
      }
    })
    .execute();

