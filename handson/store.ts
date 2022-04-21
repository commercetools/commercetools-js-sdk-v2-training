import { ClientResponse, Customer } from "@commercetools/platform-sdk";
import { apiRoot, storeApiRoot } from "./client";

//TODO store and productSelection endpoint

export const getStoreByKey = (key: string) =>
  apiRoot
    .stores()
    .withKey({ key })
    .get()
    .execute();

export const getCustomersInStore = (storeKey: string) =>
  storeApiRoot
    .inStoreKeyWithStoreKeyValue({ storeKey })
    .customers()
    .get()
    .execute();

export const addProductSelectionToStore = (storeKey: string, productSelectionKey: string) =>
  getStoreByKey(storeKey).then((store) =>
    apiRoot
      .stores()
      .withKey({ key: storeKey })
      .post({
        body: {
          version: store.body.version,
          actions: [
            {
              action: "addProductSelection",
              productSelection: {
                typeId: "product-selection",
                key: productSelectionKey
              },
              active: true
            } as any
          ]
        }
      })
      .execute()
  )

export const getProductsInStore = (storeKey: string) =>
  apiRoot
    .inStoreKeyWithStoreKeyValue({ storeKey })
    .productSelectionAssignments()
    .get({
      queryArgs: {
        expand: ["product", "productSelection"]
      }
    })
    .execute();

export const createInStoreCart = (storeKey: string, customer: ClientResponse<Customer>) =>
  storeApiRoot
    .inStoreKeyWithStoreKeyValue({ storeKey })
    .carts()
    .post({
      body: {
        currency: "EUR",
        customerId: customer.body.id,
        customerEmail: customer.body.email,
      }
    })
    .execute();



