import { createAction } from "@reduxjs/toolkit";
import { SET_USER_DATA } from "../constants/registration";

export const setUserData = createAction(SET_USER_DATA, (payload) => ({
  payload: {
    email: payload.user.email,
    uid: payload.user.uid,
  },
}));
