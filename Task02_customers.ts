import {
  createCustomer,
  getCustomerById,
  getCustomerByKey,
  createCustomerToken,
  confirmCustomerEmail,
  assignCustomerToCustomerGroup,
  CustomerDraftData,
} from "./handson/customer";
import { log } from "./utils/logger";

const customerDraftData: CustomerDraftData = {
  firstName: "test",
  lastName: "test",
  email: "test@test.com",
  password: "password",
  key: "test123",
  countryCode: "DE",
};

// createCustomer(customerDraftData).then(log).catch(log);

// getCustomerByKey("test123").then(log).catch(log);

// getCustomerById("a303f0e7-8535-4784-a638-e59f05208355").then(log).catch(log);

// getCustomerByKey("test123")
//   .then(createCustomerToken)
//   .then(confirmCustomerEmail)
//   .then(log)
//   .catch(log);

// assignCustomerToCustomerGroup("test123", "indoor-customers").then(log).catch(log);
