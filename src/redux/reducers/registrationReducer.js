import { createReducer, combineReducers } from "@reduxjs/toolkit";
import { setUserData } from "../actions/registarationAction";

export const auth = createReducer("", {
  [setUserData]: (_, { payload }) => payload,
});
