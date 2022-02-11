const { apiRoot, storeApiRoot, myApiRoot, projectKey } = require("./client.js");

//TODO store and me endpoint

module.exports.getCustomersInStore = (storeKey) =>
  storeApiRoot
    .withProjectKey({ projectKey })
    .inStoreKeyWithStoreKeyValue({ storeKey })
    .customers()
    .get()
    .execute();

module.exports.getSelectionByKey = (key) =>
  apiRoot
    .withProjectKey({ projectKey })
    .productSelections()
    .withKey({ key })
    .get()
    .execute();

module.exports.addProductsToSelection = async (
  selectionKey,
  arrayOfProductKeys
) => {
  const prdoductSelection = await this.getSelectionByKey(selectionKey);
  const actions = arrayOfProductKeys.map((key) => {
    return {
      action: "addProduct",
      product: {
        typeId: "product",
        key,
      },
    };
  });
  return apiRoot
    .withProjectKey({ projectKey })
    .productSelections()
    .withKey({ key: selectionKey })
    .post({
      body: {
        version: prdoductSelection.body.version,
        actions,
      },
    })
    .execute();
};

module.exports.getProductsInASelection = (selectionKey) =>
  apiRoot
    .withProjectKey({ projectKey })
    .productSelections()
    .withKey({ key: selectionKey })
    .products()
    .get({
      queryArgs:{
        expand:'product'
      }
    })
    .execute();

module.exports.getProductsInAStore = (storeKey) =>
  storeApiRoot
    .withProjectKey({ projectKey })
    .inStoreKeyWithStoreKeyValue({ storeKey })
    .productSelectionAssignments()
    .get()
    .execute();


//use me endpoint with another client
module.exports.getMe = () =>
  myApiRoot.withProjectKey({ projectKey }).me().get().execute();

module.exports.createInStoreCart = (storeKey,customer) =>
    storeApiRoot
        .withProjectKey({projectKey})
        .inStoreKeyWithStoreKeyValue({storeKey})
        .carts()
        .post({
            body: {
                currency: "EUR",
                customerId: customer.body.id,
                customerEmail: customer.body.email,
            }
        })
        .execute();


 
