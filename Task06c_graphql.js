const {getCustomerWithOrders} = require ('./handson/graphql');
const { log } = require("./logger");

const testQuery = `
query {
    orders {
      results {
        customer {
          email
        }
        lineItems {
          nameAllLocales {
            value
          }
        }
        totalPrice {
          centAmount
        }
      }
    }
  }
  `;

getCustomerWithOrders(testQuery).then(log).catch(log)