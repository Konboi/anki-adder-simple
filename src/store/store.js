import { createStore, applyMiddleware } from "redux";
import notesReducer from "../reducer/noteReducer";
import thunk from "redux-thunk";

const store = createStore(notesReducer, applyMiddleware(thunk));

export default store;
