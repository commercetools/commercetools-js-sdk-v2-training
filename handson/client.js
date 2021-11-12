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
  const authMiddleware = createAuthMiddlewareForClientCredentialsFlow({
    host: process.env.CTP_AUTH_URL,
    projectKey,
    credentials: {
      clientId: process.env.CTP_CLIENT_ID,
      clientSecret: process.env.CTP_CLIENT_SECRET
    },
    fetch,
  });

  const httpMiddleware = createHttpMiddleware({
    host: process.env.CTP_API_URL,
    fetch,
  });

  const ctpClient = createClient({
    middlewares: [authMiddleware, httpMiddleware],
  });
  return ctpClient;
};

const getImportClient = () => {
  const authMiddleware = createAuthMiddlewareForClientCredentialsFlow({
    host: process.env.IMPORT_AUTH_URL,
    projectKey,
    credentials: {
      clientId: process.env.IMPORT_CLIENT_ID,
      clientSecret: process.env.IMPORT_CLIENT_SECRET,
    },
    fetch,
  });

  const httpMiddleware = createHttpMiddleware({
    host: process.env.IMPORT_API_URL,
    fetch,
  });

  const importClient = createClient({
    middlewares: [authMiddleware, httpMiddleware],
  });
  return importClient;
};

const getStoreClient = () => {
  const authMiddleware = createAuthMiddlewareForClientCredentialsFlow({
    host: "https://auth.europe-west1.gcp.commercetools.com",
    projectKey,
    credentials: {
      clientId: process.env.STORE_CLIENT_ID,
      clientSecret: process.env.STORE_CLIENT_SECRET,
    },
    fetch,
  });

  const httpMiddleware = createHttpMiddleware({
    host: process.env.STORE_API_URL,
    fetch,
  });

  const storeClient = createClient({
    middlewares: [authMiddleware, httpMiddleware],
  });
  return storeClient;
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
        username: "fafa2@example.com",
        password: "123",
      },
    },
    fetch,
  });
  const httpMiddleware = createHttpMiddleware({
    host: process.env.ME_API_URL,
    fetch,
  });

  const ctpClient = createClient({
    middlewares: [authMiddleware, httpMiddleware],
  });
  return ctpClient;
};

module.exports.apiRoot = createApiBuilderFromCtpClient(getClient());

module.exports.importApiRoot = createApiBuilderFromCtpClientOnlyForImports(
  getImportClient()
);

module.exports.storeApiRoot = createApiBuilderFromCtpClient(getStoreClient());

module.exports.myApiRoot = createApiBuilderFromCtpClient(getMyAPIClient());
module.exports.projectKey = projectKey;