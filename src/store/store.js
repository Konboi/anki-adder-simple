import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import noteReducer, { currentNoteReducer } from "../reducer/noteReducer";
import deckReducer from "../reducer/deckReducer";
import modelReducer from "../reducer/modelReducer";
import currentDeckReducer from "../reducer/currentDeckReducer";
import currentModelReducer from "../reducer/currentModelReducer";
import currentTagReducer from "../reducer/currentTagReducer";
import { composeWithDevTools } from "redux-devtools-extension";

const reducer = combineReducers({
  notes: noteReducer,
  decks: deckReducer,
  models: modelReducer,
  currentNote: currentNoteReducer,
  currentDeck: currentDeckReducer,
  currentModel: currentModelReducer,
  currentTag: currentTagReducer
});

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));

export default store;
