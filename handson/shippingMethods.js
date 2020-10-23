const { apiRoot, projectKey } = require("./client.js");

module.exports.getShippingMethodById = (ID) =>
  apiRoot
    .withProjectKey({ projectKey })
    .shippingMethods()
    .withId({ ID })
    .get()
    .execute();
