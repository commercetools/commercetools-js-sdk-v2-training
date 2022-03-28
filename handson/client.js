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
    host: process.env.CTP_AUTH_URL,
    projectKey,
    credentials: {
      clientId: process.env.CTP_CLIENT_ID,
      clientSecret: process.env.CTP_CLIENT_SECRET,
    },
    fetch,
  });

  const httpMiddleware = createHttpClient({
    host: process.env.CTP_API_URL,
    fetch,
  });

  const ctpClient = createClient({
    middlewares: [authMiddleware, httpMiddleware],
  });
  return ctpClient;
};

const getImportClient = () => {
  const authMiddleware = createAuthForClientCredentialsFlow({
    host: process.env.IMPORT_AUTH_URL,
    projectKey,
    credentials: {
      clientId: process.env.IMPORT_CLIENT_ID,
      clientSecret: process.env.IMPORT_CLIENT_SECRET,
    },
    fetch,
  });

  const httpMiddleware = createHttpClient({
    host: process.env.IMPORT_API_URL,
    fetch,
  });

  const importClient = createClient({
    middlewares: [authMiddleware, httpMiddleware],
  });
  return importClient;
};

const getStoreClient = () => {
  const authMiddleware = createAuthForClientCredentialsFlow({
    host: process.env.STORE_AUTH_URL,
    projectKey,
    credentials: {
      clientId: process.env.STORE_CLIENT_ID,
      clientSecret: process.env.STORE_CLIENT_SECRET,
    },
    fetch,
  });

  const httpMiddleware = createHttpClient({
    host: process.env.STORE_API_URL,
    fetch,
  });

  const storeClient = createClient({
    middlewares: [authMiddleware, httpMiddleware],
  });
  return storeClient;
};


const getMyAPIClient = () => {
  const authMiddleware = createAuthForPasswordFlow({
    host: process.env.ME_AUTH_URL,
    projectKey,
    credentials: {
      clientId: process.env.ME_CLIENT_ID,
      clientSecret: process.env.ME_CLIENT_SECRET,
      user: {
        username: "test@test.com",
        password: "password",
      },
    },
    fetch,
  });
  const httpMiddleware = createHttpClient({
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
