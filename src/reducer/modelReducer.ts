import { modelNames } from "../api/AnkiConnect";
import { Dispatch } from "redux";

const modelReducerActionTypeSet = "MODELS_SET";

class Action {
  type: string;
  data: string[];
  constructor(type: string, data: string[]) {
    this.type = type;
    this.data = data;
  }
}

const reducer = (state = [], action: Action) => {
  switch (action.type) {
    case modelReducerActionTypeSet:
      return action.data;
    default:
      return state;
  }
};

export const initModels = () => {
  return async (dispatch: Dispatch) => {
    let models;
    try {
      models = await modelNames();
      if (!models) {
        models = [];
      }
    } catch (e: any) {
      throw e.message;
    }

    dispatch({
      type: modelReducerActionTypeSet,
      data: models,
    });
  };
};

export default reducer;
