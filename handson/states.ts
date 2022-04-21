import { LocalizedString, StateDraft, StateTypeEnum, StateUpdate } from "@commercetools/platform-sdk";
import { apiRoot } from "./client";

export interface StateDraftData {
  key: string;
  type: StateTypeEnum;
  name: LocalizedString;
  initial: boolean
}

export const createNewState = (stateDraftData: StateDraftData) =>
  apiRoot
    .states()
    .post({
      body: createStateDraft(stateDraftData),
    })
    .execute();

const createStateDraft = (stateDraftData: StateDraftData): StateDraft => {
  const { key, type, name, initial } = stateDraftData;
  return {
    key,
    type,
    name,
    initial,
  };
};

export const getStateByKey = (key: string) =>
  apiRoot
    .states()
    .withKey({ key })
    .get()
    .execute();

export const getStateById = (ID: string) =>
  apiRoot
    .states()
    .withId({ ID })
    .get()
    .execute();

export const addTransition = (stateId: string, transitionStateIds: Array<string>) =>
  getStateById(stateId).then((state) =>
    apiRoot
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
