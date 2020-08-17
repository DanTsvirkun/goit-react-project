import { createAction } from "@reduxjs/toolkit";
import projectsConstants from "../constants/projectsConstants";

const addProject = createAction(projectsConstants.ADD_PROJECT);
const deleteProject = createAction(projectsConstants.DELETE_PROJECT);
const getProjects = createAction(projectsConstants.GET_PROJECTS);
const showAddProjectModal = createAction(projectsConstants.SHOW_ADD_PROJECT_MODAL);

export default {
  addProject,
  deleteProject,
  getProjects,
  showAddProjectModal
}