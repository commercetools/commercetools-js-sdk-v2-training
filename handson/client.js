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
require('dotenv').config();

const fetch = require("node-fetch");

const projectKey = "training-fady-24-7";

const getClient = () => {
  const authMiddleware = createAuthMiddlewareForClientCredentialsFlow({
    host: "https://auth.europe-west1.gcp.commercetools.com",
    projectKey,
    credentials: {
      clientId: process.env.adminClientId,
      clientSecret: process.env.adminClientSecret,
    },
    fetch,
  });

  const httpMiddleware = createHttpMiddleware({
    host: "https://api.europe-west1.gcp.commercetools.com",
    fetch,
  });

  const ctpClient = createClient({
    middlewares: [authMiddleware, httpMiddleware],
  });
  return ctpClient;
};

const getImportClient = () => {
  const authMiddleware = createAuthMiddlewareForClientCredentialsFlow({
    host: "https://auth.europe-west1.gcp.commercetools.com",
    projectKey,
    credentials: {
      clientId: process.env.importClientId,
      clientSecret: process.env.importClientSecret,
    },
    fetch,
  });

  const httpMiddleware = createHttpMiddleware({
    host: "https://import.europe-west1.gcp.commercetools.com",
    fetch,
  });

  const ctpClient = createClient({
    middlewares: [authMiddleware, httpMiddleware],
  });
  return ctpClient;
};

const getStoreClient = () => {
  const authMiddleware = createAuthMiddlewareForClientCredentialsFlow({
    host: "https://auth.europe-west1.gcp.commercetools.com",
    projectKey,
    credentials: {
      clientId: process.env.storeClientId,
      clientSecret: process.env.storeClientSecret,
    },
    fetch,
  });

  const httpMiddleware = createHttpMiddleware({
    host: "https://api.europe-west1.gcp.commercetools.com",
    fetch,
  });

  const ctpClient = createClient({
    middlewares: [authMiddleware, httpMiddleware],
  });
  return ctpClient;
};

const getMLClient = () => {};

const getMyAPIClient = () => {
  const authMiddleware = createAuthMiddlewareForPasswordFlow({
    host: "https://auth.europe-west1.gcp.commercetools.com",
    projectKey,
    credentials: {
      clientId: process.env.myClientId,
      clientSecret: process.env.myClientSecret,
      user: {
        username: "test@test.com",
        password: "0ekg5vch",
      },
    },
    fetch,
  });

  const httpMiddleware = createHttpMiddleware({
    host: "https://api.europe-west1.gcp.commercetools.com",
    fetch,
  });

  const ctpClient = createClient({
    middlewares: [authMiddleware, httpMiddleware],
  });
  return ctpClient;
};

const apiRoot = createApiBuilderFromCtpClient(getClient());

const importApiRoot = createApiBuilderFromCtpClientOnlyForImports(
  getImportClient()
);

const storeApiRoot = createApiBuilderFromCtpClient(getStoreClient());

const myApiRoot = createApiBuilderFromCtpClient(getMyAPIClient());

module.exports.apiRoot = apiRoot;
module.exports.myApiRoot = myApiRoot;
module.exports.storeApiRoot = storeApiRoot;
module.exports.importApiRoot = importApiRoot;
module.exports.projectKey = projectKey;
