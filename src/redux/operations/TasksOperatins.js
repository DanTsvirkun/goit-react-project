import {
  db
} from '../../config';
import {
  getTasks,
  addTask,
  deleteTask,
  changeTask,
  showModalAddTaskAction,
} from '../actions/sprintTasksActions';
import {
  errorOn,
  errorOff
} from '../actions/errorActions';
import {
  loaderOn,
  loaderOff
} from '../actions/loaderActions';

export const getTasksOperation = () => async dispatch => {
  try {
    dispatch(errorOff());
    dispatch(loaderOn());
    const result = await db.collection('tasks').get();
    console.log(result);
    const answer = result.docs.map(doc => ({
      ...doc.data(),
      id: doc.id,
    }));
    dispatch(getTasks(answer));
  } catch (error) {
    dispatch(errorOn());
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
    dispatch(showModalAddTaskAction(false))
  } catch (error) {
    dispatch(errorOn());
  } finally {
    dispatch(loaderOff());
  }
};