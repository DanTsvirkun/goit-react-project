import { createReducer } from "@reduxjs/toolkit";
import { errorOn, errorOff } from "../actions/errorActions";

export const error = createReducer(false, () => ({
  [errorOn]: () => true,
  [errorOff]: () => false,
}));
