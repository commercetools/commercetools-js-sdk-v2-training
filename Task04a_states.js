const states = require("./handson/states");
const { log } = require("./utils/logger");

// TODO
// Use states.js to create your designed order state machine
//

const orderPackedStateDraft = {
  key: "ff-order-packed",
  type: "OrderState",
  name: {
    "de": "FF Order Packed ",
    "en": "FF Order Packed ",
  },
  initial: true,
};

const orderShippedStateDraft = {
  key: "ff-order-Shipped",
  type: "OrderState",
  name: {
    "de": "FF Order Shipped ",
    "en": "FF Order Shipped ",
  },
  initial: false,
};

const createStatesWithTransitions = async () => {
  let orderPackedState = await states.createNewState(orderPackedStateDraft)
  let orderShippedState = await states.createNewState(orderShippedStateDraft)

  orderPackedState = await states.addTransition(orderPackedState.body.id, [orderShippedState.body.id])

  orderShippedState = await states.addTransition(orderShippedState.body.id, [])

  return orderPackedState;
};

createStatesWithTransitions().then(log).catch(log)

// states.getStateByKey(orderPackedStateDraft.key).then(log).catch(log)