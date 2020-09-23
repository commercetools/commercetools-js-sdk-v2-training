const { createImportSink, importProducts } = require("./handson/importService");
const { log } = require("./logger.js");

// createImportSink({
//     key:'productsImporter&Sync',
//     resourceType:'product-draft'
// }).then(log).catch(log);

importProducts("productsImporter&Sync").then(log).catch(log);

//https://github.com/commercetools/commercetools-project-sync#run
// docker run \
// -e SOURCE_PROJECT_KEY=xxx \
// -e SOURCE_CLIENT_ID=xxx \
// -e SOURCE_CLIENT_SECRET=xxx \
// -e TARGET_PROJECT_KEY=xxx \
// -e TARGET_CLIENT_ID=xxx \
// -e TARGET_CLIENT_SECRET=xxx \
// commercetools/commercetools-project-sync:3.4.1 -s all
