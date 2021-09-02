const checkout = require("./handson/order");
const { log } = require("./logger.js");

const cartDraftData = {
  currency: "EUR",
  //customerId: "10cb16bf-a5d8-4f47-b664-fe5cae2f75d0",
  countryCode: "DE",
};

const cartDraftData2 = {
  currency: "EUR",
  customerId: "10cb16bf-a5d8-4f47-b664-fe5cae2f75d0",
  countryCode: "DE",
};

const mergingProcessTest = async () => {
  let anonymousCart = await checkout.createCart(cartDraftData);

  let customerCart = await checkout.createCart(cartDraftData2);


  customerCart = await checkout.addLineItemsToCart(
    ["123"],
    customerCart.body.id
  );
  log(anonymousCart.body.id); // look it up in impex you will see it's merged
  log(customerCart.body.id);
  const customerDetails = {
    email: "persona1@example.com",
    password: "123",
    anonymousCartId: anonymousCart.body.id,
  };
  let test = await checkout.customerSignIn(customerDetails);
  return test;
};
mergingProcessTest().then(log).catch(log);
