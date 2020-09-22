
const { apiRoot, projectKey } = require('./client.js');

const getProject = () => apiRoot.withProjectKey({projectKey}).get().execute();

module.exports.getProject = getProject;