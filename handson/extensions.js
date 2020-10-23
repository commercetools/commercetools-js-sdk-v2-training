const { apiRoot, projectKey } = require("./client.js");

module.exports.createExtension = (extensionDraftData) =>{}

const createExtensionDraft = (extensionDraftData) => {
  const { key, destination, triggers } = extensionDraftData;
  return {
    key,
    destination,
    triggers,
  };
};
