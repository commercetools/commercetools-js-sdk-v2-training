const { apiRoot, projectKey } = require("./client.js");

const getCustomerById = (ID) =>
  apiRoot
    .withProjectKey({ projectKey })
    .customers()
    .withId({ ID })
    .get()
    .execute();

const getCustomerByKey = (key) =>
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

const createCustomer = (customerData) =>
  apiRoot
    .withProjectKey({ projectKey })
    .customers()
    .post({
      body: createCustomerDraft(customerData),
    })
    .execute();

const createCustomerDraftKey = (customerData) => {};

const createCustomerKeyVerfiedEmail = (customerData) =>
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

const assignCustomerToCustomerGroup = (customerKey, customerGroupKey) => {
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

module.exports.createCustomer = createCustomer;
module.exports.createCustomerKeyVerfiedEmail = createCustomerKeyVerfiedEmail;
module.exports.getCustomerByKey = getCustomerByKey;
module.exports.getCustomerById = getCustomerById;
module.exports.assignCustomerToCustomerGroup = assignCustomerToCustomerGroup;
