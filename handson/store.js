const { apiRoot, storeApiRoot, projectKey } = require("./client.js");

//TODO store and productProjection endpoint

module.exports.getStoreByKey = (key) =>
  apiRoot.withProjectKey({projectKey})
    .stores()
    .withKey({key})
    .get()
    .execute();

module.exports.getCustomersInStore = (storeKey) =>
  storeApiRoot.withProjectKey({ projectKey })
    .inStoreKeyWithStoreKeyValue({ storeKey })
    .customers()
    .get()
    .execute();

module.exports.addProductSelectionToStore = async (storeKey, productSelectionKey) =>
  this.getStoreByKey(storeKey).then((store) =>
    apiRoot.withProjectKey({projectKey})
      .stores()
      .withKey({key: storeKey})
      .post({
        body: {
          version: store.body.version,
          actions: [
            {
              action: "addProductSelection",
              productSelection: { key: productSelectionKey},
              active: true      
            }
          ]
        }
      })
      .execute()
  )

module.exports.getProductsInStore = (storeKey) =>
  apiRoot.withProjectKey({ projectKey })
    .inStoreKeyWithStoreKeyValue({ storeKey })
    .productSelectionAssignments()
    .get()
    .execute();

module.exports.createInStoreCart = (storeKey, customer) =>
    storeApiRoot.withProjectKey({projectKey})
        .inStoreKeyWithStoreKeyValue({storeKey})
        .carts()
        .post({
            body: {
                currency: "EUR",
                customerId: customer.body.id,
                customerEmail: customer.body.email,
                store: {key: storeKey}
            }
        })
        .execute();


 
