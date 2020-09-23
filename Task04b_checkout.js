const checkout = require("./handson/order");
const { log } = require("./logger.js");

const cartDraftData = {
  currency: "EUR",
  customerId: "e1fb13ba-d217-4428-afd9-ebef4bdfbbd9",
  countryCode: "DE",
};

//checkout.createCart(cartDraftData).then(log).catch(log)

//checkout.addLineItemsToCart(['123','123'],'294f2971-9497-43c1-8898-b7760082c842').then(log).catch(log)

//checkout.getCartById('294f2971-9497-43c1-8898-b7760082c842').then(log).catch(log)

//checkout.createOrderFromCart('294f2971-9497-43c1-8898-b7760082c842').then(log).catch(log)

//checkout.getOrderById('abaf987f-7be6-4f55-9323-cf8921f28075').then(log).catch(log)

checkout
  .updateOrderCustomState(
    "67c67c4e-a3ab-4d38-ab0b-741cfd4b3d44",
    "abaf987f-7be6-4f55-9323-cf8921f28075"
  )
  .then(log)
  .catch(log);
