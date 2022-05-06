const { apiRoot, projectKey } = require("./client.js");
const { getCustomerByKey } = require( "./customer.js" );

module.exports.createCart = (customerKey) =>
getCustomerByKey(customerKey).then((customer) =>
  apiRoot.withProjectKey({ projectKey })
    .carts()
    .post({
      body: {
        currency: "EUR",
        country: "DE",
        customerId: customer.body.id,
        customerEmail: customer.body.email,
        shippingAddress: customer.body.addresses.find(address => address.id == customer.body.defaultShippingAddressId)
      }
    })
    .execute()
)

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

module.exports.customerSignIn = (customerDetails) =>
  apiRoot.withProjectKey({ projectKey })
    .login()
    .post({ body: customerDetails })
    .execute();

module.exports.getCartById = (ID) =>
  apiRoot.withProjectKey({ projectKey }).carts().withId({ ID }).get().execute();

module.exports.addLineItemsToCart = (cartId, arrayOfSKUs) => 
  this.getCartById(cartId).then((cart) => 
    apiRoot.withProjectKey({projectKey})
      .carts()
      .withId({ID: cartId})
      .post({
        body: {
          version: cart.body.version,
          actions: arrayOfSKUs.map((sku) => {
            return {
              action: "addLineItem",
              sku
            };
          }
          )
        }
      })
      .execute()
  )

module.exports.addDiscountCodeToCart = (cartId, discountCode) =>
  this.getCartById(cartId).then((cart) => 
    apiRoot.withProjectKey({ projectKey })
      .carts()
      .withId({ ID: cartId })
      .post({
        body: {
          actions: [ {
              action: "addDiscountCode",
              code: discountCode,
            } ],
          version: cart.body.version,
        },
      })
      .execute()
  )

module.exports.createOrderFromCart = (cartId) => 
  createOrderFromCartDraft(cartId).then((orderFromCartDraft) =>
    apiRoot.withProjectKey({ projectKey })
      .orders()
      .post({
        body: orderFromCartDraft,
      })
      .execute()
  )

const createOrderFromCartDraft = (cartId) =>
  this.getCartById(cartId)
    .then((cart) => ({
      cart: {
        typeId: "cart",
        id: cartId
      },
      version: cart.body.version
    }))

module.exports.getOrderById = (ID) =>
  apiRoot.withProjectKey({ projectKey })
    .orders()
    .withId({ ID })
    .get()
    .execute()

module.exports.updateOrderCustomState = (orderId, customStateKey) =>
  this.getOrderById(orderId).then((order) =>
    apiRoot.withProjectKey({ projectKey })
      .orders()
      .withId({
        ID: orderId,
      })
      .post({
        body: {
          actions: [ {
              action: "transitionState",
              state: { key: customStateKey }
            } ],
          version: order.body.version
        }
      })
      .execute()
  )

module.exports.createPayment = (paymentDraft) =>
  apiRoot.withProjectKey({ projectKey })
    .payments()
    .post({ body: paymentDraft })
    .execute()

module.exports.setOrderState = (orderId, stateName) =>
  this.getOrderById(orderId).then((order) =>
    apiRoot.withProjectKey({ projectKey })
      .orders()
      .withId({ ID: orderId })
      .post({
        body: {
          version: order.body.version,
          actions: [ {
              action: "changeOrderState",
              orderState: stateName
            } ]
        }
      })
      .execute()
  )


module.exports.addPaymentToOrder = (orderId, paymentId) =>
  this.getOrderById(orderId).then((order) =>
    apiRoot.withProjectKey({ projectKey })
      .orders()
      .withId({ ID: orderId })
      .post({
        body: {
          version: order.body.version,
          actions: [ {
              action: "addPayment",
              payment: { id: paymentId }
            } ]
        }
      })
      .execute()
  )
