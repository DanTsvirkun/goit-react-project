import moment from 'moment';
import {
    createSelector
} from '@reduxjs/toolkit';
const currentDate = moment().format('ll');
// console.log(currentDate);

export const tasksSelector = state => state.tasks;
export const itemsSelector = state => tasksSelector(state).items;
export const showModalSelector = state => tasksSelector(state).showModalAddTask;
export const currentIdxDaySelector = state =>
    tasksSelector(state).indexCurrentDay;
export const filterSelector = state => tasksSelector(state).filterTasks;
export const filteredTasksSelector = createSelector(
    [itemsSelector, filterSelector],
    (items, filterValue) => {
        return filterValue ?
            items.filter(el =>
                el.title.toLowerCase().includes(filterValue.toLowerCase())
            ) : items
    }
);
export const validHourSelector = createSelector(
    [(state, hoursWastedPerDay) => hoursWastedPerDay, currentIdxDaySelector],
    (hoursWastedPerDay, idx) => hoursWastedPerDay[idx].singleHoursWasted,
);

// const findCurrentDay = () => {
//     const res = hoursWastedPerDay.findIndex((el, idx) => {
//         const isCorrectDay = el.currentDay === currentDate;

//         if (isCorrectDay) {
//             return el;
//         }
//         if (hoursWastedPerDay.length === idx + 1 && !isCorrectDay) {
//             return hoursWastedPerDay[idx];
//         }
//     });
//     return res;
// };

// export const hoursWastedPerDay = createSelector([itemsSelector], items =>
//   items.map(item => {
//     const res = item.hoursWastedPerDay.find((el, idx) => {
//       const isCorrectDay = el.currentDay === currentDate;

//       if (isCorrectDay) {
//         return el;
//       }
//       if (hoursWastedPerDay.length === idx + 1 && !isCorrectDay) {
//         return hoursWastedPerDay[idx];
//       }

//       return el.currentDay === currentDate;
//     });
//     return res;
//   }),
// );