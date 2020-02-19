import Chrome from "../api/Chrome";
import { Dispatch } from "redux";

const currentTagReducerActionTypeSet = "CURRENT_TAG_SET";
const currentTagStorageKey = "current-tag";

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
    case currentTagReducerActionTypeSet:
      return action.data;
    default:
      return state;
  }
};

export const setCurrentTag = (tag: string[]) => {
  return async (dispatch: Dispatch) => {
    try {
      await Chrome.SetLocal(currentTagStorageKey, tag);
    } catch (e) {
      throw e.message;
    }

    dispatch({
      type: currentTagReducerActionTypeSet,
      data: tag
    });
  };
};

export const initCurrentTag = () => {
  return async (dispatch: Dispatch) => {
    let tag;
    try {
      tag = await Chrome.GetLocal(currentTagStorageKey);
      if (!tag) {
        tag = "";
      }
    } catch (e) {
      throw e.message;
    }

    dispatch({
      type: currentTagReducerActionTypeSet,
      data: tag
    });
  };
};

export default reducer;
