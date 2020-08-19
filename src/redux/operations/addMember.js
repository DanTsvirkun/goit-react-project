import { loaderOn, loaderOff } from "../actions/loaderActions";
import { errorOn } from "../actions/errorActions";
import { db } from "../../config";

const addMember = ({ projectId, email }) => async (dispatch) => {
  try {
    dispatch(loaderOn());
    const result = await db.collection("projects").doc(projectId).get();
    const currentMembers = result.data().members;
    if (currentMembers.find((element) => element === email)) {
      return "Цей користувач вже є учасником";
    } else {
      const newMembers = [...currentMembers, email];
      await db
        .collection("projects")
        .doc(projectId)
        .update({ members: newMembers });
    }
  } catch (error) {
    dispatch(errorOn(error));
  } finally {
    dispatch(loaderOff());
  }
};

export default addMember;
