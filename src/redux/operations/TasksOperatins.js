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

import {
  getSprints
} from '../actions/sprintActions';

export const getTasksOperation = sprintId => async dispatch => {
  try {

    await dispatch(getTasks([]));
    await dispatch(indexDayAction(0));
    dispatch(errorOff());
    dispatch(loaderOn());

    const result = await db
      .collection('tasks')
      .where('sprintId', '==', sprintId)
      .get();

    const answer = result.docs.map(doc => ({
      ...doc.data(),
      id: doc.id,
    }));


    // const filteredAnswer = answer.filter((el) => Number(sprintId) === el.sprintId)
    await dispatch(indexDayAction(findCurrentDay(answer)));
    dispatch(getTasks(answer));

    return answer;
  } catch (error) {
    dispatch(errorOn(error));
  } finally {
    dispatch(loaderOff());
  }
};

export const addTaskOperation = task => async dispatch => {
  try {
    dispatch(errorOff());
    // dispatch(loaderOn());
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
    // dispatch(loaderOff());
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
    // dispatch(loaderOn());
    const tasks = [...getTasks().tasks.items];
    const task = {
      ...tasks[item.indexArray],
    };
    const newTask = newState(task, item);
    tasks.splice(item.indexArray, 1, newTask);

    dispatch(changeTask(tasks));


    await db
      .collection('tasks')
      .doc(item.taskId)
      .set({
        ...newTask,
      });

    // dispatch(indexDayAction(item.idx));
  } catch (error) {
    dispatch(errorOn(error));
  } finally {
    // dispatch(loaderOff());
  }
};

export const deleteTaskOperation = (idTask, index) => async dispatch => {
  try {
    dispatch(errorOff());
    // dispatch(loaderOn());
    await db.collection('tasks').doc(idTask).delete();

    dispatch(deleteTask(index));
  } catch (error) {
    dispatch(errorOn(error));
  } finally {
    // dispatch(loaderOff());
  }
};

export const changeSprintTitle = (sprintId, title) => async (
  dispatch,
  getState,
) => {
  try {
    // const result = await db.collection("projects").doc(projectId).get();
    const sprints = getState().sprints.items;
    await db.collection('sprints').doc(sprintId).update({
      title: title,
    });
    const res = sprints.map(el => {
      return sprintId === el.id ?
        {
          ...el,
          title,
        } :
        el;
    });

    dispatch(getSprints(res));
  } catch (error) {
    dispatch(errorOn(error));
  }
};