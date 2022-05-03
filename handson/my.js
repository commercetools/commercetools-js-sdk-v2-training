const { projectMyApiRoot, projectStoreMyApiRoot } = require("./client");

//TODO me endpoint

module.exports.getMe = () =>
  projectMyApiRoot
    .me()
    .get()
    .execute();

module.exports.getMyOrders = () =>
  projectMyApiRoot
    .me()
    .orders()
    .get()
    .execute();

module.exports.createMyCart = (customerEmail) =>
  projectMyApiRoot
    .me()
    .carts()
    .post({
      body: {
        currency: "EUR",
        customerEmail
      }
    })
    .execute();

module.exports.getMyActiveCart = () =>
  projectMyApiRoot
    .me()
    .activeCart()
    .get()
    .execute();

// TODO in-store me endpoint

// BUG: currently get method does not exist, once SDK is fixed enable this
// module.exports.getStoreMe = () =>
//   projectStoreMyApiRoot
//     .me()
//     .get()
//     .execute();

module.exports.getStoreMyOrders = () =>
  projectStoreMyApiRoot
    .me()
    .orders()
    .get()
    .execute();

module.exports.createInStoreMyCart = (customerEmail) =>
  projectStoreMyApiRoot
    .me()
    .carts()
    .post({
      body: {
        currency: "EUR",
        customerEmail
      }
    })
    .execute();

module.exports.getStoreMyActiveCart = () =>
  projectStoreMyApiRoot
    .me()
    .activeCart()
    .get()
    .execute();