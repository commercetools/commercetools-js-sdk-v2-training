const { apiRoot, projectKey } = require("./client.js");

module.exports.getCustomerById = (ID) =>
  apiRoot
    .withProjectKey({ projectKey })
    .customers()
    .withId({ ID })
    .get()
    .execute();
    
module.exports.getCustomerByKey = (key) =>
  apiRoot
    .withProjectKey({ projectKey })
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
  };
};

module.exports.createCustomer = (customerData) =>
  apiRoot
    .withProjectKey({ projectKey })
    .customers()
    .post({
      body: createCustomerDraft(customerData),
    })
    .execute();

module.exports.createCustomerKeyVerfiedEmail = (customerData) =>
  apiRoot
    .withProjectKey({ projectKey })
    .customers()
    .post({
      body: {
        ...createCustomerDraft(customerData),
        ...createCustomerDraftKey(customerData),
        isEmailVerified: true,
      },
    })
    .execute();

module.exports.assignCustomerToCustomerGroup = (
  customerKey,
  customerGroupKey
) => {
  return getCustomerByKey(customerKey).then((customer) => {
    const updateActions = [
      {
        action: "setCustomerGroup",
        customerGroup: {
          key: customerGroupKey,
        },
      },
    ];
    return apiRoot
      .withProjectKey({ projectKey })
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
