const { apiRoot, storeApiRoot } = require("./handson/client");
const { getStoreByKey, getCustomersInStore, createInStoreCart } = require("./handson/store");
const { getCustomerByKey } = require("./handson/customer");
const { log } = require("./logger");

const storeKey = "berlin-store";
// getStoreByKey("berlin-store").then(log).catch(log);

// getCustomersInStore("berlin-store").then(customers => {
//     log(customers.body.count);
//     customers.body.results.forEach(customer =>
//         log(customer.id)
//     )
// }).catch(log);

// getCustomerByKey("test123").then((customer) => {
//     createInStoreCart("berlin-store", customer).then(log).catch(log);
// }).catch(log);

// TODO: Create in-store cart with global API client
//  Provide an API client with global permissions
//  Provide a customer who is restricted to a store
//  Note: A global cart creation should fail but an in-store cart should work

// apiRoot
//     .inStoreKeyWithStoreKeyValue({ storeKey })
//     .carts()
//     .post({
//         body: {
//             currency: "EUR",
//             customerEmail: "berlin-customer@test.com",
//             customerId: "47af11e0-d223-4421-a5ed-2a3debeacbad",
//         }
//     })
//     .execute()
//     .then(log)
//     .catch(log);

// TODO: Create in-store Cart with in-store API client
//  Provide an API client with scope limited to a store
//  Provide a global customer
//  Try creating a global cart with a global customer and check the error message

// storeApiRoot
//     .inStoreKeyWithStoreKeyValue({ storeKey })
//     .carts()
//     .post({
//         body: {
//             currency: "EUR",
//             customerEmail: "global-customer@test.com",
//             customerId: "842de889-b13e-4a3f-98a7-128aa7530588",
//         }
//     })
//     .execute()
//     .then(log)
//     .catch(log);