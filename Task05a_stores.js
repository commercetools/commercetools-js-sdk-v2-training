const {getStoreByKey, getCustomersInStore, createInStoreCart } = require("./handson/store");
const { getCustomerByKey } = require("./handson/customer");
const { log } = require("./logger");

getStoreByKey('berlin-store').then(log).catch(log);

// getCustomersInStore('berlin-store').then(log).catch(log);

// getCustomerByKey("nage1223").then((customer) => {
//    createInStoreCart("berlin-store",customer).then(log).catch(log);
// }).catch(log);
