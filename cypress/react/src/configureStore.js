import { createStore, applyMiddleware, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

import { accommodationsReducer } from "./store/accommodations/reducer";

const reducers = combineReducers({ accommodations: accommodationsReducer });

export const configureStore = () => {
  return createStore(reducers, composeWithDevTools(applyMiddleware(thunk)));
};
