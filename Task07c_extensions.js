const { projectApiRoot } = require("./handson/client");
const { log } = require("./utils/logger");

const extensionDraft = {
    key: "orderChecker",
    destination: {
        type: "HTTP",
        url: "https://europe-west3-ct-support.cloudfunctions.net/training-extensions-sample"
    },
    triggers: [{
        resourceTypeId: "order",
        actions: ["Create"]
    }]
}

projectApiRoot
    .extensions()
    .post({ body: extensionDraft })
    .execute()
    .then(log)
    .catch(log);

