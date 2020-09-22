const { apiRoot,projectKey } = require ('./client.js')



const getTaxCategoryByKey = (key) => apiRoot.withProjectKey({projectKey}).taxCategories().withKey({key}).get().execute();

module.exports.getTaxCategoryByKey = getTaxCategoryByKey;