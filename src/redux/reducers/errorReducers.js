import { createReducer } from "@reduxjs/toolkit";
import { errorOn, errorOff } from "../actions/errorActions";

export const loader = createReducer(false, () => ({
  [errorOn]: () => true,
  [errorOff]: () => false,
}));
