import ankiConnect from "../api/AnkiConnect";

const modelReducerActionTypeSet = "MODELS_SET";

const reducer = (state = [], action) => {
  switch (action.type) {
    case modelReducerActionTypeSet:
      return action.data;
    default:
      return state;
  }
};

export const initModels = () => {
  return async dispatch => {
    let models;
    try {
      models = await ankiConnect.modelNames();
      if (!models) {
        models = [];
      }
    } catch (e) {
      throw e.message;
    }

    dispatch({
      type: modelReducerActionTypeSet,
      data: models
    });
  };
};

export default reducer;
