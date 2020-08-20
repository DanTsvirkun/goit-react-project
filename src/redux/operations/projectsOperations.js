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
    const test = await db
      .collection("sprints")
      .where("projectId", "==", id)
      .get();
    const answer = test.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    console.log(answer);
    const result = await db.collection("projects").doc(id).delete();
    dispatch(projectsActions.deleteProject(id));
  } catch (error) {
    dispatch(errorOn(error));
  } finally {
    dispatch(loaderOff());
  }
};

export default {
  addProjectOperation,
  getProjectsOperation,
  deleteProjectOperation,
};
