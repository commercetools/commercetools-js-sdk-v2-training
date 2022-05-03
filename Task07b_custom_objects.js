const { projectApiRoot } = require("./handson/client");
const { log } = require("./utils/logger");


const customObjectDraft = {
    container: "compatibility-info",
    key: "tulip-seed-product",
    value: {
        IncompatibleSKUs: ["basil-seed-product"],
        LeafletID: "leaflet_1234",
        Instructions: {
            Title: "Plant Handling",
            Distance: "2 meter",
            Watering: "heavy watering"
        }
    }

}

projectApiRoot
    .customObjects()
    .post({ body: customObjectDraft })
    .execute()
    .then(log)
    .catch(log);

// projectApiRoot
//     .customObjects()
//     .withContainerAndKey({
//         container: "compatibility-info",
//         key: "tulip-seed-product"
//     })
//     .get()
//     .execute()
//     .then(log)
//     .catch(log);