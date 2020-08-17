import { createAction } from "@reduxjs/toolkit";
import constants from "../constants/sprintConstants";
export const AddSprint = createAction(constants.ADD_SPRINT);
export const getSprints = createAction(constants.GET_SPRINTS);
export const showModalAddSprintAction = createAction(
  constants.SHOW_MODAL_ADD_SPRINT
);

export const deleteSprints = createAction(constants.DELETE_SPRINT);
// export const changeSprints = createAction(constants.CHANGE_SPRINT);
// export const filterTasksAction = createAction(constants.FILTER_SPRINTS);
