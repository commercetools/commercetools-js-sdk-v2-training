const { apiRoot, projectKey } = require("./handson/client.js");
const {log} = require('./logger');



const extensionDraft = {
    key:'orderChecker',
    destination:{
        type:'HTTP',
        url:'https://europe-west3-ct-support.cloudfunctions.net/training-extensions-sample'
    },
    triggers:[{
        resourceTypeId:'order',
        actions:['Create']
    }]
}

// TODO: CREATE the extension
