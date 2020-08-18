import { createReducer, combineReducers } from "@reduxjs/toolkit";
import { setUserData } from "../actions/registarationAction";
import { resetUser } from "../actions/logInRegistaration";

export const auth = createReducer("", {
  [setUserData]: (_, { payload }) => payload,
  [resetUser]: () => "",
});
