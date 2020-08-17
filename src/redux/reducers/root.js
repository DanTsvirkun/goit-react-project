import { combineReducers } from "@reduxjs/toolkit";
import { loader } from "./loaderReducers";
import { error } from "./errorReducers";
import { auth } from "./registrationReducer";
import tasks from "./TasksReducers";
import projects from "./projectsReducer";
import sprints from "./SprintReducers";

export const rootReducer = combineReducers({
  loader,
  error,
  auth,
  projects,
  tasks,
  sprints,
});
