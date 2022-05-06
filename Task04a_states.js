const states = require("./handson/states");
const { log } = require("./logger.js");

const orderPackedStateDraft = {
  key: "ff-order-packed",
  type: "OrderState",
  name: {
    "de": "FF Order Packed ",
    "en": "FF Order Packed ",
  },
  initial: true,
};

const orderCompletedStateDraft = {
  key: "ff-order-completed",
  type: "OrderState",
  name: {
    "de": "FF Order Completed ",
    "en": "FF Order Completed ",
  },
  initial: false,
};

const createStatesWithTransitions = async () => {
  let orderPackedState = await states.createNewState(orderPackedStateDraft)
  let orderCompletedState = await states.createNewState(orderCompletedStateDraft)

  orderPackedState = states.addTransition(orderPackedState.body.id, [orderCompletedState.body.id])

  orderCompletedState = states.addTransition(orderCompletedState.body.id, [])

  return orderPackedState;
};

createStatesWithTransitions().then(log).catch(log)

//states.getStateByKey(orderPackedStateDraft.key).then(log).catch(log)
