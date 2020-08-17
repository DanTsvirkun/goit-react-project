import { createReducer, combineReducers } from "@reduxjs/toolkit";
import {
  getSprints,
  addSprint,
  deleteSprints,
  showModalAddSprintAction,
} from "../actions/sprintActions";

const initialState = [];

const items = createReducer(initialState, {
  [addSprint]: (state, { payload }) => {
    console.log(payload);
    return [...state, payload];
  },
  [getSprints]: (_, { payload }) => payload,
  [deleteSprints]: (state, { payload }) =>
    state.filter((item) => item.id !== payload),
});

const showModalAddTask = createReducer(false, {
  [showModalAddSprintAction]: (_, { payload }) => payload,
});

export default combineReducers({
  items,
  showModalAddTask,
});

// {
//     sprintId,
//     id,
//     title,
//     hoursPlanned,
//     hoursWasted,
//     hoursWastedPerDay: [{
//         currentDay,
//         singleHoursWasted,
//     }, ],
// },
