const {createExtension} = require('./handson/extensions');
const {log} = require('./logger');



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
