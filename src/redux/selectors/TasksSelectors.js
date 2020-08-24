import moment from "moment";
import { createSelector } from "@reduxjs/toolkit";
const currentDate = moment().format("ll");

export const tasksSelector = (state) => state.tasks;
export const itemsSelector = (state) => tasksSelector(state).items;
export const showModalSelector = (state) =>
  tasksSelector(state).showModalAddTask;
export const currentIdxDaySelector = (state) =>
  tasksSelector(state).indexCurrentDay;

export const filterSelector = (state) => tasksSelector(state).filterTasks;
export const filteredTasksSelector = createSelector(
  [itemsSelector, filterSelector],
  (items, filterValue) => {
    return filterValue
      ? items.filter((el) =>
          el.title.toLowerCase().includes(filterValue.toLowerCase())
        )
      : items;
  }
);
export const validHourSelector = createSelector(
  [(state, hoursWastedPerDay) => hoursWastedPerDay, currentIdxDaySelector],
  (hoursWastedPerDay, idx) => {
    if (idx < hoursWastedPerDay.length) {
      return hoursWastedPerDay[idx].singleHoursWasted;
    }
    return 0;
  }
);

const sprintsSelector = (state) => state.sprints;
const itemsSprintsSelector = (state) => sprintsSelector(state).items;

export const findCurrentSprint = createSelector(
  [(state, params) => params, itemsSprintsSelector],
  (params, sprints) => sprints.find((el) => el.id === params.sprintId)
);
