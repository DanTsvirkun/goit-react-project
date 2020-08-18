import moment from "moment";
import { createSelector } from "@reduxjs/toolkit";
// console.log(currentDate);

export const sprintsSelector = (state) => state.sprints;
export const itemsSelector = (state) => sprintsSelector(state).items;
export const showModalSelector = (state) =>
  sprintsSelector(state).showModalAddTask;
