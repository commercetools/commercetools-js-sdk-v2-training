// const {
//   createAuthMiddlewareForClientCredentialsFlow,
//   createAuthMiddlewareForPasswordFlow,
// } = require("@commercetools/sdk-middleware-auth");
// const { createHttpMiddleware } = require("@commercetools/sdk-middleware-http");
// const { createClient } = require("@commercetools/sdk-client");
// const {
//   createApiBuilderFromCtpClient,
// } = require("@commercetools/typescript-sdk");

const {
  createClient,
  createHttpClient,
  createAuthForClientCredentialsFlow,
  createAuthForPasswordFlow
} = require ('@commercetools/sdk-client-v2')
const { createApiBuilderFromCtpClient } = require('@commercetools/platform-sdk')

const {
  createApiBuilderFromCtpClient: createApiBuilderFromCtpClientOnlyForImports,
} = require("@commercetools/importapi-sdk");
require("dotenv").config();

const fetch = require("node-fetch");

const projectKey = process.env.CTP_PROJECT_KEY;

const getClient = () => {
  const authMiddleware = createAuthForClientCredentialsFlow({
    host: "https://auth.europe-west1.gcp.commercetools.com",
    projectKey,
    credentials: {
      clientId: process.env.CTP_CLIENT_ID,
      clientSecret: process.env.CTP_CLIENT_SECRET,
    },
    fetch,
  });

  const httpMiddleware = createHttpClient({
    host: "https://api.europe-west1.gcp.commercetools.com",
    fetch,
  });

  const ctpClient = createClient({
    middlewares: [authMiddleware, httpMiddleware],
  });
  return ctpClient;
};

const getImportClient = () => {
  const authMiddleware = createAuthForClientCredentialsFlow({
    host: "https://auth.europe-west1.gcp.commercetools.com",
    projectKey,
    credentials: {
      clientId: process.env.CTP_CLIENT_ID,
      clientSecret: process.env.CTP_CLIENT_SECRET,
    },
    fetch,
  });

  const httpMiddleware = createHttpClient({
    host: "https://import.europe-west1.gcp.commercetools.com",
    fetch,
  });

  const ctpClient = createClient({
    middlewares: [authMiddleware, httpMiddleware],
  });
  return ctpClient;
};

const getStoreClient = () => {
  const authMiddleware = createAuthForClientCredentialsFlow({
    host: "https://auth.europe-west1.gcp.commercetools.com",
    projectKey,
    credentials: {
      clientId: process.env.CTP_STORE_ID2,
      clientSecret: process.env.CTP_STORE_SECRET2,
    },
    fetch,
  });

  const httpMiddleware = createHttpClient({
    host: "https://api.europe-west1.gcp.commercetools.com",
    fetch,
  });

  const ctpClient = createClient({
    middlewares: [authMiddleware, httpMiddleware],
  });
  return ctpClient;
};


const getMyAPIClient = () => {
  const authMiddleware = createAuthForPasswordFlow({
    host: "https://auth.europe-west1.gcp.commercetools.com",
    projectKey,
    credentials: {
      clientId: process.env.myClientId,
      clientSecret: process.env.myClientSecret,
      user: {
        username: "fafa2@example.com",
        password: "123",
      },
    },
    fetch,
  });
  const httpMiddleware = createHttpClient({
    host: "https://api.europe-west1.gcp.commercetools.com",
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