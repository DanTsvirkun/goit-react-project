import { db } from "../../config";
import firebase from "firebase";
import { loaderOn, loaderOff } from "../actions/loaderActions";
import { errorOn, errorOff } from "../actions/errorActions";
import moment from "moment";
import {
  getSprints,
  addSprint,
  deleteSprints,
  showModalAddSprintAction,
} from "../actions/sprintActions";
import { newState, findCurrentDay } from "../../helpers/newArrayTasks";

export const addSprintOperation = (sprint) => async (dispatch) => {
  try {
    dispatch(errorOff());
    const formatedSprint = {
      ...sprint,
      startDate: moment(sprint.startDate).format("DD.MM.YYYY"),
    };
    const result = await db.collection("sprints").add(formatedSprint);
    const answer = { ...formatedSprint, id: result.id };
    dispatch(addSprint(answer));
    dispatch(showModalAddSprintAction(false));
  } catch (error) {
    dispatch(errorOn());
  }
};

export const getSprintsOperation = () => async (dispatch) => {
  try {
    dispatch(loaderOn());
    const result = await db.collection("sprints").get();
    const answer = result.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    dispatch(getSprints(answer));
  } catch (error) {
    dispatch(errorOn());
  } finally {
    dispatch(loaderOff());
  }
};

export const getSprintByProjectId = (key) => async (dispatch) => {
  try {
    dispatch(errorOff());
    dispatch(loaderOn());
    const result = await db
      .collection("sprints")
      .where("projectId", "==", key)
      .get();
    const answer = result.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    dispatch(getSprints(answer));
    return answer;
  } catch (error) {
    dispatch(errorOn());
  } finally {
    dispatch(loaderOff());
  }
};

export const deleteSprintsOperation = ({ target: { id } }) => async (
  dispatch
) => {
  try {
    dispatch(errorOff());
    const tasksToDelete = await db
      .collection("tasks")
      .where("sprintId", "==", id)
      .get();
    await db.collection("sprints").doc(id).delete();
    dispatch(deleteSprints(id));
    tasksToDelete.docs.forEach(async (task) => {
      await db.collection("tasks").doc(task.id).delete();
    });
  } catch (error) {
    dispatch(errorOn(error));
  }
};

export const changeProjectTitle = (projectId, title) => async (dispatch) => {
  try {
    const result = await db.collection("projects").doc(projectId).get();
    await db.collection("projects").doc(projectId).update({ title: title });
  } catch (error) {
    dispatch(errorOn(error));
  }
};
