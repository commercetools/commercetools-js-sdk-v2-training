import * as states from "./handson/states";
import { log } from "./utils/logger";

const orderPackedStateDraft: states.StateDraftData = {
  key: "ff-order-packed",
  type: "OrderState",
  name: {
    "de": "FF Order Packed ",
    "en": "FF Order Packed ",
  },
  initial: true,
};

const orderCompletedStateDraft: states.StateDraftData = {
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

  orderPackedState = await states.addTransition(orderPackedState.body.id, [orderCompletedState.body.id])

  orderCompletedState = await states.addTransition(orderCompletedState.body.id, [])

  return orderPackedState;
};

createStatesWithTransitions().then(log).catch(log)

// states.getStateByKey(orderPackedStateDraft.key).then(log).catch(log)