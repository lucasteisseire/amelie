import { ADD_USER_ACTION } from "./constant";
const initialState = [];

export const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_USER_ACTION:
      return [...state, action.user];
    default:
      return state;
  }
};
