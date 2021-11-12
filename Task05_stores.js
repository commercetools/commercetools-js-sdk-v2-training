const { getCustomersInStore, createInSoreCart, getMe } = require("./handson/store");
const { getCustomerByKey } = require("./handson/customer");
const { log } = require("./logger");

 getCustomersInStore('berlin-store').then(log).catch(log);

//getCustomerByKey("nage1223").then((customer) => {
//    createInSoreCart("berlin-store",customer).then(log).catch(log);
//}).catch(log);

//getMe().then(log).catch(log);
