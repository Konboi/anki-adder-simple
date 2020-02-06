import { createStore, combineReducers, applyMiddleware } from "redux";
import notesReducer from "../reducer/noteReducer";
import thunk from "redux-thunk";

const reducer = combineReducers({
  notes: notesReducer
});

const store = createStore(reducer, applyMiddleware(thunk));

export default store;
