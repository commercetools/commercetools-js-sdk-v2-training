const {
  createCustomer,
  getCustomerById,
  getCustomerByKey,
  createCustomerToken,
  confirmCustomerEmail,
  assignCustomerToCustomerGroup,
} = require("./handson/customer");
const { log } = require("./logger.js");

const customerDraftData = {
  firstName: "test",
  lastName: "test",
  email: "test@test.com",
  password: "password",
  key: "test123",
  countryCode: "DE",
};

 createCustomer(customerDraftData).then(log).catch(log);

// getCustomerByKey('test123').then(log).catch(log);

// getCustomerById("a303f0e7-8535-4784-a638-e59f05208355").then(log).catch(log);

// getCustomerByKey('test123')
//   .then(createCustomerToken)
//   .then(confirmCustomerEmail)
//   .then(log)
//   .catch(log);

//assignCustomerToCustomerGroup('test123','indoor-customers').then(log).catch(log);
