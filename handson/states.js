const { projectApiRoot } = require("./client");

module.exports.createNewState = (stateDraftData) =>
  projectApiRoot
    .states()
    .post({
      body: createStateDraft(stateDraftData),
    })
    .execute();

const createStateDraft = (stateDraftData) => {
  const { key, type, name, initial } = stateDraftData;
  return {
    key,
    type,
    name,
    initial,
  };
};

module.exports.getStateByKey = (key) =>
  projectApiRoot
    .states()
    .withKey({ key })
    .get()
    .execute();

module.exports.getStateById = (ID) =>
  projectApiRoot
    .states()
    .withId({ ID })
    .get()
    .execute();

module.exports.addTransition = (stateId, transitionStateIds) =>
  this.getStateById(stateId).then((state) =>
    projectApiRoot
      .states()
      .withId({ ID: state.body.id })
      .post({
        body: {
          version: state.body.version,
          actions: [
            {
              action: "setTransitions",
              transitions: transitionStateIds.map((transitionStateId) => {
                return {
                  typeId: "state",
                  id: transitionStateId
                };
              })
            }
          ]
        }
      })
      .execute()
  )
