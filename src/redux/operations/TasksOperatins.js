import {
  db
} from '../../config';
import firebase from 'firebase';
import {
  getTasks,
  addTask,
  deleteTask,
  changeTask,
  showModalAddTaskAction,
  indexDayAction,
} from '../actions/sprintTasksActions';
import {
  errorOn,
  errorOff
} from '../actions/errorActions';
import {
  loaderOn,
  loaderOff
} from '../actions/loaderActions';
import {
  newState,
  findCurrentDay
} from '../../helpers/newArrayTasks';
import {
  config
} from 'react-transition-group';

export const getTasksOperation = sprintId => async dispatch => {
  try {
    dispatch(errorOff());
    dispatch(loaderOn());
    const result = await db.collection('tasks').get();
    const answer = result.docs.reduce((acc, doc) => {
      const item = doc.data();
      if (Number(item.sprintId) === Number(sprintId)) {
        acc.push({
          ...item,
          id: doc.id,
        });
      }
      return acc;
    }, []);

    // const filteredAnswer = answer.filter((el) => Number(sprintId) === el.sprintId)
    dispatch(getTasks(answer));
    dispatch(indexDayAction(findCurrentDay(answer)));
  } catch (error) {
    dispatch(errorOn(error));
  } finally {
    dispatch(loaderOff());
  }
};

export const addTaskOperation = task => async dispatch => {
  try {
    dispatch(errorOff());
    dispatch(loaderOn());
    const result = await db.collection('tasks').add(task);
    const answer = {
      ...task,
      id: result.id,
    };
    dispatch(addTask(answer));
    dispatch(showModalAddTaskAction(false));
  } catch (error) {
    dispatch(errorOn(error));
  } finally {
    dispatch(loaderOff());
  }
};

export const changeTaskSingleHour = item => async (dispatch, getTasks) => {
  try {
    const num = getTasks().tasks.items[item.indexArray].hoursWastedPerDay[
      item.idx
    ].singleHoursWasted;
    if (num === item.numValue) {
      return;
    }


    dispatch(errorOff());
    dispatch(loaderOn());
    const tasks = [...getTasks().tasks.items];
    const task = {
      ...tasks[item.indexArray],
    };
    const newTask = newState(task, item);
    tasks.splice(item.indexArray, 1, newTask);

    dispatch(changeTask(tasks));
    if (item.isValid) {
      console.log('request');
      await db
        .collection('tasks')
        .doc(item.taskId)
        .set({
          ...newTask,
        });
    }

    dispatch(indexDayAction(item.idx));
  } catch (error) {
    dispatch(errorOn(error));
  } finally {
    dispatch(loaderOff());
  }
};

export const deleteTaskOperation = (idTask, index) => async dispatch => {
  try {
    dispatch(errorOff());
    dispatch(loaderOn());
    await db.collection('tasks').doc(idTask).delete();
    console.log('wwwwww');

    dispatch(deleteTask(index));
  } catch (error) {
    dispatch(errorOn(error));
  } finally {
    dispatch(loaderOff());
  }
};