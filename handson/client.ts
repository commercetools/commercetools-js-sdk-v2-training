import { AuthMiddlewareOptions, ClientBuilder, HttpMiddlewareOptions, PasswordAuthMiddlewareOptions } from "@commercetools/sdk-client-v2";
import { createApiBuilderFromCtpClient } from "@commercetools/platform-sdk";
import { createApiBuilderFromCtpClient as createImportApiBuilderFromCtpClient } from "@commercetools/importapi-sdk";
import fetch from "node-fetch";
import { Prefix, readConfig } from "../utils/config";
import { ApiRoot, ImportApiRoot, StoreMyApiRoot } from "../types/global";


const createApiClient = () => {
  const {
    clientId,
    clientSecret,
    projectKey,
    oauthHost,
    host,
  } = readConfig(Prefix.DEV);

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

const createImportApiClient = () => {
  const {
    clientId,
    clientSecret,
    projectKey,
    oauthHost,
    host,
  } = readConfig(Prefix.IMPORT);

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

const createStoreApiClient = () => {
  const {
    clientId,
    clientSecret,
    projectKey,
    oauthHost,
    host,
    storeKey
  } = readConfig(Prefix.STORE);

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

  return storeApiRoot;

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

export const apiRoot: ApiRoot = createApiClient();
export const importApiRoot: ImportApiRoot = createImportApiClient();
export const storeApiRoot: ApiRoot = createStoreApiClient();
export const myApiRoot: ApiRoot = createMyApiClient();
export const storeMyApiRoot: StoreMyApiRoot = createStoreMyApiClient();