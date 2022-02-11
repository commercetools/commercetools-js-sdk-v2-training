const { apiRoot, projectKey } = require("./client.js");

module.exports.createCart = (cartDraftData) =>
  apiRoot
    .withProjectKey({ projectKey })
    .carts()
    .post({
      body: createCartDraft(cartDraftData),
    })
    .execute();

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

module.exports.customerSignIn = (customerDetails) =>
  apiRoot
    .withProjectKey({ projectKey })
    .login()
    .post({ body: customerDetails })
    .execute();

module.exports.getCartById = (ID) =>
  apiRoot.withProjectKey({ projectKey }).carts().withId({ ID }).get().execute();

module.exports.addLineItemsToCart = (arrayOfSKUs, cartId) => {
  return this.getCartById(cartId).then((cart) => {
    let updateActions = [];
    arrayOfSKUs.forEach((sku) => {
      updateActions.push({
        action: "addLineItem",
        sku,
      });
    });
    return apiRoot
      .withProjectKey({ projectKey })
      .carts()
      .withId({
        ID: cart.body.id,
      })
      .post({
        body: {
          actions: updateActions,
          version: cart.body.version,
        },
      })
      .execute();
  });
};

module.exports.addDiscountCodeToCart = (discountCode, cartId) => {
  return this.getCartById(cartId).then((cart) => {
    let updateActions = [
      {
        action: "addDiscountCode",
        code: discountCode,
      },
    ];
    return apiRoot
      .withProjectKey({ projectKey })
      .carts()
      .withId({
        ID: cart.body.id,
      })
      .post({
        body: {
          actions: updateActions,
          version: cart.body.version,
        },
      })
      .execute();
  });
};

module.exports.createOrderFromCart = (cartId) => {
  return createOrderFromCartDraft(cartId).then((orderFromCartDraft) => {
    return apiRoot
      .withProjectKey({ projectKey })
      .orders()
      .post({
        body: orderFromCartDraft,
      })
      .execute();
  });
};

const createOrderFromCartDraft = (cartId) => {
  return this.getCartById(cartId).then((cart) => {
    return {
      id: cart.body.id,
      version: cart.body.version,
    };
  });
};

module.exports.getOrderById = (ID) =>
  apiRoot
    .withProjectKey({ projectKey })
    .orders()
    .withId({ ID })
    .get()
    .execute();

module.exports.updateOrderCustomState = (customStateId, orderId) => {
  return getOrderById(orderId).then((order) => {
    const updateActions = [
      {
        action: "transitionState",
        state: {
          id: customStateId,
        },
      },
    ];
    return apiRoot
      .withProjectKey({ projectKey })
      .orders()
      .withId({
        ID: order.body.id,
      })
      .post({
        body: {
          actions: updateActions,
          version: order.body.version,
        },
      })
      .execute();
  });
};

module.exports.createPayment = (paymentDraft) =>
  apiRoot
    .withProjectKey({ projectKey })
    .payments()
    .post({ body: paymentDraft })
    .execute();

module.exports.setOrderState = (stateName, orderId) => {
  return this.getOrderById(orderId).then((order) => {
    const updateActions = [
      {
        action: "changeOrderState",
        orderState: stateName,
      },
    ];
    return apiRoot
      .withProjectKey({ projectKey })
      .orders()
      .withId({ ID: order.body.id })
      .post({
        body: {
          version: order.body.version,
          actions: updateActions,
        },
      })
      .execute();
  });
};

module.exports.addPaymentToOrder = (paymentId, orderId) => {
  return this.getOrderById(orderId).then((order) => {
    const updateActions = [
      {
        action: "addPayment",
        payment: {
          typeId: "payment",
          id: paymentId,
        },
      },
    ];
    return apiRoot
      .withProjectKey({ projectKey })
      .orders()
      .withId({ ID: order.body.id })
      .post({
        body: {
          version: order.body.version,
          actions: updateActions,
        },
      })
      .execute();
  });
};
