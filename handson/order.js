const { projectApiRoot } = require("./client");
const { getCustomerByKey } = require("./customer");

module.exports.createCart = (customerKey) => { }

module.exports.createAnonymousCart = () => { }

module.exports.customerSignIn = (customerDetails) => { }

module.exports.getCartById = (ID) => { }

module.exports.addLineItemsToCart = (cartId, channelKey, arrayOfSKUs) => { }

module.exports.addDiscountCodeToCart = (cartId, discountCode) => { }

module.exports.recalculate = (cartId) =>
  this.getCartById(cartId).then((cart) =>
    projectApiRoot
      .carts()
      .withId({ ID: cartId })
      .post({
        body: {
          actions: [{
            action: "recalculate",
          }],
          version: cart.body.version,
        },
      })
      .execute()
  );

module.exports.setShippingMethod = async (cartId) => {
  const matchingShippingMethod = (await projectApiRoot
    .shippingMethods()
    .matchingCart()
    .get({
      queryArgs: {
        cartId
      }
    })
    .execute()).body.results[0];

  return this.getCartById(cartId).then(cart =>
    projectApiRoot
      .carts()
      .withId({ ID: cartId })
      .post({
        body: {
          actions: [{
            action: "setShippingMethod",
            shippingMethod: {
              typeId: "shipping-method",
              id: matchingShippingMethod.id
            }
          }],
          version: cart.body.version
        }
      })
      .execute()
  );

}


module.exports.createOrderFromCart = (cartId) => { }

const createOrderFromCartDraft = (cartId) =>
  this.getCartById(cartId).then((cart) => {
    return {
      id: cart.body.id,
      version: cart.body.version,
    };
  });

module.exports.getOrderById = (ID) => { }

module.exports.updateOrderCustomState = (orderId, customStateKey) => { }

module.exports.setOrderState = (orderId, stateName) => { }


module.exports.addPaymentToCart = (cartId, paymentId) => { }


