const {createCustomObject, getCustomObjectByContainerAndKey} = require('./handson/customObjects');
const {log} = require('./logger');



const sampleCustomObjectDraftData = {
    container: "compatibility-info",
    key:'tulip-seed-product',
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

createCustomObject(sampleCustomObjectDraftData).then(log).catch(log);

// getCustomObjectByContainerAndKey("compatibility-info","tulip-seed-product").then(log).catch(log);