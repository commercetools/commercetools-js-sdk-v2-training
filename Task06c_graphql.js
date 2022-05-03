const { projectApiRoot } = require("./handson/client");
const { log } = require("./utils/logger");


const query = `
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

// TODO: POST GraphQL query
