const { createImportContainer, importProducts,checkImportOperationStatus } = require("./handson/importService");
const { log } = require("./logger.js");

const containerKey = "ff-ImportContainer";

// Create an import container
createImportContainer(containerKey).then(log).catch(log);

// import products
importProducts(containerKey).then(log).catch(log);

// Check the status of import operations by their Ids
// checkImportOperationStatus("e8a74464-c00a-4e43-a372-15839d508c05").then(log).catch(log);
// checkImportOperationStatus("bd71c221-e799-4d2c-bc9d-b6cb1403c2da").then(log).catch(log);

//https://github.com/commercetools/commercetools-project-sync#run
// docker run \
// -e SOURCE_PROJECT_KEY=xxx \
// -e SOURCE_CLIENT_ID=xxx \
// -e SOURCE_CLIENT_SECRET=xxx \
// -e TARGET_PROJECT_KEY=xxx \
// -e TARGET_CLIENT_ID=xxx \
// -e TARGET_CLIENT_SECRET=xxx \
// commercetools/commercetools-project-sync:5.0.0 -s all
