import { loaderOn, loaderOff } from "../actions/loaderActions";
import { auth } from "../../config";
import { errorOn } from "../actions/errorActions";
import { setUserData } from "../actions/registarationAction";

const LogIn = ({ email, password }) => async (dispatch) => {
  try {
    dispatch(loaderOn());
    const result = await auth.signInWithEmailAndPassword(email, password);
    dispatch(setUserData(result));
  } catch (error) {
    dispatch(errorOn(error));
  } finally {
    dispatch(loaderOff());
  }
};

export default LogIn;
