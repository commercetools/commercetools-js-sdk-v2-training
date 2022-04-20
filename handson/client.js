
const { ClientBuilder } = require("@commercetools/sdk-client-v2");
const { createApiBuilderFromCtpClient } = require("@commercetools/platform-sdk");
const { createApiBuilderFromCtpClient: createImportApiBuilderFromCtpClient } = require("@commercetools/importapi-sdk");
const fetch = require("node-fetch");
const env = require("dotenv");


env.config();

const Prefix = {
  DEV: "DEV",
  IMPORT: "IMPORT",
  STORE: "BERLIN",
  ME: "ME",
  STORE_ME: "BERLIN_ME"
};

function readConfig(prefix) {
  return {
    clientId: process.env[prefix + "_CLIENT_ID"] || "",
    clientSecret: process.env[prefix + "_CLIENT_SECRET"] || "",
    projectKey: process.env[prefix + "_PROJECT_KEY"] || "",
    authHost: process.env[prefix + "_AUTH_URL"] || "",
    host: process.env[prefix + "_API_URL"] || "",
    username: process.env[prefix + "_CUSTOMER_EMAIL"] || "",
    password: process.env[prefix + "_CUSTOMER_PASSWORD"] || "",
    storeKey: process.env[prefix + "_STORE_KEY"] || ""
  };
}

function createApiClient(prefix) {
  const {
    clientId,
    clientSecret,
    projectKey,
    authHost,
    host,
  } = readConfig(prefix);

  const authMiddlewareOptions = {
    host: authHost,
    projectKey,
    credentials: {
      clientId,
      clientSecret
    },
    fetch
  };

  const httpMiddlewareOptions = {
    host: host,
    fetch
  };

  const client = new ClientBuilder()
    .withClientCredentialsFlow(authMiddlewareOptions)
    .withHttpMiddleware(httpMiddlewareOptions)
    .build();

  const apiRoot = createApiBuilderFromCtpClient(client)
    .withProjectKey({ projectKey });

  return apiRoot;
}

function createImportApiClient(prefix) {
  const {
    clientId,
    clientSecret,
    projectKey,
    authHost,
    host,
  } = readConfig(prefix);

  const authMiddlewareOptions = {
    host: authHost,
    projectKey,
    credentials: {
      clientId,
      clientSecret
    },
    fetch
  };

  const httpMiddlewareOptions = {
    host: host,
    fetch
  };

  const client = new ClientBuilder()
    .withClientCredentialsFlow(authMiddlewareOptions)
    .withHttpMiddleware(httpMiddlewareOptions)
    .build();

  const importApiRoot = createImportApiBuilderFromCtpClient(client)
    .withProjectKeyValue({ projectKey });

  return importApiRoot;
}

function createStoreApiClient(prefix) {
  const {
    clientId,
    clientSecret,
    projectKey,
    authHost,
    host,
    storeKey
  } = readConfig(prefix);

  const authMiddlewareOptions = {
    host: authHost,
    projectKey,
    credentials: {
      clientId,
      clientSecret
    },
    fetch
  };

  const httpMiddlewareOptions = {
    host: host,
    fetch
  };

  const client = new ClientBuilder()
    .withClientCredentialsFlow(authMiddlewareOptions)
    .withHttpMiddleware(httpMiddlewareOptions)
    .build();

  const storeApiRoot = createApiBuilderFromCtpClient(client)
    .withProjectKey({ projectKey });
  // .inStoreKeyWithStoreKeyValue({ storeKey });

  return storeApiRoot;

}

function createMyApiClient(prefix) {
  const {
    clientId,
    clientSecret,
    projectKey,
    authHost,
    host,
    username,
    password
  } = readConfig(prefix);

  const passwordAuthMiddlewareOptions = {
    host: authHost,
    projectKey,
    credentials: {
      clientId,
      clientSecret,
      user: {
        username,
        password
      }
    },
    fetch
  };

  const httpMiddlewareOptions = {
    host: host,
    fetch
  };

  const client = new ClientBuilder()
    .withPasswordFlow(passwordAuthMiddlewareOptions)
    .withHttpMiddleware(httpMiddlewareOptions)
    .build();

  const myApiRoot = createApiBuilderFromCtpClient(client)
    .withProjectKey({ projectKey })
    .me();

  return myApiRoot;

}

function createStoreMyApiClient(prefix) {
  const {
    clientId,
    clientSecret,
    projectKey,
    authHost,
    host,
    storeKey,
    username,
    password
  } = readConfig(prefix);

  const passwordAuthMiddlewareOptions = {
    host: authHost,
    projectKey,
    oauthUri: `/oauth/in-store/key=berlin-store/customers/token`,
    credentials: {
      clientId,
      clientSecret,
      user: {
        username,
        password
      }
    },
    fetch
  };

  const httpMiddlewareOptions = {
    host: host,
    fetch
  };

  const client = new ClientBuilder()
    .withPasswordFlow(passwordAuthMiddlewareOptions)
    .withHttpMiddleware(httpMiddlewareOptions)
    .build();

  const storeMyApiRoot = createApiBuilderFromCtpClient(client)
    .withProjectKey({ projectKey })
    .inStoreKeyWithStoreKeyValue({ storeKey })
    .me();

  return storeMyApiRoot;

}

module.exports.apiRoot = createApiClient(Prefix.DEV);
module.exports.importApiRoot = createImportApiClient(Prefix.IMPORT);
module.exports.storeApiRoot = createStoreApiClient(Prefix.STORE);
module.exports.myApiRoot = createMyApiClient(Prefix.ME);
module.exports.storeMyApiRoot = createStoreMyApiClient(Prefix.STORE_ME);
