import {
  createReducer,
  combineReducers
} from '@reduxjs/toolkit';
import {
  getTasks,
  addTask,
  deleteTask,
  changeTask,
  filterTasksAction,
  showModalAddTaskAction,
  indexDayAction,
} from '../actions/sprintTasksActions';

// const changeTaskFn = (state, payload) => {
//   return state.map(task => {
//     return task.singleHoursWasted.map(item => {
//       return item.currentDay === payload.currentDay
//         ? {
//             ...item,
//             singleHoursWasted: payload.singleHoursWasted,
//           }
//         : item;
//     });
//   });
// };
// const objInitState = {
//   id: '',
//   sprintId: '',
//   title: '',
//   hoursPlanned: '',
//   hoursWasted: '',
//   hoursWastedPerDay: [{
//     currentDay: '',
//     singleHoursWasted: '',
//   }, ]
// }

const initialState = [];
const items = createReducer(initialState, {
  [addTask]: (state, {
    payload
  }) => [...state, payload],
  [getTasks]: (_, {
    payload
  }) => payload,
  [deleteTask]: (state, {
    payload
  }) => {
    const newArray = [...state]
    newArray.splice(payload, 1)
    return newArray
  },
  [changeTask]: (state, {
    payload
  }) => payload,
});

const filterTasks = createReducer('', {
  [filterTasksAction]: (_, {
    payload
  }) => payload,
});
const showModalAddTask = createReducer(false, {
  [showModalAddTaskAction]: (_, {
    payload
  }) => payload,
});

const indexCurrentDay = createReducer(0, {
  [indexDayAction]: (state, {
    payload
  }) => payload,
});

export default combineReducers({
  items,
  filterTasks,
  showModalAddTask,
  indexCurrentDay,
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