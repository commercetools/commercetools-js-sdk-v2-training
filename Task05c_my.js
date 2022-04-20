const {
    getMe,
    getMyOrders,
    createMyCart,
    getStoreMe,
    getStoreMyOrders,
    createInStoreMyCart
} = require("./handson/my");
const { log } = require("./logger");

const customerEmail = "sevtap@test.com";

// TODO: SPA api-client

// getMe().then(log).catch(log);

// createMyCart(customerEmail).then(log).catch(log);

// getMyOrders().then(orders =>
//     orders.body.results.forEach(order =>
//         log(order.id + " : " + order.totalPrice.centAmount)
//     )
// ).catch(log);

// getStoreMe().then(log).catch(log);

// createInStoreMyCart().then(log).catch(log);

getStoreMyOrders().then(log).catch(log);
