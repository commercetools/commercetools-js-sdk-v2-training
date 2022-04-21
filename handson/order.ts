import { CartUpdateAction, CustomerSignin, OrderState } from "@commercetools/platform-sdk";
import { apiRoot } from "./client";
import { getCustomerByKey } from "./customer";

export const createCart = (customerKey: string) =>
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

export const createAnonymousCart = () =>
  apiRoot
    .carts()
    .post({
      body: {
        currency: "EUR",
        country: "DE",
      }
    })
    .execute();

export const customerSignIn = (customerDetails: CustomerSignin) =>
  apiRoot
    .login()
    .post({ body: customerDetails })
    .execute();

export const getCartById = (ID: string) =>
  apiRoot
    .carts()
    .withId({ ID })
    .get()
    .execute();

export const addLineItemsToCart = (cartId: string, channelKey: string, arrayOfSKUs: Array<string>) =>
  getCartById(cartId)
    .then((cart) =>
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
                  typeId: "channel",
                  key: channelKey
                },
              };
            })
          }
        })
        .execute()
    );

export const addDiscountCodeToCart = (cartId: string, discountCode: string) =>
  getCartById(cartId)
    .then((cart) =>
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

export const recalculate = (cartId: string) =>
  getCartById(cartId)
    .then((cart) =>
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

export const setShippingMethod = async (cartId: string) => {
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

  return getCartById(cartId)
    .then(cart =>
      apiRoot
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


export const createOrderFromCart = (cartId: string) =>
  createOrderFromCartDraft(cartId)
    .then((orderFromCartDraft) =>
      apiRoot
        .orders()
        .post({
          body: orderFromCartDraft,
        })
        .execute()
    );

const createOrderFromCartDraft = (cartId: string) =>
  getCartById(cartId)
    .then((cart) => {
      return {
        id: cart.body.id,
        version: cart.body.version,
      };
    });

export const getOrderById = (ID: string) =>
  apiRoot
    .orders()
    .withId({ ID })
    .get()
    .execute();

export const updateOrderCustomState = (orderId: string, customStateKey: string) =>
  getOrderById(orderId)
    .then((order) =>
      apiRoot
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



export const setOrderState = (orderId: string, stateName: OrderState) =>
  getOrderById(orderId)
    .then((order) =>
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


export const addPaymentToCart = (cartId: string, paymentId: string) =>
  getCartById(cartId)
    .then((cart) =>
      apiRoot
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
