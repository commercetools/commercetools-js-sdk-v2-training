import { ProductDraftImport, ProductDraftImportRequest, PriceImportRequest } from "@commercetools/importapi-sdk";
import csvtojsonV2 from "csvtojson";
import { importApiRoot } from "./client";

export const createImportContainer = (key: string) =>
  importApiRoot
    .importContainers()
    .post({
      body: { key },
    })
    .execute();

export const checkImportSummary = (importContainerKey: string) =>
  importApiRoot
    .importContainers()
    .withImportContainerKeyValue({ importContainerKey })
    .importSummaries()
    .get()
    .execute();

export const checkImportOperationsStatus = (importContainerKey: string) =>
  importApiRoot
    .importContainers()
    .withImportContainerKeyValue({ importContainerKey })
    .importOperations()
    .get({ queryArgs: { debug: true } })
    .execute();

export const checkImportOperationStatusById = (id: string) =>
  importApiRoot
    .importOperations()
    .withIdValue({ id })
    .get()
    .execute();

export const importProducts = async (importContainerKey: string) =>
  importApiRoot
    .productDrafts()
    .importContainers()
    .withImportContainerKeyValue({ importContainerKey })
    .post({
      body: await createProductDraftImportRequest(),
    })
    .execute();

const createProductDraftImportRequest = async (): Promise<ProductDraftImportRequest> => {
  return {
    type: "product-draft",
    resources: await getProductDraftImportArray(),
  };
};


const getProductDraftImportArray = async (): Promise<Array<ProductDraftImport>> => {

  const participantNamePrefix = "ff";

  // Get products data from csv
  const products = await csvtojsonV2()
    .fromFile("./products.csv");

  interface ProductDraftData {
    [key: string]: string
  }

  const productToProductDraftImport = (product: ProductDraftData): ProductDraftImport => {
    return {
      key: participantNamePrefix + "-" + product.productName,
      name: {
        "en": product.productName,
        "de": product.productName
      },
      productType: {
        typeId: "product-type",
        key: product.productType
      },
      slug: {
        "en": participantNamePrefix + "-" + product.productName,
        "de": participantNamePrefix + "-" + product.productName
      },
      description: {
        "en": product.description,
        "de": product.description
      },
      masterVariant: {
        sku: participantNamePrefix + "-" + product.inventoryId,
        key: participantNamePrefix + "-" + product.productName,
        prices: [
          {
            value: {
              type: "centPrecision",
              currencyCode: product.currencyCode,
              centAmount: parseInt(product.basePrice, 10)
            }
          }
        ],
        images: [
          {
            url: product.imageUrl,
            dimensions: { w: 177, h: 237 }
          }
        ]
      }
    };
  }

  return products.map(productToProductDraftImport);
}

export const importPrices = async (importContainerKey: string) =>
  importApiRoot
    .prices()
    .importContainers()
    .withImportContainerKeyValue({ importContainerKey })
    .post({
      body: createPriceImportRequest()
    })
    .execute();

const createPriceImportRequest = (): PriceImportRequest => {
  return {
    type: "price",
    resources: [
      {
        key: "sf-price-import-redWine-key",
        product: {
          typeId: "product",
          key: "sfs-RedWine"
        },
        "productVariant": {
          typeId: "product-variant",
          key: "sfs-RedWine"
        },
        value: {
          "type": "centPrecision",
          "currencyCode": "EUR",
          "centAmount": 3000
        },
      }
    ]
  };
}