import { log } from "./utils/logger";
import { apiRoot } from "./handson/client";

// TODO 1: Complete the functions in
// ./handson/client.js
// So this code displays the project configuration
// https://docs.commercetools.com/http-api-projects-project.html#get-project

apiRoot
    .get()
    .execute()
    .then(log)
    .catch(log);

apiRoot
    .shippingMethods()
    .withId({ ID: "d24e8501-65c0-4125-994d-7e9ba80724a5" })
    .get()
    .execute()
    .then(log)
    .catch(log);

apiRoot
    .taxCategories()
    .withKey({ key: "standard-tax-category" })
    .get()
    .execute()
    .then(log)
    .catch(log);
