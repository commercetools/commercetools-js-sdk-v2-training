const checkout = require("./handson/order");
const { log } = require("./utils/logger");

// TODO:
// set your customer key and inspect cart merging

const customerKey = "test123";

const mergingProcessTest = async () => {
  let anonymousCart = await checkout.createAnonymousCart();

  let customerCart = await checkout.createCart(customerKey);

  anonymousCart = await checkout.addLineItemsToCart(anonymousCart.body.id, "berlin-warehouse", ['tulip-seed-box', 'tulip-seed-box', 'tulip-seed-box']);

  customerCart = await checkout.addLineItemsToCart(customerCart.body.id, "berlin-warehouse", ['tulip-seed-box', 'tulip-seed-sack', 'tulip-seed-package']);

  log("Anonymous Cart: " + anonymousCart.body.id);
  log("Customer Cart: " + customerCart.body.id);

  const customerDetails = {
    email: "test@test.com",
    password: "password",
    anonymousCartId: anonymousCart.body.id,
    anonymousCartSignInMode: "MergeWithExistingCustomerCart", // try switching to UseAsNewActiveCustomerCart
  };

  let result = await checkout.customerSignIn(customerDetails);
  return result.body.cart;
};

mergingProcessTest()
  .then((cart) => {
    log("Active cart: " + cart.id);
    cart.lineItems.forEach(item => {
      log(item.variant.sku + " :" + item.quantity);
    });
  })
  .catch(log);

