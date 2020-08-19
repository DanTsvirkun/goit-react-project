import { createSelector } from "@reduxjs/toolkit";
import { itemsSelector } from "./TasksSelectors";

export const hoursPlannedSelector = createSelector([itemsSelector], (items) =>
  items
    .map((task) => Number(task.hoursPlanned))
    .reduce((acc, taskValue) => {
      return (acc += taskValue);
    }, 0)
);

export const chartDaysSelector = createSelector([itemsSelector], (items) =>
  items[0].hoursWastedPerDay.map((task) => task.currentDay)
);
