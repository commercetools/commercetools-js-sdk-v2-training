const {createSubscription} = require('./handson/subscriptions');
const {log} = require('./logger');

// key - String - Optional - User-specific unique identifier for the subscription
// destination - Destination - The Message Queue into which the notifications are to be sent
// messages - Array of MessageSubscription - Optional - The messages to be subscribed to.
// changes

const sampleSubscriptionDraft = {
   key:'subscriptionSampleForSendingConfirmationEmails',
   destination:{
       type:'GoogleCloudPubSub',
       projectId:"ct-support",
       topic:'training-subscription-sample'
   },
   messages:[{
    resourceTypeId:'order',
    type:'OrderCreated'
   }],
   
}

createSubscription(sampleSubscriptionDraft).then(log).catch(log);
