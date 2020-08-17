import { createAction } from "@reduxjs/toolkit"
import { MODAL_ON, MODAL_OFF } from '../constants/modalConstants'

export const modalOn = createAction(MODAL_ON)
export const modalOff = createAction(MODAL_OFF)