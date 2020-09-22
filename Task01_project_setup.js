const { getProject } = require ('./handson/project.js');
const { getShippingMethodById } = require ('./handson/shippingMethods')
const { getTaxCategoryByKey } = require ('./handson/taxCategory.js');
const { log } = require ('./logger.js');

// TODO 1: Complete the functions in
// ./handson/client.js
// ./handson/project.js
// ./handson/taxCategory.js
// So this code displays the project configuration
// https://docs.commercetools.com/http-api-projects-project.html#get-project


getProject().then(log).catch(log);

getShippingMethodById("fb9d70f3-c59a-4507-b1ad-73ad5acfac94").then(log).catch(log);

getTaxCategoryByKey("VAT").then(log).catch(log);