import { apiRoot } from "./client";
import { ClientResponse, Customer, CustomerDraft, CustomerToken, CustomerUpdateAction } from "@commercetools/platform-sdk";

export const getCustomerById = (ID: string) =>
  apiRoot
    .customers()
    .withId({ ID })
    .get()
    .execute();

export const getCustomerByKey = (key: string) =>
  apiRoot
    .customers()
    .withKey({ key })
    .get()
    .execute();

export interface CustomerDraftData {
  firstName?: string;
  lastName?: string;
  email: string;
  password: string;
  key: string;
  countryCode: string;
};

const createCustomerDraft = (customerDraftData: CustomerDraftData): CustomerDraft => {
  const {
    email,
    password,
    firstName,
    lastName,
    countryCode,
    key,
  } = customerDraftData;
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

export const createCustomer = (customerDraftData: CustomerDraftData) =>
  apiRoot
    .customers()
    .post({
      body: createCustomerDraft(customerDraftData),
    })
    .execute();

export const createCustomerToken = (customer: ClientResponse<Customer>) =>
  apiRoot
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

export const confirmCustomerEmail = (token: ClientResponse<CustomerToken>) =>
  apiRoot
    .customers()
    .emailConfirm()
    .post({
      body: {
        tokenValue: token.body.value
      },
    })
    .execute();

export const assignCustomerToCustomerGroup = (
  customerKey: string,
  customerGroupKey: string
) => {
  return getCustomerByKey(customerKey).then((customer: ClientResponse<Customer>) => {
    const updateActions: [CustomerUpdateAction] = [
      {
        action: "setCustomerGroup",
        customerGroup: {
          typeId: "customer-group",
          key: customerGroupKey,
        },
      },
    ];
    return apiRoot
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
