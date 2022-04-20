const { apiRoot } = require("./handson/client");
const { log } = require("./logger");

const customObjectDraft = {
    container: "compatibility-info",
    key: 'tulip-seed-product',
    value: {
        IncompatibleSKUs: "basil-seed-product",
        LeafletID: "leaflet_1234",
        Instructions: {
            Title: "Plant Handling",
            Distance: "2 meter",
            Watering: "heavy watering"
        }
    }

}

apiRoot
    .customObjects()
    .post({ body: customObjectDraft })
    .execute()
    .then(log).catch(log);

// apiRoot
//     .customObjects()
//     .withContainerAndKey({
//         container: "compatibility-info",
//         key: "tulip-seed-product"
//     })
//     .get()
//     .execute()
//     .then(log).catch(log);