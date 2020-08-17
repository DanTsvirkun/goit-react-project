import { db } from "../../config";
import { loaderOn, loaderOff } from "../actions/loaderActions";
import { errorOn, errorOff } from "../actions/errorActions";
import {
  getSprints,
  AddSprint,
  deleteSprints,
  showModalAddSprintAction,
} from "../actions/sprintActions";

export const addSprintOperation = (sprint) => async (dispatch) => {
  try {
    dispatch(errorOff());
    dispatch(loaderOn());
    const result = await db.collection("sprints").add(sprint);
    const answer = {
      ...sprint,
      id: result.id,
    };
    console.log(answer);
    dispatch(AddSprint(answer));
    dispatch(showModalAddSprintAction(false));
  } catch (error) {
    dispatch(errorOn());
  } finally {
    dispatch(loaderOff());
  }
};

//   sprints: [
//     {
//       projectId,
//       title,
//       startDate,
//       endDate,
//       duration,
//     },
//   ],
