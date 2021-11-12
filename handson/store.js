const { storeApiRoot, myApiRoot, projectKey } = require("./client.js");

//TODO store and me endpoint

module.exports.getCustomersInStore = (storeKey) =>
  storeApiRoot
    .withProjectKey({ projectKey })
    .inStoreKeyWithStoreKeyValue({ storeKey })
    .customers()
    .get()
    .execute();

module.exports.createInSoreCart = (storeKey,customer) =>
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

//use me endpoint with another client
module.exports.getMe = () =>
  myApiRoot
      .withProjectKey({ projectKey })
      .me()
      .get()
      .execute()

 
