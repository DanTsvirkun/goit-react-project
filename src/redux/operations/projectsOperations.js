import { db } from "../../config";
import { loaderOn, loaderOff } from "../actions/loaderActions";
import { errorOn, errorOff } from "../actions/errorActions";
import projectsActions from "../actions/projectsActions";

const addProjectOperation = (project) => async (dispatch) => {
  try {
    dispatch(loaderOn());
    const result = await db.collection("projects").add(project);
    const answer = {
      ...project,
      id: result.id,
    };
    dispatch(projectsActions.addProject(answer));
  } catch (error) {
    dispatch(errorOn(error));
  } finally {
    dispatch(loaderOff());
  }
};

const getProjectsOperation = () => async (dispatch) => {
  try {
    dispatch(loaderOn());
    const result = await db.collection("projects").get();
    const answer = result.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    dispatch(projectsActions.getProjects(answer));
  } catch (error) {
    dispatch(errorOn(error));
  } finally {
    dispatch(loaderOff());
  }
};

const deleteProjectOperation = ({ target: { id } }) => async (dispatch) => {
  try {
    dispatch(loaderOn());
    const sprintsToDelete = await db
      .collection("sprints")
      .where("projectId", "==", id)
      .get();
    await db.collection("projects").doc(id).delete();
    dispatch(projectsActions.deleteProject(id));
    sprintsToDelete.docs.forEach(async (doc) => {
      await db.collection("sprints").doc(doc.id).delete();
      const tasksToDelete = await db
        .collection("tasks")
        .where("sprintId", "==", doc.id)
        .get();
      tasksToDelete.docs.forEach(async (task) => {
        await db.collection("tasks").doc(task.id).delete();
      });
    });
  } catch (error) {
    dispatch(errorOn(error));
  } finally {
    dispatch(loaderOff());
  }
};

const getProjectsByEmailOperation = (email) => async (dispatch) => {
  try {    
    dispatch(loaderOn());
    const result = await db
      .collection("projects")
      .where("members", "array-contains", email)
      .get();
    const answer = result.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    dispatch(projectsActions.getProjects(answer));
    return answer;
  } catch (error) {
    dispatch(errorOn(error));
  } finally {
    dispatch(loaderOff());
  }
};

const getProjectsByEmailOperationCustom = (email) => async (dispatch) => {
  try {
    const result = await db
      .collection("projects")
      .where("members", "array-contains", email)
      .get();
    const answer = result.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    dispatch(projectsActions.getProjects(answer));
  } catch (error) {
    dispatch(errorOn(error));
  } finally {
  }
};

export default {
  addProjectOperation,
  getProjectsOperation,
  deleteProjectOperation,
  getProjectsByEmailOperation,
  getProjectsByEmailOperationCustom,
};
