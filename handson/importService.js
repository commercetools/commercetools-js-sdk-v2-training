const csvtojsonV2 = require("csvtojson");
const { projectImportApiRoot } = require("./client");

module.exports.createImportContainer = (key) => { }

module.exports.checkImportSummary = (importContainerKey) => { }

module.exports.checkImportOperationStatus = (importContainerKey) => { }

module.exports.checkImportOperationStatusById = (id) => { }

module.exports.importProducts = async (importContainerKey) => { }

const createProductDraftImportRequest = async () => {
  return {
    type: "product-draft",
    resources: await getProductDraftImportArray(),
  };
};


const getProductDraftImportArray = async () => {

  const participantNamePrefix = "ff";

  // Get products data from csv
  const products = await csvtojsonV2()
    .fromFile("./products.csv");


  const productToProductDraftImport = (product) => {
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

module.exports.importPrices = async (importContainerKey) =>
  projectImportApiRoot
    .prices()
    .importContainers()
    .withImportContainerKeyValue({ importContainerKey })
    .post({
      body: createPriceImportRequest()
    })
    .execute();

const createPriceImportRequest = () => {
  return {
    type: "price",
    resources: [
      {
        key: "ff-price-import-redWine-key",
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