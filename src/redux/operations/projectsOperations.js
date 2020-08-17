import { db } from "../../config";
import { loaderOn, loaderOff } from "../actions/loaderActions";
import { errorOn, errorOff } from "../actions/errorActions";
import projectsActions from "../actions/projectsActions";

const addProjectOperation = (project) => async (dispatch) => {
  try {
    // dispatch(errorOff());
    dispatch(loaderOn());
    const result = await db.collection("projects").add(project);
    const answer = {
      ...project,
      id: result.id,
    };
    dispatch(projectsActions.addProject(answer));
    // dispatch(projectsActions.showAddProjectModal(false));
  } catch (error) {
    dispatch(errorOn());
  } finally {
    dispatch(loaderOff());
  }
};

const getProjectsOperation = () => async (dispatch) => {
  try {
    // dispatch(errorOff());
    dispatch(loaderOn());
    const result = await db.collection("projects").get();
    const answer = result.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    dispatch(projectsActions.getProjects(answer));
    // dispatch(projectsActions.showAddProjectModal(false));
  } catch (error) {
    dispatch(errorOn());
  } finally {
    dispatch(loaderOff());
  }
};

const deleteProjectOperation = ({ target: { id } }) => async (dispatch) => {
  console.log("ID:", id);
  try {
    dispatch(loaderOn());
    const result = await db.collection("projects").doc(id).delete();
    console.log("delete_result", result);
    dispatch(projectsActions.deleteProject(id));
  } catch (error) {
    console.log(error);
    // dispatch(errorOn());
  } finally {
    dispatch(loaderOff());
  }
};

// db.collection("cities").doc("DC").delete().then(function() {
//   console.log("Document successfully deleted!");
// }).catch(function(error) {
//   console.error("Error removing document: ", error);
// });

export default {
  addProjectOperation,
  getProjectsOperation,
  deleteProjectOperation,
};
