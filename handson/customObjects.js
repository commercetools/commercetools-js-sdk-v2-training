const { apiRoot, projectKey } = require("./client.js");


module.exports.getCustomObjectByContainerAndKey = (container, key) =>
    apiRoot
      .withProjectKey({ projectKey })
      .customObjects()
      .withContainerAndKey({
          container,
          key
      })
      .get()
      .execute();

      
module.exports.createCustomObject = (customObjectDraftData) =>
  apiRoot
    .withProjectKey({ projectKey })
    .customObjects()
    .post({ body: createCustomObjectDraft(customObjectDraftData) })
    .execute();


const createCustomObjectDraft = (customObjectDraftData) => {
    const {container, key, value}=customObjectDraftData
    return {
        container,
        key, 
        value
    }
}
