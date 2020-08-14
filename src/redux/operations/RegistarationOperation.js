import { auth } from "../../config";
import { loaderOn, loaderOff } from "../actions/loaderActions";
import { errorOn } from "../actions/errorActions";
import { setUserData } from "../actions/registarationAction";

export const Registration = ({ email, password }) => async (dispatch) => {
  try {
    dispatch(loaderOn());
    const result = await auth.createUserWithEmailAndPassword(email, password);
    // console.log(result);
    dispatch(setUserData(result));
  } catch (error) {
    dispatch(errorOn(error));
  } finally {
    dispatch(loaderOff());
  }
};
