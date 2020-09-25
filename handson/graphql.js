const { apiRoot, projectKey } = require("./client.js");


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

module.exports.getCustomerWithOrders = () =>apiRoot.withProjectKey({projectKey}).graphql().post({
    body:{
        query:testQuery,
        variables:{}
    }
}).execute();