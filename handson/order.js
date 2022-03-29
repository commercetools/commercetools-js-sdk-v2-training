const { apiRoot, projectKey } = require("./client.js");
const { getCustomerByKey } = require( "./customer.js" );

module.exports.createCart = (customerKey) => {}

module.exports.createAnonymousCart = () =>
  apiRoot.withProjectKey({ projectKey })
    .carts()
    .post({
      body: {
        currency: "EUR",
        country: "DE",
      }
    })
    .execute()

module.exports.customerSignIn = (customerDetails) => {}

module.exports.getCartById = (ID) => {}

module.exports.addLineItemsToCart = (cartId, arrayOfSKUs) => {}

module.exports.addDiscountCodeToCart = (cartId, discountCode) => {}

module.exports.createOrderFromCart = (cartId) => {}

const createOrderFromCartDraft = (cartId) => {
  return this.getCartById(cartId).then((cart) => {
    return {
      id: cart.body.id,
      version: cart.body.version,
    };
  });
};

module.exports.getOrderById = (ID) => {}

module.exports.updateOrderCustomState = (orderId, customStateKey) => {}

module.exports.createPayment = (paymentDraft) => {}

module.exports.setOrderState = (orderId, stateName) => {}

module.exports.addPaymentToOrder = (orderId, paymentId) => {}
