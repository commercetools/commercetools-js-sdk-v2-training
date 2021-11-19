const checkout = require("./handson/order");
const { log } = require("./logger.js");

const cartDraftData = {
  currency: "EUR",
  customerId: "10cb16bf-a5d8-4f47-b664-fe5cae2f75d0",
  countryCode: "DE",
};
const paymentDraft = {
  key:"testPayment-2",
  amountPlanned:{
    currencyCode:'EUR',
    centAmount:4200
  },
  customer:{
    typeId:'customer',
    id:'10cb16bf-a5d8-4f47-b664-fe5cae2f75d0'
  }
}
//checkout.createCart(cartDraftData).then(log).catch(log)

//checkout.addLineItemsToCart(['sku123','sku123'],'294f2971-9497-43c1-8898-b7760082c842').then(log).catch(log)

// checkout.addDiscountCodeToCart("SUMMER",'294f2971-9497-43c1-8898-b7760082c842').then(log).catch(log);
//checkout.getCartById('294f2971-9497-43c1-8898-b7760082c842').then(log).catch(log)

//checkout.createOrderFromCart('294f2971-9497-43c1-8898-b7760082c842').then(log).catch(log)

//checkout.getOrderById('abaf987f-7be6-4f55-9323-cf8921f28075').then(log).catch(log)
//checkout.createPayment(paymentDraft).then(log).catch(log)
//checkout.addPaymentToOrder('bd051b5c-9cd4-4cfc-8536-bac669f579f4','abaf987f-7be6-4f55-9323-cf8921f28075').then(log).catch(log)

// checkout
//   .updateOrderCustomState(
//     "67c67c4e-a3ab-4d38-ab0b-741cfd4b3d44",
//     "abaf987f-7be6-4f55-9323-cf8921f28075"
//   )
//   .then(log)
//   .catch(log);

const checkoutProcess = async () => {
  let emptyCart = await checkout.createCart(cartDraftData);

  let filledCart = await checkout.addLineItemsToCart(
    ["sku123", "sku123",'sku111'],
    emptyCart.body.id
  );
  filledCart = await checkout.addDiscountCodeToCart(
    "SUMMER",
    emptyCart.body.id
  );
  const payment = await checkout.createPayment(paymentDraft);
  let order = await checkout.createOrderFromCart(filledCart.body.id);
  order = await checkout.addPaymentToOrder(payment.body.id,order.body.id);
  order = await checkout.setOrderState('Confirmed',order.body.id);
  if (order) {
    return {
      status: 201,
      message: "order created",
    };
  }
};

checkoutProcess().then(log).catch(log);
