const { apiRoot, projectKey } = require("./client.js");

const createCart = (cartDraftData) =>
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

const getCartById = (ID) =>
  apiRoot.withProjectKey({ projectKey }).carts().withId({ ID }).get().execute();

const addLineItemsToCart = (arrayOfSKUs, cartId) => {
  return getCartById(cartId).then((cart) => {
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

const createOrderFromCart = (cartId) => {
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
  return getCartById(cartId).then((cart) => {
    return {
      id: cart.body.id,
      version: cart.body.version,
    };
  });
};

const getOrderById = (ID) =>
  apiRoot
    .withProjectKey({ projectKey })
    .orders()
    .withId({ ID })
    .get()
    .execute();

const updateOrderCustomState = (customStateId, orderId) => {
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

module.exports.createCart = createCart;
module.exports.getCartById = getCartById;
module.exports.addLineItemsToCart = addLineItemsToCart;
module.exports.createOrderFromCart = createOrderFromCart;
module.exports.getOrderById = getOrderById;
module.exports.updateOrderCustomState = updateOrderCustomState;
