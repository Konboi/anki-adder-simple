import ankiConnect from "../api/AnkiConnect";
import { Dispatch } from "redux";

const deckReducerActionTypeSet = "DECKS_SET";

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
    case deckReducerActionTypeSet:
      return action.data;
    default:
      return state;
  }
};

export const initDecks = () => {
  return async (dispatch: Dispatch) => {
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
