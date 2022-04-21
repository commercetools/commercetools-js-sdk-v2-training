import { apiRoot } from "./client";

//TODO Product Selections

export const getProductSelectionByKey = (key: string) =>
  apiRoot
    .productSelections()
    .withKey({ key })
    .get()
    .execute();

export const createProductSelection = (key: string, name: string) =>
  apiRoot
    .productSelections()
    .post({
      body: {
        key: key,
        name: { "en": name }
      }
    }
    )
    .execute();

export const addProductsToProductSelection = async (
  productSelectionKey: string,
  arrayOfProductKeys: Array<string>
) =>
  getProductSelectionByKey(productSelectionKey).then((productSelection) =>
    apiRoot
      .productSelections()
      .withKey({ key: productSelectionKey })
      .post({
        body: {
          version: productSelection.body.version,
          actions: arrayOfProductKeys.map((productKey) => {
            return {
              action: "addProduct",
              product: {
                typeId: "product",
                key: productKey
              }
            }
          })
        }
      })
      .execute()
  )
export const getProductsInProductSelection = (productSelectionKey: string) =>
  apiRoot
    .productSelections()
    .withKey({ key: productSelectionKey })
    .products()
    .get({
      queryArgs: {
        expand: "product"
      }
    })
    .execute();

