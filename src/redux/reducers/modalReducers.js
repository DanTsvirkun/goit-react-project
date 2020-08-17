import { createReducer } from '@reduxjs/toolkit'
import { modalOn, modalOff } from '../actions/modalAction'

export default createReducer(false, {
  [modalOn]: (state, action) => action.payload,
  [modalOff]: (state, action) => action.payload
})