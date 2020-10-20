const {createCustomType} = require('./handson/customTypes');
const {createExtension} = require('./handson/extensions');
const {log} = require('./logger');




const sampleTypeDraft = {
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

//createCustomType(sampleTypeDraft).then(log).catch(log);

const sampleExtensionDraft = {
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

createExtension(sampleExtensionDraft).then(log).catch(log);
