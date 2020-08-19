import { db } from "../../config";
import firebase from "firebase";
import { loaderOn, loaderOff } from "../actions/loaderActions";
import { errorOn, errorOff } from "../actions/errorActions";
import moment from "moment";
import {
  getSprints,
  addSprint,
  deleteSprints,
  showModalAddSprintAction,
} from "../actions/sprintActions";
import { newState, findCurrentDay } from "../../helpers/newArrayTasks";

export const addSprintOperation = (sprint) => async (dispatch) => {
  try {
    dispatch(errorOff());
    dispatch(loaderOn());
    const formatedSprint = {
      ...sprint,
      startDate: moment(sprint.startDate).format("DD.MM.YYYY"),
    };
    const result = await db.collection("sprints").add(formatedSprint);
    const answer = { ...formatedSprint, id: result.id };
    dispatch(addSprint(answer));
    dispatch(showModalAddSprintAction(false));
  } catch (error) {
    dispatch(errorOn());
  } finally {
    dispatch(loaderOff());
  }
};

export const getSprintsOperation = () => async (dispatch) => {
  try {
    dispatch(loaderOn());
    const result = await db.collection("sprints").get();
    const answer = result.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    dispatch(getSprints(answer));
  } catch (error) {
    dispatch(errorOn());
  } finally {
    dispatch(loaderOff());
  }
};

export const getSprintByProjectId = (key) => async (dispatch) => {
  console.log(key);
  try {
    dispatch(loaderOn());
    const result = await db
      .collection("sprints")
      .orderByChild("projectId")
      .equalTo(key);
    // const result = await firebase
    //   .database()
    //   .ref("sprints")
    //   .orderByKey("mU19eFAvHLgWycZecPMf");
    console.log(result);
    // const answer = result.docs.map((doc) => ({
    //   ...doc.data(),
    //   id: doc.id,
    // }));
    // dispatch(getSprints(answer));
  } catch (error) {
    dispatch(errorOn());
  } finally {
    dispatch(loaderOff());
  }
};
