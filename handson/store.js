const { storeApiRoot, myApiRoot, projectKey } = require("./client.js");

//TODO store and me endpoint

module.exports.getCustomersInStore = (storeKey) =>
  storeApiRoot
    .withProjectKey({ projectKey })
    .inStoreKeyWithStoreKeyValue({ storeKey })
    .customers()
    .get()
    .execute();

//use me endpoint with another client
module.exports.getMe = () =>
  myApiRoot.withProjectKey({ projectKey }).me().get().execute();
