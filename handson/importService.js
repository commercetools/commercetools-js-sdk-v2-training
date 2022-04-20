const { importApiRoot } = require("./client");
const csvtojsonV2 = require("csvtojson");

module.exports.createImportContainer = (key) =>
  importApiRoot
    .importContainers()
    .post({
      body: { key },
    })
    .execute();

module.exports.checkImportSummary = (importContainerKey) =>
  importApiRoot
    .importContainers()
    .withImportContainerKeyValue({ importContainerKey })
    .importSummaries()
    .get()
    .execute();

module.exports.checkImportOperationsStatus = (importContainerKey) =>
  importApiRoot
    .importContainers()
    .withImportContainerKeyValue({ importContainerKey })
    .importOperations()
    .get({ queryArgs: { debug: true } })
    .execute();

module.exports.checkImportOperationStatusById = (id) =>
  importApiRoot
    .importOperations()
    .withIdValue({ id })
    .get()
    .execute();

module.exports.importProducts = async (importContainerKey) =>
  importApiRoot
    .productDrafts()
    .importContainers()
    .withImportContainerKeyValue({ importContainerKey })
    .post({
      body: await createProductDraftImportRequest(),
    })
    .execute();

const createProductDraftImportRequest = async () => {
  return {
    type: "product-draft",
    resources: await getProductDraftImportArray(),
  };
};

const getProductDraftImportArray = () => {
  // get data from csv
  // create product drafts array and send it back
  let productDraftsArray = [];
  let participantNamePrefix = "ff";
  return csvtojsonV2()
    .fromFile("./products.csv")
    .then((products) => {
      products.forEach((product) => {
        productDraftsArray.push({
          key: participantNamePrefix + "-" + product.productName,
          name: {
            en: product.productName,
            de: product.productName,
          },
          productType: {
            typeId: "product-type",
            key: product.productType,
          },
          slug: {
            en: participantNamePrefix + "-" + product.productName,
            de: participantNamePrefix + "-" + product.productName,
          },
          description: {
            en: product.productDescription,
            de: product.productDescription,
          },
          masterVariant: {
            sku: product.inventoryId,
            key: participantNamePrefix + "-" + product.productName,
            prices: [
              {
                value: {
                  type: "centPrecision",
                  currencyCode: product.currencyCode,
                  centAmount: parseInt(product.basePrice),
                },
              },
            ],
            images: [
              {
                url: product.imageUrl,
                dimensions: { w: 177, h: 237 },
              },
            ],
          },
        });
      });
      return productDraftsArray;
    });
};
