import { createSelector } from "@reduxjs/toolkit";

const projectsSelector = (state) => state.projects;
const authEmailSelector = (state) => state.auth.email;
const toggleLoader = (state) => state.loader;

const newLoaderSelector = createSelector(toggleLoader, (status) => status)

export default { projectsSelector, authEmailSelector, newLoaderSelector };
