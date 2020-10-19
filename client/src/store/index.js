import { createStore, combineReducers } from "redux";
import { usersReducer } from "./usersReducer";

export const store = createStore(
  combineReducers({
    users: usersReducer,
  }),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
