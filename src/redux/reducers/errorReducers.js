import { createReducer } from "@reduxjs/toolkit";
import { errorOn, errorOff } from "../actions/errorActions";

export const error = createReducer(false, {
  [errorOn]: (_, { payload }) => {console.error(payload); return payload},
  [errorOff]: () => false,
});
