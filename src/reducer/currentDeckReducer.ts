import { GetLocal, SetLocal } from "../api/Chrome";
import { Dispatch } from "redux";

const currentDeckReducerActionTypeSet = "CURRENT_DECK_SET";
const CurrentDeckStorageKey = "current-deck";

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
    case currentDeckReducerActionTypeSet:
      return action.data;
    default:
      return state;
  }
};

export const setCurrentDeck = (deck: string) => {
  return async (dispatch: Dispatch) => {
    try {
      await SetLocal(CurrentDeckStorageKey, deck);
    } catch (e: any) {
      throw e.message;
    }

    dispatch({
      type: currentDeckReducerActionTypeSet,
      data: deck,
    });
  };
};

export const initCurrentDeck = () => {
  return async (dispatch: Dispatch) => {
    let deck;
    try {
      deck = await GetLocal(CurrentDeckStorageKey);
      if (!deck) {
        deck = "";
      }
    } catch (e: any) {
      throw e.message;
    }

    dispatch({
      type: currentDeckReducerActionTypeSet,
      data: deck,
    });
  };
};

export default reducer;
