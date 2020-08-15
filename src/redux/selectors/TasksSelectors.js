import moment from 'moment';
import { createSelector } from '@reduxjs/toolkit';
const currentDate = moment().format('ll');
// console.log(currentDate);

export const tasksSelector = state => state.tasks;
export const itemsSelector = state => tasksSelector(state).items;
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
