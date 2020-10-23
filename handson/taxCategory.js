const { apiRoot, projectKey } = require("./client.js");

module.exports.getTaxCategoryByKey = (key) =>
  apiRoot
    .withProjectKey({ projectKey })
    .taxCategories()
    .withKey({ key })
    .get()
    .execute();
