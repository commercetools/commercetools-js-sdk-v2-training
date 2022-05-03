const { projectApiRoot } = require("./client");
const { getCustomerByKey } = require("./customer");

module.exports.createCart = (customerKey) =>
  getCustomerByKey(customerKey).then((customer) =>
    projectApiRoot
      .carts()
      .post({
        body: {
          currency: "EUR",
          country: "DE",
          customerId: customer.body.id,
          customerEmail: customer.body.email,
          shippingAddress: customer.body.addresses.find(address => address.id == customer.body.defaultShippingAddressId),
          inventoryMode: "ReserveOnOrder",
          deleteDaysAfterLastModification: 90
        }
      })
      .execute()
  );

module.exports.createAnonymousCart = () =>
  projectApiRoot
    .carts()
    .post({
      body: {
        currency: "EUR",
        country: "DE",
      }
    })
    .execute();

module.exports.customerSignIn = (customerDetails) =>
  projectApiRoot
    .login()
    .post({ body: customerDetails })
    .execute();

module.exports.getCartById = (ID) =>
  projectApiRoot
    .carts()
    .withId({ ID })
    .get()
    .execute();

module.exports.addLineItemsToCart = (cartId, channelKey, arrayOfSKUs) =>
  this.getCartById(cartId).then((cart) =>
    projectApiRoot
      .carts()
      .withId({ ID: cartId })
      .post({
        body: {
          version: cart.body.version,
          actions: arrayOfSKUs.map((sku) => {
            return {
              action: "addLineItem",
              sku,
              supplyChannel: {
                typeId: "channel",
                key: channelKey
              },
            };
          })
        }
      })
      .execute()
  );

module.exports.addDiscountCodeToCart = (cartId, discountCode) =>
  this.getCartById(cartId).then((cart) =>
    projectApiRoot
      .carts()
      .withId({ ID: cartId })
      .post({
        body: {
          actions: [{
            action: "addDiscountCode",
            code: discountCode,
          }],
          version: cart.body.version,
        },
      })
      .execute()
  );

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


module.exports.createOrderFromCart = (cartId) =>
  createOrderFromCartDraft(cartId).then((orderFromCartDraft) =>
    projectApiRoot
      .orders()
      .post({
        body: orderFromCartDraft,
      })
      .execute()
  );

const createOrderFromCartDraft = (cartId) =>
  this.getCartById(cartId).then((cart) => {
    return {
      id: cart.body.id,
      version: cart.body.version,
    };
  });

module.exports.getOrderById = (ID) =>
  projectApiRoot
    .orders()
    .withId({ ID })
    .get()
    .execute();

module.exports.updateOrderCustomState = (orderId, customStateKey) =>
  this.getOrderById(orderId).then((order) =>
    projectApiRoot
      .orders()
      .withId({
        ID: orderId,
      })
      .post({
        body: {
          actions: [{
            action: "transitionState",
            state: {
              typeId: "state",
              key: customStateKey
            }
          }],
          version: order.body.version
        }
      })
      .execute()
  );

module.exports.setOrderState = (orderId, stateName) =>
  this.getOrderById(orderId).then((order) =>
    projectApiRoot
      .orders()
      .withId({ ID: orderId })
      .post({
        body: {
          version: order.body.version,
          actions: [{
            action: "changeOrderState",
            orderState: stateName
          }]
        }
      })
      .execute()
  );


module.exports.addPaymentToCart = (cartId, paymentId) =>
  this.getCartById(cartId).then((cart) =>
    projectApiRoot
      .carts()
      .withId({ ID: cartId })
      .post({
        body: {
          version: cart.body.version,
          actions: [{
            action: "addPayment",
            payment: {
              typeId: "payment",
              id: paymentId
            }
          }]
        }
      })
      .execute()
  );


