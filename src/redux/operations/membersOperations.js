import { loaderOn, loaderOff } from "../actions/loaderActions";
import { errorOn } from "../actions/errorActions";
import { db } from "../../config";

export const addMember = ({ projectId, email }) => async (dispatch) => {
  try {
    const result = await db.collection("projects").doc(projectId).get();
    const currentMembers = result.data().members;
    if (currentMembers.find((element) => element === email)) {
      return "Цей користувач вже є участником";
    } else {
      const newMembers = [...currentMembers, email];
      await db
        .collection("projects")
        .doc(projectId)
        .update({ members: newMembers });
    }
  } catch (error) {
    dispatch(errorOn(error));
  }
};

export const updateMembers = (members, projectId) => async (dispatch) => {
  try {
    await db.collection("projects").doc(projectId).update({ members: members });
  } catch (error) {
    dispatch(errorOn(error));
  }
};
