const { apiRoot, projectKey } = require("./client.js");

module.exports.createCart = (cartDraftData) =>{}

const createCartDraft = (cartDraftData) => {
  const { currency, customerId, countryCode } = cartDraftData;

  return {
    currency,
    customerId,
    shippingAddress: {
      country: countryCode,
    },
  };
};

module.exports.customerSignIn = (customerDetails) =>{}

module.exports.getCartById = (ID) =>{}

module.exports.addLineItemsToCart = (arrayOfSKUs, cartId) => {}

module.exports.addDiscountCodeToCart = (discountCode, cartId) => {}

module.exports.createOrderFromCart = (cartId) => {}

const createOrderFromCartDraft = (cartId) => {
  return this.getCartById(cartId).then((cart) => {
    return {
      id: cart.body.id,
      version: cart.body.version,
    };
  });
};

module.exports.getOrderById = (ID) =>{}

module.exports.updateOrderCustomState = (customStateId, orderId) => {}

module.exports.createPayment = (paymentDraft) =>{}

module.exports.setOrderState = (stateName, orderId) => {}

module.exports.addPaymentToOrder = (paymentId, orderId) => {}
