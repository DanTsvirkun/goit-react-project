import { auth } from "../../config";
import { loaderOn, loaderOff } from "../actions/loaderActions";
import { errorOn } from "../actions/errorActions";
import { resetUser } from "../actions/logInRegistaration";

const LogOutOperation = () => async (dispatch) => {
  try {
    dispatch(loaderOn());
    await auth.signOut();
    dispatch(resetUser());
  } catch (error) {
    dispatch(errorOn(error));
  } finally {
    dispatch(loaderOff());
  }
};

export default LogOutOperation;
