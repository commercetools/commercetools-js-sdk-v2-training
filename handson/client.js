const {
  createAuthMiddlewareForClientCredentialsFlow,
  createAuthMiddlewareForPasswordFlow,
} = require("@commercetools/sdk-middleware-auth");
const { createHttpMiddleware } = require("@commercetools/sdk-middleware-http");
const { createClient } = require("@commercetools/sdk-client");
const {
  createApiBuilderFromCtpClient,
} = require("@commercetools/typescript-sdk");

const {
  createApiBuilderFromCtpClient: createApiBuilderFromCtpClientOnlyForImports,
} = require("@commercetools/importapi-sdk");
require("dotenv").config();

const fetch = require("node-fetch");

const projectKey = "training-fady-24-7";

//use .env for credentials process.env.adminClientId 

const getClient = () => {
  
};

const getImportClient = () => {
  
};

const getStoreClient = () => {
  
};

const getMLClient = () => {};

const getMyAPIClient = () => {
  
};

module.exports.apiRoot = createApiBuilderFromCtpClient(getClient());

module.exports.importApiRoot = createApiBuilderFromCtpClientOnlyForImports(
  getImportClient()
);

module.exports.storeApiRoot = createApiBuilderFromCtpClient(getStoreClient());

module.exports.myApiRoot = createApiBuilderFromCtpClient(getMyAPIClient());
module.exports.projectKey = projectKey;