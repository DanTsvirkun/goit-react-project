import { combineReducers } from "@reduxjs/toolkit";
import { loader } from "./loaderReducers";
import { error } from "./errorReducers";
export const rootReducer = combineReducers({ loader, error });
