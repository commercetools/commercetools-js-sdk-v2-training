const { apiRoot, projectKey } = require("./client.js");

module.exports.createSubscription = (subscriptionsDraftData) =>
  apiRoot
    .withProjectKey({ projectKey })
    .subscriptions()
    .post({ body: subscriptionsDraftData })
    .execute();

