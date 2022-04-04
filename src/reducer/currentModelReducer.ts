import { GetLocal, SetLocal } from "../api/Chrome";
import { Dispatch } from "redux";

const currentModelReducerActionTypeSet = "CURRENT_MODEL_SET";
const CurrentModelStorageKey = "current-model";

class Action {
  type: string;
  data: string;
  constructor(type: string, data: string) {
    this.type = type;
    this.data = data;
  }
}

const reducer = (state: string = "", action: Action) => {
  switch (action.type) {
    case currentModelReducerActionTypeSet:
      return action.data;
    default:
      return state;
  }
};

export const setCurrentModel = (model: string) => {
  return async (dispatch: Dispatch) => {
    try {
      await SetLocal(CurrentModelStorageKey, model);
    } catch (e) {
      throw e.message;
    }

    dispatch({
      type: currentModelReducerActionTypeSet,
      data: model,
    });
  };
};

export const initCurrentModel = () => {
  return async (dispatch: Dispatch) => {
    let model;
    try {
      model = await GetLocal(CurrentModelStorageKey);
      if (!model) {
        model = "";
      }
    } catch (e) {
      throw e.message;
    }

    dispatch({
      type: currentModelReducerActionTypeSet,
      data: model,
    });
  };
};

export default reducer;
