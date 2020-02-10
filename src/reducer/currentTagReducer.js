import Chrome from "../api/Chrome";

const currentTagReducerActionTypeSet = "CURRENT_TAG_SET";
const currentTagStorageKey = "current-tag";

const reducer = (state = [], action) => {
  switch (action.type) {
    case currentTagReducerActionTypeSet:
      return action.data;
    default:
      return state;
  }
};

export const setCurrentTag = tag => {
  return async dispatch => {
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
  return async dispatch => {
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
