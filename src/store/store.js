import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import noteReducer from "../reducer/noteReducer";
import deckReducer from "../reducer/deckReducer";
import modelReducer from "../reducer/modelReducer";
import currentDeckReducer from "../reducer/currentDeckReducer";
import currentModelReducer from "../reducer/currentModelReducer";

const reducer = combineReducers({
  notes: noteReducer,
  decks: deckReducer,
  models: modelReducer,
  currentDeck: currentDeckReducer,
  currentModel: currentModelReducer
});

const store = createStore(reducer, applyMiddleware(thunk));

export default store;
