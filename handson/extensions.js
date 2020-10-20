const { apiRoot, projectKey } = require("./client.js");

module.exports.createExtension = (extensionDraftData) =>
  apiRoot
    .withProjectKey({ projectKey })
    .extensions()
    .post({ body: createExtensionDraft(extensionDraftData) })
    .execute();

const createExtensionDraft = (extensionDraftData) => {
  const { key, destination, triggers } = extensionDraftData;
  return {
    key,
    destination,
    triggers,
  };
};
