import { db } from "../../config";
import { loaderOn, loaderOff } from "../actions/loaderActions";
import { errorOn, errorOff } from "../actions/errorActions";
import projectsActions from "../actions/projectsActions";

const addProjectOperation = (project) => async (dispatch) => {
  try {
    dispatch(errorOff());
    dispatch(loaderOn());
    const result = await db.collection("projects").add(project);
    const answer = {
      ...project,
      id: result.id
    }
    console.log("answer", answer)
    dispatch(projectsActions.addProject(answer));
    dispatch(projectsActions.showAddProjectModal(false));
  } catch (error) {
    dispatch(errorOn());
  } finally {
    dispatch(loaderOff());
  }
};

const getPRojectsOperation = () => async(dispatch) => {
  try {
    dispatch(errorOff());
    dispatch(loaderOn());
    const result = await db.collection("projects").get()
    console.log("get result", result);
    const answer = result.docs.map((doc) => ({       
      ...doc.data(),
      id: doc.id,
    }));
    dispatch(projectsActions.getProjects(answer));
    dispatch(projectsActions.showAddProjectModal(false));
  } catch (error) {
    dispatch(errorOn());
  } finally {
    dispatch(loaderOff());
  }
}



export default {
  addProjectOperation,
  getPRojectsOperation
}