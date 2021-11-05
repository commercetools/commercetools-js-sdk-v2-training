const { apiRoot, projectKey } = require("./client.js");


module.exports.getCustomObjectByContainerAndKey = (container, key) => {}

      
module.exports.createCustomObject = (customObjectDraftData) => {}


const createCustomObjectDraft = (customObjectDraftData) => {
    const {container, key, value}=customObjectDraftData
    return {
        container,
        key, 
        value
    }
}
