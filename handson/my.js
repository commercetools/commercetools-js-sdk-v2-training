const { myApiRoot, storeMyApiRoot } = require("./client");

//TODO me endpoint

module.exports.getMe = () =>
  myApiRoot
    .get()
    .execute();

module.exports.getMyOrders = () =>
  myApiRoot
    .orders()
    .get()
    .execute();

module.exports.createMyCart = (customerEmail) =>
  myApiRoot
    .carts()
    .post({
      body: {
        currency: "EUR",
        customerEmail
      }
    })
    .execute();


// TODO in-store me endpoint

module.exports.getStoreMe = () =>
  storeMyApiRoot
    .get()
    .execute();

module.exports.getStoreMyOrders = () =>
  storeMyApiRoot
    .orders()
    .get()
    .execute();

module.exports.createInStoreMyCart = (customerEmail) =>
  storeMyApiRoot
    .carts()
    .post({
      body: {
        currency: "EUR",
        customerEmail
      }
    })
    .execute();