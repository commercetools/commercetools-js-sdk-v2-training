const { apiRoot } = require("./handson/client");
const { log } = require("./logger");



const extensionDraft = {
    key: 'orderChecker',
    destination: {
        type: 'HTTP',
        url: 'https://europe-west3-ct-support.cloudfunctions.net/training-extensions-sample'
    },
    triggers: [{
        resourceTypeId: 'order',
        actions: ['Create']
    }]
}

apiRoot
    .extensions()
    .post({ body: extensionDraft })
    .execute()
    .then(log).catch(log)

