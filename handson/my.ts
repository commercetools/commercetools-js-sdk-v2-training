import { myApiRoot, storeMyApiRoot } from "./client";

//TODO me endpoint

export const getMe = () =>
  myApiRoot
    .me()
    .get()
    .execute();

export const getMyOrders = () =>
  myApiRoot
    .me()
    .orders()
    .get()
    .execute();

export const createMyCart = (customerEmail: string) =>
  myApiRoot
    .me()
    .carts()
    .post({
      body: {
        currency: "EUR",
        customerEmail
      }
    })
    .execute();

export const getMyActiveCart = () =>
  myApiRoot
    .me()
    .activeCart()
    .get()
    .execute();

// TODO in-store me endpoint

// BUG: currently get method not existant, once SDK is fixed enable this
// export const getStoreMe = () =>
//   storeMyApiRoot
//     .me()
//     .get()
//     .execute();

// BUG: until sdk-client is fixed don't run the code pieces below this point
export const getStoreMyOrders = () =>
  storeMyApiRoot
    .me()
    .orders()
    .get()
    .execute();

export const createInStoreMyCart = (customerEmail: string) =>
  storeMyApiRoot
    .me()
    .carts()
    .post({
      body: {
        currency: "EUR",
        customerEmail
      }
    })
    .execute();

export const getStoreMyActiveCart = () =>
  storeMyApiRoot
    .me()
    .activeCart()
    .get()
    .execute();