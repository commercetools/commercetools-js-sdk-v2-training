const {createCustomType} = require('./handson/customTypes');
const {log} = require('./logger');


const sampleTypeDraftData = {
    key:'ff-allowed-to-place-orders',
    name:{
        "de":'ff-allowed-to-place-orders',
        "en":'ff-allowed-to-place-orders'
    },
    description:{
        "de":'allowed-to-place-orders',
        "en":'allowed-to-place-orders'
    },
    resourceTypeIds:['customer'],
    fieldDefinitions:[{
        type:{
            name:'Boolean'
        },
        name:'allowed-to-place-orders',
        label:{
            "de":'Allowed to place orders',
            "en":'Allowed to place orders'
        },
        required:false,
    }]
}

createCustomType(sampleTypeDraftData).then(log).catch(log);
