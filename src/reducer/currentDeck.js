import Chrome from "../api/Chrome";

const currentDeckReducerActionTypeSet = "CURRENT_DECK_SET";
const CurrentDeckStorageKey = "current-deck";

const reducer = (state = "", action) => {
  switch (action.type) {
    case currentDeckReducerActionTypeSet:
      return action.data;
    default:
      return state;
  }
};

export const setCurrentDeck = deck => {
  return async dispatch => {
    try {
      await Chrome.SetLocal(CurrentDeckStorageKey, deck);
    } catch (e) {
      throw e.message;
    }

    dispatch({
      type: currentDeckReducerActionTypeSet,
      data: deck
    });
  };
};

export const initCurrentDeck = () => {
  return async dispatch => {
    let deck;
    try {
      deck = await Chrome.GetLocal(CurrentDeckStorageKey);
      if (!deck) {
        deck = "";
      }
    } catch (e) {
      throw e.message;
    }

    dispatch({
      type: currentDeckReducerActionTypeSet,
      data: deck
    });
  };
};

export default reducer;
