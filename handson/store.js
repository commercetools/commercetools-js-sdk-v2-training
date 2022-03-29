const { apiRoot, storeApiRoot, projectKey } = require("./client.js");

//TODO store and productProjection endpoint

module.exports.getStoreByKey = (key) =>
  apiRoot.withProjectKey({projectKey})
    .stores()
    .withKey({key})
    .get()
    .execute()


module.exports.getCustomersInStore = (storeKey) => {}

module.exports.addProductSelectionToStore = async (storeKey, productSelectionKey) => {}

module.exports.getProductsInStore = (storeKey) => {}

module.exports.createInStoreCart = (storeKey, customer) => {}