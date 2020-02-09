import Chrome from "../api/Chrome";

const currentFrontReducerActionTypeSet = "CURRENT_FRONT_SET";
export const currentFrontStorageKey = "current-front";

const reducer = (state = "", action) => {
  switch (action.type) {
    case currentFrontReducerActionTypeSet:
      return action.data;
    default:
      return state;
  }
};

export const setCurrentFront = front => {
  return async dispatch => {
    try {
      await Chrome.SetLocal(currentFrontStorageKey, front);
    } catch (e) {
      throw e.message;
    }

    dispatch({
      type: currentFrontReducerActionTypeSet,
      data: front
    });
  };
};

export const initCurrentFront = () => {
  return async dispatch => {
    let front;
    try {
      front = await Chrome.GetLocal(currentFrontStorageKey);
      if (!front) {
        front = "";
      }
    } catch (e) {
      throw e.message;
    }

    dispatch({
      type: currentFrontReducerActionTypeSet,
      data: front
    });
  };
};

export default reducer;
