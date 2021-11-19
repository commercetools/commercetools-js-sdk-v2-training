const states = require("./handson/states");
const { log } = require("./logger.js");

const stateDraftData = {
  key: "ff-order-completed",
  type: "OrderState",
  name: {
    "de": "FF Order Completed ",
    "en": "FF Order Completed ",
  },
  initial: false,
};

//states.createNewState(stateDraftData).then(log).catch(log)

//states.getStateById("67c67c4e-a3ab-4d38-ab0b-741cfd4b3d44").then(log).catch(log)

states.addTransition("eb35b1d8-9cad-478f-a7a6-11d95cc5e79a", "a5f8b4bd-6314-4f4e-acbb-780ac3e3772e").then(log).catch(log)
