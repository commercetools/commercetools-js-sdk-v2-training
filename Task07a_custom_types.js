const { projectApiRoot } = require("./handson/client");
const { log } = require("./utils/logger");


const typeDraft = {
    key: "ff-allowed-to-place-orders",
    name: {
        "de": "ff allowed to place orders",
        "en": "ff allowed to place orders"
    },
    description: {
        "de": "allow a customer to place orders",
        "en": "allow a customer to place orders"
    },
    resourceTypeIds: ["customer"],
    fieldDefinitions: [{
        type: {
            name: "Boolean"
        },
        name: "allowed-to-place-orders",
        label: {
            "de": "Allowed to place orders",
            "en": "Allowed to place orders"
        },
        required: false,
    }]
}

// TODO: Create the custom type
