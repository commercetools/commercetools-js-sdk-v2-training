import { ExtensionDraft } from "@commercetools/platform-sdk";
import { apiRoot } from "./handson/client";
import { log } from "./utils/logger";

const extensionDraft: ExtensionDraft = {
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

apiRoot
    .extensions()
    .post({ body: extensionDraft })
    .execute()
    .then(log).catch(log)
