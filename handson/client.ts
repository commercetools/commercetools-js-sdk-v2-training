import { AuthMiddlewareOptions, ClientBuilder, HttpMiddlewareOptions, PasswordAuthMiddlewareOptions } from "@commercetools/sdk-client-v2";
import { createApiBuilderFromCtpClient } from "@commercetools/platform-sdk";
import { createApiBuilderFromCtpClient as createImportApiBuilderFromCtpClient } from "@commercetools/importapi-sdk";
import fetch from "node-fetch";
import { Prefix, readConfig } from "../utils/config";


const createApiClient = (prefix: Prefix) => {
  const {
    clientId,
    clientSecret,
    projectKey,
    oauthHost,
    host,
  } = readConfig(prefix);

  const authMiddlewareOptions: AuthMiddlewareOptions = {
    host: oauthHost,
    projectKey,
    credentials: {
      clientId,
      clientSecret
    },
    fetch
  };

  const httpMiddlewareOptions: HttpMiddlewareOptions = {
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

const createImportApiClient = (prefix: Prefix) => {
  const {
    clientId,
    clientSecret,
    projectKey,
    oauthHost,
    host,
  } = readConfig(prefix);

  const authMiddlewareOptions: AuthMiddlewareOptions = {
    host: oauthHost,
    projectKey,
    credentials: {
      clientId,
      clientSecret
    },
    fetch
  };

  const httpMiddlewareOptions: HttpMiddlewareOptions = {
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

const createStoreApiClient = (prefix: Prefix) => {
  const {
    clientId,
    clientSecret,
    projectKey,
    oauthHost,
    host,
    storeKey
  } = readConfig(prefix);

  const authMiddlewareOptions: AuthMiddlewareOptions = {
    host: oauthHost,
    projectKey,
    credentials: {
      clientId,
      clientSecret
    },
    fetch
  };

  const httpMiddlewareOptions: HttpMiddlewareOptions = {
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

const createMyApiClient = (prefix: Prefix) => {
  const {
    clientId,
    clientSecret,
    projectKey,
    oauthHost,
    host,
    username,
    password
  } = readConfig(prefix);

  const passwordAuthMiddlewareOptions: PasswordAuthMiddlewareOptions = {
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

  const httpMiddlewareOptions: HttpMiddlewareOptions = {
    host: host,
    fetch
  };

  const client = new ClientBuilder()
    .withPasswordFlow(passwordAuthMiddlewareOptions)
    .withHttpMiddleware(httpMiddlewareOptions)
    .build();

  const myApiRoot = createApiBuilderFromCtpClient(client)
    .withProjectKey({ projectKey });

  return myApiRoot;
}

const createStoreMyApiClient = (prefix: Prefix) => {
  const {
    clientId,
    clientSecret,
    projectKey,
    oauthHost,
    host,
    storeKey,
    username,
    password
  } = readConfig(prefix);

  const passwordAuthMiddlewareOptions: PasswordAuthMiddlewareOptions = {
    host: oauthHost,
    projectKey,
    // oauthUri: `/oauth/in-store/key=berlin-store/customers/token`,
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

  const httpMiddlewareOptions: HttpMiddlewareOptions = {
    host: host,
    fetch
  };

  const client = new ClientBuilder()
    .withPasswordFlow(passwordAuthMiddlewareOptions)
    .withHttpMiddleware(httpMiddlewareOptions)
    .build();

  const storeMyApiRoot = createApiBuilderFromCtpClient(client)
    .withProjectKey({ projectKey })
    .inStoreKeyWithStoreKeyValue({ storeKey });

  return storeMyApiRoot;
}

export const apiRoot = createApiClient(Prefix.DEV);
export const importApiRoot = createImportApiClient(Prefix.IMPORT);
export const storeApiRoot = createStoreApiClient(Prefix.STORE);
export const myApiRoot = createMyApiClient(Prefix.ME);
export const storeMyApiRoot = createStoreMyApiClient(Prefix.STORE_ME);