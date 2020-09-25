const {getCustomerWithOrders} = require ('./handson/graphql');
const { log } = require("./logger");



getCustomerWithOrders().then(log).catch(log)