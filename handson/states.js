const { apiRoot, projectKey } = require("./client.js");

module.exports.createNewState = (stateDraftData) => {}

const createStateDraft = (stateDraftData) => {
  const { key, type, name, initial } = stateDraftData;
  return {
    key,
    type,
    name,
    initial,
  };
};

module.exports.getStateByKey = (key) => {}

module.exports.getStateById = (ID) => {}

module.exports.addTransition = (stateId, transitionStateIds) => {}
