import ankiConnect from "../api/AnkiConnect";

const deckReducerActionTypeSet = "DECKS_SET";

const reducer = (state = [], action) => {
  switch (action.type) {
    case deckReducerActionTypeSet:
      return action.data;
    default:
      return state;
  }
};

export const initDecks = () => {
  return async dispatch => {
    let decks;
    try {
      decks = await ankiConnect.deckNames();
      if (!decks) {
        decks = [];
      }
    } catch (e) {
      throw e.message;
    }

    dispatch({
      type: deckReducerActionTypeSet,
      data: decks
    });
  };
};

export default reducer;
