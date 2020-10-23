const { apiRoot, projectKey } = require("./client.js");

module.exports.getProject = () =>
  apiRoot.withProjectKey({ projectKey }).get().execute();
