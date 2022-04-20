const { apiRoot, storeApiRoot } = require("./client");

//TODO store and productProjection endpoint

module.exports.getStoreByKey = (key) =>
  apiRoot
    .stores()
    .withKey({ key })
    .get()
    .execute();

module.exports.getCustomersInStore = (storeKey) =>
  storeApiRoot
    .inStoreKeyWithStoreKeyValue({ storeKey })
    .customers()
    .get()
    .execute();

module.exports.addProductSelectionToStore = async (storeKey, productSelectionKey) =>
  this.getStoreByKey(storeKey).then((store) =>
    apiRoot
      .stores()
      .withKey({ key: storeKey })
      .post({
        body: {
          version: store.body.version,
          actions: [
            {
              action: "addProductSelection",
              productSelection: { key: productSelectionKey },
              active: true
            }
          ]
        }
      })
      .execute()
  )

module.exports.getProductsInStore = (storeKey) =>
  apiRoot
    .inStoreKeyWithStoreKeyValue({ storeKey })
    .productSelectionAssignments()
    .get({
      queryArgs: {
        expand: "product",
        expand: "productSelection"
      }
    })
    .execute();

module.exports.createInStoreCart = (storeKey, customer) =>
  storeApiRoot
    .inStoreKeyWithStoreKeyValue({ storeKey })
    .carts()
    .post({
      body: {
        currency: "EUR",
        customerId: customer.body.id,
        customerEmail: customer.body.email,
      }
    })
    .execute();



