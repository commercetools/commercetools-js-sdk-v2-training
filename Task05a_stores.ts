import { apiRoot, storeApiRoot } from "./handson/client";
import { getStoreByKey, getCustomersInStore, createInStoreCart } from "./handson/store";
import { getCustomerByKey } from "./handson/customer";
import { log } from "./utils/logger";

const storeKey = "berlin-store";
getStoreByKey("berlin-store").then(log).catch(log);

getCustomersInStore("berlin-store").then(customers => {
    log(customers.body.count);
    customers.body.results.forEach(customer =>
        log(customer.id)
    )
}).catch(log);

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
//             customerEmail: "test@test.com",
//             customerId: "13d0071f-cf18-4d24-bfc1-508196acbe81",
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
//             customerEmail: "test.berlin@test.com",
//             customerId: "13d0071f-cf18-4d24-bfc1-508196acbe81",
//         }
//     })
//     .execute()
//     .then(log)
//     .catch(log);