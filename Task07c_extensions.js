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
// const extensionDraft = {
//     key: "orderChecker",
//     destination: {
//         type: "AWSLambda",
//         arn: "xxx",
//         accessKey: "xxx",
//         accessSecret: "xxx"
//     },
//     triggers: [{
//         resourceTypeId: "order",
//         actions: ["Create"]
//     }]
// };

apiRoot
    .withProjectKey({ projectKey })
    .extensions()
    .post({ body: extensionDraft })
    .execute()
.then(log).catch(log)

