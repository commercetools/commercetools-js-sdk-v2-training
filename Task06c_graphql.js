const {getGraphQLResults} = require ('./handson/graphql');
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

  getGraphQLResults(testQuery).then(log).catch(log)