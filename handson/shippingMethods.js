const { apiRoot, projectKey } = require("./client.js");

const getShippingMethodById = (ID) =>
  apiRoot
    .withProjectKey({ projectKey })
    .shippingMethods()
    .withId({ ID })
    .get()
    .execute();

module.exports.getShippingMethodById = getShippingMethodById;
