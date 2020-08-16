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
} from '../actions/sprintTasksActions';

const changeTaskFn = (state, payload) => {
  return state.map(task => {
    return task.singleHoursWasted.map(item => {
      return item.currentDay === payload.currentDay ?
        {
          ...item,
          singleHoursWasted: payload.singleHoursWasted,
        } :
        item;
    });
  });
};

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
    }) =>
    state.filter(item => item.id !== payload),
  [changeTask]: (state, {
    payload
  }) => changeTaskFn(state, payload),
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
})

export default combineReducers({
  items,
  filterTasks,
  showModalAddTask
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