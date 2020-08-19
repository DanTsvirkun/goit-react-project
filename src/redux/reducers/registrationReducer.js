import { createReducer, combineReducers } from "@reduxjs/toolkit";
import { setUserData } from "../actions/registarationAction";
import { resetUser } from "../actions/logInRegistaration";
import { googleSignIn } from "../actions/signInGoogleAction";

export const auth = createReducer("", {
  [setUserData]: (_, { payload }) => payload,
  [googleSignIn]: (_, { payload }) => payload,
  [resetUser]: () => "",
});
