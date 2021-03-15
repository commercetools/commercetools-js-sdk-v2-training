const { createImportSink, importProducts,checkImportOperationStatus } = require("./handson/importService");
const { log } = require("./logger.js");

// createImportSink({
//     key:'productsImporterAndSync',
//     resourceType:'product-draft'
// }).then(log).catch(log);

//importProducts("productsImporterAndSync").then(log).catch(log);
checkImportOperationStatus("productsImporterAndSync","e8a74464-c00a-4e43-a372-15839d508c05").then(log).catch(log);
checkImportOperationStatus("productsImporterAndSync","bd71c221-e799-4d2c-bc9d-b6cb1403c2da").then(log).catch(log);


//https://github.com/commercetools/commercetools-project-sync#run
// docker run \
// -e SOURCE_PROJECT_KEY= \
// -e SOURCE_CLIENT_ID= \
// -e SOURCE_CLIENT_SECRET= \
// -e TARGET_PROJECT_KEY= \
// -e TARGET_CLIENT_ID= \
// -e TARGET_CLIENT_SECRET= \
// commercetools/commercetools-project-sync:3.10.1 -s all
