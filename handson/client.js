const { createApiBuilderFromCtpClient: createImportApiBuilderFromCtpClient } = require("@commercetools/importapi-sdk");
const { createApiBuilderFromCtpClient } = require("@commercetools/platform-sdk");
const { ClientBuilder } = require("@commercetools/sdk-client-v2");
const fetch = require("node-fetch");
const { Prefix, readConfig } = require("../utils/config");

/** You could read env settings from the .env file using the following code piece
 * const {
    clientId,
    clientSecret,
    projectKey,
    oauthHost,
    host,
  } = readConfig(Prefix.DEV);
 */

const createApiClient = () => { }

const createImportApiClient = () => { }

const createStoreApiClient = () => { }

const createMyApiClient = () => { }

const createStoreMyApiClient = () => { }

module.exports.projectApiRoot = createApiClient();
module.exports.projectImportApiRoot = createImportApiClient();
module.exports.projectStoreApiRoot = createStoreApiClient();
module.exports.projectMyApiRoot = createMyApiClient();
module.exports.projectStoreMyApiRoot = createStoreMyApiClient();
