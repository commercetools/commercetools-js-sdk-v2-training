const { apiRoot, projectKey } = require("./client.js");


module.exports.getCustomerWithOrders = (query) =>apiRoot.withProjectKey({projectKey}).graphql().post({
    body:{
        query,
        variables:{}
    }
}).execute();