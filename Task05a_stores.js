const { projectApiRoot, projectStoreApiRoot } = require("./handson/client");
const { getStoreByKey, getCustomersInStore } = require("./handson/store");
const { log } = require("./utils/logger");

// TODO:
// Complete ./handson/client.js for store client
// Set customer data one for a global customer and one for a store-specific customer
// Set store key
const storeKey = "berlin-store";
const globalCustomerEmail = "test@test.com";
const globalCustomerId = "13d0071f-cf18-4d24-bfc1-508196acbe81";
const storeCustomerEmail = "test.berlin@test.com";
const storeCustomerId = "f40786f5-48c9-4925-a8a7-9c271b3176b5";

// GET store info
// getStoreByKey("berlin-store").then(log).catch(log);

// GET customers who can shop at a store
// getCustomersInStore("berlin-store").then(customers => {
//     log(customers.body.count);
//     customers.body.results.forEach(customer =>
//         log(customer.id)
//     )
// }).catch(log);

// TODO: Create in-store cart with global API client
//  Provide an API client with global permissions
//  Provide a customer who is restricted to a store
//  Note: A global cart creation should fail but an in-store cart should work

// projectApiRoot
//     .inStoreKeyWithStoreKeyValue({ storeKey }) // without this it fails
//     .carts()
//     .post({
//         body: {
//             currency: "EUR",
//             customerEmail: storeCustomerEmail,
//             customerId: storeCustomerId,
//         }
//     })
//     .execute()
//     .then(log)
//     .catch(log);

// TODO: Create in-store Cart with in-store API client
//  Provide an API client with scope limited to a store
//  Provide a global customer
//  Try creating a global cart with a global customer and check the error message

// projectStoreApiRoot
//     .inStoreKeyWithStoreKeyValue({ storeKey }) // without this it fails
//     .carts()
//     .post({
//         body: {
//             currency: "EUR",
//             customerEmail: globalCustomerEmail,
//             customerId: globalCustomerId,
//         }
//     })
//     .execute()
//     .then(log)
//     .catch(log);

