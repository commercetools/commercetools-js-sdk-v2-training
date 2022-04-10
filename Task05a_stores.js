const {getStoreByKey, getCustomersInStore, createInStoreCart } = require("./handson/store");
const { getCustomerByKey } = require("./handson/customer");
const { log } = require("./logger");

// getStoreByKey('berlin-store').then(log).catch(log);

getCustomersInStore('berlin-store').then(customers => {
    log(customers.body.count);
    customers.body.results.forEach(customer =>
        log(customer.id)
    )}).catch(log);

// getCustomerByKey("test123").then((customer) => {
//    createInStoreCart("berlin-store",customer).then(log).catch(log);
// }).catch(log);
