const {createCustomObject, getCustomObjectByContainerAndKey} = require('./handson/customObjects');
const {log} = require('./logger');



const sampleCustomObjectDraftData = {
    container: "compatibility-info",
    key:'basil-seed-box',
    value: {
        IncompatibleSKUs: "tulip-seed-box",
        LeafletID: "leaflet_1234",
        Instructions: {
            Title: "Plant Handling",
            Distance: "2 meter",
            Watering: "heavy watering"
        }
    }

}

createCustomObject(sampleCustomObjectDraftData).then(log).catch(log);

// getCustomObjectByContainerAndKey("compatibility-info","basil-seed-box").then(log).catch(log);