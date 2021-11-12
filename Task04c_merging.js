const checkout = require("./handson/order");
const { log } = require("./logger.js");

const anonymousCartDraftData = {
  currency: "EUR",
  countryCode: "DE",
};

const customerCartDraftData = {
  currency: "EUR",
  customerId: "a4d4babe-769d-4d49-96c0-88777b4f5d14",
  countryCode: "DE",
};

const mergingProcessTest = async () => {
  let anonymousCart = await checkout.createCart(anonymousCartDraftData);

  let customerCart = await checkout.createCart(customerCartDraftData);

  anonymousCart = await checkout.addLineItemsToCart(
    ["sku111", "sku123","sku123"],
    anonymousCart.body.id
  );

  customerCart = await checkout.addLineItemsToCart(
    ["sku123"],
    customerCart.body.id
  );
  log("Anonymous Cart: " + anonymousCart.body.id); 
  log("Customer Cart: "+ customerCart.body.id);
  const customerDetails = {
    email: "test2@test.com",
    password: "password",
    anonymousCartId: anonymousCart.body.id,
    anonymousCartSignInMode: "MergeWithExistingCustomerCart", // try switching to UseAsNewActiveCustomerCart
  };
  let result = await checkout.customerSignIn(customerDetails);
  return result.body.cart;
};
mergingProcessTest().then((cart) => {
  log("Active cart: " + cart.id);
  cart.lineItems.forEach(item => {
    log(item.variant.sku+ " :" + item.quantity);
  });
})
.catch(log);
