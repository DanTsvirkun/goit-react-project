import { createReducer, combineReducers } from "@reduxjs/toolkit";
import { setUserData } from "../actions/registarationAction";

const email = createReducer("", () => ({
  [setUserData]: (_, payload) => payload.user.email,
}));

const uid = createReducer("", () => ({
  [setUserData]: (_, payload) => payload.user.uid,
}));

const auth = combineReducers({ email, uid });

export default auth;
