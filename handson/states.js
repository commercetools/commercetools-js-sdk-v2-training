const { apiRoot, projectKey } = require("./client.js");

const createNewState = (stateDraftData) =>
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

const getStateByKey = (key) =>
  apiRoot
    .withProjectKey({ projectKey })
    .states()
    .withKey({ key })
    .get()
    .execute();

const getStateById = (ID) =>
  apiRoot
    .withProjectKey({ projectKey })
    .states()
    .withId({ ID })
    .get()
    .execute();

const addTransition = (stateId, transitionStateId) => {
  return getStateById(stateId).then((state) => {
    const updateActions = [
      {
        action: "setTransitions",
        transitions: [
          {
            id: transitionStateId,
          },
        ],
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

module.exports.createNewState = createNewState;

module.exports.getStateByKey = getStateByKey;
module.exports.getStateById = getStateById;

module.exports.addTransition = addTransition;
