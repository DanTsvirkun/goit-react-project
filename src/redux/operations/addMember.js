import { loaderOn, loaderOff } from "../actions/loaderActions";
import { errorOn } from "../actions/errorActions";
import { db } from "../../config";
import firebase from "firebase";

const addMember = ({ projectId, email }) => async (dispatch) => {
  try {
    dispatch(loaderOn());
    //   const result = await db.collection("projects").doc(projectId).get();
    const result = await db
      .collection("projects")
      .where(firebase.firestore.FieldPath.documentId(), "==", projectId)
      .get();

    console.log(projectId);
    console.log(result);
  } catch (error) {
    dispatch(errorOn(error));
  } finally {
    dispatch(loaderOff());
  }
};

export default addMember;
