import { combineReducers } from "@reduxjs/toolkit";
import { loader } from "./loaderReducers";
import { error } from "./errorReducers";
import auth from "./registrationReducer";
export const rootReducer = combineReducers({ loader, error, auth });
