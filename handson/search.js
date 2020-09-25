const { apiRoot, projectKey } = require("./client.js");

module.exports.getAllProducts = () =>
  apiRoot.withProjectKey({ projectKey }).products().get().execute();

// filter query recalculates everything
// filter facet recalculates others only
module.exports.simulateSearch = () =>
  apiRoot
    .withProjectKey({ projectKey })
    .productProjections()
    .search()
    .get({
      queryArgs: {
        filter: 'categories.id:"67c7ec58-0ea8-4e23-84ea-93b02e33184d"',
        facet: ["variants.attributes.size", "variants.attributes.color"],
        "filter.query": "variants.attributes.size:256",
      },
    })
    .execute();
