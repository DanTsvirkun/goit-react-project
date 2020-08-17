import { db } from "../../config";
import firebase from "firebase";
import {
  getTasks,
  addTask,
  deleteTask,
  changeTask,
  showModalAddTaskAction,
  indexDayAction,
} from "../actions/sprintTasksActions";
import { errorOn, errorOff } from "../actions/errorActions";
import { loaderOn, loaderOff } from "../actions/loaderActions";
import { objToBackEnd, newState } from "../../helpers/newArrayTasks";

export const getTasksOperation = (sprintId) => async (dispatch) => {
  try {
    dispatch(errorOff());
    dispatch(loaderOn());
    const result = await db.collection("tasks").get();
    const answer = result.docs.reduce((acc, doc) => {
      const item = doc.data();
      if (item.sprintId === Number(sprintId)) {
        acc.push({
          ...item,
          id: doc.id,
        });
      }
      return acc;
    }, []);

    // const filteredAnswer = answer.filter((el) => Number(sprintId) === el.sprintId)
    dispatch(getTasks(answer));
  } catch (error) {
    dispatch(errorOn());
  } finally {
    dispatch(loaderOff());
  }
};

export const addTaskOperation = (task) => async (dispatch) => {
  try {
    dispatch(errorOff());
    dispatch(loaderOn());
    const result = await db.collection("tasks").add(task);
    const answer = {
      ...task,
      id: result.id,
    };
    dispatch(addTask(answer));
    dispatch(showModalAddTaskAction(false));
  } catch (error) {
    dispatch(errorOn());
  } finally {
    dispatch(loaderOff());
  }
};

export const changeTaskSingleHour = (item) => async (dispatch, getTasks) => {
  try {
    dispatch(errorOff());
    dispatch(loaderOn());
    const tasks = [...getTasks().tasks.items];
    const newStateObj = newState(tasks, item);
    console.log(newStateObj[item.indexArray]);
    dispatch(changeTask(newStateObj));
    if (item.numValue <= 0) {
      alert("введіть число більше 0");
      return;
    }

    await db
      .collection("tasks")
      .doc(item.taskId)
      .set({
        ...newStateObj[item.indexArray],
      });

    // dispatch(indexDayAction(item.idx));
  } catch (error) {
    dispatch(errorOn());
  } finally {
    dispatch(loaderOff());
  }
};
