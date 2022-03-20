const { apiRoot, projectKey } = require("./client.js");

module.exports.createNewState = (stateDraftData) =>
  apiRoot
    .withProjectKey({ projectKey })
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
  apiRoot
    .withProjectKey({ projectKey })
    .states()
    .withKey({ key })
    .get()
    .execute();

module.exports.getStateById = (ID) =>
  apiRoot
    .withProjectKey({ projectKey })
    .states()
    .withId({ ID })
    .get()
    .execute();

module.exports.addTransition = (stateId, transitionStateIds) => {
  return this.getStateById(stateId).then((state) => {
    const updateActions = [
      {
        action: "setTransitions",
        transitions: transitionStateIds.map((transitionStateId) => {
          return {
            id: transitionStateId,
          };
        }),
      },
    ];

    return apiRoot
      .withProjectKey({ projectKey })
      .states()
      .withId({
        ID: state.body.id,
      })
      .post({
        body: {
          actions: updateActions,
          version: state.body.version,
        },
      })
      .execute();
  });
};
