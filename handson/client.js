const {
  createAuthMiddlewareForClientCredentialsFlow,
} = require("@commercetools/sdk-middleware-auth");
const { createHttpMiddleware } = require("@commercetools/sdk-middleware-http");
const { createClient } = require("@commercetools/sdk-client");
const {
  createApiBuilderFromCtpClient,
} = require("@commercetools/typescript-sdk");

const {
  createApiBuilderFromCtpClient: createApiBuilderFromCtpClientOnlyForImports,
} = require("@commercetools/importapi-sdk");

const fetch = require("node-fetch");

const projectKey = "training-fady-24-7";

const getClient = () => {
  const authMiddleware = createAuthMiddlewareForClientCredentialsFlow({
    host: "https://auth.europe-west1.gcp.commercetools.com",
    projectKey,
    credentials: {
      clientId: "",
      clientSecret: "",
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
      clientId: "",
      clientSecret: "",
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

const getMLClient = () => {};

const getMyAPIClient = () => {};

const apiRoot = createApiBuilderFromCtpClient(getClient());

const importApiRoot = createApiBuilderFromCtpClientOnlyForImports(getImportClient());

module.exports.apiRoot = apiRoot;
module.exports.importApiRoot = importApiRoot;
module.exports.getClient = getClient;
module.exports.projectKey = projectKey;
module.exports.getMLClient = getMLClient;
module.exports.getMyAPIClient = getMyAPIClient;
