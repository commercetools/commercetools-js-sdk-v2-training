const { apiRoot, projectKey } = require("./client.js");

module.exports.createCustomType = (typeDraftData) =>{}


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
