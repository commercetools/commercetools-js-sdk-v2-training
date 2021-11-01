const {createCustomType} = require('./handson/customTypes');
const {log} = require('./logger');




const sampleTypeDraftData = {
    key:'allowed-to-place-orders',
    name:{
        "de-DE":'allowed-to-place-orders'
    },
    description:{
        "de-DE":'allowed-to-place-orders'
    },
    resourceTypeIds:['customer'],
    fieldDefinitions:[{
        type:{
            name:'Boolean'
        },
        name:'allowed-to-place-orders',
        label:{
            "de-DE":'Allowed to place orders'
        },
        required:false,

    }]

}

createCustomType(sampleTypeDraftData).then(log).catch(log);
