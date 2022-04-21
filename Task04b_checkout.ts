import * as checkout from "./handson/order";
import { createPayment, PaymentDraftData } from "./handson/payment";
import { log } from "./utils/logger";

const customerKey = "test123";
const cartId = "5b92fd9f-bb9b-4cc8-9e41-4644fa419fae";
const orderId = "57335b75-214d-4e49-9c2a-0d8eb6363875";

const paymentDraftData: PaymentDraftData = {
  key: "payment" + Math.random().toString(36).substring(2, 7),
  amountPlanned: {
    currencyCode: "EUR",
    centAmount: 5000
  },
  pspName: "We_Do_Payments",
  pspMethod: "CREDIT_CARD",
  interfaceId: "we_pay_73636" + Math.random(), // Must be unique.
  interactionId: "pay82626" + Math.random()
}

// create a cart and update the catId variable
// checkout.createCart(customerKey).then(log).catch(log);

// checkout.addLineItemsToCart(cartId, "berlin-warehouse", ["tulip-seed-box", "tulip-seed-sack"]).then(log).catch(log);

// checkout.addDiscountCodeToCart(cartId, "SUMMER").then(log).catch(log);
// checkout.recalculate(cartId).then(log).catch(log);
// checkout.setShippingMethod(cartId).then(log).catch(log);
// checkout.getCartById(cartId).then(log).catch(log);

// create order from cart and update the orderId
// checkout.createOrderFromCart(cartId).then(log).catch(log);

// checkout.getOrderById(orderId).then(log).catch(log);

// set order state to confirmed and custom workflow state to order packed
// checkout.setOrderState(orderId, "Confirmed").then(log).catch(log);
// checkout.updateOrderCustomState(orderId, "ff-order-packed").then(log).catch(log);

const checkoutProcess = async () => {
  let emptyCart = await checkout.createCart(customerKey);

  let filledCart = await checkout.addLineItemsToCart(
    emptyCart.body.id, "berlin-warehouse", ["tulip-seed-box", "tulip-seed-sack"]
  );


  filledCart = await checkout.addDiscountCodeToCart(
    filledCart.body.id, "SUMMER"
  );


  filledCart = await checkout.recalculate(filledCart.body.id);
  filledCart = await checkout.setShippingMethod(filledCart.body.id);

  const payment = await createPayment(paymentDraftData);
  filledCart = await checkout.addPaymentToCart(filledCart.body.id, payment.body.id);

  let order = await checkout.createOrderFromCart(filledCart.body.id);
  order = await checkout.setOrderState(order.body.id, "Confirmed");
  order = await checkout.updateOrderCustomState(order.body.id, "ff-order-packed");
  if (order) {
    return {
      status: 201,
      message: "order created: " + order.body.id,
    };
  }
};

checkoutProcess().then(log).catch(log);
