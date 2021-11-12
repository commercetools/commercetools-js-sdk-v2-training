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

const projectKey = process.env.CTP_PROJECT_KEY;

//use .env for credentials process.env.adminClientId 

const getClient = () => {

};

const getImportClient = () => {

};

const getStoreClient = () => {

};

const getMLClient = () => {};

const getMyAPIClient = () => {
  const authMiddleware = createAuthMiddlewareForPasswordFlow({
    host: process.env.ME_AUTH_URL,
    projectKey,
    credentials: {
      clientId: process.env.ME_CLIENT_ID,
      clientSecret: process.env.ME_CLIENT_SECRET,
      user: {
        username: "test2@test.com",
        password: "password"
      },
    },
    fetch
  });
  const httpMiddleware = createHttpMiddleware({
    host: process.env.ME_API_URL,
    fetch
  });
  const client = createClient({
    middlewares: [authMiddleware,httpMiddleware]
  });
  return client;

};

module.exports.apiRoot = createApiBuilderFromCtpClient(getClient());

// module.exports.importApiRoot = createApiBuilderFromCtpClientOnlyForImports(
//   getImportClient()
// );

// module.exports.storeApiRoot = createApiBuilderFromCtpClient(getStoreClient());

// module.exports.myApiRoot = createApiBuilderFromCtpClient(getMyAPIClient());
module.exports.projectKey = projectKey;