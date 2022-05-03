const { projectApiRoot } = require("./client");

module.exports.getCustomerById = (ID) =>
  projectApiRoot
    .customers()
    .withId({ ID })
    .get()
    .execute();

module.exports.getCustomerByKey = (key) =>
  projectApiRoot
    .customers()
    .withKey({ key })
    .get()
    .execute();


const createCustomerDraft = (customerData) => {
  const {
    email,
    password,
    firstName,
    lastName,
    countryCode,
    key,
  } = customerData;
  return {
    email,
    password,
    key,
    firstName,
    lastName,
    addresses: [
      {
        country: countryCode,
      },
    ],
    defaultShippingAddress: 0,
    defaultBillingAddress: 0,
  };
};

module.exports.createCustomer = (customerData) =>
  projectApiRoot
    .customers()
    .post({
      body: createCustomerDraft(customerData),
    })
    .execute();

module.exports.createCustomerToken = (customer) =>
  projectApiRoot
    .customers()
    .emailToken()
    .post({
      body: {
        id: customer.body.id,
        ttlMinutes: 60,
        version: customer.body.version
      },
    })
    .execute();

module.exports.confirmCustomerEmail = (token) =>
  projectApiRoot
    .customers()
    .emailConfirm()
    .post({
      body: {
        tokenValue: token.body.value
      },
    })
    .execute();

module.exports.assignCustomerToCustomerGroup = (
  customerKey,
  customerGroupKey
) => {
  return this.getCustomerByKey(customerKey).then((customer) => {
    const updateActions = [
      {
        action: "setCustomerGroup",
        customerGroup: {
          typeId: "customer-group",
          key: customerGroupKey,
        },
      },
    ];
    return projectApiRoot
      .customers()
      .withId({ ID: customer.body.id })
      .post({
        body: {
          actions: updateActions,
          version: customer.body.version,
        },
      })
      .execute();
  });
};
