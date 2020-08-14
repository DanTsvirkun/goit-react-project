import { createReducer, combineReducers } from "@reduxjs/toolkit";
import { setUserData } from "../actions/registarationAction";

const auth = createReducer("", {
  [setUserData]: (_, { payload }) => payload,
});

export default auth;
