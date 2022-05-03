const { createApiBuilderFromCtpClient: createImportApiBuilderFromCtpClient } = require("@commercetools/importapi-sdk");
const { createApiBuilderFromCtpClient } = require("@commercetools/platform-sdk");
const { ClientBuilder } = require("@commercetools/sdk-client-v2");
const fetch = require("node-fetch");
const { Prefix, readConfig } = require("../utils/config");


const createApiClient = () => {
  const {
    clientId,
    clientSecret,
    projectKey,
    oauthHost,
    host,
  } = readConfig(Prefix.DEV);

  const authMiddlewareOptions = {
    host: oauthHost,
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

  const projectApiRoot = createApiBuilderFromCtpClient(client)
    .withProjectKey({ projectKey });

  return projectApiRoot;

}

const createImportApiClient = () => {
  const {
    clientId,
    clientSecret,
    projectKey,
    oauthHost,
    host,
  } = readConfig(Prefix.IMPORT);

  const authMiddlewareOptions = {
    host: oauthHost,
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

  const projectImportApiRoot = createImportApiBuilderFromCtpClient(client)
    .withProjectKeyValue({ projectKey });

  return projectImportApiRoot;

}

const createStoreApiClient = () => {
  const {
    clientId,
    clientSecret,
    projectKey,
    oauthHost,
    host,
    storeKey
  } = readConfig(Prefix.STORE);

  const authMiddlewareOptions = {
    host: oauthHost,
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

  const projectStoreApiRoot = createApiBuilderFromCtpClient(client)
    .withProjectKey({ projectKey });

  return projectStoreApiRoot;

}

const createMyApiClient = () => {
  const {
    clientId,
    clientSecret,
    projectKey,
    oauthHost,
    host,
    username,
    password
  } = readConfig(Prefix.ME);

  const passwordAuthMiddlewareOptions = {
    host: oauthHost,
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

  const projectMyApiRoot = createApiBuilderFromCtpClient(client)
    .withProjectKey({ projectKey });

  return projectMyApiRoot;

}

const createStoreMyApiClient = () => {
  const {
    clientId,
    clientSecret,
    projectKey,
    oauthHost,
    host,
    storeKey,
    username,
    password
  } = readConfig(Prefix.STORE_ME);

  const passwordAuthMiddlewareOptions = {
    host: oauthHost,
    projectKey,
    oauthUri: `/oauth/${projectKey}/in-store/key=${storeKey}/customers/token`,
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

  const projectStoreMyApiRoot = createApiBuilderFromCtpClient(client)
    .withProjectKey({ projectKey })
    .inStoreKeyWithStoreKeyValue({ storeKey });

  return projectStoreMyApiRoot;

}

module.exports.projectApiRoot = createApiClient();
module.exports.projectImportApiRoot = createImportApiClient();
module.exports.projectStoreApiRoot = createStoreApiClient();
module.exports.projectMyApiRoot = createMyApiClient();
module.exports.projectStoreMyApiRoot = createStoreMyApiClient();
