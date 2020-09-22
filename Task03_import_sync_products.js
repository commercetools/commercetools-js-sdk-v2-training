const {
    createImportSink,
    importProducts
} = require('./handson/importService')
const { log } = require ('./logger.js');


// createImportSink({
//     key:'productsImporter&Sync',
//     resourceType:'product-draft'
// }).then(log).catch(log);

importProducts('productsImporter&Sync').then(log).catch(log);