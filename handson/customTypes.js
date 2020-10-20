const { apiRoot, projectKey } = require("./client.js");

module.exports.createCustomType = (typeDraftData) =>
  apiRoot
    .withProjectKey({ projectKey })
    .types()
    .post({ body: createTypeDraft(typeDraftData) })
    .execute();


const createTypeDraft = (typeDraftData) => {
    const {key, name, description, resourceTypeIds, fieldDefinitions}=typeDraftData
    return {
        key, 
        name, 
        description, 
        resourceTypeIds, 
        fieldDefinitions
    }
}
