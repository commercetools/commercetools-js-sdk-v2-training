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
// -e SOURCE_AUTH_URL=https://auth.europe-west1.gcp.commercetools.com \ 
// -e SOURCE_API_URL=https://api.europe-west1.gcp.commercetools.com \
// -e SOURCE_PROJECT_KEY=happy-garden-dev-jan11 \
// -e SOURCE_CLIENT_ID=ynRYE7WbSf_u9KXCjm_dS7SD \
// -e SOURCE_CLIENT_SECRET=SYFGk4ZB4R6u-Ytmh60eeAbZj-aEZzi1 \
// -e TARGET_PROJECT_KEY=happy-garden-test-jan11 \
// -e TARGET_CLIENT_ID=8u9Waf_J-KRHIG3J9D2bgeNG \
// -e TARGET_CLIENT_SECRET=iN4P21ucP0ZNlaEdXXkGxARYxVhDhXft \
// -e TARGET_AUTH_URL=https://auth.europe-west1.gcp.commercetools.com \
// -e TARGET_API_URL=https://api.europe-west1.gcp.commercetools.com \
// commercetools/commercetools-project-sync:3.10.1 -s all
