import Chrome from "../api/Chrome";

const currentModelReducerActionTypeSet = "CURRENT_MODEL_SET";
const CurrentModelStorageKey = "current-model";

const reducer = (state = "", action) => {
  switch (action.type) {
    case currentModelReducerActionTypeSet:
      return action.data;
    default:
      return state;
  }
};

export const setCurrentModel = model => {
  return async dispatch => {
    try {
      await Chrome.SetLocal(CurrentModelStorageKey, model);
    } catch (e) {
      throw e.message;
    }

    dispatch({
      type: currentModelReducerActionTypeSet,
      data: model
    });
  };
};

export const initCurrentModel = () => {
  return async dispatch => {
    let model;
    try {
      model = await Chrome.GetLocal(CurrentModelStorageKey);
      if (!model) {
        model = "";
      }
    } catch (e) {
      throw e.message;
    }

    dispatch({
      type: currentModelReducerActionTypeSet,
      data: model
    });
  };
};

export default reducer;
