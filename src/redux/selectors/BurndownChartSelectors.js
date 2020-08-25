import { createSelector } from "@reduxjs/toolkit";
import { itemsSelector } from "./TasksSelectors";

export const sprintDurationSelector = (state) =>
  itemsSelector(state)[0].hoursWastedPerDay.length;

export const chartDaysSelector = createSelector([itemsSelector], (items) =>
  items[0].hoursWastedPerDay.map((task) => task.currentDay)
);

export const hoursPlannedSelector = createSelector([itemsSelector], (items) =>
  items
    .map((task) => Number(task.hoursPlanned))
    .reduce((acc, taskValue) => {
      return (acc += taskValue);
    }, 0)
);

export const sumHoursWastedSelector = createSelector([itemsSelector], (items) =>
  items
    .map((task) => Number(task.hoursWasted))
    .reduce((acc, taskValue) => {
      return (acc += taskValue);
    }, 0)
);
