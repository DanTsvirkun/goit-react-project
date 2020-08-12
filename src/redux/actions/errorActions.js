import { createAction } from "@reduxjs/toolkit";
import { ERROR_ON, ERROR_OFF } from "../constants/errorConstants";

export const errorOn = createAction(ERROR_ON);
export const errorOff = createAction(ERROR_OFF);
