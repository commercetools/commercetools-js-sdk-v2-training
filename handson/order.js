const { apiRoot } = require("./client");
const { getCustomerByKey } = require("./customer");

module.exports.createCart = (customerKey) =>
  getCustomerByKey(customerKey).then((customer) =>
    apiRoot
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
  apiRoot
    .carts()
    .post({
      body: {
        currency: "EUR",
        country: "DE",
      }
    })
    .execute();

module.exports.customerSignIn = (customerDetails) =>
  apiRoot
    .login()
    .post({ body: customerDetails })
    .execute();

module.exports.getCartById = (ID) =>
  apiRoot
    .carts()
    .withId({ ID })
    .get()
    .execute();

module.exports.addLineItemsToCart = (cartId, channelKey, arrayOfSKUs) =>
  this.getCartById(cartId).then((cart) =>
    apiRoot
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
                key: channelKey
              }
            };
          }
          )
        }
      })
      .execute()
  );

module.exports.addDiscountCodeToCart = (cartId, discountCode) =>
  this.getCartById(cartId).then((cart) =>
    apiRoot
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
    apiRoot
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

module.exports.setShipping = async (cartId) => {
  const matchingShippingMethod = await apiRoot
    .shippingMethods()
    .matchingCart()
    .get({
      queryArgs: {
        cartId
      }
    })
    .execute()
    .then(response => response.body.results[0]);

  return this.getCartById(cartId).then(cart =>
    apiRoot
      .carts()
      .withId({ ID: cartId })
      .post({
        body: {
          actions: [{
            action: "setShippingMethod",
            shippingMethod: {
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
    apiRoot
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
  apiRoot
    .orders()
    .withId({ ID })
    .get()
    .execute();

module.exports.updateOrderCustomState = (orderId, customStateKey) =>
  this.getOrderById(orderId).then((order) =>
    apiRoot
      .orders()
      .withId({
        ID: orderId,
      })
      .post({
        body: {
          actions: [{
            action: "transitionState",
            state: { key: customStateKey }
          }],
          version: order.body.version
        }
      })
      .execute()
  );



module.exports.setOrderState = (orderId, stateName) =>
  this.getOrderById(orderId).then((order) =>
    apiRoot
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
    apiRoot
      .carts()
      .withId({ ID: cartId })
      .post({
        body: {
          version: cart.body.version,
          actions: [{
            action: "addPayment",
            payment: { id: paymentId }
          }]
        }
      })
      .execute()
  );
