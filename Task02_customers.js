const {
  createCustomer,
  getCustomerById,
  getCustomerByKey,
  createCustomerKeyVerfiedEmail,
  assignCustomerToCustomerGroup,
} = require("./handson/customer");
const { log } = require("./logger.js");

const customerDraftData = {
  firstName: "test2",
  lastName: "test",
  email: "test2@test.com",
  password: "password",
  key: "test1233",
  countryCode: "DE",
};

createCustomer(customerDraftData).then(log).catch(log);

//getCustomerByKey('test123').then(log).catch(log);

//getCustomerById("10cb16bf-a5d8-4f47-b664-fe5cae2f75d0").then(log).catch(log);

// createCustomerKeyVerfiedEmail(customerDraftData).then(log).catch(log);

//assignCustomerToCustomerGroup('test123','indoor-customers').then(log).catch(log);
