const { 
    createImportContainer,
    importProducts,
    checkImportSummary,
    checkImportOperations, 
    checkImportOperationById
    } = require("./handson/importService");
const { log } = require("./logger.js");

const containerKey = "ff-ImportContainer";

// Create an import container
createImportContainer(containerKey).then(log).catch(log);

// import products
// importProducts(containerKey).then(log).catch(log);

// check import summary for your container
// checkImportSummary(containerKey).then(log).catch(log);

// check import operations for your container
// checkImportOperations(containerKey).then(operations =>
//    operations.body.results.forEach(operation =>
//        log(operation.id + " : " +operation.state)
//    )
// )

// Check the status of import operations by their Ids
//  checkImportOperationById("2e325e01-1193-4d8a-92c9-af29da1cc0fb").then(log).catch(log);
//  checkImportOperationById("cd61acae-301d-4984-8dc2-2deb0ba5035c").then(log).catch(log);




// https://github.com/commercetools/commercetools-project-sync#run
// docker run \
// -e SOURCE_PROJECT_KEY=xxx \
// -e SOURCE_CLIENT_ID=xxx \
// -e SOURCE_CLIENT_SECRET=xxx \
// -e TARGET_PROJECT_KEY=xxx \
// -e TARGET_CLIENT_ID=xxx \
// -e TARGET_CLIENT_SECRET=xxx \
// commercetools/commercetools-project-sync:5.1.2 -s all
