import { createReducer, combineReducers } from "@reduxjs/toolkit";
import projectsActions from "../actions/projectsActions";

const initialState = [];
const projects = createReducer(initialState, {
  [projectsActions.addProject]: (state, { payload }) => [...state, payload],
  [projectsActions.getProjects]: (_, { payload }) => payload,
  [projectsActions.deleteProject]: (state, { payload }) =>
    state.filter((project) => project.id !== payload),
});

export default projects;
